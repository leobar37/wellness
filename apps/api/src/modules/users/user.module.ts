import { Module } from '@nestjs/common';
import { AdminstratorResolver, ClientResolver } from './resolvers';
import { ClientService } from './services';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Client } from '@wellness/core';
@Module({
  providers: [AdminstratorResolver, ClientResolver, ClientService],
  imports: [TypeOrmModule.forFeature([Client])],
})
export class UserModule {}
