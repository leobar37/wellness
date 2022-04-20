import { InputType, Field, ID as IDScalar } from '@nestjs/graphql';
import { ID } from '@wellness/common';
@InputType()
export class ResetPasswordInput {
  @Field(() => IDScalar, { description: 'Administratror id' })
  id: ID;

  @Field()
  newPassword: string;
}
