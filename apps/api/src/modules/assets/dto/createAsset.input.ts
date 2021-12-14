import { InputType, Field } from '@nestjs/graphql';
import { GraphQLJSONObject } from 'graphql-scalars';
import { CloudinaryResponse } from '@wellness/common';

@InputType()
export class AssetInput {
  // if is multiple -> Api create a boot
  @Field((type) => Boolean)
  isMultiple: boolean;

  @Field((type) => GraphQLJSONObject, { nullable: true })
  metadata: CloudinaryResponse;

  @Field((type) => [GraphQLJSONObject], { nullable: true })
  metadatas: CloudinaryResponse[];

  @Field((type) => String, { nullable: true })
  bootId: number;
}
