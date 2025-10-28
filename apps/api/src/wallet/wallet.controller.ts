import {
  Controller,
  Get,
  Post,
  Body,
  UseGuards,
  Request,
  Query,
} from '@nestjs/common';
import { WalletService } from './wallet.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('wallet')
@UseGuards(JwtAuthGuard)
export class WalletController {
  constructor(private readonly walletService: WalletService) {}

  @Get()
  getWallet(@Request() req) {
    return this.walletService.getWallet(req.user.sub);
  }

  @Post('top-up')
  topUp(
    @Request() req,
    @Body() body: { amount: number; paymentMethod: string; reference: string },
  ) {
    return this.walletService.topUp(
      req.user.sub,
      body.amount,
      body.paymentMethod,
      body.reference,
    );
  }

  @Post('withdraw')
  withdraw(
    @Request() req,
    @Body() body: { amount: number; bankAccount: string },
  ) {
    return this.walletService.withdraw(req.user.sub, body.amount, body.bankAccount);
  }

  @Get('transactions')
  getTransactions(@Request() req, @Query('limit') limit?: number) {
    return this.walletService.getTransactions(req.user.sub, limit);
  }
}
