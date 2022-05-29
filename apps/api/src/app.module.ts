import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ModuleRef } from '@nestjs/core';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { isDev, SafeAny } from '@wellness/common';
import { coreEntitiesMap } from '@wellness/core';
import { EventBusModule } from '@wellness/core/event-bus';
import { LoggerWellnessModule } from '@wellness/core/logger';
import { resolve } from 'path';
import { AuthModule } from './auth/auth.module';
import { RequestContextService } from './common/context';
import { AsistenceModule } from './modules/asistence';
import { AssetsModule } from './modules/assets';
import { FichaModule } from './modules/ficha';
import { PingModule } from './modules/ping';
import { SuscriptionModule } from './modules/suscriptions';
import { UserModule } from './modules/users';
import { ReportsModule } from './modules/reports';

const BUSINESS_MODULES = [
  PingModule,
  UserModule,
  AsistenceModule,
  SuscriptionModule,
  AssetsModule,
  FichaModule,
  AuthModule,
  ReportsModule,
];

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: (configService: ConfigService) => {
        return {
          username: configService.get('BD_USER'),
          password: configService.get('BD_PASS'),
          type: 'postgres',
          host: configService.get('BD_HOST'),
          port: configService.get('BD_PORT'),
          database: configService.get('BD_DATABASE'),
          entities: [...Object.values(coreEntitiesMap)],
          synchronize: isDev,
        };
      },
      inject: [ConfigService],
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      playground: true,
      debug: true,
      driver: ApolloDriver,
      autoSchemaFile: resolve('./', 'schema.gql'),
      context: ({ req }) => ({ req }),
    } as SafeAny),
    EventBusModule,
    LoggerWellnessModule,
    ...BUSINESS_MODULES,
    ConfigModule.forRoot({
      envFilePath: isDev ? '.env' : resolve('../', '.env'),
      isGlobal: true,
    }),
  ],
  controllers: [],
  providers: [RequestContextService],
  exports: [],
})
export class AppModule {
  public static injector: ModuleRef;
  constructor(private moduleRef: ModuleRef) {
    AppModule.injector = moduleRef;
  }
}
