import { Module } from '@nestjs/common';
import { AssetResolver } from './resolvers/asset.resolver';
import { AssetService } from './services/asset.service';
import { Asset, AssetBoot } from '@wellness/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CloudinaryModule } from '@wellness/core';
import { ConfigModule } from '@nestjs/config';
@Module({
  imports: [
    ConfigModule,
    TypeOrmModule.forFeature([Asset, AssetBoot]),
    CloudinaryModule,
  ],
  providers: [AssetResolver, AssetService],
})
export class AssetsModule {}
