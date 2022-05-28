import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Asistence, Plan } from '@wellness/core';
import { AsistenceResolver } from './resolvers/asistence.resolver';
import { AsitenceService } from './services/asistence.service';
import { PlanHelper } from './helper/plan.helper';
@Module({
  imports: [TypeOrmModule.forFeature([Asistence, Plan])],
  providers: [AsistenceResolver, AsitenceService, PlanHelper],
})
export class AsistenceModule {}
