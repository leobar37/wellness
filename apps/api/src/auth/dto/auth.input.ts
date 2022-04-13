import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class LoginAdminInput {
  @Field()
  email: string;
  @Field()
  password: string;
}
