import { Injectable } from '@nestjs/common';
import { AbstractCollector, Collector } from '@lib/index';
import { IRuleValidator } from './rules';

@Collector('TransactionRules')
@Injectable()
export class TransactionRuleValidator extends AbstractCollector<IRuleValidator> {
  collect(transaction: any): boolean {
    return this.collectables.every(rule => rule.validate(transaction));
  }
}
