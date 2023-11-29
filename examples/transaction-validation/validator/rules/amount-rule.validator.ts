import { Injectable } from '@nestjs/common';
import { Collectable } from '@lib/decorators';
import { AbstractRuleValidator } from './abstract-rule.validator';
import { ITransaction } from '../../transaction';

@Collectable('TransactionRules')
@Injectable()
export class AmountRuleValidator implements AbstractRuleValidator {
  validate(transaction: ITransaction): boolean {
    return transaction.amount > 0;
  }
}
