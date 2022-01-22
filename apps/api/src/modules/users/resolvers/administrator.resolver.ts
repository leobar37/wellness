import { Resolver, Mutation, Query, Args } from '@nestjs/graphql';
import { GenerateTokenInput, RegisterAdminInput } from '../dto/admin.input';
import { Administrator } from '@wellness/core';
import { AdministratorService } from '../services';
@Resolver()
export class AdminstratorResolver {
  constructor(private administratorService: AdministratorService) {}
  // register user

  @Mutation((type) => Administrator)
  async generateTokenForAdmin(
    @Args('input', { type: () => GenerateTokenInput }) input: GenerateTokenInput
  ) {
    return this.administratorService.generateTokenForAdmin(input);
  }

  @Mutation((type) => Administrator)
  async registerAdmin(
    @Args('input', { type: () => RegisterAdminInput }) input: RegisterAdminInput
  ) {
    return this.administratorService.registerAdmin(input);
  }

  @Query((type) => [Administrator])
  async getAdministrators() {
    return this.administratorService.getAdministrators();
  }

  @Mutation((type) => Administrator)
  async regeneratedNewToken(
    @Args('input', { type: () => GenerateTokenInput }) input: GenerateTokenInput
  ) {
    return this.administratorService.resendToken(input);
  }
}
