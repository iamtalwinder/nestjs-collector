import { Injectable } from '@nestjs/common';
import { IRuleValidator } from './rules';
import { AbstractCollector, Collector } from '../../../lib';
import { ITransaction } from '../transaction.interface';

@Collector('TransactionRules')
@Injectable()
export class TransactionRuleValidator extends AbstractCollector<IRuleValidator> {
  collect(transaction: ITransaction): boolean {
    return this.collectables.every(rule => rule.validate(transaction));
  }
}
