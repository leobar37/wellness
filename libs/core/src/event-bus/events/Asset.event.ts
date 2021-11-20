import { WellnessEvent } from './base.event';
import { Asset, AssetBoot } from '../../entity';
import { CRUD } from '@wellness/common';

export class AssetEvent extends WellnessEvent {
  source: Asset | AssetBoot;
  operation: CRUD;
  constructor(input: Partial<AssetEvent>) {
    super(input);
  }
  public isAsset() {
    return this.source instanceof Asset;
  }
  public isBoot() {
    return this.source instanceof AssetBoot;
  }
}
