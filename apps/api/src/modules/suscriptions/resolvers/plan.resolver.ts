import { Resolver, Mutation, Args, ID, Query } from '@nestjs/graphql';
import { Plan } from '@wellness/core/entity';
import { PlanInput } from '../dto/plan.input';
import { PlanService } from '../services/plan.service';
import { ContractInput } from '../dto/contract.input';

@Resolver()
export class PlanResolver {
  constructor(private planService: PlanService) {}
  @Mutation((type) => Plan)
  createPlan(@Args('input', { type: () => PlanInput }) plan: PlanInput) {
    return this.planService.createPlan(plan);
  }

  @Mutation((type) => Plan)
  deletePlan(@Args('id', { type: () => ID }) id: number) {
    return this.planService.deletePLan(id);
  }

  @Mutation((type) => Boolean)
  joinPlan(
    @Args('contract', { type: () => ContractInput }) input: ContractInput
  ) {
    return this.planService.joinPlan(input);
  }
  // find activities
  @Query((type) => [Plan])
  public activities(@Args('id', { type: () => ID }) id: number) {
    return this.planService.findPlans(id);
  }
}
