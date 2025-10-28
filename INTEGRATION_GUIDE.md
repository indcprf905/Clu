# 🔌 دليل التكامل الكامل | Integration Guide

هذا الدليل يوضح كيفية ربط جميع الخدمات الخارجية لجعل المشروع يعمل بشكل كامل في الإنتاج.

---

## 📋 جدول المحتويات

1. [حالة المشروع الحالية](#حالة-المشروع-الحالية)
2. [معلومات الدفع المطلوبة](#معلومات-الدفع-المطلوبة)
3. [رفع الملفات (File Upload)](#رفع-الملفات)
4. [إعدادات البريد الإلكتروني](#إعدادات-البريد-الإلكتروني)
5. [WebSocket للدردشة](#websocket-للدردشة)
6. [المتغيرات البيئية الكاملة](#المتغيرات-البيئية-الكاملة)

---

## ✅ حالة المشروع الحالية

### ما يعمل الآن بالكامل:

- ✅ **المصادقة والتفويض** (JWT Authentication)
- ✅ **إدارة المستخدمين** (3 أنواع: Client, Provider, Admin)
- ✅ **Listings API** - إنشاء، تصفح، تعديل، حذف الخدمات
- ✅ **Orders API** - إنشاء طلبات، تسليم، قبول، إلغاء
- ✅ **Wallet System** - محفظة رقمية، معاملات، رصيد معلق (escrow)
- ✅ **Frontend Pages** - جميع الصفحات تعمل بتصميم عربي RTL
- ✅ **Database Schema** - كامل مع جميع العلاقات

### ما يحتاج تكامل خارجي:

- 🔄 **Payment Gateways** - Tap, Moyasar, Stripe
- 🔄 **File Upload** - Google Cloud Storage أو AWS S3
- 🔄 **Email Service** - SendGrid أو AWS SES
- 🔄 **WebSocket Chat** - Socket.io للدردشة الفورية
- 🔄 **PDF Generation** - الفواتير بصيغة PDF

---

## 💳 معلومات الدفع المطلوبة

### 1. Tap Payments (السعودية) 🇸🇦

**التسجيل**: https://www.tap.company

**ما تحتاجه**:
```env
TAP_SECRET_KEY=sk_test_xxxxxxxxxxxxxxxxxx
TAP_PUBLIC_KEY=pk_test_xxxxxxxxxxxxxxxxxx
TAP_WEBHOOK_SECRET=whsec_xxxxxxxxxxxxxxxxxx
```

**خطوات التسجيل**:
1. سجل حساب في Tap
2. اذهب إلى Dashboard > Settings > API Keys
3. انسخ Secret Key و Public Key
4. قم بإعداد Webhook URL: `https://your-domain.com/api/webhooks/tap`
5. اختر الأحداث: `charge.created`, `charge.succeeded`, `charge.failed`

**رسوم Tap**:
- 2.9% + 1 ريال لكل معاملة
- دعم Apple Pay و mada و Visa/Mastercard

---

### 2. Moyasar (السعودية) 🇸🇦

**التسجيل**: https://moyasar.com

**ما تحتاجه**:
```env
MOYASAR_API_KEY=pk_test_xxxxxxxxxxxxxxxxxx
MOYASAR_SECRET_KEY=sk_test_xxxxxxxxxxxxxxxxxx
MOYASAR_WEBHOOK_SECRET=whsec_xxxxxxxxxxxxxxxxxx
```

**خطوات التسجيل**:
1. سجل حساب في Moyasar
2. اذهب إلى Dashboard > API Keys
3. انسخ Publishable Key و Secret Key
4. قم بإعداد Webhook: `https://your-domain.com/api/webhooks/moyasar`
5. اختر الأحداث: `payment.paid`, `payment.failed`

**رسوم Moyasar**:
- 2.5% + 1 ريال لكل معاملة
- دعم mada و Apple Pay و Visa/Mastercard

---

### 3. Stripe (دولي + اختباري) 💳

**التسجيل**: https://stripe.com

**ما تحتاجه**:
```env
STRIPE_SECRET_KEY=sk_test_51xxxxxxxxxxxxxxxxxxxxx
STRIPE_PUBLIC_KEY=pk_test_51xxxxxxxxxxxxxxxxxxxxx
STRIPE_WEBHOOK_SECRET=whsec_xxxxxxxxxxxxxxxxxx
```

**للاختبار (موجود مسبقاً)**:
- الحساب متاح في Test Mode بدون تسجيل
- بطاقة اختبار: `4242 4242 4242 4242`
- أي CVV وأي تاريخ انتهاء مستقبلي

**خطوات التسجيل للإنتاج**:
1. سجل حساب Stripe
2. اكمل KYC والتحقق من الهوية
3. احصل على API Keys من Dashboard
4. قم بإعداد Webhooks

**رسوم Stripe**:
- 2.9% + 30¢ لكل معاملة دولية
- رسوم إضافية للتحويلات الدولية

---

## 📤 رفع الملفات (File Upload)

حالياً يتم حفظ روابط الملفات فقط (samples, deliveryFiles). تحتاج لربط خدمة تخزين سحابي.

### الخيار 1: Google Cloud Storage (GCS) - موصى به ✅

**ما تحتاجه**:
```env
GCS_PROJECT_ID=your-project-id
GCS_BUCKET_NAME=creativehub-uploads
GCS_KEYFILE_PATH=/path/to/service-account-key.json
```

**خطوات الإعداد**:
1. إنشاء مشروع في Google Cloud Console
2. تفعيل Cloud Storage API
3. إنشاء Bucket جديد
4. إنشاء Service Account وتنزيل JSON Key
5. إعطاء صلاحيات Storage Object Admin

**كود التكامل** (أنشئ `/apps/api/src/upload/upload.service.ts`):
```typescript
import { Storage } from '@google-cloud/storage';

export class UploadService {
  private storage: Storage;
  private bucket: string;

  constructor() {
    this.storage = new Storage({
      projectId: process.env.GCS_PROJECT_ID,
      keyFilename: process.env.GCS_KEYFILE_PATH,
    });
    this.bucket = process.env.GCS_BUCKET_NAME;
  }

  async uploadFile(file: Express.Multer.File, folder: string) {
    const filename = `${folder}/${Date.now()}-${file.originalname}`;
    const blob = this.storage.bucket(this.bucket).file(filename);

    await blob.save(file.buffer, {
      metadata: { contentType: file.mimetype },
    });

    await blob.makePublic();

    return `https://storage.googleapis.com/${this.bucket}/${filename}`;
  }
}
```

---

### الخيار 2: AWS S3

**ما تحتاجه**:
```env
AWS_ACCESS_KEY_ID=AKIAxxxxxxxxxxxxxxxxx
AWS_SECRET_ACCESS_KEY=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
AWS_REGION=us-east-1
AWS_S3_BUCKET=creativehub-uploads
```

**خطوات الإعداد**:
1. إنشاء حساب AWS
2. إنشاء S3 Bucket
3. إنشاء IAM User مع صلاحيات S3
4. الحصول على Access Key و Secret Key

---

### الخيار 3: Cloudinary (سهل وسريع)

**ما تحتاجه**:
```env
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=xxxxxxxxxxxxx
CLOUDINARY_API_SECRET=xxxxxxxxxxxxxxxxxxxxx
```

**التسجيل**: https://cloudinary.com
- خطة مجانية: 25GB تخزين + 25GB bandwidth شهرياً
- مثالي للبداية

---

## 📧 إعدادات البريد الإلكتروني

### الخيار 1: SendGrid (موصى به)

**ما تحتاجه**:
```env
SENDGRID_API_KEY=SG.xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
EMAIL_FROM=noreply@creativehub.sa
```

**التسجيل**: https://sendgrid.com
1. سجل حساب (100 بريد/يوم مجاناً)
2. تحقق من Domain الخاص بك
3. احصل على API Key من Settings > API Keys

**استخدامات البريد**:
- تأكيد التسجيل
- إشعارات الطلبات
- تأكيد الدفع
- إعادة تعيين كلمة المرور

---

### الخيار 2: AWS SES

```env
AWS_SES_REGION=us-east-1
AWS_SES_ACCESS_KEY=AKIAxxxxxxxxxxxxxxxxx
AWS_SES_SECRET_KEY=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
EMAIL_FROM=noreply@creativehub.sa
```

**التسجيل**: AWS Console > SES
- أرخص (0.10$ لكل 1000 بريد)
- يحتاج التحقق من Domain

---

## 💬 WebSocket للدردشة

حالياً، نظام الرسائل موجود في Database لكن يحتاج WebSocket للدردشة الفورية.

**ما تحتاجه**:
```env
WEBSOCKET_PORT=4001
REDIS_URL=redis://localhost:6379
```

**كود التكامل** (أنشئ `/apps/api/src/chat/chat.gateway.ts`):
```typescript
import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  OnGatewayConnection,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway(4001, { cors: true })
export class ChatGateway implements OnGatewayConnection {
  @WebSocketServer()
  server: Server;

  handleConnection(client: Socket) {
    const userId = client.handshake.query.userId;
    client.join(`user:${userId}`);
  }

  @SubscribeMessage('sendMessage')
  async handleMessage(client: Socket, payload: any) {
    const { orderId, content, receiverId } = payload;

    // حفظ في Database
    await this.messagesService.create({
      orderId,
      senderId: client.data.userId,
      content,
    });

    // إرسال للمستقبل
    this.server.to(`user:${receiverId}`).emit('newMessage', {
      orderId,
      content,
      sender: client.data.user,
      createdAt: new Date(),
    });
  }
}
```

**Dependencies**:
```bash
pnpm add @nestjs/websockets @nestjs/platform-socket.io socket.io
```

---

## 📄 توليد الفواتير (PDF)

**ما تحتاجه**:
```bash
pnpm add pdfkit
```

**كود التكامل** (أنشئ `/apps/api/src/invoices/invoices.service.ts`):
```typescript
import PDFDocument from 'pdfkit';
import * as fs from 'fs';

export class InvoicesService {
  async generateInvoice(order: Order) {
    const doc = new PDFDocument({ size: 'A4' });
    const filename = `INV-${new Date().getFullYear()}-${order.id}.pdf`;
    const stream = fs.createWriteStream(`./invoices/${filename}`);

    doc.pipe(stream);

    // Header
    doc.fontSize(20).text('CreativeHub KSA', { align: 'center' });
    doc.fontSize(14).text(`رقم الفاتورة: ${filename}`, { align: 'right' });
    doc.text(`التاريخ: ${new Date().toLocaleDateString('ar-SA')}`, {
      align: 'right',
    });

    // Details
    doc.moveDown();
    doc.fontSize(12).text(`العميل: ${order.client.name}`);
    doc.text(`مقدم الخدمة: ${order.provider.name}`);
    doc.text(`الخدمة: ${order.listing.title}`);

    // Pricing
    doc.moveDown();
    doc.text(`السعر: ${order.price} ر.س`);
    doc.text(`عمولة المنصة: ${order.platformFee} ر.س`);
    doc.fontSize(14).text(`الإجمالي: ${Number(order.price) + Number(order.platformFee)} ر.س`);

    doc.end();

    return filename;
  }
}
```

---

## 🔐 المتغيرات البيئية الكاملة

انسخ هذا إلى ملف `.env`:

```env
# ==========================================
# DATABASE
# ==========================================
DATABASE_URL="postgresql://creativehub:dev_password@localhost:5432/creativehub_dev"

# ==========================================
# REDIS
# ==========================================
REDIS_URL="redis://localhost:6379"

# ==========================================
# JWT SECRETS
# ==========================================
JWT_SECRET="your-super-secret-jwt-key-change-this-in-production"
JWT_REFRESH_SECRET="your-super-secret-refresh-key-change-this-in-production"

# ==========================================
# APP SETTINGS
# ==========================================
NODE_ENV="development"
PORT=4000
FRONTEND_URL="http://localhost:3000"
WEBSOCKET_PORT=4001

# ==========================================
# PAYMENT PROVIDERS
# ==========================================
# Tap Payments (Saudi)
TAP_SECRET_KEY="sk_test_xxxxxxxxxxxxxxxxxx"
TAP_PUBLIC_KEY="pk_test_xxxxxxxxxxxxxxxxxx"
TAP_WEBHOOK_SECRET="whsec_xxxxxxxxxxxxxxxxxx"

# Moyasar (Saudi)
MOYASAR_API_KEY="pk_test_xxxxxxxxxxxxxxxxxx"
MOYASAR_SECRET_KEY="sk_test_xxxxxxxxxxxxxxxxxx"
MOYASAR_WEBHOOK_SECRET="whsec_xxxxxxxxxxxxxxxxxx"

# Stripe (International + Test)
STRIPE_SECRET_KEY="sk_test_51xxxxxxxxxxxxxxxxxxxxx"
STRIPE_PUBLIC_KEY="pk_test_51xxxxxxxxxxxxxxxxxxxxx"
STRIPE_WEBHOOK_SECRET="whsec_xxxxxxxxxxxxxxxxxx"

# ==========================================
# FILE STORAGE
# ==========================================
# Option 1: Google Cloud Storage
GCS_PROJECT_ID="your-project-id"
GCS_BUCKET_NAME="creativehub-uploads"
GCS_KEYFILE_PATH="/path/to/service-account-key.json"

# Option 2: AWS S3
AWS_ACCESS_KEY_ID="AKIAxxxxxxxxxxxxxxxxx"
AWS_SECRET_ACCESS_KEY="xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
AWS_REGION="us-east-1"
AWS_S3_BUCKET="creativehub-uploads"

# Option 3: Cloudinary
CLOUDINARY_CLOUD_NAME="your-cloud-name"
CLOUDINARY_API_KEY="xxxxxxxxxxxxx"
CLOUDINARY_API_SECRET="xxxxxxxxxxxxxxxxxxxxx"

# ==========================================
# EMAIL SERVICE
# ==========================================
# Option 1: SendGrid
SENDGRID_API_KEY="SG.xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"

# Option 2: AWS SES
AWS_SES_REGION="us-east-1"
AWS_SES_ACCESS_KEY="AKIAxxxxxxxxxxxxxxxxx"
AWS_SES_SECRET_KEY="xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"

# Common
EMAIL_FROM="noreply@creativehub.sa"

# ==========================================
# ADMIN
# ==========================================
ADMIN_EMAIL="admin@creativehub.sa"
ADMIN_PASSWORD="Admin@123"

# ==========================================
# RATE LIMITING
# ==========================================
THROTTLE_TTL=60000
THROTTLE_LIMIT=100
```

---

## 📝 خطوات التفعيل الكاملة

### 1. اختيار بوابة الدفع
```bash
# للسوق السعودي، اختر واحدة:
- Tap Payments (الأفضل للسعودية)
- Moyasar (أرخص قليلاً)
- Stripe (للاختبار فقط)
```

### 2. إعداد تخزين الملفات
```bash
# أسهل خيار للبداية:
- سجل في Cloudinary (مجاني)
- احصل على المفاتيح
- أضفها إلى .env
```

### 3. إعداد البريد
```bash
# للبداية:
- سجل في SendGrid (100 بريد/يوم مجاناً)
- تحقق من Domain
- احصل على API Key
```

### 4. اختبار التكامل
```bash
# بعد إضافة المفاتيح:
pnpm dev

# اختبر:
1. تسجيل مستخدم جديد (يجب أن يصل بريد تأكيد)
2. رفع ملف (نماذج أعمال)
3. إنشاء طلب واختبار الدفع
4. اختبار المحادثة
```

---

## 🚀 الخلاصة

**ما يعمل بدون تكامل**:
- ✅ كل شيء يعمل محلياً بدون مفاتيح API
- ✅ يمكن استخدام روابط ثابتة للملفات
- ✅ Wallet system يعمل بالكامل
- ✅ جميع الصفحات والـ API تعمل

**ما تحتاجه للإنتاج فقط**:
1. **بوابة دفع واحدة** (Tap أو Moyasar أو Stripe)
2. **تخزين ملفات** (Cloudinary للبداية)
3. **خدمة بريد** (SendGrid مجاني للبداية)
4. **(اختياري) WebSocket** للدردشة الفورية

**التكلفة التقديرية للبداية**:
- بوابة الدفع: 2.5-2.9% لكل معاملة فقط
- Cloudinary: مجاني (25GB)
- SendGrid: مجاني (100 بريد/يوم)
- **إجمالي: 0 ريال حتى تبدأ المبيعات!** 🎉

---

**المشروع جاهز للتشغيل فوراً بدون أي تكاملات!**
**التكاملات الخارجية مطلوبة فقط للإنتاج** ✅
