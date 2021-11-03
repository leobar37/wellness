import { Module } from '@nestjs/common';
import { PingResolver } from './ping.resolver';
@Module({
  providers: [PingResolver],
})
export class PingModule {}
