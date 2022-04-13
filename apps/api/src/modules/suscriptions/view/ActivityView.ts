import { Activity, Contract, Suscription } from '@wellness/core';
import { ViewColumn, ViewEntity, Connection } from 'typeorm';

@ViewEntity({
  name: 'view_activity',
  expression: (connection: Connection) =>
    connection
      .createQueryBuilder()
      .select('act.detail.name', 'name')
      .addSelect('act.id', 'activityId')
      .from(Activity, 'act')
      .innerJoin(Suscription, 'sub', 'sub.id = act.id')
      .addSelect('sub.duration', 'duration')
      .innerJoin('sub.contracts', 'contract'),
})
export class ActivityView {
  @ViewColumn({ name: 'name' })
  name: string;

  @ViewColumn({ name: 'activityId' })
  activityId: string;
}
