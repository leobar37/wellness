import {
  Args,
  ID,
  Mutation,
  Query,
  Resolver,
  ResolveField,
} from '@nestjs/graphql';
import { Administrator } from '@wellness/core';
import { RegisterAdminInput } from '../dto/admin.input';
import {
  ResetPasswordInputFromAdmin,
  ResetPasswordInput,
} from '../dto/ResetPassword.input';
import { AdministratorService } from '../services';
import { Auth } from '../../../common';
import { Role } from '@wellness/common';
import { CurrentUser } from '../../../common/decorators';
@Resolver(() => Administrator)
export class AdminstratorResolver {
  constructor(private administratorService: AdministratorService) {}
  // register user

  @Mutation((type) => Administrator)
  @Auth(Role.ADMIN)
  async registerAdmin(
    @Args('input', { type: () => RegisterAdminInput }) input: RegisterAdminInput
  ) {
    return this.administratorService.registerAdmin(input);
  }

  @Mutation((type) => Administrator)
  @Auth(Role.ADMIN)
  async deleteAdministrator(@Args('id', { type: () => ID }) id: string) {
    return this.administratorService.deleteAdministrator(id);
  }
  @Mutation((type) => Administrator)
  @Auth(Role.ADMIN)
  async editAdministrator(
    @Args('id', { type: () => ID }) id: string,
    @Args('input', { type: () => RegisterAdminInput }) input: RegisterAdminInput
  ) {
    return this.administratorService.updateAdmin(id, input);
  }

  @Query((type) => [Administrator])
  @Auth(Role.ADMIN)
  async getAdministrators() {
    return this.administratorService.getAdministrators();
  }

  @Mutation((type) => Administrator)
  @Auth()
  async resetPassword(
    @Args('input', { type: () => ResetPasswordInput }) input: ResetPasswordInput
  ) {
    return this.administratorService.resetPassword(input);
  }
  @Auth(Role.ADMIN)
  @Mutation((type) => Administrator)
  async resetPasswordFromAdmin(
    @CurrentUser() user: Administrator,
    @Args('input', { type: () => ResetPasswordInputFromAdmin })
    input: ResetPasswordInputFromAdmin
  ) {
    return this.administratorService.resetPasswordFromAdmin(user, input);
  }

  @Query((type) => Administrator)
  @Auth()
  async getAdministrator(@Args('id', { type: () => ID }) id: string) {
    return this.administratorService.getAdministrator(id);
  }

  @ResolveField((type) => String)
  async password() {
    return null;
  }
}
