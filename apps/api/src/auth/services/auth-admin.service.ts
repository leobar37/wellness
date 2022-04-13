import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectEntityManager } from '@nestjs/typeorm';
import { EntityManager } from 'typeorm';
import { Administrator } from '@wellness/core/entity';
import { JwtService } from '@nestjs/jwt';
import { omit } from '@wellness/common';
import { BycriptService } from '@wellness/core';
import { LoginAdminInput } from '../dto';
import { AccessTokenResponse } from '../model';

@Injectable()
export class AuthAdminService {
  constructor(
    @InjectEntityManager() private manager: EntityManager,
    private jwtService: JwtService,
    private readonly bcryptService: BycriptService
  ) {}
  async validate(email: string, password: string): Promise<Administrator> {
    const admin = await this.manager
      .getRepository(Administrator)
      .findOne({ email });
    if (admin && this.bcryptService.compare(password, admin.password)) {
      return admin;
    }
    return null;
  }

  async login(user: LoginAdminInput): Promise<AccessTokenResponse> {
    const userFound = await this.validate(user.email, user.password);
    if (!userFound) {
      throw new UnauthorizedException();
    }
    const payload = omit(userFound, ['password', 'updateAt', 'createdAt']);
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
