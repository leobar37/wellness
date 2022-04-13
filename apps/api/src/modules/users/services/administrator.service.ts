import { Injectable } from '@nestjs/common';
import { InjectEntityManager, InjectRepository } from '@nestjs/typeorm';
import { CRUD, ID } from '@wellness/common';
import { Administrator, BussinessError } from '@wellness/core';
import { AdministratorEvent, EventBus } from '@wellness/core/event-bus';
import { EntityManager, Repository } from 'typeorm';
import { RegisterAdminInput } from '../dto/admin.input';

import { BycriptService } from '@wellness/core';

@Injectable()
export class AdministratorService {
  constructor(
    @InjectEntityManager() private manager: EntityManager,
    @InjectRepository(Administrator)
    private administratorRepository: Repository<Administrator>,
    private eventBus: EventBus,
    private readonly bcryptService: BycriptService
  ) {}

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

  public async updateAdmin(id: ID, input: RegisterAdminInput) {
    const admin = await this.manager.getRepository(Administrator).findOne(id);
    if (!admin) {
      throw new BussinessError('Este administador no existe');
    }
    const adminForUpdate = this.manager.merge(Administrator, admin, {
      ...admin,
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

  // list administrators
  async getAdministrators() {
    return this.administratorRepository.find();
  }
}
