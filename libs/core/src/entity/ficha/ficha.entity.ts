import { WellnessEntity } from '../base/base.entity';
import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { ObjectType, Field } from '@nestjs/graphql';
import { DeepPartial } from '@wellness/common';
import { DetailFicha } from './Detail-ficha.entity';
import { Client } from '../client/client.entity';

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
  closed: boolean;

  @OneToMany((type) => DetailFicha, (detail) => detail.ficha, {
    cascade: ['update', 'insert'],
  })
  @Field(() => [DetailFicha])
  details: DetailFicha[];

  @Column({ nullable: true })
  clientId: number;

  @ManyToOne((type) => Client, (client) => client.fichas)
  @Field(() => Client)
  client: Promise<Client>;
}
