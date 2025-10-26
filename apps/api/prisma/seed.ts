import { PrismaClient, UserRole, KYCStatus } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding database...');

  // Create Admin Settings
  await prisma.adminSettings.upsert({
    where: { id: 1 },
    update: {},
    create: {
      platformFeePct: 10,
      minPayout: 100,
      currency: 'SAR',
      maintenanceMode: false,
    },
  });
  console.log('✅ Admin settings created');

  // Create Categories
  const categories = [
    { slug: 'voice-over', name: 'Voice-over', nameAr: 'التعليق الصوتي', sortOrder: 0 },
    { slug: 'ad-shoot', name: 'Ad Shoot', nameAr: 'تصوير الإعلانات', sortOrder: 1 },
    { slug: 'editing', name: 'Editing', nameAr: 'المونتاج', sortOrder: 2 },
    { slug: 'ugc', name: 'UGC', nameAr: 'محتوى المستخدمين', sortOrder: 3 },
    { slug: 'copywriting', name: 'Copywriting', nameAr: 'كتابة المحتوى', sortOrder: 4 },
  ];

  const createdCategories = [];
  for (const cat of categories) {
    const category = await prisma.category.upsert({
      where: { slug: cat.slug },
      update: {},
      create: cat,
    });
    createdCategories.push(category);
    console.log(`✅ Category created: ${cat.name}`);
  }

  // Create Admin User
  const adminPassword = await bcrypt.hash('Admin@123', 10);
  const admin = await prisma.user.upsert({
    where: { email: 'admin@creativehub.sa' },
    update: {},
    create: {
      email: 'admin@creativehub.sa',
      passwordHash: adminPassword,
      role: UserRole.ADMIN,
      name: 'Admin User',
      emailVerified: true,
      wallet: { create: {} },
    },
  });
  console.log('✅ Admin user created: admin@creativehub.sa / Admin@123');

  // Create Provider User
  const providerPassword = await bcrypt.hash('Provider@123', 10);
  const provider = await prisma.user.upsert({
    where: { email: 'provider@test.sa' },
    update: {},
    create: {
      email: 'provider@test.sa',
      passwordHash: providerPassword,
      role: UserRole.PROVIDER,
      name: 'محمد العتيبي',
      phone: '0512345678',
      emailVerified: true,
      wallet: { create: {} },
      providerProfile: {
        create: {
          displayName: 'محمد العتيبي',
          bio: 'معلق صوتي محترف مع خبرة 10 سنوات في الإعلانات التجارية',
          skills: ['تعليق صوتي', 'دوبلاج', 'تعليق إعلاني'],
          kycStatus: KYCStatus.VERIFIED,
          verifiedAt: new Date(),
        },
      },
    },
  });
  console.log('✅ Provider user created: provider@test.sa / Provider@123');

  // Create Client User
  const clientPassword = await bcrypt.hash('Client@123', 10);
  const client = await prisma.user.upsert({
    where: { email: 'client@test.sa' },
    update: {},
    create: {
      email: 'client@test.sa',
      passwordHash: clientPassword,
      role: UserRole.CLIENT,
      name: 'سارة الأحمد',
      emailVerified: true,
      wallet: { create: {} },
    },
  });
  console.log('✅ Client user created: client@test.sa / Client@123');

  // Create Sample Listings
  const providerProfile = await prisma.providerProfile.findUnique({
    where: { userId: provider.id },
  });

  const voiceOverCategory = createdCategories.find((c) => c.slug === 'voice-over');
  if (voiceOverCategory && providerProfile) {
    await prisma.listing.create({
      data: {
        providerId: providerProfile.id,
        categoryId: voiceOverCategory.id,
        title: 'تعليق صوتي احترافي للإعلانات التجارية',
        summary: 'تعليق صوتي عربي فصيح بصوت واضح ومؤثر. مناسب للإعلانات التلفزيونية.',
        price: 500,
        deliveryDays: 2,
        samples: ['https://example.com/sample1.mp3'],
        status: 'APPROVED',
      },
    });
    console.log('✅ Sample listing created');
  }

  console.log('✅ Database seeded successfully!');
}

main()
  .catch((e) => {
    console.error('❌ Error seeding database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
