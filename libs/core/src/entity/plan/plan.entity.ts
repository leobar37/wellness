import { WellnessEntity } from '../base/base.entity';
import { Column, Entity } from 'typeorm';
import { ObjectType, Field } from '@nestjs/graphql';
import { DeepPartial } from '@wellness/common';
import { Detail } from '../detail-plan';
import { Suscription } from '../suscription/suscription.entity';
import { OneToOne, JoinColumn } from 'typeorm';
/**
 * @description
 */
@Entity()
@ObjectType()
export class Plan extends WellnessEntity {
  constructor(input: DeepPartial<Plan>) {
    super(input);
  }
  @Column(() => Detail)
  @Field((type) => Detail)
  detail: Detail;

  @Column('boolean')
  @Field((type) => Boolean)
  visible: boolean;

  // subscription
  @OneToOne((type) => Suscription, {
    eager: true,
    cascade: true,
    onDelete: 'CASCADE',
  })
  @Field((type) => Suscription)
  @JoinColumn()
  suscription: Promise<Suscription>;
}
