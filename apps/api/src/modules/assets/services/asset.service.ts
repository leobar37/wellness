import { Injectable } from '@nestjs/common';
import { CloudinaryService } from '@wellness/core';
import { InjectRepository, InjectEntityManager } from '@nestjs/typeorm';
import { Asset, AssetBoot } from '@wellness/core/entity';
import { Repository, EntityManager } from 'typeorm';
import { AssetInput } from '../dto/asset.input';
import { CloudinaryResponse, SafeAny } from '@wellness/common';
import { AssetEvent, EventBus } from '@wellness/core/event-bus';

@Injectable()
export class AssetService {
  constructor(
    private cloudinary: CloudinaryService,
    @InjectRepository(Asset) private assetRepository: Repository<Asset>,
    @InjectEntityManager() private manager: EntityManager,
    private eventBus: EventBus
  ) {}

  generateSignature(options: { public_id?: string }) {
    return this.cloudinary.generateSignature(options);
  }

  public deleteFile(public_id: string) {
    return this.cloudinary.deleteFile(public_id);
  }
  /**
   *
   * TODO:
   * - Emit asset envent when create a asset or AssetBoot
   */

  async createResource(inputAsset: AssetInput): Promise<Asset | AssetBoot> {
    // is multiple
    const isMultiple = inputAsset.isMultiple;
    const createOnlyAsset = (metadata: CloudinaryResponse) => {
      const asset = new Asset({
        metadata: metadata as SafeAny,
        size: metadata.height,
        name: metadata.original_filename,
        previewUrl: metadata.secure_url,
      });
      return asset;
    };
    if (!isMultiple) {
      // create a only  assset
      const metadata = inputAsset.metadata;
      return this.assetRepository.save(createOnlyAsset(metadata));
    } else {
      // multiples assets
      return await this.manager.transaction<AssetBoot>(async (manager) => {
        const assets = inputAsset.metadatas.map(createOnlyAsset);

        const assetsSaved = assets.map((asset) => manager.save(Asset, asset));

        await Promise.all(assetsSaved);

        return await manager.save(
          AssetBoot,
          new AssetBoot({
            assets: assets,
          })
        );
      });
    }
  }
}
