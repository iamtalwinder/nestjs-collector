// transaction.controller.ts

import { Controller, Post, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { ITransaction } from './transaction.interface';

@Controller()
export class TransactionController {
  constructor(private readonly transactionService: TransactionService) {}

  @Post('process-transaction')
  @HttpCode(HttpStatus.OK)
  processTransaction(@Body() transaction: ITransaction): { result: boolean } {
    const isValid = this.transactionService.processTransaction(transaction);
    return { result: isValid };
  }
}
