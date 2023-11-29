import { ITransaction } from '../../transaction';

export interface IRuleValidator {
  validate(transaction: ITransaction): boolean;
}

export abstract class AbstractRuleValidator implements IRuleValidator {
  public abstract validate(transaction: ITransaction): boolean;
}

