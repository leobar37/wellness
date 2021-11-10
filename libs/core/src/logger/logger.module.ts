import { LoggerModule } from 'nestjs-pino';
import { Module, Global } from '@nestjs/common';
import { WelnessLogger } from './wellnessLogger.service';
@Global()
@Module({
  imports: [LoggerModule.forRoot({})],
  providers: [WelnessLogger],
  exports: [WelnessLogger],
})
export class LoggerWellnessModule {}
