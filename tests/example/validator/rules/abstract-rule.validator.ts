import { ITransaction } from '../../transaction.interface';

export interface IRuleValidator {
  validate(transaction: ITransaction): boolean;
}

export abstract class AbstractRuleValidator implements IRuleValidator {
  public abstract validate(transaction: ITransaction): boolean;
}

