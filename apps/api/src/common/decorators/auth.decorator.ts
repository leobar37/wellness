import { applyDecorators, UseGuards } from '@nestjs/common';
import { Role } from './rol.decorator';
import { Role as RoleEnum } from '@wellness/common';
import { GqlAuthGuard } from '../guards';
import { RolGuard } from '../guards/roles.guard';

export const Auth = (...roles: RoleEnum[]) =>
  applyDecorators(UseGuards(GqlAuthGuard), Role(...roles), UseGuards(RolGuard));
