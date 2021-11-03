import { Injectable } from '@nestjs/common';
import { Request } from 'express';
import { GraphQLResolveInfo } from 'graphql';
import { RequestContext } from './request-context';
@Injectable()
export class RequestContextService {
  async fromRequest(req: Request, info: GraphQLResolveInfo) {
    return new RequestContext({
      req,
    });
  }
}
