import { Module } from '@nestjs/common';
import { AssetResolver } from './resolvers/asset.resolver';
import { AssetService } from './services/asset.service';
import { Asset, AssetBoot } from '@wellness/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CloudinaryModule } from '@wellness/core';
import { ConfigModule } from '@nestjs/config';
import { EventBusModule } from '@wellness/core/event-bus';
import { AssetEntityResolver } from './resolvers/asset.entityresolver';
@Module({
  imports: [
    ConfigModule,
    TypeOrmModule.forFeature([Asset, AssetBoot]),
    CloudinaryModule,
    EventBusModule,
  ],
  providers: [AssetResolver, AssetService, AssetEntityResolver],
})
export class AssetsModule {}
