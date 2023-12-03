import { Injectable } from '@nestjs/common';
import { AbstractRuleValidator } from './abstract-rule.validator';
import { ITransaction } from '../../transaction.interface';
import { Collectable } from '../../../../lib';

@Collectable('TransactionRules')
@Injectable()
export class AmountRuleValidator implements AbstractRuleValidator {
  validate(transaction: ITransaction): boolean {
    return transaction.amount > 0;
  }
}
