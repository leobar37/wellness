import { LoggerModule } from 'nestjs-pino';
import { Ip, Module } from '@nestjs/common';
import { WelnessLogger } from './wellnessLogger.service';
@Module({
  imports: [LoggerModule.forRoot({})],
  providers: [WelnessLogger],
})
export class LoggerWellnessModule {}
