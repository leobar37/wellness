import { Module } from '@nestjs/common';
import { ModuleRef } from '@nestjs/core';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { coreEntitiesMap } from '@wellness/core';
import { EventBusModule } from '@wellness/core/event-bus';
import { LoggerWellnessModule } from '@wellness/core/logger';
import { resolve } from 'path';
import { RequestContextService } from './common/context';
import { AsistenceModule } from './modules/asistence';
import { SuscriptionModule } from './modules/suscriptions';
import { PingModule } from './modules/ping';
import { UserModule } from './modules/users';
import { AssetsModule } from './modules/assets';
import { FichaModule } from './modules/ficha';
import { ConfigModule } from '@nestjs/config';

const BUSINESS_MODULES = [
  PingModule,
  UserModule,
  AsistenceModule,
  SuscriptionModule,
  AssetsModule,
  FichaModule,
];

@Module({
  imports: [
    /*
      Include module configuration for control configuration like this
    */
    TypeOrmModule.forRoot({
      password: 'alfk3458',
      username: 'postgres',
      type: 'postgres',
      host: 'localhost',
      database: 'wellness',
      port: 5432,
      entities: [...Object.values(coreEntitiesMap)],
      synchronize: true,
    }),
    GraphQLModule.forRoot({
      playground: true,
      debug: true,
      autoSchemaFile: resolve('./', 'schema.gql'),
      context: ({ req }) => ({ req }),
    }),
    EventBusModule,
    LoggerWellnessModule,
    ...BUSINESS_MODULES,
    ConfigModule.forRoot({
      envFilePath: resolve('../', '.env'),
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
