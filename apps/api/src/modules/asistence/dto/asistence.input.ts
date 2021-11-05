import { Asistence } from '@wellness/core';
import { Field, ID, InputType } from '@nestjs/graphql';

@InputType()
export class InputAsistence implements Partial<Asistence> {
  @Field((type) => ID, { nullable: true })
  note: string;

  @Field((type) => ID)
  clientId: number;
}
