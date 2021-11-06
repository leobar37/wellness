import { Field, Float, InputType, Int } from '@nestjs/graphql';
import { Contract } from '@wellness/core';

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

  @Field((type) => Int)
  suscriptionId: number;
}
