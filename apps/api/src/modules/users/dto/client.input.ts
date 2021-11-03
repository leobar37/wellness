import { InputType, Field } from '@nestjs/graphql';
import { Client } from '@wellness/core/entity';
import { Sex, ModeRegiser } from '@wellness/common';
import { IsEmail } from 'class-validator';

@InputType()
export class ClientInput implements Partial<Client> {
  @Field()
  code: string;

  @Field()
  dni: string;

  @Field()
  price: number;

  @Field()
  name: string;

  @Field()
  lastName: string;

  @Field()
  birthday: Date;

  @Field()
  direction: string;

  @Field()
  @IsEmail()
  email: string;

  @Field()
  note: string;

  @Field((type) => Sex)
  sex: Sex;

  @Field((type) => Sex)
  modeRegister: ModeRegiser;
}
