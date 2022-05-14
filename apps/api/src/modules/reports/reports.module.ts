import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Contract } from '@wellness/core';
import { DashboardReportResolver } from './resolvers/dashboard.resolver';
import { DashboardService } from './services/dashboard.service';
import { GrowthHelper } from './helpers/growth.helper';
const RESOLVERS = [DashboardReportResolver];
const SERVICES = [DashboardService, GrowthHelper];

@Module({
  imports: [TypeOrmModule.forFeature([Contract])],
  providers: [...RESOLVERS, ...SERVICES],
})
export class ReportsModule {}
