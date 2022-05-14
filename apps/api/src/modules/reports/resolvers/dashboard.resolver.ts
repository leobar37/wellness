// make a basic graphql resolver
import { Resolver, Query, Args, Mutation, Context } from '@nestjs/graphql';
import { DashboardService } from '../services/dashboard.service';
import { GrowthInput } from '../dto/growth.dto';
import { GrowthType  } from '../types/growth.type';
import {  AlertResult} from "../types/Alert.type"
import { AlertInput } from "../dto/alert.dto";
@Resolver()
export class DashboardReportResolver {
  constructor(private dashboardService: DashboardService) {}

  @Query(() => [GrowthType])
  growthReport(@Args('input', { type: () => GrowthInput }) input: GrowthInput) {
    return this.dashboardService.growthReport(input);
  }
  @Query(() => [AlertResult])
  alertsReport(@Args('input', { type: () => AlertInput }) input: AlertInput) {
    return this.dashboardService.alertsReport(input);
  }
}
