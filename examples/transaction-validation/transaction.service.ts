import { Injectable } from '@nestjs/common';
import { TransactionRuleValidator } from './validator';
import { ITransaction } from './transaction';

@Injectable()
export class TransactionService {
  constructor(private ruleCollector: TransactionRuleValidator) {}

  processTransaction(transaction: ITransaction): boolean {
    return this.ruleCollector.collect(transaction);
  }
}
