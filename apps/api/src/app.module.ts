import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { coreEntitiesMap } from '@wellness/core';
import { GraphQLModule } from '@nestjs/graphql';
import { PingModule } from './modules/ping';
import { RequestContextService } from './common/context';
import { UserModule } from './modules/users';
import { EventBusModule } from '@wellness/core/event-bus';
import { AsistenceModule } from './modules/asistence';
// import { LoggerWellneesModule } from '@wellness/core/logger';
import { ModuleRef } from '@nestjs/core';
const BUSINESS_MODULES = [PingModule, UserModule, AsistenceModule];

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
      autoSchemaFile: true,
    }),

    EventBusModule,
    // LoggerWellneesModule,
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
