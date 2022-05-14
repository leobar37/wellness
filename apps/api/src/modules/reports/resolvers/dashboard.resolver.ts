// make a basic graphql resolver
import { Resolver, Query, Args, Mutation, Context } from '@nestjs/graphql';
import { DashboardService } from '../services/dashboard.service';
import { GrowthInput } from '../dto/growth.dto';
import { GrowthType } from '../types/growth.type';
@Resolver()
export class DashboardReportResolver {
  constructor(private dashboardService: DashboardService) {}

  @Query(() => [GrowthType])
  growthReport(@Args('input', { type: () => GrowthInput }) input: GrowthInput) {
    return this.dashboardService.growthReport(input);
  }
}
