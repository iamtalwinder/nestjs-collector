import { Injectable } from '@nestjs/common';
import { AbstractRuleValidator } from './abstract-rule.validator';
import { ITransaction } from '../../transaction.interface';
import { Collectable } from '../../../../lib';

@Collectable('TransactionRules')
@Injectable()
export class CurrencyRuleValidator implements AbstractRuleValidator {

  validate(transaction: ITransaction): boolean {
    const supportedCurrencies = ['USD', 'EUR', 'GBP'];
    return supportedCurrencies.includes(transaction.currency);
  }
}

