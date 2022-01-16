import { WellnessEntity } from '../base/base.entity';
import { Entity, Column, ManyToOne } from 'typeorm';
import { Float, ObjectType, Field } from '@nestjs/graphql';
import { DeepPartial } from '@wellness/common';
import { Suscription } from '../suscription/suscription.entity';
import { Subscription } from 'rxjs';
import { Client } from '../client/client.entity';
import { HasNote } from '@wellness/common';
import { differenceInDays } from 'date-fns';
/**
 * @description
 */
@Entity()
@ObjectType()
export class Contract extends WellnessEntity implements HasNote {
  constructor(input: DeepPartial<Contract>) {
    super(input);
  }

  @Column('text', { nullable: true })
  @Field({ nullable: true })
  note: string;

  @Column('boolean', { default: false })
  @Field((type) => Boolean)
  paid: boolean;

  @Column('float')
  @Field((type) => Float)
  price: number;

  @Column('date')
  @Field((type) => Date)
  finishedAt: Date;

  @Column('boolean', { default: false })
  finished: boolean;

  @Column()
  suscriptionId: number;

  @Column()
  clientId: number;

  @ManyToOne((type) => Suscription, (sub) => sub.contracts)
  @Field((type) => Suscription)
  suscription: Promise<Subscription>;

  @ManyToOne((type) => Client, (cl) => cl.contracts)
  client: Promise<Client>;

  getDaysToFinish() {
    return differenceInDays(new Date(), this.finishedAt);
  }
}
