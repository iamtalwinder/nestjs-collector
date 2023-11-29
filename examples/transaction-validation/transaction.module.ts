import { Module } from '@nestjs/common';
import { CollectorModule } from '@lib/index';
import { TransactionService } from './transaction.service';
import { AmountRuleValidator, CurrencyRuleValidator, TransactionRuleValidator } from './validator';

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
