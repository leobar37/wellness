import { WellnessEvent } from './base.event';
import { Asset } from '../../entity';
import { CRUD } from '@wellness/common';

export class AssetEvent extends WellnessEvent {
  source: Asset;
  operation: CRUD;

  constructor(input: Partial<AssetEvent>) {
    super(input);
  }
}
