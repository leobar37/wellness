import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Activity, Plan } from '@wellness/core';
import { ActivityResolver } from './resolvers/activity.resolver';
import { PlanResolver } from './resolvers/plan.resolver';
import { PlanService } from './services/plan.service';
import { ActivityService } from './services/activity.service';
@Module({
  providers: [ActivityService, PlanService, PlanResolver, ActivityResolver],
  imports: [TypeOrmModule.forFeature([Activity, Plan])],
})
export class PlanModule {}
