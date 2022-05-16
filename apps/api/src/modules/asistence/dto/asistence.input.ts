import { Asistence } from '@wellness/core';
import { Field, ID, InputType } from '@nestjs/graphql';

@InputType()
export class InputAsistence implements Partial<Asistence> {
  @Field(() => Date)
  createdAt?: Date;
  @Field((type) => String, { nullable: true })
  note: string;

  @Field((type) => ID)
  clientId: number;
}
