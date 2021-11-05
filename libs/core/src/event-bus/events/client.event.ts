import { WellnessEvent } from './base.event';
import { Client } from '../../entity';
import { CRUD } from '@wellness/common';
export class ClientEvent extends WellnessEvent {
  source: Client;
  operation: CRUD;

  constructor(input: Partial<ClientEvent>) {
    super(input);
  }
}
