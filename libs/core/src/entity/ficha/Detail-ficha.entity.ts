import { Entity, Column, OneToOne, JoinColumn, ManyToOne } from 'typeorm';
import { WellnessEntity } from '../base/base.entity';
import { DeepPartial } from '@wellness/common';
import { AssetBoot } from '../asset/relation-asset.entity';
import { Ficha } from './ficha.entity';
import { ObjectType, Field } from '@nestjs/graphql';
@Entity()
@ObjectType()
export class DetailFicha extends WellnessEntity {
  constructor(input: DeepPartial<DetailFicha>) {
    super(input);
  }

  @Column('float', { nullable: true })
  @Field()
  weight: number;

  @Column('text', { nullable: true })
  @Field({ nullable: true })
  objective: string;

  @Column('text', { nullable: true })
  @Field({ nullable: true })
  note: string;

  @Column('boolean', { default: true })
  @Field((type) => Boolean)
  open: boolean;

  @Column({ nullable: true })
  assetId: number;

  @OneToOne((type) => AssetBoot, { cascade: true })
  @JoinColumn()
  @Field((type) => AssetBoot, { nullable: true })
  asset: Promise<AssetBoot>;

  @Column()
  fichaId: number;

  @ManyToOne((type) => Ficha, (ficha) => ficha.details)
  ficha: Ficha;
}
