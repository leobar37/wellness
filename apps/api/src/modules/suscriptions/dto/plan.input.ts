import { Plan } from '@wellness/core';
import { InputType, Field, Int } from '@nestjs/graphql';
import { DetailInput } from './detail.input';
import { ModeSuscription } from '@wellness/common';

@InputType()
export class PlanInput implements Partial<Plan> {
  @Field({ description: 'Determine if this plan is visible for the users' })
  visible: boolean;

  @Field((type) => DetailInput)
  detail: DetailInput;

  @Field((type) => Int)
  duration: number;

  @Field((type) => Boolean, { description: 'Determine if a plan is active' })
  active: boolean;
}
