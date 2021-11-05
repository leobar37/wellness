import { PinoLogger, PARAMS_PROVIDER_TOKEN, Params } from 'nestjs-pino';
import { Injectable, Inject } from '@nestjs/common';

@Injectable()
export class WelnessLogger extends PinoLogger {
  constructor(@Inject(PARAMS_PROVIDER_TOKEN) params: Params) {
    super(params);
  }
}
