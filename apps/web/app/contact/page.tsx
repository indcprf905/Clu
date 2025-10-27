'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    setSuccess(true);
    setLoading(false);
    setFormData({ name: '', email: '', subject: '', message: '' });

    setTimeout(() => setSuccess(false), 5000);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="text-2xl font-bold text-blue-600">
              المركز الإبداعي السعودي
            </Link>
            <nav className="flex gap-4">
              <Link href="/listings" className="text-gray-700 hover:text-blue-600 transition">
                الخدمات
              </Link>
              <Link href="/dashboard" className="text-gray-700 hover:text-blue-600 transition">
                لوحة التحكم
              </Link>
              <Link href="/login" className="px-4 py-2 text-blue-600 border border-blue-600 rounded-lg hover:bg-blue-50 transition">
                تسجيل الدخول
              </Link>
            </nav>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <div className="text-6xl mb-4">📧</div>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">تواصل معنا</h1>
            <p className="text-xl text-gray-600">
              نحن هنا للإجابة على استفساراتك ومساعدتك
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Contact Info */}
            <div className="space-y-6">
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                <div className="flex items-start gap-4">
                  <div className="text-3xl">📍</div>
                  <div>
                    <h3 className="font-bold text-lg text-gray-900 mb-1">العنوان</h3>
                    <p className="text-gray-600">الرياض، المملكة العربية السعودية</p>
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                <div className="flex items-start gap-4">
                  <div className="text-3xl">📧</div>
                  <div>
                    <h3 className="font-bold text-lg text-gray-900 mb-1">البريد الإلكتروني</h3>
                    <p className="text-gray-600">info@creativehub.sa</p>
                    <p className="text-gray-600">support@creativehub.sa</p>
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                <div className="flex items-start gap-4">
                  <div className="text-3xl">⏰</div>
                  <div>
                    <h3 className="font-bold text-lg text-gray-900 mb-1">ساعات العمل</h3>
                    <p className="text-gray-600">السبت - الخميس: 9 صباحاً - 6 مساءً</p>
                    <p className="text-gray-600">الدعم التقني: 24/7</p>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-blue-50 to-purple-50 p-6 rounded-xl border border-blue-100">
                <h3 className="font-bold text-lg text-gray-900 mb-3">تابعنا</h3>
                <div className="flex gap-3">
                  <button className="w-12 h-12 bg-white rounded-lg flex items-center justify-center text-2xl hover:shadow-md transition">
                    🐦
                  </button>
                  <button className="w-12 h-12 bg-white rounded-lg flex items-center justify-center text-2xl hover:shadow-md transition">
                    📘
                  </button>
                  <button className="w-12 h-12 bg-white rounded-lg flex items-center justify-center text-2xl hover:shadow-md transition">
                    📷
                  </button>
                  <button className="w-12 h-12 bg-white rounded-lg flex items-center justify-center text-2xl hover:shadow-md transition">
                    💼
                  </button>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-200">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">أرسل رسالة</h2>

              {success && (
                <div className="mb-4 p-4 bg-green-50 border border-green-200 rounded-lg">
                  <p className="text-green-800 font-semibold">✅ تم إرسال رسالتك بنجاح!</p>
                  <p className="text-green-700 text-sm">سنرد عليك في أقرب وقت ممكن</p>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label className="block text-gray-700 font-semibold mb-2">
                    الاسم الكامل
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="أدخل اسمك"
                    required
                  />
                </div>

                <div>
                  <label className="block text-gray-700 font-semibold mb-2">
                    البريد الإلكتروني
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="example@email.com"
                    required
                  />
                </div>

                <div>
                  <label className="block text-gray-700 font-semibold mb-2">
                    الموضوع
                  </label>
                  <select
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  >
                    <option value="">اختر الموضوع</option>
                    <option value="general">استفسار عام</option>
                    <option value="technical">دعم تقني</option>
                    <option value="payment">مشكلة في الدفع</option>
                    <option value="dispute">نزاع</option>
                    <option value="other">أخرى</option>
                  </select>
                </div>

                <div>
                  <label className="block text-gray-700 font-semibold mb-2">
                    الرسالة
                  </label>
                  <textarea
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="اكتب رسالتك هنا..."
                    rows={5}
                    required
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition disabled:bg-gray-400 disabled:cursor-not-allowed"
                >
                  {loading ? 'جاري الإرسال...' : 'إرسال الرسالة'}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
