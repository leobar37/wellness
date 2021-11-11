import { Resolver, Mutation, Args, ID, Query } from '@nestjs/graphql';
import { Activity, Contract } from '@wellness/core/entity';
import { ActivityInput } from '../dto/activity.input';
import { ContractInput } from '../dto/contract.input';
import { ActivityService } from '../services/activity.service';
@Resolver()
export class ActivityResolver {
  constructor(private activityService: ActivityService) {}

  @Mutation((type) => Activity)
  createActivity(
    @Args('input', { type: () => ActivityInput }) input: ActivityInput
  ) {
    return this.activityService.createActivity(input);
  }
  @Mutation((type) => Activity)
  deleteActivity(@Args('id', { type: () => ID }) id: number) {
    return this.activityService.deleteActivity(id);
  }
  @Mutation((type) => Contract)
  joinActivity(
    @Args('contract', { type: () => ContractInput }) contract: ContractInput
  ) {
    return this.activityService.joinActivity(contract);
  }
  // find activities
  @Query((type) => [Activity])
  public activities(@Args('id', { type: () => ID }) id: number) {
    return this.activityService.findActivities(id);
  }
}
