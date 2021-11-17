import { Module } from '@nestjs/common';
import { AssetResolver } from './resolvers/asset.resolver';
import { AssetService } from './services/asset.service';
import { Asset, AssetBoot } from '@wellness/core';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Asset, AssetBoot])],
  providers: [AssetResolver, AssetService],
})
export class AssetsModule {}
