import { Request, Response } from 'express';

type RequestContextOptions = {
  req: Request;
};

export class RequestContext {
  private readonly _req: Request;

  constructor(options: RequestContextOptions) {
    const { req } = options;
    this._req = req;
  }

  get req() {
    return this._req;
  }
}
