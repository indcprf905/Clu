import Link from 'next/link';

const categories = [
  { slug: 'voice-over', name: 'التعليق الصوتي', icon: '🎙️', description: 'تعليق صوتي احترافي للإعلانات' },
  { slug: 'ad-shoot', name: 'تصوير الإعلانات', icon: '🎬', description: 'تصوير إعلانات تجارية' },
  { slug: 'editing', name: 'المونتاج', icon: '✂️', description: 'مونتاج فيديو احترافي' },
  { slug: 'ugc', name: 'محتوى المستخدمين', icon: '📱', description: 'محتوى إبداعي للسوشيال ميديا' },
  { slug: 'copywriting', name: 'كتابة المحتوى', icon: '✍️', description: 'كتابة نصوص تسويقية' },
];

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      {/* Header/Navbar */}
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
              <Link href="/register" className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
                إنشاء حساب
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            المركز الإبداعي السعودي
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            منصة موثوقة لربط المبدعين بأصحاب المشاريع. ابحث عن أفضل المواهب في المملكة
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Link
              href="/listings"
              className="px-8 py-4 bg-blue-600 text-white rounded-lg text-lg font-semibold hover:bg-blue-700 transition shadow-lg hover:shadow-xl"
            >
              تصفح الخدمات
            </Link>
            <Link
              href="/register?role=provider"
              className="px-8 py-4 bg-white text-blue-600 border-2 border-blue-600 rounded-lg text-lg font-semibold hover:bg-blue-50 transition"
            >
              ابدأ كمقدم خدمة
            </Link>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-16 px-4 bg-white">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">الفئات المتاحة</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
            {categories.map((cat) => (
              <Link
                key={cat.slug}
                href={`/listings?category=${cat.slug}`}
                className="bg-gradient-to-br from-blue-50 to-white p-6 rounded-xl hover:shadow-lg transition-all border border-gray-100 hover:border-blue-200 group"
              >
                <div className="text-5xl mb-4 group-hover:scale-110 transition-transform">
                  {cat.icon}
                </div>
                <h3 className="font-bold text-lg mb-2">{cat.name}</h3>
                <p className="text-gray-600 text-sm">{cat.description}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">لماذا CreativeHub؟</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition">
              <div className="text-5xl mb-4">🔒</div>
              <h3 className="text-xl font-bold mb-3">دفع آمن</h3>
              <p className="text-gray-600">
                نظام ضمان يحمي حقوق الطرفين حتى اكتمال العمل بنجاح
              </p>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition">
              <div className="text-5xl mb-4">⚡</div>
              <h3 className="text-xl font-bold mb-3">تسليم سريع</h3>
              <p className="text-gray-600">
                مقدمو خدمات محترفون يلتزمون بالمواعيد المحددة
              </p>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition">
              <div className="text-5xl mb-4">⭐</div>
              <h3 className="text-xl font-bold mb-3">جودة عالية</h3>
              <p className="text-gray-600">
                تقييمات حقيقية من عملاء سابقين لضمان الجودة
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 px-4 bg-blue-600 text-white">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold mb-2">500+</div>
              <div className="text-blue-100">مقدم خدمة</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">1000+</div>
              <div className="text-blue-100">مشروع منجز</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">98%</div>
              <div className="text-blue-100">رضا العملاء</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">24/7</div>
              <div className="text-blue-100">دعم فني</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6">جاهز للبدء؟</h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            انضم إلى آلاف المبدعين والعملاء على منصتنا اليوم
          </p>
          <Link
            href="/register"
            className="inline-block px-10 py-4 bg-blue-600 text-white rounded-lg text-lg font-semibold hover:bg-blue-700 transition shadow-lg hover:shadow-xl"
          >
            سجل الآن مجاناً
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-4">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="font-bold text-lg mb-4">عن CreativeHub</h3>
              <p className="text-gray-400 text-sm">
                منصة سعودية رائدة لربط المبدعين بأصحاب المشاريع
              </p>
            </div>
            <div>
              <h3 className="font-bold text-lg mb-4">روابط سريعة</h3>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li><Link href="/listings" className="hover:text-white">الخدمات</Link></li>
                <li><Link href="/register?role=provider" className="hover:text-white">كن مقدم خدمة</Link></li>
                <li><Link href="/dashboard" className="hover:text-white">لوحة التحكم</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-lg mb-4">الدعم</h3>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li><Link href="/help" className="hover:text-white">مركز المساعدة</Link></li>
                <li><Link href="/contact" className="hover:text-white">اتصل بنا</Link></li>
                <li><Link href="/privacy" className="hover:text-white">سياسة الخصوصية</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-lg mb-4">تواصل معنا</h3>
              <p className="text-gray-400 text-sm mb-2">info@creativehub.sa</p>
              <p className="text-gray-400 text-sm">الرياض، المملكة العربية السعودية</p>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400 text-sm">
            <p>© 2025 CreativeHub KSA. جميع الحقوق محفوظة</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
