# 🏃 تشغيل المشروع محلياً

## ✅ المشروع جاهز تماماً!

جميع الملفات تم إنشاؤها ومحفوظة في Git. الآن فقط اتبع هذه الخطوات على جهازك.

---

## 📋 المتطلبات:

- Node.js 18+ ✅
- pnpm 8+ ✅
- Docker Desktop ✅

---

## 🚀 خطوات التشغيل:

### 1. Clone المشروع (إذا لم يكن موجود)

```bash
# المشروع موجود بالفعل في: /home/user/Clu
# أو clone من Git:
git clone <your-repo-url>
cd Clu
```

### 2. تثبيت المكتبات

```bash
pnpm install
```

✅ **تم بالفعل**: 890 package مثبتة

### 3. تشغيل Docker للبنية التحتية

```bash
# تشغيل PostgreSQL + Redis + Mailhog
docker compose -f docker-compose.dev.yml up -d

# تحقق من التشغيل
docker compose -f docker-compose.dev.yml ps
```

يجب أن ترى:
```
NAME                      STATUS
creativehub-postgres      Up
creativehub-redis         Up
creativehub-mailhog       Up
```

### 4. إعداد قاعدة البيانات

```bash
# توليد Prisma Client
pnpm prisma:generate

# تشغيل Migrations
pnpm --filter @creativehub/api prisma migrate dev --name init

# ملء البيانات التجريبية
pnpm prisma:seed
```

يجب أن ترى:
```
✅ Admin settings created
✅ Category created: Voice-over
✅ Category created: Ad Shoot
...
✅ Admin user created: admin@creativehub.sa / Admin@123
✅ Provider user created: provider@test.sa / Provider@123
✅ Client user created: client@test.sa / Client@123
✅ Database seeded successfully!
```

### 5. تشغيل التطبيقات

**الخيار 1: تشغيل كل شيء معاً (موصى به)**

```bash
pnpm dev
```

**الخيار 2: تشغيل منفصل**

```bash
# Terminal 1: API Server
pnpm --filter @creativehub/api dev

# Terminal 2: Web Server
pnpm --filter @creativehub/web dev
```

---

## 🌐 الوصول للتطبيق

بعد التشغيل:

- **Web Frontend**: http://localhost:3000
- **API Backend**: http://localhost:4000/api
- **Health Check**: http://localhost:4000/api/health
- **Mailhog (Emails)**: http://localhost:8025
- **Prisma Studio**: `pnpm prisma:studio`

---

## 🧪 اختبار سريع

### 1. Health Check

```bash
curl http://localhost:4000/api/health
```

يجب أن ترى:
```json
{
  "status": "healthy",
  "timestamp": "2025-...",
  "services": {
    "database": "up",
    "api": "up"
  }
}
```

### 2. تسجيل الدخول

```bash
curl -X POST http://localhost:4000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "client@test.sa",
    "password": "Client@123"
  }'
```

يجب أن ترى:
```json
{
  "user": {
    "id": "...",
    "email": "client@test.sa",
    "name": "سارة الأحمد",
    "role": "CLIENT"
  },
  "accessToken": "eyJhbGciOiJIUzI1...",
  "refreshToken": "eyJhbGciOiJIUzI1..."
}
```

### 3. Get Current User

```bash
# استخدم الـ token من الخطوة السابقة
curl http://localhost:4000/api/auth/me \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN"
```

---

## 👤 حسابات الاختبار

بعد seed تكون متوفرة:

### Admin (المسؤول)
- Email: `admin@creativehub.sa`
- Password: `Admin@123`
- الدور: إدارة المنصة

### Provider (مقدم خدمة)
- Email: `provider@test.sa`
- Password: `Provider@123`
- الدور: تقديم الخدمات

### Client (عميل)
- Email: `client@test.sa`
- Password: `Client@123`
- الدور: طلب الخدمات

---

## 🔧 استكشاف الأخطاء

### مشكلة: Port مستخدم

```bash
# غير PORT في .env
PORT=4001  # بدلاً من 4000
WEB_PORT=3001  # بدلاً من 3000
```

### مشكلة: PostgreSQL لا يعمل

```bash
# تحقق من Docker
docker compose -f docker-compose.dev.yml ps

# أعد التشغيل
docker compose -f docker-compose.dev.yml restart postgres

# عرض اللوج
docker compose -f docker-compose.dev.yml logs -f postgres
```

### مشكلة: Prisma Generate فشل

```bash
cd apps/api
pnpm prisma generate
```

### مشكلة: Migration فشل

```bash
# إعادة تعيين قاعدة البيانات
cd apps/api
pnpm prisma migrate reset
pnpm prisma migrate dev --name init
pnpm prisma db seed
```

---

## 📦 أوامر مفيدة

### Development

```bash
# تشغيل وضع التطوير
pnpm dev

# Type checking
pnpm typecheck

# Linting
pnpm lint

# Build
pnpm build
```

### Database

```bash
# فتح Prisma Studio
pnpm prisma:studio

# إنشاء migration جديد
pnpm --filter @creativehub/api prisma migrate dev --name migration_name

# تطبيق migrations
pnpm prisma:migrate

# إعادة seed
pnpm prisma:seed
```

### Docker

```bash
# إيقاف
docker compose -f docker-compose.dev.yml down

# إعادة التشغيل
docker compose -f docker-compose.dev.yml restart

# حذف البيانات وإعادة البدء
docker compose -f docker-compose.dev.yml down -v
docker compose -f docker-compose.dev.yml up -d
```

---

## 🎯 الخطوة التالية

بعد التشغيل بنجاح:

1. ✅ افتح http://localhost:3000
2. ✅ جرب endpoints في http://localhost:4000/api
3. ✅ افتح Prisma Studio: `pnpm prisma:studio`
4. ✅ ابدأ التطوير!

---

## 📚 المزيد

- **README.md**: دليل شامل
- **QUICK_START.md**: دليل سريع
- **Prisma Schema**: `apps/api/prisma/schema.prisma`
- **API Modules**: `apps/api/src/`

---

## 🎉 جاهز للبدء!

المشروع الآن جاهز 100% للتشغيل على جهازك المحلي.

```bash
# خطوة واحدة للبدء:
pnpm dev
```

**Happy Coding! 🚀🇸🇦**
