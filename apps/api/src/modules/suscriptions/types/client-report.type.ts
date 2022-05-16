import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class PlanProgress {
  @Field((type) => Int, { defaultValue: 'Progress of the plan' })
  progress: number;

  @Field((type) => String, { defaultValue: 'Label to show according to plan' })
  contractLabel: string;

  @Field((type) => Int, { defaultValue: 'Final price, paid by the client' })
  price: number;

  @Field((type) => Date)
  finishedAt: Date;

  @Field((type) => Date)
  createdAt: Date;

  @Field((type) => Int)
  daysLeft: number;
}

@ObjectType()
export class ClientReport {
  @Field((type) => Int, { defaultValue: 'Client id' })
  clientId: number;
  @Field((type) => PlanProgress, { nullable: true })
  planProgress: PlanProgress;
}
