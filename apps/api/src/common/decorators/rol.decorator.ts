import { SetMetadata } from '@nestjs/common';
import { Role as RoleEnum } from '@wellness/common';

export const ROL_KEY = 'roles';

export const Role = (...roles: RoleEnum[]) => SetMetadata(ROL_KEY, roles);
