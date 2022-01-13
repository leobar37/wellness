import { InputType, Field, OmitType, Int, ID } from '@nestjs/graphql';
import { CloudinaryResponse } from '@wellness/common';
import { GraphQLJSONObject } from 'graphql-scalars';

@InputType()
export class AssetEditInput {
  @Field((type) => ID)
  id: number;

  @Field((type) => GraphQLJSONObject, { nullable: true })
  metadata: CloudinaryResponse;
}
