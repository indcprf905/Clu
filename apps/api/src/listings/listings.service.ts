import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateListingDto } from './dto/create-listing.dto';
import { UpdateListingDto } from './dto/update-listing.dto';
import { QueryListingsDto, SortBy } from './dto/query-listings.dto';

@Injectable()
export class ListingsService {
  constructor(private prisma: PrismaService) {}

  async create(userId: string, dto: CreateListingDto) {
    // Verify user is a provider
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      include: { providerProfile: true },
    });

    if (!user || user.role !== 'PROVIDER') {
      throw new ForbiddenException('فقط مقدمو الخدمات يمكنهم إنشاء خدمات');
    }

    if (!user.providerProfile) {
      throw new ForbiddenException('يجب إكمال الملف الشخصي أولاً');
    }

    // Validate samples (at least 1)
    if (!dto.samples || dto.samples.length === 0) {
      throw new ForbiddenException('يجب إضافة نموذج عمل واحد على الأقل');
    }

    // Verify category exists
    const category = await this.prisma.category.findUnique({
      where: { id: dto.categoryId },
    });

    if (!category) {
      throw new NotFoundException('الفئة غير موجودة');
    }

    // Create listing
    return this.prisma.listing.create({
      data: {
        providerId: userId,
        categoryId: dto.categoryId,
        title: dto.title,
        summary: dto.summary,
        description: dto.description || dto.summary,
        price: dto.price,
        deliveryDays: dto.deliveryDays,
        samples: dto.samples,
        status: 'PENDING', // Requires admin approval
      },
      include: {
        category: true,
        provider: {
          select: {
            id: true,
            name: true,
            avatar: true,
          },
        },
      },
    });
  }

  async findAll(query: QueryListingsDto) {
    const { category, search, minPrice, maxPrice, sortBy, page, limit } = query;

    const where: any = {
      status: 'ACTIVE', // Only show active listings
    };

    if (category) {
      const cat = await this.prisma.category.findUnique({
        where: { slug: category },
      });
      if (cat) {
        where.categoryId = cat.id;
      }
    }

    if (search) {
      where.OR = [
        { title: { contains: search, mode: 'insensitive' } },
        { summary: { contains: search, mode: 'insensitive' } },
        { description: { contains: search, mode: 'insensitive' } },
      ];
    }

    if (minPrice !== undefined || maxPrice !== undefined) {
      where.price = {};
      if (minPrice !== undefined) where.price.gte = minPrice;
      if (maxPrice !== undefined) where.price.lte = maxPrice;
    }

    let orderBy: any = { createdAt: 'desc' };

    switch (sortBy) {
      case SortBy.PRICE_LOW:
        orderBy = { price: 'asc' };
        break;
      case SortBy.PRICE_HIGH:
        orderBy = { price: 'desc' };
        break;
      case SortBy.RATING:
        // TODO: Implement after adding reviews
        orderBy = { createdAt: 'desc' };
        break;
    }

    const skip = (page - 1) * limit;

    const [listings, total] = await Promise.all([
      this.prisma.listing.findMany({
        where,
        orderBy,
        skip,
        take: limit,
        include: {
          category: true,
          provider: {
            select: {
              id: true,
              name: true,
              avatar: true,
            },
          },
          _count: {
            select: { reviews: true },
          },
        },
      }),
      this.prisma.listing.count({ where }),
    ]);

    return {
      listings,
      pagination: {
        total,
        page,
        limit,
        pages: Math.ceil(total / limit),
      },
    };
  }

  async findOne(id: string) {
    const listing = await this.prisma.listing.findUnique({
      where: { id },
      include: {
        category: true,
        provider: {
          select: {
            id: true,
            name: true,
            avatar: true,
            providerProfile: {
              select: {
                bio: true,
                skills: true,
              },
            },
            createdAt: true,
          },
        },
        reviews: {
          include: {
            client: {
              select: {
                id: true,
                name: true,
                avatar: true,
              },
            },
          },
          orderBy: { createdAt: 'desc' },
          take: 10,
        },
        _count: {
          select: { reviews: true, orders: true },
        },
      },
    });

    if (!listing) {
      throw new NotFoundException('الخدمة غير موجودة');
    }

    // Calculate average rating
    const avgRating = await this.prisma.review.aggregate({
      where: { listingId: id },
      _avg: { rating: true },
    });

    return {
      ...listing,
      avgRating: avgRating._avg.rating || 0,
      totalReviews: listing._count.reviews,
    };
  }

  async update(id: string, userId: string, dto: UpdateListingDto) {
    const listing = await this.prisma.listing.findUnique({
      where: { id },
    });

    if (!listing) {
      throw new NotFoundException('الخدمة غير موجودة');
    }

    if (listing.providerId !== userId) {
      throw new ForbiddenException('لا يمكنك تعديل هذه الخدمة');
    }

    // If samples are being updated, validate
    if (dto.samples && dto.samples.length === 0) {
      throw new ForbiddenException('يجب وجود نموذج عمل واحد على الأقل');
    }

    return this.prisma.listing.update({
      where: { id },
      data: dto,
      include: {
        category: true,
        provider: {
          select: {
            id: true,
            name: true,
            avatar: true,
          },
        },
      },
    });
  }

  async remove(id: string, userId: string) {
    const listing = await this.prisma.listing.findUnique({
      where: { id },
    });

    if (!listing) {
      throw new NotFoundException('الخدمة غير موجودة');
    }

    if (listing.providerId !== userId) {
      throw new ForbiddenException('لا يمكنك حذف هذه الخدمة');
    }

    // Soft delete by setting status to DELETED
    return this.prisma.listing.update({
      where: { id },
      data: { status: 'REJECTED' }, // Using REJECTED as soft delete
    });
  }

  async getMyListings(userId: string) {
    return this.prisma.listing.findMany({
      where: { providerId: userId },
      include: {
        category: true,
        _count: {
          select: { orders: true, reviews: true },
        },
      },
      orderBy: { createdAt: 'desc' },
    });
  }
}
