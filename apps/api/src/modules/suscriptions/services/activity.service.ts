import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Activity, Contract, Suscription } from '@wellness/core/entity';
import {
  BussinessError,
  EntityNotFoundError,
} from '@wellness/core/common/error';
import { Repository } from 'typeorm';
import { ActivityInput } from '../dto/activity.input';
import { CRUD, ModeSuscription, omit } from '@wellness/common';
import { add } from 'date-fns';
import { InjectEntityManager } from '@nestjs/typeorm';
import { EntityManager } from 'typeorm';
import {
  ContractEvent,
  EventBus,
  SuscriptionEvent,
} from '@wellness/core/event-bus';
import { ContractInput } from '../dto/contract.input';
@Injectable()
export class ActivityService {
  constructor(
    @InjectRepository(Activity) private repository: Repository<Activity>,
    @InjectEntityManager() private manager: EntityManager,
    private eventBus: EventBus
  ) {}
  async createActivity(input: ActivityInput) {
    const activity = new Activity(omit(input, ['startAt', 'mode', 'duration']));

    let finishedAt = null;
    if (input.mode == ModeSuscription.FIXED) {
      finishedAt = add(input.startAt, {
        days: input.duration,
      });
    }
    const suscription = await this.manager.save(
      Suscription,
      new Suscription({
        active: true,
        duration: input.duration,
        startAt: input.startAt,
        mode: input.mode,
        finishedAt: finishedAt,
      })
    );

    activity.suscription = suscription;

    const activitySaved = await this.repository.save(activity);

    this.eventBus.publish(
      new SuscriptionEvent({
        operation: CRUD.CREATE,
        source: activitySaved,
      })
    );

    return activitySaved;
  }
  private async existActivity(id: number) {
    const activity = await this.repository.findOne(id);
    if (!activity) {
      throw new EntityNotFoundError('Activity', id);
    }
    return activity;
  }
  async deleteActivity(id: number) {
    const activity = await this.existActivity(id);
    await this.repository.delete(id);

    this.eventBus.publish(
      new SuscriptionEvent({
        operation: CRUD.DELETE,
        source: activity,
      })
    );
    return Activity;
  }
  async joinActivity(contractInput: ContractInput) {
    // verify if client have a active plan

    const activity = await this.repository.findOne({
      where: {
        id: contractInput.activityId,
      },
    });
    const contract = await this.manager.save(
      Contract,
      new Contract({
        clientId: contractInput.clientId,
        suscriptionId: activity.suscription.id,
        paid: contractInput.paid,
        note: contractInput.note,
        price: contractInput.price,
      })
    );
    this.eventBus.publish(
      new ContractEvent({
        source: contract,
        operation: CRUD.CREATE,
        planOrActivity: activity,
      })
    );
    return contract;
  }

  async findActivities() {
    const activities = await this.repository.find({});
    return activities;
  }

  // find activities by client and date
  async findActivitiesByClient(idClient: number) {
    const activities = await this.repository
      .createQueryBuilder('act')
      .innerJoin('act.suscription', 'sub')
      .innerJoin('sub.contracts', 'contract')
      .where('contract.clientId = :clientId', {
        clientId: idClient,
      })
      .getMany();
    return activities;
  }

  async findActivity(id: number) {
    const activity = await this.repository.findOne(id);
    return activity;
  }
}
