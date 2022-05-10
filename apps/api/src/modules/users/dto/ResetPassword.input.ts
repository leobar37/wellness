import { InputType, Field, ID as IDScalar } from '@nestjs/graphql';
import { ID } from '@wellness/common';
@InputType()
export class ResetPasswordInput {
  @Field(() => IDScalar, { description: 'Administratror id' })
  id: ID;

  @Field({ description: 'Prev password of the user' })
  prevPassword: string;

  @Field()
  newPassword: string;
}

@InputType()
export class ResetPasswordInputFromAdmin {
  @Field(() => IDScalar, { description: 'User id', name: 'userId' })
  userId: ID;

  @Field({ description: 'Prev password of the user' })
  adminPassword: string;

  @Field()
  newPassword: string;
}
