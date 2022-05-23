import { Injectable } from '@nestjs/common';
import { InjectEntityManager, InjectRepository } from '@nestjs/typeorm';
import { Plan, Activity } from '@wellness/core/entity';
import { EntityManager, Repository } from 'typeorm';

@Injectable()
export class ActivityHelper {
  constructor(
    @InjectRepository(Plan) private repository: Repository<Plan>,
    @InjectEntityManager() private manager: EntityManager
  ) {}
  public async clientHaveAActivityActive(clientId: number, activityId: number) {
    const result = await this.manager
      .createQueryBuilder(Activity, 'activity')
      .innerJoin('activity.suscription', 'sub')
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
