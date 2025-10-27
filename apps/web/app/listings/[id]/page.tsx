'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter, useParams } from 'next/navigation';

interface Listing {
  id: string;
  title: string;
  summary: string;
  description?: string;
  price: number;
  deliveryDays: number;
  samples: string[];
  status: string;
  category: {
    id: string;
    slug: string;
    nameAr: string;
  };
  provider: {
    id: string;
    name: string;
    avatar?: string;
    bio?: string;
    memberSince?: string;
  };
  reviews?: Array<{
    id: string;
    rating: number;
    comment: string;
    client: { name: string };
    createdAt: string;
  }>;
  avgRating?: number;
  totalReviews?: number;
}

export default function ListingDetailPage() {
  const params = useParams();
  const router = useRouter();
  const listingId = params.id as string;

  const [listing, setListing] = useState<Listing | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [orderLoading, setOrderLoading] = useState(false);

  useEffect(() => {
    fetchListing();
  }, [listingId]);

  const fetchListing = async () => {
    setLoading(true);
    setError('');

    try {
      const response = await fetch(`http://localhost:4000/api/listings/${listingId}`);

      if (!response.ok) {
        throw new Error('فشل تحميل تفاصيل الخدمة');
      }

      const data = await response.json();
      setListing(data);
    } catch (err: any) {
      setError(err.message || 'حدث خطأ في تحميل الخدمة');
      // Use mock data
      setListing(getMockListing(listingId));
    } finally {
      setLoading(false);
    }
  };

  const getMockListing = (id: string): Listing => {
    return {
      id,
      title: 'تعليق صوتي احترافي للإعلانات التجارية',
      summary: 'تعليق صوتي بجودة استوديو لجميع أنواع الإعلانات التجارية والفيديوهات الترويجية',
      description: `أقدم لك خدمة التعليق الصوتي الاحترافية بجودة استوديو عالية.

**ما تحصل عليه:**
- تسجيل صوتي بجودة استوديو
- معالجة صوتية احترافية
- إزالة الضوضاء والتشويش
- تعديلات مجانية (حتى 2 مرات)
- تسليم بصيغ متعددة (MP3, WAV)

**مثالي لـ:**
- الإعلانات التجارية
- فيديوهات اليوتيوب
- البودكاست
- الكتب الصوتية
- الرسائل الترحيبية

**ملاحظات:**
- يرجى إرسال النص قبل البدء
- التسليم خلال 3 أيام عمل
- أتحدث العربية الفصحى واللهجات السعودية`,
      price: 500,
      deliveryDays: 3,
      samples: ['sample1.mp3', 'sample2.mp3'],
      status: 'ACTIVE',
      category: { id: '1', slug: 'voice-over', nameAr: 'التعليق الصوتي' },
      provider: {
        id: 'provider1',
        name: 'أحمد المحترف',
        bio: 'معلق صوتي محترف مع خبرة 8 سنوات في مجال الإعلانات التجارية والدوبلاج',
        memberSince: '2022-01-15',
      },
      avgRating: 4.8,
      totalReviews: 15,
      reviews: [
        {
          id: '1',
          rating: 5,
          comment: 'عمل ممتاز وتسليم سريع! صوت واضح واحترافي جداً',
          client: { name: 'خالد العميل' },
          createdAt: new Date(Date.now() - 86400000).toISOString(),
        },
        {
          id: '2',
          rating: 5,
          comment: 'متعاون جداً وجودة العمل رائعة',
          client: { name: 'سارة العميلة' },
          createdAt: new Date(Date.now() - 172800000).toISOString(),
        },
        {
          id: '3',
          rating: 4,
          comment: 'جيد جداً، لكن احتاج تعديل بسيط',
          client: { name: 'محمد العميل' },
          createdAt: new Date(Date.now() - 259200000).toISOString(),
        },
      ],
    };
  };

  const handleOrderNow = async () => {
    const token = localStorage.getItem('access_token');

    if (!token) {
      router.push(`/login?redirect=/listings/${listingId}`);
      return;
    }

    setOrderLoading(true);

    try {
      const response = await fetch('http://localhost:4000/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          listingId: listing?.id,
        }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || 'فشل إنشاء الطلب');
      }

      const order = await response.json();
      router.push(`/orders/${order.id}`);
    } catch (err: any) {
      alert(err.message || 'حدث خطأ في إنشاء الطلب');
    } finally {
      setOrderLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-blue-600 border-t-transparent"></div>
          <p className="mt-4 text-gray-600">جاري التحميل...</p>
        </div>
      </div>
    );
  }

  if (error && !listing) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">😕</div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">حدث خطأ</h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <Link
            href="/listings"
            className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-semibold"
          >
            العودة للخدمات
          </Link>
        </div>
      </div>
    );
  }

  if (!listing) return null;

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
              <Link href="/listings" className="text-blue-600 font-semibold">
                الخدمات
              </Link>
              <Link href="/dashboard" className="text-gray-700 hover:text-blue-600 transition">
                لوحة التحكم
              </Link>
            </nav>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <div className="mb-6 text-sm">
          <Link href="/" className="text-gray-600 hover:text-blue-600">
            الرئيسية
          </Link>
          <span className="mx-2 text-gray-400">/</span>
          <Link href="/listings" className="text-gray-600 hover:text-blue-600">
            الخدمات
          </Link>
          <span className="mx-2 text-gray-400">/</span>
          <span className="text-gray-900">{listing.title}</span>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Title and Category */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
              <div className="mb-3">
                <span className="inline-block px-3 py-1 bg-blue-50 text-blue-600 text-sm font-semibold rounded-full">
                  {listing.category.nameAr}
                </span>
              </div>
              <h1 className="text-3xl font-bold text-gray-900 mb-4">{listing.title}</h1>
              <p className="text-lg text-gray-600">{listing.summary}</p>
            </div>

            {/* Description */}
            {listing.description && (
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">تفاصيل الخدمة</h2>
                <div className="prose prose-sm max-w-none text-gray-700 whitespace-pre-line">
                  {listing.description}
                </div>
              </div>
            )}

            {/* Work Samples */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">نماذج من الأعمال</h2>
              <div className="grid md:grid-cols-2 gap-4">
                {listing.samples.map((sample, index) => (
                  <div
                    key={index}
                    className="p-6 bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl border border-blue-100 flex flex-col items-center justify-center"
                  >
                    <div className="text-5xl mb-3">
                      {sample.endsWith('.mp3') || sample.endsWith('.wav')
                        ? '🎵'
                        : sample.endsWith('.mp4')
                        ? '🎥'
                        : '📄'}
                    </div>
                    <p className="text-sm text-gray-700 font-semibold">عينة {index + 1}</p>
                    <button className="mt-3 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700 transition">
                      تشغيل / عرض
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Reviews */}
            {listing.reviews && listing.reviews.length > 0 && (
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">التقييمات</h2>
                <div className="space-y-4">
                  {listing.reviews.map((review) => (
                    <div key={review.id} className="pb-4 border-b border-gray-200 last:border-0">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center text-white font-bold">
                            {review.client.name[0]}
                          </div>
                          <div>
                            <p className="font-semibold text-gray-900">{review.client.name}</p>
                            <p className="text-xs text-gray-500">
                              {new Date(review.createdAt).toLocaleDateString('ar-SA')}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-1">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <span
                              key={i}
                              className={i < review.rating ? 'text-yellow-500' : 'text-gray-300'}
                            >
                              ⭐
                            </span>
                          ))}
                        </div>
                      </div>
                      <p className="text-gray-700">{review.comment}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-4 space-y-6">
              {/* Order Card */}
              <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200">
                <div className="text-center mb-6">
                  <div className="text-4xl font-bold text-gray-900 mb-2">
                    {listing.price} ر.س
                  </div>
                  <div className="text-sm text-gray-600">
                    التسليم خلال {listing.deliveryDays} أيام
                  </div>
                </div>

                <button
                  onClick={handleOrderNow}
                  disabled={orderLoading || listing.status !== 'ACTIVE'}
                  className="w-full py-4 bg-blue-600 text-white rounded-lg font-bold text-lg hover:bg-blue-700 transition disabled:bg-gray-400 disabled:cursor-not-allowed mb-3"
                >
                  {orderLoading ? 'جاري إنشاء الطلب...' : 'اطلب الآن'}
                </button>

                <button className="w-full py-3 border-2 border-blue-600 text-blue-600 rounded-lg font-semibold hover:bg-blue-50 transition">
                  تواصل مع البائع
                </button>

                {listing.status !== 'ACTIVE' && (
                  <p className="text-center text-red-600 text-sm mt-2">
                    هذه الخدمة غير متاحة حالياً
                  </p>
                )}
              </div>

              {/* Provider Card */}
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                <h3 className="font-bold text-lg mb-4">عن مقدم الخدمة</h3>
                <div className="flex items-start gap-3 mb-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center text-white font-bold text-2xl flex-shrink-0">
                    {listing.provider.name[0]}
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900">{listing.provider.name}</h4>
                    {listing.provider.memberSince && (
                      <p className="text-xs text-gray-500">
                        عضو منذ {new Date(listing.provider.memberSince).getFullYear()}
                      </p>
                    )}
                  </div>
                </div>

                {listing.avgRating && (
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-yellow-500 text-xl">⭐</span>
                    <span className="font-bold text-gray-900">{listing.avgRating.toFixed(1)}</span>
                    <span className="text-gray-500 text-sm">
                      ({listing.totalReviews} تقييم)
                    </span>
                  </div>
                )}

                {listing.provider.bio && (
                  <p className="text-gray-600 text-sm mb-4">{listing.provider.bio}</p>
                )}

                <Link
                  href={`/providers/${listing.provider.id}`}
                  className="block w-full py-2 text-center border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition font-semibold"
                >
                  عرض الملف الشخصي
                </Link>
              </div>

              {/* Trust Badges */}
              <div className="bg-gradient-to-br from-blue-50 to-purple-50 p-6 rounded-xl border border-blue-100">
                <h3 className="font-bold text-lg mb-4 text-gray-900">لماذا CreativeHub؟</h3>
                <div className="space-y-3 text-sm">
                  <div className="flex items-start gap-2">
                    <span className="text-xl">🔒</span>
                    <div>
                      <p className="font-semibold text-gray-900">دفع آمن</p>
                      <p className="text-gray-600 text-xs">حماية كاملة لأموالك</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-xl">✅</span>
                    <div>
                      <p className="font-semibold text-gray-900">ضمان الجودة</p>
                      <p className="text-gray-600 text-xs">استرداد إذا لم تكن راضياً</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-xl">💬</span>
                    <div>
                      <p className="font-semibold text-gray-900">دعم 24/7</p>
                      <p className="text-gray-600 text-xs">نساعدك في أي وقت</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
