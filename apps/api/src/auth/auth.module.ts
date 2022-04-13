import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthAdminService } from './services';
import { BycriptService } from '@wellness/core';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './strategies/jwtStrategy';
import { AuthResolver } from './resolvers/auth.resolver';
const SERVICES = [AuthAdminService, JwtStrategy, BycriptService];
const RESOLVER = [AuthResolver];
@Module({
  imports: [
    ConfigModule,
    PassportModule,
    JwtModule.registerAsync({
      useFactory: (configService: ConfigService) => ({
        secret: configService.get('JWT_SECRET'),
        signOptions: {
          expiresIn: '6d',
        },
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [...SERVICES, ...RESOLVER],
})
export class AuthModule {}
