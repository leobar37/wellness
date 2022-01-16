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
import { WelnessLogger } from '@wellness/core/logger';
import {
  ContractEvent,
  EventBus,
  SuscriptionEvent,
} from '@wellness/core/event-bus';
import { ContractInput } from '../dto/contract.input';
import addDays from 'date-fns/addDays';
import { FiltersActivity } from '../dto/filters.input';
import { isValid } from '@wellness/common';
@Injectable()
export class ActivityService {
  constructor(
    @InjectRepository(Activity) private repository: Repository<Activity>,
    @InjectEntityManager() private manager: EntityManager,
    private eventBus: EventBus,
    private logger: WelnessLogger
  ) {}
  async createActivity(input: ActivityInput) {
    const activity = new Activity(omit(input, ['startAt', 'mode', 'duration']));

    let finishedAt = null;
    if (input.mode == ModeSuscription.FIXED) {
      if (!isValid(input?.startAt)) {
        throw new BussinessError(
          'Cuando la subscripción es fija, la fecha de inicio es obligatoria'
        );
      }
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

    activity.suscription = Promise.resolve(suscription);

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

    return activity;
  }
  async joinActivity(contractInput: ContractInput) {
    const activity = await this.existActivity(contractInput.activityId);
    const sub = await activity.suscription;
    let finishedAt = null;
    if (sub.mode == ModeSuscription.FIXED) {
      finishedAt = new Date(sub.finishedAt);
    } else {
      finishedAt = addDays(new Date(), sub.duration);
    }
    const contract = await this.manager.save(
      Contract,
      new Contract({
        clientId: contractInput.clientId,
        suscriptionId: sub.id,
        paid: contractInput.paid,
        note: contractInput.note,
        price: contractInput.price,
        finishedAt: finishedAt,
      })
    );
    this.eventBus.publish(
      new ContractEvent({
        source: contract,
        operation: CRUD.CREATE,
        planOrActivity: activity,
      })
    );
    console.log(contract);

    return contract;
  }

  async findActivities(filter: FiltersActivity) {
    let builder = this.repository
      .createQueryBuilder('act')
      .innerJoin('act.suscription', 'sub');

    if (filter?.active) {
      builder = builder.where('sub.active = :active', {
        active: filter.active,
      });
    }
    return builder.getMany();
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

  async updateActivity(id: number, input: ActivityInput) {
    const activity = await this.existActivity(id);
    try {
      await this.repository.update(id, {
        detail: input.detail,
      });
      await this.manager.update(Suscription, activity.suscriptionId, {
        duration: input.duration,
        mode: input.mode,
        active: input.visible,
        startAt: input.startAt,
      });

      return this.repository.findOne(activity.id);
    } catch (error) {
      const humanText = 'No se ha podido editar la actividad';
      this.logger.error(humanText, error);
      throw new BussinessError(humanText);
    }
  }

  async findActivity(id: number) {
    const activity = await this.repository.findOne(id);

    return activity;
  }
}
