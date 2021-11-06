import { WellnessEvent } from './base.event';
import { CRUD } from '@wellness/common';
import { Contract, Plan, Activity } from '@wellness/core';

export class ContractEvent extends WellnessEvent {
  source: Contract;
  planOrActivity: Activity | Plan;
  operation: CRUD;
  constructor(input: Partial<ContractEvent>) {
    super(input);
  }
}
