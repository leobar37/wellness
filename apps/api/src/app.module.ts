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
import { AuthModule } from './auth/auth.module';
import { APP_GUARD } from '@nestjs/core';
import { RolGuard } from './common';
const BUSINESS_MODULES = [
  PingModule,
  UserModule,
  AsistenceModule,
  SuscriptionModule,
  AssetsModule,
  FichaModule,
  AuthModule,
];

const devDatabaseConfig = {
  password: 'alfk3458',
  username: 'postgres',
  type: 'postgres',
  host: 'localhost',
  database: 'wellness',
  port: 5432,
  entities: [...Object.values(coreEntitiesMap)],
  synchronize: true,
};
@Module({
  imports: [
    /*
      Include module configuration for control configuration like this
    */
    TypeOrmModule.forRoot({
      username: 'postgres',
      password: '182457Almeas45',
      type: 'postgres',
      host: 'database-1.cofmqlq6md3c.us-east-1.rds.amazonaws.com',
      port: 5432,
      database: 'wellnessprobd',
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
