import { DetailFicha } from '@wellness/core';
import { InputType, Field, ID, Float, Int } from '@nestjs/graphql';
@InputType()
export class FichaInput implements Partial<DetailFicha> {
  @Field((type) => Float)
  weight: number;
  @Field({ nullable: true })
  objective: string;

  @Field({ description: 'This images of the ficha' })
  assetId?: number;

  @Field((type) => String, { nullable: true })
  note: string;
  @Field((type) => ID, {
    nullable: true,
    description: 'When this is null , close the ficha',
  })
  fichaId: number;

  @Field((type) => Int, { nullable: true })
  clientId: number;

  @Field((type) => Boolean, { nullable: true })
  open: boolean;
}
