import { InputType, Field, Float } from '@nestjs/graphql';

@InputType()
export class DetailInput {
  @Field()
  name: string;

  @Field()
  description: string;

  @Field((type) => Float)
  price: number;
}
