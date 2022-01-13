import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AssetInput } from '../dto/createAsset.input';
import { DeleteAssetInput } from '../dto/deleteAsset.input';
import { AssetEditInput } from '../dto/editAsset.input';
import { ResponseSignature } from '../dto/signature.dto';
import { ResourceUnion } from '../internal';
import { AssetService } from '../services/asset.service';

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

  @Mutation((type) => ResourceUnion)
  async editResource(
    @Args('resource', { type: () => AssetEditInput }) resource: AssetEditInput
  ) {
    return this.assetService.editResource(resource);
  }
}
