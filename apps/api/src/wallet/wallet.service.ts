import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class WalletService {
  constructor(private prisma: PrismaService) {}

  async getWallet(userId: string) {
    let wallet = await this.prisma.wallet.findUnique({
      where: { userId },
      include: {
        transactions: {
          orderBy: { createdAt: 'desc' },
          take: 10,
        },
      },
    });

    if (!wallet) {
      // Create wallet if doesn't exist
      wallet = await this.prisma.wallet.create({
        data: { userId, balance: 0, pendingBalance: 0 },
        include: { transactions: true },
      });
    }

    return wallet;
  }

  async topUp(userId: string, amount: number, paymentMethod: string, reference: string) {
    if (amount <= 0) {
      throw new BadRequestException('المبلغ يجب أن يكون أكبر من صفر');
    }

    const wallet = await this.prisma.wallet.findUnique({
      where: { userId },
    });

    if (!wallet) {
      throw new NotFoundException('المحفظة غير موجودة');
    }

    return this.prisma.$transaction(async (tx) => {
      // Update wallet balance
      const updatedWallet = await tx.wallet.update({
        where: { userId },
        data: { balance: { increment: amount } },
      });

      // Create transaction record
      const transaction = await tx.transaction.create({
        data: {
          walletId: wallet.id,
          type: 'TOP_UP',
          amount,
          status: 'COMPLETED',
          reference,
          metadata: { paymentMethod },
        },
      });

      return { wallet: updatedWallet, transaction };
    });
  }

  async withdraw(userId: string, amount: number, bankAccount: string) {
    if (amount <= 0) {
      throw new BadRequestException('المبلغ يجب أن يكون أكبر من صفر');
    }

    const wallet = await this.prisma.wallet.findUnique({
      where: { userId },
    });

    if (!wallet) {
      throw new NotFoundException('المحفظة غير موجودة');
    }

    if (wallet.balance < amount) {
      throw new BadRequestException('الرصيد غير كافٍ');
    }

    return this.prisma.$transaction(async (tx) => {
      // Deduct from wallet
      const updatedWallet = await tx.wallet.update({
        where: { userId },
        data: { balance: { decrement: amount } },
      });

      // Create withdrawal transaction
      const transaction = await tx.transaction.create({
        data: {
          walletId: wallet.id,
          type: 'WITHDRAWAL',
          amount: -amount,
          status: 'PENDING', // Requires admin approval
          reference: `WITHDRAW-${Date.now()}`,
          metadata: { bankAccount },
        },
      });

      return { wallet: updatedWallet, transaction };
    });
  }

  async getTransactions(userId: string, limit = 50) {
    const wallet = await this.prisma.wallet.findUnique({
      where: { userId },
    });

    if (!wallet) {
      throw new NotFoundException('المحفظة غير موجودة');
    }

    return this.prisma.transaction.findMany({
      where: { walletId: wallet.id },
      include: {
        order: {
          select: {
            id: true,
            listing: {
              select: {
                title: true,
              },
            },
          },
        },
      },
      orderBy: { createdAt: 'desc' },
      take: limit,
    });
  }
}
