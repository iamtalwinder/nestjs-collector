import { Module } from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { AmountRuleValidator, CurrencyRuleValidator, TransactionRuleValidator } from './validator';
import { CollectorModule } from '../../lib';

@Module({
  imports: [CollectorModule],
  controllers: [],
  providers: [
    TransactionService,
    AmountRuleValidator,
    CurrencyRuleValidator,
    TransactionRuleValidator
  ],
})
export class TransactionModule {}
