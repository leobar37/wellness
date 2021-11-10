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
import { ContractsSchedulerModule } from '@wellness/core/scheduler';

const BUSINESS_MODULES = [
  PingModule,
  UserModule,
  AsistenceModule,
  SuscriptionModule,
];

@Module({
  imports: [
    TypeOrmModule.forRoot({
      password: 'alfk3458',
      username: 'leobar37',
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
      autoSchemaFile: resolve('../../../', 'schema'),
    }),

    EventBusModule,
    LoggerWellnessModule,
    ContractsSchedulerModule,
    ...BUSINESS_MODULES,
  ],
  controllers: [],
  providers: [RequestContextService],
})
export class AppModule {
  public static injector: ModuleRef;
  constructor(private moduleRef: ModuleRef) {
    AppModule.injector = moduleRef;
  }
}
