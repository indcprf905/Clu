import Link from 'next/link';

export default function TermsPage() {
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
              <div className="text-6xl mb-4">📋</div>
              <h1 className="text-4xl font-bold text-gray-900 mb-4">شروط الاستخدام</h1>
              <p className="text-gray-600">آخر تحديث: يناير 2025</p>
            </div>

            <div className="prose prose-lg max-w-none space-y-8 text-gray-700">
              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">1. القبول بالشروط</h2>
                <p>
                  باستخدامك لمنصة CreativeHub KSA، فإنك توافق على الالتزام بهذه الشروط والأحكام.
                  إذا كنت لا توافق على أي من هذه الشروط، يرجى عدم استخدام المنصة.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">2. الأهلية</h2>
                <p className="mb-3">للاستخدام المنصة، يجب أن:</p>
                <ul className="list-disc mr-6 space-y-2">
                  <li>تكون بعمر 18 عاماً أو أكثر</li>
                  <li>تمتلك الأهلية القانونية لإبرام العقود</li>
                  <li>تقدم معلومات صحيحة ودقيقة</li>
                  <li>لا تكون محظوراً من استخدام المنصة سابقاً</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">3. الحسابات</h2>
                <p className="mb-3">عند إنشاء حساب:</p>
                <ul className="list-disc mr-6 space-y-2">
                  <li>أنت مسؤول عن الحفاظ على سرية كلمة المرور</li>
                  <li>أنت مسؤول عن جميع الأنشطة التي تتم من خلال حسابك</li>
                  <li>يجب عليك إخطارنا فوراً بأي استخدام غير مصرح به</li>
                  <li>لا يجوز نقل حسابك إلى شخص آخر</li>
                  <li>يمكنك إنشاء حساب واحد فقط</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">4. الخدمات والرسوم</h2>
                <p className="mb-3">
                  <strong>للعملاء:</strong>
                </p>
                <ul className="list-disc mr-6 space-y-2 mb-4">
                  <li>يمكنك تصفح الخدمات وطلبها من مقدمي الخدمات</li>
                  <li>الأسعار محددة من قبل مقدمي الخدمات</li>
                  <li>يتم حجز المبلغ عند الطلب (نظام الضمان)</li>
                  <li>يتم تحرير المبلغ لمقدم الخدمة بعد التسليم والقبول</li>
                </ul>
                <p className="mb-3">
                  <strong>لمقدمي الخدمات:</strong>
                </p>
                <ul className="list-disc mr-6 space-y-2">
                  <li>يمكنك إنشاء وإدارة خدماتك</li>
                  <li>تقوم المنصة بخصم عمولة 10% من كل طلب</li>
                  <li>يجب تسليم العمل في الموعد المحدد</li>
                  <li>يجب أن تكون نماذج الأعمال أصلية وخاصة بك</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">5. المدفوعات</h2>
                <ul className="list-disc mr-6 space-y-2">
                  <li>نستخدم مزودي دفع موثوقين لمعالجة المدفوعات</li>
                  <li>جميع المدفوعات بالريال السعودي</li>
                  <li>يتم حجز المبلغ في نظام الضمان حتى إتمام الطلب</li>
                  <li>يمكن طلب استرداد الأموال في حالات معينة</li>
                  <li>عمولة المنصة 10% من قيمة كل طلب</li>
                  <li>يمكن سحب الأرباح من المحفظة في أي وقت</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">6. المحتوى والملكية الفكرية</h2>
                <p className="mb-3">
                  <strong>المحتوى الذي تنشئه:</strong>
                </p>
                <ul className="list-disc mr-6 space-y-2 mb-4">
                  <li>تحتفظ بحقوق الملكية لمحتواك</li>
                  <li>تمنحنا ترخيصاً لاستخدام المحتوى على المنصة</li>
                  <li>يجب أن يكون المحتوى قانونياً ولا ينتهك حقوق الآخرين</li>
                  <li>يُحظر المحتوى المسيء أو الاحتيالي</li>
                </ul>
                <p className="mb-3">
                  <strong>المحتوى المُسلّم:</strong>
                </p>
                <ul className="list-disc mr-6 space-y-2">
                  <li>حقوق الملكية تنتقل للعميل بعد الدفع الكامل</li>
                  <li>يحتفظ مقدم الخدمة بحق عرضه كنموذج عمل (Portfolio)</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">7. السلوك المحظور</h2>
                <p className="mb-3">يُحظر القيام بما يلي:</p>
                <ul className="list-disc mr-6 space-y-2">
                  <li>انتهاك أي قوانين أو لوائح</li>
                  <li>التحايل على رسوم المنصة بالتعامل خارجها</li>
                  <li>نشر محتوى مزيف أو مضلل</li>
                  <li>الاحتيال أو إساءة استخدام المنصة</li>
                  <li>التحرش أو الإساءة للمستخدمين الآخرين</li>
                  <li>استخدام البوتات أو الأدوات الآلية</li>
                  <li>محاولة الوصول غير المصرح به للأنظمة</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">8. النزاعات</h2>
                <p>
                  في حالة حدوث نزاع بين العميل ومقدم الخدمة، يمكن فتح نزاع من خلال المنصة. سيقوم
                  فريقنا بمراجعة النزاع واتخاذ القرار المناسب بناءً على الأدلة المقدمة.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">9. الإنهاء</h2>
                <p className="mb-3">نحتفظ بالحق في:</p>
                <ul className="list-disc mr-6 space-y-2">
                  <li>تعليق أو إنهاء حسابك في أي وقت</li>
                  <li>حذف أي محتوى ينتهك هذه الشروط</li>
                  <li>رفض تقديم الخدمات لأي شخص</li>
                </ul>
                <p className="mt-3">
                  يمكنك إغلاق حسابك في أي وقت، ولكن تبقى مسؤولاً عن أي طلبات نشطة أو التزامات مالية.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">10. إخلاء المسؤولية</h2>
                <p>
                  المنصة توفر وسيلة للربط بين العملاء ومقدمي الخدمات. نحن لسنا مسؤولين عن جودة
                  الخدمات المقدمة أو أي أضرار ناتجة عن التعاملات بين المستخدمين. نوصي بتقييم
                  مقدمي الخدمات قبل الطلب.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">11. تحديد المسؤولية</h2>
                <p>
                  إلى أقصى حد يسمح به القانون، لن نكون مسؤولين عن أي أضرار غير مباشرة أو عرضية أو
                  خاصة ناتجة عن استخدام المنصة. مسؤوليتنا الإجمالية محدودة بالمبلغ الذي دفعته
                  للمنصة خلال الستة أشهر السابقة.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">12. التعديلات</h2>
                <p>
                  نحتفظ بالحق في تعديل هذه الشروط في أي وقت. سنخطرك بأي تغييرات جوهرية عبر البريد
                  الإلكتروني أو من خلال إشعار على المنصة. استمرارك في استخدام المنصة بعد التعديلات
                  يعني موافقتك على الشروط المُعدّلة.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">13. القانون الحاكم</h2>
                <p>
                  تخضع هذه الشروط لقوانين المملكة العربية السعودية. أي نزاع ناشئ عن هذه الشروط
                  سيتم حله في المحاكم المختصة في المملكة العربية السعودية.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">14. تواصل معنا</h2>
                <p>
                  إذا كان لديك أي أسئلة حول شروط الاستخدام، يرجى التواصل معنا:
                </p>
                <div className="mt-4 p-4 bg-blue-50 rounded-lg">
                  <p><strong>البريد الإلكتروني:</strong> legal@creativehub.sa</p>
                  <p><strong>العنوان:</strong> الرياض، المملكة العربية السعودية</p>
                </div>
              </section>
            </div>

            <div className="mt-12 pt-8 border-t border-gray-200">
              <div className="flex gap-4 justify-center">
                <Link
                  href="/privacy"
                  className="text-blue-600 hover:underline font-semibold"
                >
                  سياسة الخصوصية
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
