import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectEntityManager, InjectRepository } from '@nestjs/typeorm';
import { CRUD, ID, Role } from '@wellness/common';
import {
  Administrator,
  BussinessError,
  BycriptService,
  WelnessLogger,
} from '@wellness/core';
import { AdministratorEvent, EventBus } from '@wellness/core/event-bus';
import { omit } from 'lodash';
import { EntityManager, Repository } from 'typeorm';
import { RegisterAdminInput } from '../dto/admin.input';
import {
  ResetPasswordInput,
  ResetPasswordInputFromAdmin,
} from '../dto/ResetPassword.input';
@Injectable()
export class AdministratorService implements OnModuleInit {
  constructor(
    @InjectEntityManager() private manager: EntityManager,
    @InjectRepository(Administrator)
    private administratorRepository: Repository<Administrator>,
    private eventBus: EventBus,
    private readonly bcryptService: BycriptService,
    private wellnessLogger: WelnessLogger
  ) {}

  async onModuleInit() {
    const adminsCount = await this.manager.count(Administrator);
    if (adminsCount == 0) {
      this.wellnessLogger.info('0 admins in bd, system create a default admin');
      const admin = await this.registerAdmin({
        dni: '12345678',
        email: 'admin@gmail.com',
        lastName: 'admin',
        name: 'admin',
        password: 'admin',
        role: Role.ADMIN,
      });
      this.wellnessLogger.info(`admin created: ${admin.name}`, { admin });
    }
  }

  async registerAdmin(input: RegisterAdminInput) {
    const admin = await this.manager
      .getRepository(Administrator)
      .findOne({ email: input.email });

    if (admin) {
      throw new BussinessError('Este administrador ya existe');
    }
    // this password hashed
    const hash = await this.bcryptService.hash(input.password);
    const adminstratorData = await this.manager.save(
      Administrator,
      new Administrator({
        name: input.name,
        lastName: input.lastName,
        password: hash,
        dni: input.dni,
        email: input.email,
        rol: input.role,
      })
    );
    return adminstratorData;
  }

  /**
   * @description this method reset a password from the profile
   * the administrator
   */
  public async resetPassword(input: ResetPasswordInput) {
    const admin = await this.manager
      .getRepository(Administrator)
      .findOne(input.id);
    if (!admin) {
      throw new BussinessError('Este administador no existe');
    }
    const passwordIsEqual = await this.bcryptService.compare(
      input.prevPassword,
      admin.password
    );
    if (!passwordIsEqual) {
      throw new BussinessError('La contraseña anterior no es correcta');
    }
    const hash = await this.bcryptService.hash(input.newPassword);

    const adminForUpdate = this.manager.merge(Administrator, admin, {
      password: hash,
    });

    await this.manager.update(Administrator, input.id, adminForUpdate);

    return adminForUpdate;
  }

  /**
   * @description This method reset a password from  the administrator
   * the administrato sends his password, to check  his aithenteticity
   */

  public async resetPasswordFromAdmin(
    currentUser: Administrator,
    input: ResetPasswordInputFromAdmin
  ) {
    const adminTarget = await this.manager
      .getRepository(Administrator)
      .findOne(input.userId);

    if (!adminTarget) {
      throw new BussinessError('Este administrador no existe');
    }

    const admin = await this.manager.findOne(Administrator, currentUser.id);
    const passwordIsValid = await this.bcryptService.compare(
      input.adminPassword,
      admin.password
    );

    if (!passwordIsValid) {
      throw new BussinessError(
        'La contraseña enviada por el administrador no es valida'
      );
    }
    const hash = await this.bcryptService.hash(input.newPassword);
    await this.manager.update(Administrator, input.userId, {
      password: hash,
    });
    return omit(adminTarget, ['password']);
  }

  public async updateAdmin(id: ID, input: RegisterAdminInput) {
    const admin = await this.manager.getRepository(Administrator).findOne(id);

    if (!admin) {
      throw new BussinessError('Este administador no existe');
    }

    const adminForUpdate = this.manager.merge(Administrator, admin, {
      ...omit(input, ['password']),
      rol: input.role,
    });

    await this.manager.update(Administrator, id, adminForUpdate);

    this.eventBus.publish(
      new AdministratorEvent({
        source: adminForUpdate,
        operation: CRUD.UPDATE,
      })
    );

    return adminForUpdate;
  }

  public async deleteAdministrator(id: ID) {
    const admin = await this.manager.getRepository(Administrator).findOne(id);

    if (!admin) {
      throw new BussinessError('Este administrador no existe');
    }

    await this.manager.delete(Administrator, id);

    this.eventBus.publish(
      new AdministratorEvent({
        source: admin,
        operation: CRUD.DELETE,
      })
    );

    return admin;
  }

  // list administrators
  async getAdministrators() {
    return this.administratorRepository.find();
  }

  // list administrators
  async getAdministrator(id: ID) {
    return this.administratorRepository.findOne(id);
  }
}
