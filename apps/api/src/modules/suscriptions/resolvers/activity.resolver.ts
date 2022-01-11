import { Resolver, Mutation, Args, ID, Query } from '@nestjs/graphql';
import { Activity, Contract } from '@wellness/core/entity';
import { filter } from 'rxjs';
import { ActivityInput } from '../dto/activity.input';
import { ContractInput } from '../dto/contract.input';
import { FiltersActivity } from '../dto/filters.input';
import { ActivityService } from '../services/activity.service';

@Resolver()
export class ActivityResolver {
  constructor(private activityService: ActivityService) {}

  @Mutation((type) => Activity)
  async createActivity(
    @Args('input', { type: () => ActivityInput }) input: ActivityInput
  ) {
    return this.activityService.createActivity(input);
  }
  @Mutation((type) => Activity)
  async deleteActivity(@Args('id', { type: () => ID }) id: number) {
    return await this.activityService.deleteActivity(id);
  }
  @Mutation((type) => Contract)
  joinActivity(
    @Args('contract', { type: () => ContractInput }) contract: ContractInput
  ) {
    return this.activityService.joinActivity(contract);
  }

  @Mutation((type) => Activity)
  updateActivity(
    @Args('id', { type: () => ID }) id: number,
    @Args('input', { type: () => ActivityInput }) input: ActivityInput
  ) {
    return this.activityService.updateActivity(id, input);
  }
  // find activities
  @Query((type) => [Activity])
  public getActivities(
    @Args('filters', { type: () => FiltersActivity, nullable: true })
    filters: FiltersActivity
  ) {
    return this.activityService.findActivities(filters);
  }

  @Query((type) => Activity)
  public getActivity(@Args('id', { type: () => ID }) id: number) {
    return this.activityService.findActivity(id);
  }
}
