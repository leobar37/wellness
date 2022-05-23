import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Activity, Plan } from '@wellness/core';
import { ActivityResolver } from './resolvers/activity.resolver';
import { PlanResolver } from './resolvers/plan.resolver';
import { PlanService } from './services/plan.service';
import { ActivityService } from './services/activity.service';
import { PlanHelper } from './helpers/plan.helper';
import { SuscriptionsScheduler } from './helpers/Contract-scheduler';
import { ContractViewResolver } from './resolvers/contract-view.resolver';
import { ContractsViewService } from './services/contracts.service';
import { ClientReportService } from './services/client-report.service';
import { ClientReportResolver } from './resolvers/client-report.resolver';
import { ActivityHelper } from './helpers/activity.helper';
@Module({
  providers: [
    ActivityService,
    PlanService,
    PlanResolver,
    ActivityResolver,
    PlanHelper,
    SuscriptionsScheduler,
    ContractViewResolver,
    ContractsViewService,
    ClientReportService,
    ClientReportResolver,
    ActivityHelper,
  ],
  imports: [TypeOrmModule.forFeature([Activity, Plan])],
})
export class SuscriptionModule {}
