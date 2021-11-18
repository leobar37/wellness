import { Resolver } from '@nestjs/graphql';
import { AssetService } from '../services/asset.service';
import { Mutation, Query, Args } from '@nestjs/graphql';
import { ResponseSignature } from '../dto/signature.dto';
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
}
