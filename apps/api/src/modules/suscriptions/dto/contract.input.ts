import { Field, Float, ID, InputType, Int } from '@nestjs/graphql';
import { Contract } from '@wellness/core';
import { isValid } from '@wellness/common';
@InputType()
export class ContractInput implements Partial<Contract> {
  @Field()
  clientId: number;

  @Field((type) => Boolean)
  paid: boolean;

  @Field((type) => Float)
  price: number;

  @Field((type) => String, { nullable: true })
  note: string;

  @Field((type) => ID, { nullable: true })
  planId: number;

  @Field((type) => ID, { nullable: true })
  activityId?: number;
}

@InputType()
export class ContractEditInput implements Partial<Contract> {
  @Field((type) => ID)
  contractId: number;

  @Field((type) => Boolean)
  paid: boolean;

  @Field((type) => Float)
  price: number;

  @Field((type) => String, { nullable: true })
  note: string;
}
