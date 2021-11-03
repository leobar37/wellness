import { Module } from '@nestjs/common';

import { TypeOrmModule } from '@nestjs/typeorm';
import { coreEntitiesMap } from '@wellness/core';
import { GraphQLModule } from '@nestjs/graphql';
import { PingModule } from './modules/ping';
import { RequestContextService } from './common/context';
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
    PingModule,
    GraphQLModule.forRoot({
      playground: true,
      debug: true,
      autoSchemaFile: true,
    }),
  ],
  controllers: [],
  providers: [RequestContextService],
})
export class AppModule {}
