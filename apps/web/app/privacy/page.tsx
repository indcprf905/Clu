import Link from 'next/link';

export default function PrivacyPage() {
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
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 md:p-12">
            <div className="text-center mb-8">
              <div className="text-6xl mb-4">🔒</div>
              <h1 className="text-4xl font-bold text-gray-900 mb-4">سياسة الخصوصية</h1>
              <p className="text-gray-600">آخر تحديث: يناير 2025</p>
            </div>

            <div className="prose prose-lg max-w-none space-y-8 text-gray-700">
              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">1. المقدمة</h2>
                <p>
                  نحن في CreativeHub KSA نلتزم بحماية خصوصيتك وبياناتك الشخصية. توضح هذه السياسة
                  كيفية جمع واستخدام وحماية معلوماتك عند استخدام منصتنا.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">2. البيانات التي نجمعها</h2>
                <p className="mb-3">نقوم بجمع الأنواع التالية من البيانات:</p>
                <ul className="list-disc mr-6 space-y-2">
                  <li>
                    <strong>معلومات الحساب:</strong> الاسم، البريد الإلكتروني، رقم الهاتف، كلمة المرور
                  </li>
                  <li>
                    <strong>معلومات الملف الشخصي:</strong> الصورة الشخصية، السيرة الذاتية، نماذج الأعمال
                  </li>
                  <li>
                    <strong>بيانات المعاملات:</strong> تفاصيل الطلبات، المدفوعات، الفواتير
                  </li>
                  <li>
                    <strong>بيانات الاستخدام:</strong> سجلات النشاط، عنوان IP، نوع المتصفح
                  </li>
                  <li>
                    <strong>المراسلات:</strong> الرسائل والمحادثات داخل المنصة
                  </li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">3. كيفية استخدام البيانات</h2>
                <p className="mb-3">نستخدم بياناتك للأغراض التالية:</p>
                <ul className="list-disc mr-6 space-y-2">
                  <li>تقديم وتحسين خدماتنا</li>
                  <li>معالجة الطلبات والمدفوعات</li>
                  <li>التواصل معك بخصوص حسابك وطلباتك</li>
                  <li>حماية المنصة من الاحتيال وإساءة الاستخدام</li>
                  <li>تحسين تجربة المستخدم وتطوير المنصة</li>
                  <li>الامتثال للقوانين واللوائح</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">4. مشاركة البيانات</h2>
                <p className="mb-3">لا نبيع بياناتك الشخصية. نشارك بياناتك فقط في الحالات التالية:</p>
                <ul className="list-disc mr-6 space-y-2">
                  <li>مع الأطراف المشاركة في المعاملة (العميل ومقدم الخدمة)</li>
                  <li>مع مزودي خدمات الدفع لمعالجة المدفوعات</li>
                  <li>مع مزودي الخدمات التقنية (الاستضافة، التخزين السحابي)</li>
                  <li>عند الاستجابة لطلبات قانونية أو أوامر قضائية</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">5. أمان البيانات</h2>
                <p className="mb-3">نتخذ الإجراءات التالية لحماية بياناتك:</p>
                <ul className="list-disc mr-6 space-y-2">
                  <li>تشفير البيانات أثناء النقل والتخزين (SSL/TLS)</li>
                  <li>تشفير كلمات المرور باستخدام خوارزميات آمنة</li>
                  <li>مراقبة الأنظمة للكشف عن التهديدات الأمنية</li>
                  <li>تحديد الصلاحيات والوصول للبيانات الحساسة</li>
                  <li>إجراء نسخ احتياطية منتظمة</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">6. حقوقك</h2>
                <p className="mb-3">لديك الحقوق التالية فيما يتعلق ببياناتك:</p>
                <ul className="list-disc mr-6 space-y-2">
                  <li>الوصول إلى بياناتك الشخصية</li>
                  <li>تصحيح البيانات غير الصحيحة</li>
                  <li>حذف بياناتك (في حالات معينة)</li>
                  <li>الاعتراض على معالجة بياناتك</li>
                  <li>نقل بياناتك إلى خدمة أخرى</li>
                  <li>سحب الموافقة في أي وقت</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">7. ملفات تعريف الارتباط (Cookies)</h2>
                <p>
                  نستخدم ملفات تعريف الارتباط لتحسين تجربتك على المنصة، بما في ذلك حفظ تفضيلاتك
                  وتحليل استخدام المنصة. يمكنك التحكم في ملفات تعريف الارتباط من خلال إعدادات متصفحك.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">8. الاحتفاظ بالبيانات</h2>
                <p>
                  نحتفظ ببياناتك الشخصية طالما كان حسابك نشطاً أو حسب الحاجة لتقديم خدماتنا. قد نحتفظ
                  ببعض البيانات لفترة أطول للامتثال للالتزامات القانونية أو حل النزاعات.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">9. التغييرات على السياسة</h2>
                <p>
                  قد نقوم بتحديث هذه السياسة من وقت لآخر. سنخطرك بأي تغييرات جوهرية عبر البريد
                  الإلكتروني أو من خلال إشعار على المنصة.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">10. تواصل معنا</h2>
                <p>
                  إذا كان لديك أي أسئلة حول سياسة الخصوصية أو ترغب في ممارسة حقوقك، يرجى التواصل معنا:
                </p>
                <div className="mt-4 p-4 bg-blue-50 rounded-lg">
                  <p><strong>البريد الإلكتروني:</strong> privacy@creativehub.sa</p>
                  <p><strong>العنوان:</strong> الرياض، المملكة العربية السعودية</p>
                </div>
              </section>
            </div>

            <div className="mt-12 pt-8 border-t border-gray-200">
              <div className="flex gap-4 justify-center">
                <Link
                  href="/terms"
                  className="text-blue-600 hover:underline font-semibold"
                >
                  شروط الاستخدام
                </Link>
                <Link
                  href="/contact"
                  className="text-blue-600 hover:underline font-semibold"
                >
                  تواصل معنا
                </Link>
                <Link
                  href="/"
                  className="text-blue-600 hover:underline font-semibold"
                >
                  العودة للرئيسية
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
