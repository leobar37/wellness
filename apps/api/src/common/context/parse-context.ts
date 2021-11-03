import { GqlExecutionContext } from '@nestjs/graphql';
import { ArgumentsHost, ExecutionContext } from '@nestjs/common';
import { Request, Response } from 'express';
/**
 * @see https://blog.grandstack.io/graphql-resolveinfo-deep-dive-1b3144075866
 *
 */
import { GraphQLResolveInfo } from 'graphql';
type Context = {
  req: Request;
  res: Response;
};

type RestContext = Context & {
  isGraphql: false;
  info: undefined;
};

type GraphQLContext = Context & {
  isGraphql: true;
  info: GraphQLResolveInfo;
};

export const parseContext = (
  context: ExecutionContext | ArgumentsHost
): RestContext | GraphQLContext => {
  const graphqlContext = GqlExecutionContext.create(
    context as ExecutionContext
  );
  const info = graphqlContext.getInfo();

  let res: Response;
  let req: Request;

  if (info) {
    const ctx = graphqlContext.getContext();
    req = ctx.req;
    res = ctx.res;
  } else {
    req = context.switchToHttp().getRequest();
    res = context.switchToHttp().getResponse();
  }
  return {
    req,
    res,
    info: info,
    isGraphql: !!info,
  };
};
