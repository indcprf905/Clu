'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useSearchParams, useRouter } from 'next/navigation';

interface Listing {
  id: string;
  title: string;
  summary: string;
  price: number;
  deliveryDays: number;
  samples: string[];
  category: {
    id: string;
    slug: string;
    nameAr: string;
  };
  provider: {
    id: string;
    name: string;
    avatar?: string;
  };
  _count?: {
    reviews: number;
  };
  avgRating?: number;
}

const categories = [
  { slug: 'voice-over', name: 'التعليق الصوتي', icon: '🎙️' },
  { slug: 'ad-shoot', name: 'تصوير الإعلانات', icon: '🎬' },
  { slug: 'editing', name: 'المونتاج', icon: '✂️' },
  { slug: 'ugc', name: 'محتوى المستخدمين', icon: '📱' },
  { slug: 'copywriting', name: 'كتابة المحتوى', icon: '✍️' },
];

export default function ListingsPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const categoryParam = searchParams.get('category');

  const [listings, setListings] = useState<Listing[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filters, setFilters] = useState({
    category: categoryParam || '',
    search: '',
    minPrice: '',
    maxPrice: '',
    sortBy: 'newest',
  });

  useEffect(() => {
    fetchListings();
  }, [filters.category, filters.sortBy]);

  const fetchListings = async () => {
    setLoading(true);
    setError('');

    try {
      const params = new URLSearchParams();
      if (filters.category) params.append('category', filters.category);
      if (filters.search) params.append('search', filters.search);
      if (filters.minPrice) params.append('minPrice', filters.minPrice);
      if (filters.maxPrice) params.append('maxPrice', filters.maxPrice);
      params.append('sortBy', filters.sortBy);

      const response = await fetch(`http://localhost:4000/api/listings?${params.toString()}`);

      if (!response.ok) {
        throw new Error('فشل تحميل الخدمات');
      }

      const data = await response.json();
      setListings(data.listings || data);
    } catch (err: any) {
      setError(err.message || 'حدث خطأ في تحميل الخدمات');
      // Use mock data for now if API fails
      setListings(getMockListings());
    } finally {
      setLoading(false);
    }
  };

  const getMockListings = (): Listing[] => {
    return [
      {
        id: '1',
        title: 'تعليق صوتي احترافي للإعلانات التجارية',
        summary: 'تعليق صوتي بجودة استوديو لجميع أنواع الإعلانات',
        price: 500,
        deliveryDays: 3,
        samples: ['sample1.mp3'],
        category: { id: '1', slug: 'voice-over', nameAr: 'التعليق الصوتي' },
        provider: { id: 'p1', name: 'أحمد المحترف' },
        _count: { reviews: 15 },
        avgRating: 4.8,
      },
      {
        id: '2',
        title: 'تصوير إعلان تجاري احترافي',
        summary: 'تصوير وإنتاج إعلانات تجارية بجودة سينمائية',
        price: 3000,
        deliveryDays: 7,
        samples: ['sample1.mp4'],
        category: { id: '2', slug: 'ad-shoot', nameAr: 'تصوير الإعلانات' },
        provider: { id: 'p2', name: 'محمد المصور' },
        _count: { reviews: 22 },
        avgRating: 4.9,
      },
      {
        id: '3',
        title: 'مونتاج فيديو احترافي',
        summary: 'مونتاج وتحرير فيديو بأعلى جودة مع مؤثرات',
        price: 800,
        deliveryDays: 5,
        samples: ['sample1.mp4'],
        category: { id: '3', slug: 'editing', nameAr: 'المونتاج' },
        provider: { id: 'p3', name: 'خالد المونتير' },
        _count: { reviews: 18 },
        avgRating: 4.7,
      },
      {
        id: '4',
        title: 'محتوى UGC للسوشيال ميديا',
        summary: 'إنشاء محتوى جذاب وأصيل للسوشيال ميديا',
        price: 600,
        deliveryDays: 4,
        samples: ['sample1.mp4'],
        category: { id: '4', slug: 'ugc', nameAr: 'محتوى المستخدمين' },
        provider: { id: 'p4', name: 'سارة المبدعة' },
        _count: { reviews: 12 },
        avgRating: 4.6,
      },
      {
        id: '5',
        title: 'كتابة نصوص تسويقية إبداعية',
        summary: 'كتابة نصوص مؤثرة لإعلاناتك ومنشوراتك',
        price: 400,
        deliveryDays: 2,
        samples: ['sample1.pdf'],
        category: { id: '5', slug: 'copywriting', nameAr: 'كتابة المحتوى' },
        provider: { id: 'p5', name: 'فاطمة الكاتبة' },
        _count: { reviews: 25 },
        avgRating: 5.0,
      },
    ];
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    fetchListings();
  };

  const handleCategoryFilter = (slug: string) => {
    setFilters({ ...filters, category: slug === filters.category ? '' : slug });
    router.push(slug ? `/listings?category=${slug}` : '/listings');
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
              <Link href="/listings" className="text-blue-600 font-semibold">
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

      <div className="container mx-auto px-4 py-8">
        {/* Page Title */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">تصفح الخدمات</h1>
          <p className="text-gray-600">اكتشف أفضل المواهب الإبداعية في المملكة</p>
        </div>

        {/* Categories Filter */}
        <div className="mb-6">
          <div className="flex gap-3 flex-wrap">
            <button
              onClick={() => handleCategoryFilter('')}
              className={`px-4 py-2 rounded-lg font-semibold transition ${
                !filters.category
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200'
              }`}
            >
              الكل
            </button>
            {categories.map((cat) => (
              <button
                key={cat.slug}
                onClick={() => handleCategoryFilter(cat.slug)}
                className={`px-4 py-2 rounded-lg font-semibold transition flex items-center gap-2 ${
                  filters.category === cat.slug
                    ? 'bg-blue-600 text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200'
                }`}
              >
                <span>{cat.icon}</span>
                <span>{cat.name}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="grid lg:grid-cols-4 gap-6">
          {/* Sidebar Filters */}
          <div className="lg:col-span-1">
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 sticky top-4">
              <h3 className="font-bold text-lg mb-4">تصفية النتائج</h3>

              {/* Search */}
              <form onSubmit={handleSearch} className="mb-6">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  بحث
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={filters.search}
                    onChange={(e) => setFilters({ ...filters, search: e.target.value })}
                    placeholder="ابحث عن خدمة..."
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                  >
                    🔍
                  </button>
                </div>
              </form>

              {/* Price Range */}
              <div className="mb-6">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  نطاق السعر (ر.س)
                </label>
                <div className="flex gap-2">
                  <input
                    type="number"
                    value={filters.minPrice}
                    onChange={(e) => setFilters({ ...filters, minPrice: e.target.value })}
                    placeholder="من"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <input
                    type="number"
                    value={filters.maxPrice}
                    onChange={(e) => setFilters({ ...filters, maxPrice: e.target.value })}
                    placeholder="إلى"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <button
                  onClick={fetchListings}
                  className="w-full mt-2 px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-900 transition text-sm"
                >
                  تطبيق
                </button>
              </div>

              {/* Sort */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  ترتيب حسب
                </label>
                <select
                  value={filters.sortBy}
                  onChange={(e) => setFilters({ ...filters, sortBy: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="newest">الأحدث</option>
                  <option value="price-low">السعر: من الأقل للأعلى</option>
                  <option value="price-high">السعر: من الأعلى للأقل</option>
                  <option value="rating">الأعلى تقييماً</option>
                </select>
              </div>
            </div>
          </div>

          {/* Listings Grid */}
          <div className="lg:col-span-3">
            {error && (
              <div className="mb-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                <p className="text-yellow-800 text-sm">{error} - يتم عرض بيانات تجريبية</p>
              </div>
            )}

            {loading ? (
              <div className="text-center py-12">
                <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-blue-600 border-t-transparent"></div>
                <p className="mt-4 text-gray-600">جاري التحميل...</p>
              </div>
            ) : listings.length === 0 ? (
              <div className="text-center py-12 bg-white rounded-xl">
                <div className="text-6xl mb-4">🔍</div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">لا توجد نتائج</h3>
                <p className="text-gray-600">جرب تغيير معايير البحث</p>
              </div>
            ) : (
              <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
                {listings.map((listing) => (
                  <Link
                    key={listing.id}
                    href={`/listings/${listing.id}`}
                    className="bg-white rounded-xl shadow-sm border border-gray-200 hover:shadow-lg transition-all overflow-hidden group"
                  >
                    {/* Thumbnail */}
                    <div className="h-48 bg-gradient-to-br from-blue-100 to-blue-50 flex items-center justify-center group-hover:scale-105 transition-transform">
                      <span className="text-6xl">
                        {categories.find((c) => c.slug === listing.category.slug)?.icon || '📦'}
                      </span>
                    </div>

                    <div className="p-5">
                      {/* Category Badge */}
                      <div className="mb-2">
                        <span className="inline-block px-3 py-1 bg-blue-50 text-blue-600 text-xs font-semibold rounded-full">
                          {listing.category.nameAr}
                        </span>
                      </div>

                      {/* Title */}
                      <h3 className="font-bold text-lg mb-2 text-gray-900 group-hover:text-blue-600 transition">
                        {listing.title}
                      </h3>

                      {/* Summary */}
                      <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                        {listing.summary}
                      </p>

                      {/* Provider */}
                      <div className="flex items-center gap-2 mb-4">
                        <div className="w-8 h-8 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                          {listing.provider.name[0]}
                        </div>
                        <span className="text-gray-700 text-sm font-semibold">
                          {listing.provider.name}
                        </span>
                      </div>

                      {/* Rating */}
                      {listing.avgRating && (
                        <div className="flex items-center gap-1 mb-4">
                          <span className="text-yellow-500">⭐</span>
                          <span className="font-bold text-gray-900">{listing.avgRating.toFixed(1)}</span>
                          <span className="text-gray-500 text-sm">
                            ({listing._count?.reviews || 0})
                          </span>
                        </div>
                      )}

                      {/* Footer */}
                      <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                        <div>
                          <div className="text-2xl font-bold text-gray-900">
                            {listing.price} ر.س
                          </div>
                          <div className="text-xs text-gray-500">
                            التسليم: {listing.deliveryDays} أيام
                          </div>
                        </div>
                        <div className="px-4 py-2 bg-blue-600 text-white rounded-lg font-semibold group-hover:bg-blue-700 transition">
                          اطلب الآن
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}

            {/* Pagination - Placeholder */}
            {!loading && listings.length > 0 && (
              <div className="mt-8 flex justify-center gap-2">
                <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition">
                  السابق
                </button>
                <button className="px-4 py-2 bg-blue-600 text-white rounded-lg">
                  1
                </button>
                <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition">
                  2
                </button>
                <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition">
                  3
                </button>
                <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition">
                  التالي
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
