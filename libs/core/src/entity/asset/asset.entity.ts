import { WellnessEntity } from '../base/base.entity';
import { Entity, Column, ManyToOne } from 'typeorm';
import { ObjectType } from '@nestjs/graphql';
import { DeepPartial, SafeAny } from '@wellness/common';
import { AssetBoot } from './relation-asset.entity';
/**
 * @description
 */
@Entity()
@ObjectType()
export class Asset extends WellnessEntity {
  constructor(input: DeepPartial<Asset>) {
    super(input);
  }

  @Column()
  name: string;

  @Column()
  size: number;

  @Column('simple-json')
  metadata: SafeAny;

  @ManyToOne((type) => AssetBoot, (boot) => boot.asset)
  boot: AssetBoot;
}
