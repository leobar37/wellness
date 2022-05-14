import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Contract } from '@wellness/core';
import { DashboardReportResolver } from './resolvers/dashboard.resolver';
import { DashboardService } from './services/dashboard.service';
import { GrowthHelper } from './helpers/growth.helper';
import { ReportGrowthBuilder } from './helpers/GrowthBuilder';
import { AlertsHelper } from "./helpers/alerts.helper";

const RESOLVERS = [DashboardReportResolver];
const SERVICES = [DashboardService, GrowthHelper , ReportGrowthBuilder, AlertsHelper];

@Module({
  imports: [TypeOrmModule.forFeature([Contract])],
  providers: [...RESOLVERS, ...SERVICES],
})
export class ReportsModule {}
