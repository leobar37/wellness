import { Field, ObjectType } from '@nestjs/graphql';
import { DeepPartial } from '@wellness/common';
import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { WellnessEntity } from '../base/base.entity';
import { Client } from '../client/client.entity';
import { DetailFicha } from './Detail-ficha.entity';

/**
 * @description
 */

@Entity()
@ObjectType()
export class Ficha extends WellnessEntity {
  constructor(input: DeepPartial<Ficha>) {
    super(input);
  }

  @Column('bool', { default: false, nullable: true })
  @Field((type) => Boolean, { defaultValue: false })
  closed: boolean;

  @Field((type) => Date, { nullable: true })
  @Column('timestamp', { nullable: true })
  closedAt: Date | null;

  @OneToMany((type) => DetailFicha, (detail) => detail.ficha, {
    cascade: ['update', 'insert'],
  })
  @Field(() => [DetailFicha])
  details: Promise<DetailFicha[]>;

  @Column({ nullable: true })
  clientId: number;

  @ManyToOne((type) => Client, (client) => client.fichas)
  @Field(() => Client)
  client: Promise<Client>;
}
