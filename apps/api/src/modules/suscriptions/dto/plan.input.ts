import { Plan } from '@wellness/core';
import { InputType, Field, Int } from '@nestjs/graphql';
import { DetailInput } from './detail.input';
import { ModeSuscription } from '@wellness/common';

@InputType()
export class PlanInput implements Partial<Plan> {
  @Field()
  visible: boolean;

  @Field((type) => DetailInput)
  detail: DetailInput;

  @Field((type) => Int)
  duration: number;
}
