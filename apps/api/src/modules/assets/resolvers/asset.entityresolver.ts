import { Resolver, ResolveField, Parent } from '@nestjs/graphql';
import { Asset } from '@wellness/core';
import { CloudinaryResponse } from '@wellness/common';
@Resolver((of) => Asset)
export class AssetEntityResolver {
  constructor() {}

  @ResolveField('previewUrl', (returns) => String)
  async previewUrl(@Parent() asset: Asset) {
    return (asset.metadata as CloudinaryResponse).secure_url;
  }
}
