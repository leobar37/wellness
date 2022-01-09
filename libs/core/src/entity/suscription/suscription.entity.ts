import { WellnessEntity } from '../base/base.entity';
import { Entity, Column, OneToMany } from 'typeorm';
import { ObjectType, Field, registerEnumType, Int } from '@nestjs/graphql';
import { DeepPartial, ModeSuscription } from '@wellness/common';
import { differenceInDays } from 'date-fns';

import { Contract } from '../contract/contract.entity';
registerEnumType(ModeSuscription, {
  name: 'ModeSuscription',
  description: 'This enum determine the mode of a suscription',
  valuesMap: {
    DINAMIC: {
      description: '',
    },
    FIXED: {
      description: '',
    },
  },
});
/**
 * @description
 */
@Entity()
@ObjectType()
export class Suscription extends WellnessEntity {
  constructor(input: DeepPartial<Suscription>) {
    super(input);
  }

  @Column()
  @Field((type) => Int)
  duration: number;

  @Column()
  @Field((type) => Boolean)
  active: boolean;

  @Column({
    type: 'enum',
    enum: ModeSuscription,
    default: ModeSuscription.DINAMIC,
  })
  @Field((type) => ModeSuscription)
  mode: ModeSuscription;

  @Column('date', { nullable: true })
  @Field((type) => Date, { nullable: true })
  finishedAt: Date | null;

  @Column('date', { nullable: true })
  @Field((type) => Date, { nullable: true })
  startAt: Date | null;

  @OneToMany((type) => Contract, (contract) => contract.suscription)
  @Field((type) => [Contract], { nullable: 'items' })
  contracts: Promise<Contract[]>;

  /**
   *
   * @returns -1 when a suscription si DINAMIC
   */
  getDaysToFinish() {
    if (this.finishedAt == null) {
      return -1;
    }
    return differenceInDays(new Date(), this.finishedAt);
  }
}
