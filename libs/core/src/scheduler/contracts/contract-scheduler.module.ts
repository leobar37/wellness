import { Module, Global } from '@nestjs/common';
import { SuscriptionsScheduler } from './ContractScheduler';

@Global()
@Module({
  providers: [SuscriptionsScheduler],
})
export class ContractsSchedulerModule {}
