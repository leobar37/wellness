import {
  Resolver,
  ResolveField,
  Parent,
  Query,
  Args,
  Float,
  ID,
  Mutation,
} from '@nestjs/graphql';
import { ContractView } from '../view';
import { ServiceType } from '@wellness/common';
import { ContractsViewService } from '../services/contracts.service';
import { FiContractsView } from '../dto/filters.input';
import { ContractEditInput } from '../dto/contract.input';
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

  @ResolveField('description', () => String, { nullable: true })
  resolveDescription(@Parent() conView: ContractView) {
    return conView.isPlan()
      ? conView.planDescription
      : conView.activityDescription;
  }

  @Query((type) => [ContractView])
  getViewContracts(
    @Args('filters', { type: () => FiContractsView, nullable: true })
    filters: FiContractsView
  ) {
    return this.contractService.getContractView(filters);
  }

  @Mutation((type) => ContractView)
  editContract(
    @Args('input', { type: () => ContractEditInput }) input: ContractEditInput
  ) {
    return this.contractService.editContract(input);
  }

  @Mutation((type) => ContractView)
  async deleteContract(@Args('id', { type: () => ID }) id: number) {
    return this.contractService.deleteContract(id);
  }
}
