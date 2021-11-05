import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Asistence } from '@wellness/core';
import { AsistenceResolver } from './resolvers/asistence.resolver';
import { AsitenceService } from './services/asistence.service';
@Module({
  imports: [TypeOrmModule.forFeature([Asistence])],
  providers: [AsistenceResolver, AsitenceService],
})
export class AsistenceModule {}
