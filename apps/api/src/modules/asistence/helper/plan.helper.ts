import { Injectable } from '@nestjs/common';
import { InjectEntityManager, InjectRepository } from '@nestjs/typeorm';
import { Plan } from '@wellness/core/entity';
import { EntityManager, Repository } from 'typeorm';

@Injectable()
export class PlanHelper {
  constructor(
    @InjectRepository(Plan) private repository: Repository<Plan>,
    @InjectEntityManager() private manager: EntityManager
  ) {}
  public async clientHaveAPlanActive(clientId: number) {
    const result = await this.manager
      .createQueryBuilder(Plan, 'plan')
      .innerJoin('plan.suscription', 'sub')
      .innerJoin('sub.contracts', 'contract')
      .where('contract.clientId = :clientId', {
        clientId: clientId,
      })
      .andWhere('contract.finished = :finish', {
        finish: false,
      })
      .getCount();
    return result > 0;
  }
}
