import { Args, ID, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Administrator } from '@wellness/core';
import { RegisterAdminInput } from '../dto/admin.input';
import { AdministratorService } from '../services';
@Resolver()
export class AdminstratorResolver {
  constructor(private administratorService: AdministratorService) {}
  // register user

  @Mutation((type) => Administrator)
  async registerAdmin(
    @Args('input', { type: () => RegisterAdminInput }) input: RegisterAdminInput
  ) {
    return this.administratorService.registerAdmin(input);
  }

  @Mutation((type) => Administrator)
  async editAdministrator(
    @Args('id', { type: () => ID }) id: string,
    @Args('input', { type: () => RegisterAdminInput }) input: RegisterAdminInput
  ) {
    return this.administratorService.updateAdmin(id, input);
  }

  @Query((type) => [Administrator])
  // @Auth(Role.ADMIN)
  async getAdministrators() {
    return this.administratorService.getAdministrators();
  }
}
