import { Resolver } from '@nestjs/graphql';
import { AssetService } from '../services/asset.service';
import { Mutation, Query, Args } from '@nestjs/graphql';
import { ResponseSignature } from '../dto/signature.dto';
@Resolver()
export class AssetResolver {
  constructor(private assetService: AssetService) {}

  @Mutation((type) => ResponseSignature)
  signature(@Args('publicId', { type: () => String }) publicId: string) {
    return this.assetService.generateSignature({
      public_id: publicId,
    });
  }
}
