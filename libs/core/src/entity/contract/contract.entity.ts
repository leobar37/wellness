import { WellnessEntity } from '../base/base.entity';
import { Entity, Column, ManyToOne } from 'typeorm';
import { Float, ObjectType, Field } from '@nestjs/graphql';
import { DeepPartial } from '@wellness/common';
import { Suscription } from '../suscription/suscription.entity';
import { Subscription } from 'rxjs';
import { Client } from '../client/client.entity';
import { HasNote } from '@wellness/common';
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
  note: string;

  @Column('boolean', { default: false })
  @Field((type) => Boolean)
  paid: boolean;

  @Column('float')
  @Field((type) => Float)
  price: number;

  @Column('date', { nullable: true })
  finishedAt: Date | null;

  @Column('boolean', { default: true })
  @Column('boolean', { default: false })
  finished: boolean;

  @Column()
  suscriptionId: number;

  @Column()
  clientId: number;

  @ManyToOne((type) => Suscription, (sub) => sub.contracts)
  suscription: Promise<Subscription>;

  @ManyToOne((type) => Client, (cl) => cl.contracts)
  client: Promise<Client>;
}
