import { InputType, Field } from '@nestjs/graphql';
import { Role } from '@wellness/common';

@InputType()
export class GenerateTokenInput {
  @Field()
  email: string;

  @Field((type) => Role)
  role: Role;
}

@InputType()
export class RegisterAdminInput {
  @Field()
  name: string;

  @Field()
  lastName: string;

  @Field()
  temporalToken: string;
}
