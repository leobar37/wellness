import { DetailFicha } from '@wellness/core';
import { InputType, Field, ID, Float } from '@nestjs/graphql';
@InputType()
export class FichaInput implements Partial<DetailFicha> {
  @Field((type) => Float)
  weight: number;
  @Field({ nullable: true })
  objective: string;

  @Field((type) => String, { nullable: true })
  note: string;
  @Field((type) => ID, {
    nullable: true,
    description: 'When this is null , close the ficha',
  })
  fichaId: number;
}
