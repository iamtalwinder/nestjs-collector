import { Module } from '@nestjs/common';
import { TransactionService } from './transaction.service';
import {
  AmountRuleValidator,
  CurrencyRuleValidator,
  TransactionRuleValidator,
} from './validator';
import { TransactionController } from './transaction.controller';
import { CollectorModule } from '../../lib';

@Module({
  imports: [CollectorModule],
  controllers: [TransactionController],
  providers: [
    TransactionService,
    AmountRuleValidator,
    CurrencyRuleValidator,
    TransactionRuleValidator,
  ],
})
export class TransactionModule {}
