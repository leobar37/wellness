import { Resolver } from '@nestjs/graphql';
import { AssetService } from '../services/asset.service';
import { Mutation, Query, Args, createUnionType } from '@nestjs/graphql';
import { ResponseSignature } from '../dto/signature.dto';
import { Asset, AssetBoot } from '@wellness/core';
import { AssetInput } from '../dto/asset.input';
import { ResourceUnion } from '../internal';

@Resolver()
export class AssetResolver {
  constructor(private assetService: AssetService) {}

  @Mutation((type) => ResponseSignature)
  signature(
    @Args('publicId', { type: () => String, nullable: true }) publicId: string
  ) {
    return this.assetService.generateSignature({
      public_id: publicId,
    });
  }

  @Mutation((type) => Boolean)
  deleteResource(
    @Args('publicId', { type: () => String, nullable: true }) publicId: string
  ) {
    const deleteFileResponse = this.assetService.deleteFile(publicId);
    console.log(deleteFileResponse);
    return true;
  }

  @Mutation((type) => Boolean)
  createResource(
    @Args('resource', { type: () => AssetInput }) resource: AssetInput
  ): Promise<typeof ResourceUnion> {
    return this.assetService.createResource(resource);
  }
}
