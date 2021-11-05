import { Module, Global } from '@nestjs/common';
import { EventBus } from './event-bus.service';

@Global()
@Module({
  providers: [EventBus],
  exports: [EventBus],
})
export class EventBusModule {}
