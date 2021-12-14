import { Injectable } from '@nestjs/common';
import { CloudinaryService } from '@wellness/core';
import { InjectRepository, InjectEntityManager } from '@nestjs/typeorm';
import { Asset, AssetBoot } from '@wellness/core/entity';
import { Repository, EntityManager } from 'typeorm';
import { AssetInput } from '../dto/createAsset.input';
import { CloudinaryResponse, SafeAny, CRUD } from '@wellness/common';
import { EventBus, AssetEvent } from '@wellness/core/event-bus';
import { ResourceUnionType } from '../internal';
import { isValid } from '@wellness/common';
import { EntityNotFoundError } from '@wellness/core/common/error';
import { DeleteAssetInput } from '../dto/deleteAsset.input';
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
      const savedAsset = await this.assetRepository.save(
        createOnlyAsset(metadata)
      );

      //
      this.eventBus.publish(
        new AssetEvent({
          operation: CRUD.CREATE,
          source: savedAsset,
        })
      );

      return savedAsset;
    } else {
      // multiples assets
      return await this.manager.transaction<AssetBoot>(async (manager) => {
        const assetsData = inputAsset.metadatas.map(createOnlyAsset);
        const assetsSaved = assetsData.map((asset) =>
          manager.save(Asset, asset)
        );
        const assets = await Promise.all(assetsSaved);
        return await manager.save(
          AssetBoot,
          new AssetBoot({
            assets: Promise.resolve(assets),
          })
        );
      });
    }
  }

  async deleteResource(input: DeleteAssetInput) {
    const isAsset = !input.isMultiple;
    const deleteAsset = async (idAsset: number, manager: EntityManager) => {
      const assetBd = await manager.findOne(Asset, idAsset);
      if (!assetBd) {
        throw new EntityNotFoundError('Asset', idAsset);
      }
      await this.assetRepository.delete(idAsset);
      const metadata = assetBd.metadata;
      await this.deleteFile(metadata.public_id);
      return assetBd;
    };
    if (isAsset) {
      return deleteAsset(input.id, this.manager);
    } else {
      return this.manager.transaction(async (manager) => {
        const assetBoot = await manager.findOne(AssetBoot, input.id);
        if (!assetBoot) {
          throw new EntityNotFoundError('AssetBoot', input.id);
        }
        const assets = await assetBoot.assets;
        const assetsDeleted = assets.map((asset) =>
          deleteAsset(asset.id, manager)
        );
        await Promise.all(assetsDeleted);
        await manager.delete(AssetBoot, assetBoot.id);
        return assetBoot;
      });
    }
  }
}
