import { WellnessEntity } from '../base/base.entity';
import { Entity, Column, ManyToOne } from 'typeorm';
import { ObjectType, Field, Float } from '@nestjs/graphql';
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
  @Field()
  name: string;

  @Column({ nullable: true })
  @Field((type) => Float, { nullable: true })
  size: number;

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  @Column('simple-json', { default: null })
  metadata: SafeAny;

  @Column({ nullable: true })
  bootId: number;

  @Field({ nullable: true })
  previewUrl: string;

  @ManyToOne((type) => AssetBoot, (boot) => boot.assets, { nullable: true })
  @Field((type) => AssetBoot, { nullable: true })
  boot: AssetBoot;
}
