import { Resolver, Mutation, Args, Query, ID } from '@nestjs/graphql';
import { Asistence } from '@wellness/core/entity';
import { InputAsistence } from '../dto/asistence.input';
import { AsitenceService } from '../services/asistence.service';
@Resolver()
export class AsistenceResolver {
  constructor(private asistenceService: AsitenceService) {}
  @Mutation((type) => Asistence)
  public createAsistence(@Args('asistence') asistence: InputAsistence) {
    return this.asistenceService.createAsistence(asistence);
  }

  @Mutation((type) => Asistence)
  public deleteAsistence(@Args('id', { type: () => ID }) id: number) {
    return this.asistenceService.deleteAsistence(id);
  }

  @Mutation((type) => Asistence)
  public updateAsistence(
    @Args('id', { type: () => ID }) id: number,
    @Args('input', { type: () => InputAsistence }) input: InputAsistence
  ) {
    return this.asistenceService.updateAsistence(id, input);
  }

  @Query((type) => [Asistence])
  public finAsistences(@Args('cliendId', { type: () => ID }) id: number) {
    return this.asistenceService.findAsistences(id);
  }
}
