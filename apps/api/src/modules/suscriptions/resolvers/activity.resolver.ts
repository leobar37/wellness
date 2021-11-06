import { Resolver, Mutation, Args, ID } from '@nestjs/graphql';
import { Activity } from '@wellness/core/entity';
import { ActivityInput } from '../dto/activity.input';
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
}
