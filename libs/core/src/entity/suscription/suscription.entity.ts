import { WellnessEntity } from '../base/base.entity';
import { Entity, Column } from 'typeorm';
import { ObjectType, Field, registerEnumType } from '@nestjs/graphql';
import { DeepPartial, ModeRegiser, ModeSuscription } from '@wellness/common';

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
}
