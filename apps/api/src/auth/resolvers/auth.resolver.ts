import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { LoginAdminInput } from '../dto';
import { AccessTokenResponse } from '../model';
import { AuthAdminService } from '../services/auth-admin.service';

@Resolver()
export class AuthResolver {
  constructor(private authAdminService: AuthAdminService) {}

  @Mutation((type) => AccessTokenResponse)
  login(
    @Args('input', { type: () => LoginAdminInput }) input: LoginAdminInput
  ): Promise<AccessTokenResponse> {
    return this.authAdminService.login(input);
  }
}
