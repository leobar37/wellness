import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Role, SafeAny } from '@wellness/common';
import { Administrator } from '@wellness/core';
import { Observable } from 'rxjs';
import { parseContext } from '../../common';
import { ROL_KEY } from '../decorators';

@Injectable()
export class RolGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}
  canActivate(
    context: ExecutionContext
  ): boolean | Promise<boolean> | Observable<boolean> {
    const { req } = parseContext(context);
    const roles = this.reflector.getAllAndOverride<Role[]>(ROL_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (!roles) {
      return true;
    }
    const user = (req as SafeAny).user as Administrator;
    if (!user) {
      return null;
    }
    const hasRole = roles.some((rol) => rol == user.rol);

    if (!hasRole) {
      throw new UnauthorizedException(
        {},
        'No tienes permisos para acceder a ese recurso'
      );
    }
    return hasRole;
  }
}
