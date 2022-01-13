import { Injectable } from '@nestjs/common';
import { InjectEntityManager, InjectRepository } from '@nestjs/typeorm';
import { CloudinaryResponse, CRUD, SafeAny } from '@wellness/common';
import { CloudinaryService } from '@wellness/core';
import { EntityNotFoundError } from '@wellness/core/common/error';
import { Asset, AssetBoot } from '@wellness/core/entity';
import { AssetEvent, EventBus } from '@wellness/core/event-bus';
import { EntityManager, Repository } from 'typeorm';
import { AssetInput } from '../dto/createAsset.input';
import { DeleteAssetInput } from '../dto/deleteAsset.input';
import { AssetEditInput } from '../dto/editAsset.input';
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

  public async deleteFile(public_id: string) {
    return this.cloudinary.deleteFile(public_id);
  }

  async editResource(input: AssetEditInput) {
    const asset = await this.assetRepository.findOne(input.id);
    if (!asset) {
      throw new EntityNotFoundError('Asset', asset.id);
    }
    await this.assetRepository.update(input.id, {
      metadata: input.metadata as SafeAny,
      name: input.metadata.original_filename,
      size: input.metadata.height,
    });
    await this.deleteFile((asset.metadata as CloudinaryResponse).public_id);

    return this.assetRepository.findOne(input.id);
  }

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
