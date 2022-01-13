import {
  Resolver,
  ResolveField,
  Parent,
  Query,
  Args,
  Float,
  ID,
} from '@nestjs/graphql';
import { ContractView } from '../view';
import { ServiceType } from '@wellness/common';
import { ContractsViewService } from '../services/contracts.service';
import { FiContractsView } from '../dto/filters.input';

@Resolver((of) => ContractView)
export class ContractViewResolver {
  constructor(private contractService: ContractsViewService) {}

  @ResolveField('price', () => Float, { nullable: true })
  resolverPrice(@Parent() conView: ContractView) {
    return conView.isPlan() ? conView.planPrice : conView.activityPrice;
  }

  @ResolveField('name', () => String, { nullable: true })
  resolverName(@Parent() conView: ContractView) {
    return conView.isPlan() ? conView.planName : conView.activityName;
  }

  @ResolveField('type', () => ServiceType, { nullable: true })
  resolverType(@Parent() conView: ContractView) {
    return conView.isPlan() ? ServiceType.plan : ServiceType.activity;
  }
  @ResolveField('serviceId', () => ID, { nullable: true })
  resolverServiceId(@Parent() conView: ContractView) {
    return conView.isPlan() ? conView.planId : conView.activityId;
  }

  @Query((type) => [ContractView])
  getViewContracts(
    @Args('filters', { type: () => FiContractsView, nullable: true })
    filters: FiContractsView
  ) {
    return this.contractService.getContractView(filters);
  }
}
