import { WellnessEntity } from '../base/base.entity';
import { Entity, Column, OneToOne, JoinColumn } from 'typeorm';
import { Field, ObjectType } from '@nestjs/graphql';
import { DeepPartial } from '@wellness/common';
import { Detail } from '../detail-plan';
import { Suscription } from '../suscription/suscription.entity';
/**
 * @description
 */
@Entity()
@ObjectType()
export class Activity extends WellnessEntity {
  constructor(input: DeepPartial<Activity>) {
    super(input);
  }
  @Column(() => Detail)
  @Field((type) => Detail)
  detail: Detail;
  // suscription
  @OneToOne((type) => Suscription, {
    eager: true,
    cascade: true,
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  suscription: Suscription;
}
