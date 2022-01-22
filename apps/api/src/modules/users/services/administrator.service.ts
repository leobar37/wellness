import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectEntityManager, InjectRepository } from '@nestjs/typeorm';
import {
  Administrator,
  BussinessError,
  EntityNotFoundError,
} from '@wellness/core';
import jwt from 'jsonwebtoken';
import { EntityManager, Repository } from 'typeorm';
import { GenerateTokenInput, RegisterAdminInput } from '../dto/admin.input';
import { TokenPayload } from '../model';

@Injectable()
export class AdministratorService {
  constructor(
    @InjectEntityManager() private manager: EntityManager,
    private configService: ConfigService,
    @InjectRepository(Administrator)
    private administratorRepository: Repository<Administrator>
  ) {}

  generateToken({ email, role }: GenerateTokenInput) {
    const privateKey = this.configService.get('TEMPORAL_TOKEN_KEY');
    const generatedToken = jwt.sign(
      { email: email, rol: role } as TokenPayload,
      privateKey,
      {
        expiresIn: '6h',
      }
    );
    return generatedToken;
  }
  async generateTokenForAdmin({ email, role }: GenerateTokenInput) {
    const generatedToken = this.generateToken({ email, role });
    const administrator = this.manager.create(Administrator, {
      email: email,
      temportalToken: generatedToken,
      verified: false,
      rol: role,
    });
    return this.manager.save(administrator);
  }

  async registerAdmin(input: RegisterAdminInput) {
    const privateKey = this.configService.get('TEMPORAL_TOKEN_KEY');
    let payload = null;
    try {
      payload = jwt.verify(input.temporalToken, privateKey) as TokenPayload;
    } catch (error) {
      throw new BussinessError(
        'Su token ha expirado, solicite a un administrador que reenvie su invitación'
      );
    }
    const admin = await this.manager
      .getRepository(Administrator)
      .findOne({ email: payload.email });

    if (!admin) {
      throw new EntityNotFoundError('Administrator', payload.email);
    }
    const updatedAdmin = this.manager.merge(Administrator, admin, {
      name: input.name,
      lastName: input.lastName,
      verified: true,
    });

    await this.manager.update(Administrator, admin.id, updatedAdmin);
    return updatedAdmin;
  }

  // list administrators
  async getAdministrators() {
    return this.administratorRepository.find();
  }

  async resendToken(input: GenerateTokenInput) {
    const generatedToken = this.generateToken(input);
    const admin = await this.administratorRepository.findOne({
      email: input.email,
    });
    if (!admin) {
      throw new EntityNotFoundError('Administrator', input.email);
    }
    const refreshAdmin = this.administratorRepository.merge(admin, {
      temportalToken: generatedToken,
    });
    await this.administratorRepository.update(admin.id, refreshAdmin);

    return refreshAdmin;
  }
}
