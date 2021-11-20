import { InputType, Field, Int } from '@nestjs/graphql';
import { Client } from '@wellness/core/entity';
import { Sex, ModeRegiser } from '@wellness/common';
import { IsEmail } from 'class-validator';

@InputType()
export class ClientInput implements Partial<Client> {
  @Field({ nullable: true })
  code: string;

  @Field()
  dni: string;

  @Field()
  name: string;

  @Field()
  lastName: string;

  @Field({ nullable: true })
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

  @Field((type) => ModeRegiser)
  modeRegister: ModeRegiser;

  @Field((type) => Int, { nullable: true })
  photoId: number;
}
