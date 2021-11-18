import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class ResponseSignature {
  @Field()
  signature: string;
  @Field()
  timestamp: number;
}
