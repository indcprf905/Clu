# 🚀 QUICK START - CreativeHub KSA

## ✅ تم إنشاء المشروع بنجاح!

تم إنشاء جميع الملفات الأساسية للمشروع:

### 📁 الملفات المُنشأة:

```
✅ Root Configuration
   - package.json
   - pnpm-workspace.yaml
   - turbo.json
   - docker-compose.dev.yml
   - .env

✅ Shared Packages
   - packages/shared-types/
   - packages/shared-config/

✅ Backend API (NestJS)
   - apps/api/src/main.ts
   - apps/api/src/app.module.ts
   - apps/api/src/auth/ (complete auth module)
   - apps/api/src/prisma/ (service + module)
   - apps/api/src/health/ (healthcheck)
   - apps/api/prisma/schema.prisma
   - apps/api/prisma/seed.ts

✅ Frontend Web (Next.js)
   - apps/web/app/layout.tsx
   - apps/web/app/page.tsx
   - apps/web/app/globals.css
   - Tailwind CSS configured
```

---

## 🎯 للتشغيل الآن:

### الخطوة 1: تثبيت المكتبات

```bash
pnpm install
```

### الخطوة 2: تشغيل البنية التحتية

```bash
# إذا كان Docker متوفر:
docker compose -f docker-compose.dev.yml up -d

# تحقق من التشغيل:
docker compose -f docker-compose.dev.yml ps
```

**ملاحظة**: إذا لم يكن Docker متوفر، يمكنك:
- استخدام PostgreSQL محلي
- استخدام خدمة سحابية (Supabase, Railway, etc.)
- تحديث `DATABASE_URL` في `.env`

### الخطوة 3: إعداد قاعدة البيانات

```bash
# توليد Prisma Client
pnpm prisma:generate

# تشغيل Migrations
cd apps/api
pnpm prisma migrate dev --name init

# ملء البيانات الأولية
pnpm prisma db seed
```

### الخطوة 4: تشغيل التطبيقات

```bash
# من المجلد الرئيسي
pnpm dev
```

---

## 🌐 الوصول للتطبيق

بعد التشغيل:

- **Frontend**: http://localhost:3000
- **API**: http://localhost:4000/api
- **Health**: http://localhost:4000/api/health
- **Mailhog**: http://localhost:8025

---

## 🧪 اختبار سريع

### 1. تحقق من Health Check

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

### 2. سجل مستخدم جديد

```bash
curl -X POST http://localhost:4000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "Test@1234",
    "name": "Test User",
    "role": "CLIENT"
  }'
```

### 3. سجل دخول

```bash
curl -X POST http://localhost:4000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "client@test.sa",
    "password": "Client@123"
  }'
```

---

## 👤 حسابات تجريبية (بعد seed)

```
Admin:    admin@creativehub.sa    / Admin@123
Provider: provider@test.sa        / Provider@123
Client:   client@test.sa          / Client@123
```

---

## 🔧 حل المشاكل الشائعة

### مشكلة: pnpm not found

```bash
npm install -g pnpm@8
```

### مشكلة: Docker not running

```bash
# ابدأ Docker Desktop
# أو استخدم قاعدة بيانات خارجية
```

### مشكلة: Port already in use

```bash
# غير PORT في .env
PORT=4001  # بدلاً من 4000
```

### مشكلة: Prisma Client not generated

```bash
cd apps/api
pnpm prisma generate
```

---

## 📚 الخطوات التالية

بعد تشغيل المشروع بنجاح:

1. **استكشف API**: جرب endpoints المختلفة
2. **افتح Frontend**: شاهد الصفحة الرئيسية
3. **Prisma Studio**: `pnpm prisma:studio` لرؤية البيانات
4. **أضف Features**: ابدأ بإضافة modules جديدة

---

## 📖 المزيد من التفاصيل

راجع `README.md` للتفاصيل الكاملة عن:
- هيكل المشروع
- الأوامر المتاحة
- التوسعات المستقبلية
- Deployment

---

## 🎉 جاهز للبدء!

المشروع الآن جاهز 100% للتطوير. ابدأ بتشغيل:

```bash
pnpm install && pnpm dev
```

**Happy Coding! 🚀🇸🇦**
