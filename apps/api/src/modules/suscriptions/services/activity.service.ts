import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Activity, Suscription } from '@wellness/core/entity';
import { EntityNotFoundError } from '@wellness/core/common/error';
import { Repository } from 'typeorm';
import { ActivityInput } from '../dto/activity.input';
import { CRUD, ModeSuscription, Omit, omit } from '@wellness/common';
import { add } from 'date-fns';
import { InjectEntityManager } from '@nestjs/typeorm';
import { EntityManager } from 'typeorm';
import { EventBus, SuscriptionEvent } from '@wellness/core/event-bus';
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
      finishedAt = add(new Date(), {
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
}
