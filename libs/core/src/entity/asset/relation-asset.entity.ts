import { WellnessEntity } from '../base/base.entity';
import { DeepPartial } from '@wellness/common';
import { Column, OneToMany, Entity } from 'typeorm';
import { Asset } from './asset.entity';
import { ObjectType, Field } from '@nestjs/graphql';
/**
 * bootstrap Assets
 * @description
 * this entity is used for implement multiple assets in other entity
 */
@Entity()
@ObjectType()
export class AssetBoot extends WellnessEntity {
  constructor(input: DeepPartial<AssetBoot>) {
    super(input);
  }
  @OneToMany((type) => Asset, (asset) => asset.boot)
  @Field((type) => [Asset], { nullable: 'items' })
  assets: Promise<Asset[]>;
}
