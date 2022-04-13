import { Module } from '@nestjs/common';
import { AdminstratorResolver, ClientResolver } from './resolvers';
import { ClientService, AdministratorService } from './services';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Administrator, Client } from '@wellness/core';
import { BycriptService } from '@wellness/core';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
const UTILS = [BycriptService];

const SERVICES = [ClientService, AdministratorService];

const RESOLVERS = [AdminstratorResolver, ClientResolver];

@Module({
  providers: [...UTILS, ...SERVICES, ...RESOLVERS],
  imports: [
    TypeOrmModule.forFeature([Client, Administrator]),
    ConfigModule,
    JwtModule.registerAsync({
      useFactory: (configService: ConfigService) => ({
        secret: configService.get('JWT_SECRET'),
      }),
      inject: [ConfigService],
    }),
  ],
})
export class UserModule {}
