import { Activity } from '@wellness/core';
import { InputType, Field, Int } from '@nestjs/graphql';
import { DetailInput } from './detail.input';
import { ModeSuscription } from '@wellness/common';

@InputType()
export class ActivityInput implements Partial<Activity> {
  @Field()
  visible: boolean;

  @Field((type) => DetailInput)
  detail: DetailInput;

  @Field((type) => Int)
  duration: number;

  @Field((type) => ModeSuscription)
  mode: ModeSuscription;

  @Field((type) => Date, { nullable: true })
  startAt: Date;
}
