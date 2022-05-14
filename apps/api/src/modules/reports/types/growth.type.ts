import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class GrowthType {
  @Field()
  label: string;

  @Field()
  value: number;
}
