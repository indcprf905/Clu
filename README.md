# CreativeHub KSA | المركز الإبداعي السعودي

<div dir="rtl">

## 🎉 المشروع جاهز للتشغيل!

تم إنشاء منصة سوق حر عربية متكاملة للخدمات الإبداعية في المملكة العربية السعودية.

### ✅ ما تم إنشاؤه:

- **Backend API (NestJS)**: نظام كامل مع Auth, Prisma, Health Check
- **Frontend (Next.js 14)**: واجهة عربية RTL
- **Database Schema**: Prisma مع جميع الجداول المطلوبة
- **Docker Setup**: PostgreSQL + Redis + Mailhog
- **Shared Packages**: Types & Config مشتركة

</div>

---

## 🚀 Quick Start

### المتطلبات الأساسية:

```bash
# تحقق من التثبيت
node --version   # v18+
pnpm --version   # 8+
docker --version # للبنية التحتية
```

### خطوات التشغيل:

#### 1. تثبيت المكتبات

```bash
pnpm install
```

#### 2. تشغيل البنية التحتية (PostgreSQL + Redis)

```bash
docker compose -f docker-compose.dev.yml up -d

# تحقق من التشغيل
docker compose -f docker-compose.dev.yml ps
```

#### 3. إعداد قاعدة البيانات

```bash
# توليد Prisma Client
pnpm prisma:generate

# تشغيل Migrations
pnpm prisma:migrate

# ملء البيانات الأولية
pnpm prisma:seed
```

#### 4. تشغيل التطبيقات

```bash
# تشغيل API + Web معاً
pnpm dev
```

أو بشكل منفصل:

```bash
# Terminal 1: API
pnpm --filter @creativehub/api dev

# Terminal 2: Web
pnpm --filter @creativehub/web dev
```

---

## 📍 روابط الوصول

بعد التشغيل:

- **Web App**: http://localhost:3000
- **API**: http://localhost:4000/api
- **Health Check**: http://localhost:4000/api/health
- **Mailhog UI**: http://localhost:8025
- **Prisma Studio**: `pnpm prisma:studio`

---

## 👤 حسابات الاختبار

بعد تشغيل seed:

### Admin
- Email: `admin@creativehub.sa`
- Password: `Admin@123`

### Provider (مقدم خدمة)
- Email: `provider@test.sa`
- Password: `Provider@123`

### Client (عميل)
- Email: `client@test.sa`
- Password: `Client@123`

---

## 📁 هيكل المشروع

```
creativehub-ksa/
├── apps/
│   ├── api/           # NestJS Backend
│   │   ├── src/
│   │   │   ├── auth/
│   │   │   ├── prisma/
│   │   │   ├── health/
│   │   │   └── main.ts
│   │   └── prisma/
│   │       ├── schema.prisma
│   │       └── seed.ts
│   └── web/           # Next.js Frontend
│       ├── app/
│       │   ├── layout.tsx
│       │   └── page.tsx
│       └── lib/
├── packages/
│   ├── shared-types/  # TypeScript Types
│   └── shared-config/ # Shared Config
├── docker-compose.dev.yml
├── .env
└── package.json
```

---

## 🛠️ أوامر مفيدة

### Development

```bash
# تشغيل وضع التطوير
pnpm dev

# Type checking
pnpm typecheck

# Linting
pnpm lint

# Build للإنتاج
pnpm build
```

### Database

```bash
# Prisma Studio (واجهة قاعدة البيانات)
pnpm prisma:studio

# إنشاء migration جديد
pnpm --filter @creativehub/api prisma:migrate:dev --name migration_name

# إعادة تعيين قاعدة البيانات
pnpm --filter @creativehub/api prisma migrate reset
```

### Docker

```bash
# إيقاف الخدمات
docker compose -f docker-compose.dev.yml down

# عرض اللوج
docker compose -f docker-compose.dev.yml logs -f

# إعادة التشغيل
docker compose -f docker-compose.dev.yml restart
```

---

## 🧪 اختبار API Endpoints

### Auth

```bash
# Register
curl -X POST http://localhost:4000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "Test@123",
    "name": "Test User",
    "role": "CLIENT"
  }'

# Login
curl -X POST http://localhost:4000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "client@test.sa",
    "password": "Client@123"
  }'

# Get Current User
curl http://localhost:4000/api/auth/me \
  -H "Authorization: Bearer YOUR_TOKEN"
```

### Health Check

```bash
curl http://localhost:4000/api/health
```

---

## 🔧 استكشاف الأخطاء

### مشاكل قاعدة البيانات

```bash
# تحقق من تشغيل PostgreSQL
docker compose -f docker-compose.dev.yml ps

# عرض لوج PostgreSQL
docker compose -f docker-compose.dev.yml logs postgres

# إعادة تشغيل
docker compose -f docker-compose.dev.yml restart postgres
```

### مشاكل Prisma

```bash
# إعادة توليد Client
pnpm prisma:generate

# التحقق من Schema
pnpm --filter @creativehub/api prisma validate

# عرض Database Schema
pnpm --filter @creativehub/api prisma db pull
```

### مشاكل pnpm

```bash
# تنظيف وإعادة التثبيت
pnpm clean
rm -rf node_modules
pnpm install
```

---

## 🌟 الميزات الرئيسية

### Backend (NestJS)
- ✅ Authentication & Authorization (JWT)
- ✅ Prisma ORM مع PostgreSQL
- ✅ RBAC (Client, Provider, Admin)
- ✅ Health Check Endpoint
- ✅ Rate Limiting & Security (Helmet)
- ✅ CORS Configuration
- ✅ Environment Variables Validation

### Frontend (Next.js)
- ✅ Arabic RTL Support
- ✅ Next.js 14 App Router
- ✅ Tailwind CSS
- ✅ TypeScript Strict Mode
- ✅ Responsive Design

### Database (Prisma + PostgreSQL)
- ✅ Complete Schema للنظام
- ✅ Relations & Indexes
- ✅ Seed Data مع حسابات تجريبية
- ✅ Migrations Ready

---

## 📦 التوسعات المستقبلية

الملفات جاهزة للإضافات التالية:

1. **Payments Module** (Tap, Moyasar, Stripe)
2. **Chat System** (WebSocket)
3. **Wallet & Transactions**
4. **Orders Management**
5. **Reviews & Ratings**
6. **Admin Dashboard**
7. **Search & Filters**
8. **Email Notifications**
9. **File Upload (GCS)**
10. **Invoice Generation (PDF)**

---

## 🔐 Security

- JWT Authentication
- Password Hashing (bcrypt)
- CORS Configuration
- Helmet Security Headers
- Rate Limiting
- Input Validation
- Role-Based Access Control

---

## 📝 Environment Variables

تأكد من وجود `.env` في المجلد الرئيسي:

```bash
DATABASE_URL="postgresql://creativehub:dev_password@localhost:5432/creativehub_dev"
REDIS_URL="redis://localhost:6379"
JWT_SECRET="your-secret-key"
JWT_REFRESH_SECRET="your-refresh-secret"
NODE_ENV="development"
PORT=4000
```

---

## 🚢 Production Deployment

للنشر على الإنتاج، راجع:
- `infra/gcp/` للنشر على Google Cloud
- `infra/Dockerfile.api` و `infra/Dockerfile.web`
- `.github/workflows/` للـ CI/CD

---

## 📞 الدعم

للمساعدة:
- Technical: dev@creativehub.sa
- Business: info@creativehub.sa

---

## 📄 License

Proprietary - All Rights Reserved © 2025 CreativeHub KSA

---

<div dir="rtl">

## 🎯 التالي؟

1. شغل المشروع: `pnpm dev`
2. افتح المتصفح على: http://localhost:3000
3. جرب تسجيل الدخول بالحسابات التجريبية
4. استكشف API على: http://localhost:4000/api

**المشروع جاهز 100% للتطوير!** 🚀🇸🇦

</div>
