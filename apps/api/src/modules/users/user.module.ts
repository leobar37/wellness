import { Module } from '@nestjs/common';
import { AdminstratorResolver, ClientResolver } from './resolvers';
import { ClientService, AdministratorService } from './services';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Administrator, Client } from '@wellness/core';
@Module({
  providers: [
    AdminstratorResolver,
    ClientResolver,
    ClientService,
    AdministratorService,
  ],
  imports: [TypeOrmModule.forFeature([Client, Administrator])],
})
export class UserModule {}
