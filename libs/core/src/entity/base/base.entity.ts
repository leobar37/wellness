import {
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Field, ID } from '@nestjs/graphql';
import { DeepPartial, SafeAny } from '@wellness/common';
export class WellnessEntity {
  constructor(input?: DeepPartial<WellnessEntity>) {
    if (input) {
      for (const [key, value] of Object.entries(input)) {
        (this as SafeAny)[key] = value;
      }
    }
  }

  @Field((type) => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field((type) => Date)
  @CreateDateColumn()
  createdAt: Date;

  @Field((type) => Date)
  @UpdateDateColumn()
  updateAt: Date;
}
