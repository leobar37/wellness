import { InputType, Field } from '@nestjs/graphql';
@InputType()
export class ResendTokenInput {
  @Field((type) => String)
  email: string;
}
