import { WellnessEvent } from './base.event';
import { Administrator } from '../../entity';
import { CRUD } from '@wellness/common';
export class AdministratorEvent extends WellnessEvent {
  source: Administrator;
  operation: CRUD;

  constructor(input: Partial<AdministratorEvent>) {
    super(input);
  }
}
