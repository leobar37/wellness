import { WellnessEntity } from '../base/base.entity';
import { Column, Entity, OneToMany } from 'typeorm';
import { ObjectType } from '@nestjs/graphql';
import { DeepPartial } from '@wellness/common';
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

  @Column('bool', { default: false })
  closed: boolean;

  @OneToMany((type) => DetailFicha, (detail) => detail.ficha, {
    cascade: ['update', 'insert'],
  })
  details: DetailFicha[];
}
