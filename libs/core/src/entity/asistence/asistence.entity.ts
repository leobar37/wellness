import { WellnessEntity } from '../base/base.entity';
import { Entity, Column, ManyToOne } from 'typeorm';
import { ObjectType } from '@nestjs/graphql';
import { DeepPartial } from '@wellness/common';
import { Client } from '../client/client.entity';
/**
 * @description
 */
@Entity()
@ObjectType()
export class Asistence extends WellnessEntity {
  constructor(input: DeepPartial<Asistence>) {
    super(input);
  }

  @Column()
  note: string;

  @Column()
  clientId: number;

  @ManyToOne((type) => Client, (client) => client.asistences)
  client: Promise<Client>;
}
