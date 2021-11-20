import { Resolver } from '@nestjs/graphql';
import { AssetService } from '../services/asset.service';
import { Mutation, Query, Args, createUnionType } from '@nestjs/graphql';
import { ResponseSignature } from '../dto/signature.dto';
import { AssetInput } from '../dto/createAsset.input';
import { DeleteAssetInput } from '../dto/deleteAsset.input';
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

  @Mutation((type) => ResourceUnion)
  deleteResource(
    @Args('input', { type: () => DeleteAssetInput }) input: DeleteAssetInput
  ) {
    return this.assetService.deleteResource(input);
  }

  @Mutation((type) => ResourceUnion)
  createResource(
    @Args('resource', { type: () => AssetInput }) resource: AssetInput
  ): Promise<typeof ResourceUnion> {
    return this.assetService.createResource(resource);
  }
}
