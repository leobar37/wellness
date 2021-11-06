import { WellnessEvent } from './base.event';
import { CRUD } from '@wellness/common';
import { Activity, Plan } from '@wellness/core/entity';

export class SuscriptionEvent extends WellnessEvent {
  operation: CRUD;
  source: Activity | Plan;
  constructor(input: Partial<SuscriptionEvent>) {
    super(input);
  }
}
