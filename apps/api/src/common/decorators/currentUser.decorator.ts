import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { SafeAny } from '@wellness/common';
import { parseContext } from '../context';
import { Administrator } from '@wellness/core';
import { get } from 'lodash';

export const CurrentUser = createParamDecorator(
  (_data: SafeAny, ctx: ExecutionContext) => {
    const { req } = parseContext(ctx);
    return get(req, 'user') as Administrator;
  }
);
