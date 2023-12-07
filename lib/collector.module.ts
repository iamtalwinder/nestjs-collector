// collector.module.ts
import { Module, Global } from '@nestjs/common';
import { DiscoveryModule } from '@nestjs/core';
import { CollectorService } from './collector.service';

@Global()
@Module({
  imports: [DiscoveryModule],
  providers: [CollectorService],
  exports: [CollectorService],
})
export class CollectorModule {}
