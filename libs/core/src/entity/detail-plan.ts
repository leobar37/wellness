/**
 * these is used for common properties
 * Plan - Activity
 */
import { Column } from 'typeorm';
import { ObjectType, Field, Float } from '@nestjs/graphql';


@ObjectType()
export class Detail {
  @Column()
  @Field()
  name: string;

  @Column()
  @Field()
  description: string;

  @Column('float')
  @Field((type) => Float)
  price: number;
}
