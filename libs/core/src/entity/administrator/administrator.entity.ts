import { WellnessEntity } from '../base/base.entity';
import { Entity, OneToOne, JoinColumn, Column } from 'typeorm';
import { ObjectType } from '@nestjs/graphql';
import { DeepPartial } from '@wellness/common';
import { User } from '../user/user.entity';
/**
 * @description
 */
@Entity()
@ObjectType()
export class Administrator extends WellnessEntity {
  constructor(input: DeepPartial<Administrator>) {
    super(input);
  }

  @Column()
  name: string;

  @Column()
  lastName: string;

  @Column({
    unique: true,
  })
  email: string;

  @Column()
  description: string;

  @OneToOne((type) => User, { eager: true, cascade: true, onDelete: 'CASCADE' })
  @JoinColumn()
  user: User;
}
