import { Injectable, NotFoundException, ForbiddenException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateOrderDto } from './dto/create-order.dto';

@Injectable()
export class OrdersService {
  constructor(private prisma: PrismaService) {}

  async create(userId: string, dto: CreateOrderDto) {
    // Get listing
    const listing = await this.prisma.listing.findUnique({
      where: { id: dto.listingId },
      include: { provider: true },
    });

    if (!listing) {
      throw new NotFoundException('الخدمة غير موجودة');
    }

    if (listing.status !== 'ACTIVE') {
      throw new BadRequestException('هذه الخدمة غير متاحة حالياً');
    }

    if (listing.providerId === userId) {
      throw new BadRequestException('لا يمكنك طلب خدمتك الخاصة');
    }

    // Check if client has wallet
    const wallet = await this.prisma.wallet.findUnique({
      where: { userId },
    });

    if (!wallet) {
      throw new BadRequestException('المحفظة غير موجودة');
    }

    // Calculate fees
    const price = Number(listing.price);
    const platformFee = price * 0.1; // 10% platform fee
    const totalAmount = price + platformFee;

    // Check balance
    if (wallet.balance < totalAmount) {
      throw new BadRequestException('رصيد المحفظة غير كافٍ');
    }

    // Create order in transaction
    return this.prisma.$transaction(async (tx) => {
      // Deduct from wallet
      await tx.wallet.update({
        where: { userId },
        data: { balance: { decrement: totalAmount } },
      });

      // Add to pending balance (escrow)
      await tx.wallet.update({
        where: { userId: listing.providerId },
        data: { pendingBalance: { increment: price } },
      });

      // Create order
      const order = await tx.order.create({
        data: {
          clientId: userId,
          providerId: listing.providerId,
          listingId: dto.listingId,
          price,
          platformFee,
          escrowAmount: price,
          status: 'IN_PROGRESS',
          notes: dto.notes,
        },
        include: {
          listing: true,
          client: {
            select: { id: true, name: true, email: true, avatar: true },
          },
          provider: {
            select: { id: true, name: true, email: true, avatar: true },
          },
        },
      });

      // Create transaction record
      await tx.transaction.create({
        data: {
          walletId: wallet.id,
          orderId: order.id,
          type: 'ORDER_PAYMENT',
          amount: -totalAmount,
          status: 'COMPLETED',
          reference: `ORDER-${order.id}`,
        },
      });

      return order;
    });
  }

  async findAll(userId: string, userRole: string) {
    const where: any = {};

    if (userRole === 'CLIENT') {
      where.clientId = userId;
    } else if (userRole === 'PROVIDER') {
      where.providerId = userId;
    }
    // ADMIN sees all

    return this.prisma.order.findMany({
      where,
      include: {
        listing: {
          select: {
            id: true,
            title: true,
            price: true,
            deliveryDays: true,
          },
        },
        client: {
          select: {
            id: true,
            name: true,
            avatar: true,
          },
        },
        provider: {
          select: {
            id: true,
            name: true,
            avatar: true,
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOne(id: string, userId: string, userRole: string) {
    const order = await this.prisma.order.findUnique({
      where: { id },
      include: {
        listing: true,
        client: {
          select: {
            id: true,
            name: true,
            email: true,
            avatar: true,
          },
        },
        provider: {
          select: {
            id: true,
            name: true,
            email: true,
            avatar: true,
          },
        },
        messages: {
          include: {
            sender: {
              select: {
                id: true,
                name: true,
                avatar: true,
              },
            },
          },
          orderBy: { createdAt: 'asc' },
        },
      },
    });

    if (!order) {
      throw new NotFoundException('الطلب غير موجود');
    }

    // Check access
    if (
      userRole !== 'ADMIN' &&
      order.clientId !== userId &&
      order.providerId !== userId
    ) {
      throw new ForbiddenException('ليس لديك صلاحية لعرض هذا الطلب');
    }

    return order;
  }

  async deliver(orderId: string, userId: string, deliveryFiles: string[]) {
    const order = await this.prisma.order.findUnique({
      where: { id: orderId },
    });

    if (!order) {
      throw new NotFoundException('الطلب غير موجود');
    }

    if (order.providerId !== userId) {
      throw new ForbiddenException('فقط مقدم الخدمة يمكنه التسليم');
    }

    if (order.status !== 'IN_PROGRESS') {
      throw new BadRequestException('لا يمكن تسليم هذا الطلب');
    }

    if (!deliveryFiles || deliveryFiles.length === 0) {
      throw new BadRequestException('يجب إرفاق ملفات التسليم');
    }

    return this.prisma.order.update({
      where: { id: orderId },
      data: {
        status: 'DELIVERED',
        deliveryFiles,
        deliveredAt: new Date(),
      },
      include: {
        listing: true,
        client: {
          select: { id: true, name: true, email: true },
        },
        provider: {
          select: { id: true, name: true, email: true },
        },
      },
    });
  }

  async accept(orderId: string, userId: string) {
    const order = await this.prisma.order.findUnique({
      where: { id: orderId },
      include: { provider: { include: { wallet: true } } },
    });

    if (!order) {
      throw new NotFoundException('الطلب غير موجود');
    }

    if (order.clientId !== userId) {
      throw new ForbiddenException('فقط العميل يمكنه قبول التسليم');
    }

    if (order.status !== 'DELIVERED') {
      throw new BadRequestException('الطلب لم يتم تسليمه بعد');
    }

    // Release escrow
    return this.prisma.$transaction(async (tx) => {
      // Update order
      const updatedOrder = await tx.order.update({
        where: { id: orderId },
        data: {
          status: 'COMPLETED',
          completedAt: new Date(),
        },
      });

      // Release funds to provider
      if (order.provider.wallet) {
        await tx.wallet.update({
          where: { id: order.provider.wallet.id },
          data: {
            balance: { increment: Number(order.escrowAmount) },
            pendingBalance: { decrement: Number(order.escrowAmount) },
          },
        });

        // Create transaction record
        await tx.transaction.create({
          data: {
            walletId: order.provider.wallet.id,
            orderId: order.id,
            type: 'ORDER_COMPLETED',
            amount: Number(order.escrowAmount),
            status: 'COMPLETED',
            reference: `COMPLETE-${order.id}`,
          },
        });
      }

      return updatedOrder;
    });
  }

  async cancel(orderId: string, userId: string, reason: string) {
    const order = await this.prisma.order.findUnique({
      where: { id: orderId },
      include: {
        client: { include: { wallet: true } },
        provider: { include: { wallet: true } },
      },
    });

    if (!order) {
      throw new NotFoundException('الطلب غير موجود');
    }

    if (order.clientId !== userId && order.providerId !== userId) {
      throw new ForbiddenException('ليس لديك صلاحية لإلغاء هذا الطلب');
    }

    if (['COMPLETED', 'CANCELLED'].includes(order.status)) {
      throw new BadRequestException('لا يمكن إلغاء هذا الطلب');
    }

    // Refund
    return this.prisma.$transaction(async (tx) => {
      const updatedOrder = await tx.order.update({
        where: { id: orderId },
        data: {
          status: 'CANCELLED',
          cancelReason: reason,
          cancelledAt: new Date(),
        },
      });

      // Refund to client
      if (order.client.wallet) {
        const refundAmount = Number(order.price) + Number(order.platformFee);
        await tx.wallet.update({
          where: { id: order.client.wallet.id },
          data: { balance: { increment: refundAmount } },
        });

        await tx.transaction.create({
          data: {
            walletId: order.client.wallet.id,
            orderId: order.id,
            type: 'REFUND',
            amount: refundAmount,
            status: 'COMPLETED',
            reference: `REFUND-${order.id}`,
          },
        });
      }

      // Release pending balance from provider
      if (order.provider.wallet) {
        await tx.wallet.update({
          where: { id: order.provider.wallet.id },
          data: { pendingBalance: { decrement: Number(order.escrowAmount) } },
        });
      }

      return updatedOrder;
    });
  }
}
