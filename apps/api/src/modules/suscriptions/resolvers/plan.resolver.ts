import { Resolver, Mutation, Args, ID } from '@nestjs/graphql';
import { Plan } from '@wellness/core/entity';
import { PlanInput } from '../dto/plan.input';
import { PlanService } from '../services/plan.service';
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
}
