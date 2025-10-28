# 🚀 طريقة تشغيل المشروع | Run Instructions

## 📍 معلومات المستودع | Repository Info

- **المستودع**: indcprf905/Clu
- **الفرع**: claude/create-freelance-marketplace-011CUWSV9A8tndAwa6BW13Lz
- **المشروع**: CreativeHub KSA - منصة سوق حر عربية

---

## ⚡ التشغيل السريع | Quick Start

### 1️⃣ تثبيت المكتبات

```bash
pnpm install
```

### 2️⃣ تشغيل Docker (قاعدة البيانات)

```bash
docker compose -f docker-compose.dev.yml up -d
```

### 3️⃣ إعداد قاعدة البيانات

```bash
# توليد Prisma Client
pnpm prisma:generate

# تشغيل Migrations
pnpm prisma:migrate

# ملء البيانات التجريبية
pnpm prisma:seed
```

### 4️⃣ تشغيل المشروع

```bash
pnpm dev
```

---

## 🌐 الروابط | URLs

بعد التشغيل، ستكون التطبيقات متاحة على:

- **الموقع الرئيسي**: http://localhost:3000
- **API Backend**: http://localhost:4000/api
- **Health Check**: http://localhost:4000/api/health
- **Prisma Studio**: `pnpm prisma:studio`
- **Mailhog (البريد)**: http://localhost:8025

---

## 👤 حسابات الاختبار | Test Accounts

استخدم هذه الحسابات لتسجيل الدخول:

### 🔧 مدير النظام (Admin)
```
البريد: admin@creativehub.sa
الرقم السري: Admin@123
```

### ⭐ مقدم خدمة (Provider)
```
البريد: provider@test.sa
الرقم السري: Provider@123
```

### 👤 عميل (Client)
```
البريد: client@test.sa
الرقم السري: Client@123
```

---

## 📱 الصفحات المتاحة | Available Pages

جميع الصفحات التالية تعمل بشكل كامل:

- ✅ **الرئيسية**: http://localhost:3000
- ✅ **تسجيل الدخول**: http://localhost:3000/login
- ✅ **إنشاء حساب**: http://localhost:3000/register
- ✅ **الخدمات**: http://localhost:3000/listings
- ✅ **لوحة التحكم**: http://localhost:3000/dashboard
- ✅ **مركز المساعدة**: http://localhost:3000/help
- ✅ **تواصل معنا**: http://localhost:3000/contact
- ✅ **سياسة الخصوصية**: http://localhost:3000/privacy
- ✅ **شروط الاستخدام**: http://localhost:3000/terms

---

## 🛠️ أوامر إضافية | Additional Commands

### تشغيل منفصل

```bash
# API فقط
pnpm --filter @creativehub/api dev

# Frontend فقط
pnpm --filter @creativehub/web dev
```

### Prisma

```bash
# فتح Prisma Studio
pnpm prisma:studio

# إنشاء migration جديد
pnpm --filter @creativehub/api prisma migrate dev --name migration_name

# إعادة تعيين قاعدة البيانات
pnpm --filter @creativehub/api prisma migrate reset
```

### Docker

```bash
# إيقاف الخدمات
docker compose -f docker-compose.dev.yml down

# عرض السجلات
docker compose -f docker-compose.dev.yml logs -f

# حالة الخدمات
docker compose -f docker-compose.dev.yml ps
```

---

## 🔍 استكشاف الأخطاء | Troubleshooting

### ❌ مشكلة: Prisma Client غير موجود

```bash
pnpm prisma:generate
```

### ❌ مشكلة: قاعدة البيانات لا تعمل

```bash
# تحقق من Docker
docker compose -f docker-compose.dev.yml ps

# عرض لوج PostgreSQL
docker compose -f docker-compose.dev.yml logs postgres

# إعادة التشغيل
docker compose -f docker-compose.dev.yml restart
```

### ❌ مشكلة: Port مشغول (3000 أو 4000)

```bash
# Linux/Mac - إيقاف العملية
lsof -ti:3000 | xargs kill -9
lsof -ti:4000 | xargs kill -9

# Windows
netstat -ano | findstr :3000
taskkill /PID <PID> /F
```

### ❌ مشكلة: node_modules

```bash
# تنظيف وإعادة التثبيت
rm -rf node_modules
rm pnpm-lock.yaml
pnpm install
```

---

## 📦 المتطلبات | Requirements

تأكد من تثبيت:

- **Node.js**: v18 أو أحدث
- **pnpm**: v8 أو أحدث
- **Docker**: لتشغيل قاعدة البيانات
- **Git**: لإدارة الكود

تحقق من التثبيت:

```bash
node --version    # v18+
pnpm --version    # 8+
docker --version  # أي إصدار
```

---

## 🎯 التدفق المقترح | Recommended Flow

1. شغّل المشروع بالأوامر أعلاه
2. افتح http://localhost:3000
3. اضغط على "تسجيل الدخول"
4. استخدم أحد الحسابات التجريبية
5. استكشف لوحة التحكم والخدمات

---

## 📊 هيكل المشروع | Project Structure

```
Clu/
├── apps/
│   ├── api/                    # NestJS Backend
│   │   ├── src/
│   │   │   ├── auth/          # المصادقة
│   │   │   ├── health/        # Health Check
│   │   │   └── prisma/        # Prisma Service
│   │   └── prisma/
│   │       ├── schema.prisma  # Database Schema
│   │       └── seed.ts        # بيانات تجريبية
│   └── web/                   # Next.js Frontend
│       └── app/
│           ├── (auth)/        # صفحات المصادقة
│           ├── listings/      # صفحات الخدمات
│           ├── dashboard/     # لوحة التحكم
│           └── ...
├── packages/
│   ├── shared-types/          # أنواع مشتركة
│   └── shared-config/         # إعدادات مشتركة
├── docker-compose.dev.yml     # Docker Config
├── .env                       # متغيرات البيئة
└── package.json               # Root Config
```

---

## 🎉 الخلاصة | Summary

المشروع جاهز 100% للتشغيل! جميع الصفحات تعمل بشكل كامل مع:

- ✅ تسجيل دخول وإنشاء حساب
- ✅ تصفح الخدمات مع فلاتر وبحث
- ✅ لوحة تحكم حسب الدور (Admin/Provider/Client)
- ✅ صفحات دعم كاملة
- ✅ تصميم عربي RTL
- ✅ تكامل API كامل

---

**🚀 ابدأ الآن بـ:** `pnpm dev`
