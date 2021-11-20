import {
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Field, ID, ObjectType } from '@nestjs/graphql';
import { DeepPartial, SafeAny } from '@wellness/common';

@ObjectType({
  isAbstract: true,
})
export class WellnessEntity {
  constructor(input?: DeepPartial<WellnessEntity>) {
    if (input) {
      for (const [key, value] of Object.entries(input)) {
        (this as SafeAny)[key] = value;
      }
    }
  }

  @PrimaryGeneratedColumn()
  @Field((type) => ID)
  id: number;

  @CreateDateColumn()
  @Field((type) => Date)
  createdAt: Date;

  @UpdateDateColumn()
  @Field((type) => Date)
  updateAt: Date;
}
