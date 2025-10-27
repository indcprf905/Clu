import Link from 'next/link';

export default function HelpPage() {
  const faqs = [
    {
      q: 'كيف أبدأ كمقدم خدمة؟',
      a: 'سجل حساب جديد واختر "مقدم خدمة"، ثم أنشئ خدمتك الأولى من لوحة التحكم',
    },
    {
      q: 'كيف يتم الدفع؟',
      a: 'نستخدم نظام ضمان (Escrow) حيث يتم حجز المبلغ عند الطلب وتحويله للبائع بعد إتمام العمل',
    },
    {
      q: 'ماذا لو لم أكن راضياً عن العمل؟',
      a: 'يمكنك طلب تعديلات أو فتح نزاع، وفريقنا سيساعدك في حل المشكلة',
    },
    {
      q: 'كم تبلغ عمولة المنصة؟',
      a: 'نأخذ عمولة 10% من قيمة كل طلب لتغطية تكاليف التشغيل والدعم',
    },
    {
      q: 'كيف أسحب أرباحي؟',
      a: 'يمكنك سحب رصيدك من المحفظة إلى حسابك البنكي في أي وقت',
    },
  ];

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
            <div className="text-6xl mb-4">❓</div>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">مركز المساعدة</h1>
            <p className="text-xl text-gray-600">
              هل لديك سؤال؟ نحن هنا لمساعدتك
            </p>
          </div>

          {/* Quick Links */}
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 text-center hover:shadow-md transition">
              <div className="text-4xl mb-3">📝</div>
              <h3 className="font-bold text-lg mb-2">كيف تبدأ</h3>
              <p className="text-gray-600 text-sm">تعلم كيفية إنشاء حساب وطلب الخدمات</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 text-center hover:shadow-md transition">
              <div className="text-4xl mb-3">💰</div>
              <h3 className="font-bold text-lg mb-2">الدفع والرصيد</h3>
              <p className="text-gray-600 text-sm">كل ما تحتاج معرفته عن المدفوعات</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 text-center hover:shadow-md transition">
              <div className="text-4xl mb-3">⭐</div>
              <h3 className="font-bold text-lg mb-2">إرشادات الجودة</h3>
              <p className="text-gray-600 text-sm">معايير الجودة والتقييمات</p>
            </div>
          </div>

          {/* FAQs */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">الأسئلة الشائعة</h2>
            <div className="space-y-6">
              {faqs.map((faq, index) => (
                <div key={index} className="pb-6 border-b border-gray-200 last:border-0">
                  <h3 className="font-bold text-lg text-gray-900 mb-2">{faq.q}</h3>
                  <p className="text-gray-600">{faq.a}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Contact Support */}
          <div className="mt-12 bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl p-8 border border-blue-100 text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              لم تجد إجابة لسؤالك؟
            </h2>
            <p className="text-gray-600 mb-6">
              تواصل مع فريق الدعم وسنكون سعداء بمساعدتك
            </p>
            <Link
              href="/contact"
              className="inline-block px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-semibold"
            >
              تواصل معنا
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
