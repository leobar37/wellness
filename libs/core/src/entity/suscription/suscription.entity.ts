import { WellnessEntity } from '../base/base.entity';
import { Entity, Column, OneToMany } from 'typeorm';
import { ObjectType, Field, registerEnumType } from '@nestjs/graphql';
import { DeepPartial, ModeSuscription } from '@wellness/common';
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
  @Field()
  duration: number;

  @Column()
  @Field()
  active: boolean;

  @Column({
    type: 'enum',
    enum: ModeSuscription,
    default: ModeSuscription.DINAMIC,
  })
  mode: ModeSuscription;

  @OneToMany((type) => Contract, (contract) => contract.suscription)
  contracts: Promise<Contract[]>;
}
