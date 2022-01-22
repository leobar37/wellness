import { WellnessEntity } from '../base/base.entity';
import { Column, Entity } from 'typeorm';
import { ObjectType } from '@nestjs/graphql';
import { DeepPartial } from '@wellness/common';
import { Role } from '@wellness/common';
/**
 * @description
 */
@Entity()
@ObjectType()
export class User extends WellnessEntity {
  constructor(input: DeepPartial<User>) {
    super(input);
  }

  @Column()
  indentifier: string;

  @Column()
  password: string;

  @Column()
  verified: boolean;

  @Column({
    type: 'varchar',
    array: true,
  })
  roles: Role;
}
