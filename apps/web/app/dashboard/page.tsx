'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

interface User {
  id: string;
  name: string;
  email: string;
  role: 'CLIENT' | 'PROVIDER' | 'ADMIN';
  avatar?: string;
}

interface WalletData {
  balance: number;
  pendingBalance: number;
}

interface Order {
  id: string;
  title: string;
  price: number;
  status: string;
  createdAt: string;
  client?: { name: string };
  provider?: { name: string };
  listing?: { title: string };
}

export default function DashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [wallet, setWallet] = useState<WalletData>({ balance: 0, pendingBalance: 0 });
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    const token = localStorage.getItem('access_token');
    const userData = localStorage.getItem('user');

    if (!token || !userData) {
      router.push('/login');
      return;
    }

    try {
      const parsedUser = JSON.parse(userData);
      setUser(parsedUser);

      // Fetch wallet and orders
      await Promise.all([fetchWallet(token), fetchOrders(token)]);
    } catch (err) {
      console.error('Auth error:', err);
      router.push('/login');
    } finally {
      setLoading(false);
    }
  };

  const fetchWallet = async (token: string) => {
    try {
      const response = await fetch('http://localhost:4000/api/wallet', {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (response.ok) {
        const data = await response.json();
        setWallet(data);
      }
    } catch (err) {
      // Use mock data if API fails
      setWallet({ balance: 2500, pendingBalance: 800 });
    }
  };

  const fetchOrders = async (token: string) => {
    try {
      const response = await fetch('http://localhost:4000/api/orders', {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (response.ok) {
        const data = await response.json();
        setOrders(data);
      }
    } catch (err) {
      // Use mock data if API fails
      setOrders(getMockOrders());
    }
  };

  const getMockOrders = (): Order[] => {
    return [
      {
        id: '1',
        title: 'طلب #1234',
        price: 500,
        status: 'IN_PROGRESS',
        createdAt: new Date().toISOString(),
        client: { name: 'أحمد العميل' },
        provider: { name: 'محمد المقدم' },
        listing: { title: 'تعليق صوتي احترافي' },
      },
      {
        id: '2',
        title: 'طلب #1233',
        price: 800,
        status: 'COMPLETED',
        createdAt: new Date(Date.now() - 86400000).toISOString(),
        client: { name: 'خالد العميل' },
        provider: { name: 'فاطمة المقدمة' },
        listing: { title: 'مونتاج فيديو احترافي' },
      },
    ];
  };

  const handleLogout = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('user');
    router.push('/');
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'PENDING_PAYMENT':
        return 'bg-yellow-100 text-yellow-800';
      case 'IN_PROGRESS':
        return 'bg-blue-100 text-blue-800';
      case 'DELIVERED':
        return 'bg-purple-100 text-purple-800';
      case 'COMPLETED':
        return 'bg-green-100 text-green-800';
      case 'CANCELLED':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'PENDING_PAYMENT':
        return 'في انتظار الدفع';
      case 'IN_PROGRESS':
        return 'قيد التنفيذ';
      case 'DELIVERED':
        return 'تم التسليم';
      case 'COMPLETED':
        return 'مكتمل';
      case 'CANCELLED':
        return 'ملغي';
      default:
        return status;
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

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="text-2xl font-bold text-blue-600">
              المركز الإبداعي السعودي
            </Link>
            <nav className="flex gap-4 items-center">
              <Link href="/listings" className="text-gray-700 hover:text-blue-600 transition">
                الخدمات
              </Link>
              <Link href="/dashboard" className="text-blue-600 font-semibold">
                لوحة التحكم
              </Link>
              <div className="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-lg">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                  {user.name[0]}
                </div>
                <span className="font-semibold text-gray-900">{user.name}</span>
              </div>
              <button
                onClick={handleLogout}
                className="px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition"
              >
                تسجيل الخروج
              </button>
            </nav>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            مرحباً، {user.name}
          </h1>
          <p className="text-gray-600">
            {user.role === 'ADMIN' && 'لوحة تحكم المدير'}
            {user.role === 'PROVIDER' && 'لوحة تحكم مقدم الخدمة'}
            {user.role === 'CLIENT' && 'لوحة تحكم العميل'}
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-gray-600 font-semibold">رصيد المحفظة</h3>
              <span className="text-3xl">💰</span>
            </div>
            <div className="text-3xl font-bold text-gray-900 mb-1">
              {wallet.balance.toFixed(2)} ر.س
            </div>
            <div className="text-sm text-gray-500">
              معلق: {wallet.pendingBalance.toFixed(2)} ر.س
            </div>
            <button className="mt-4 w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-semibold">
              إضافة رصيد
            </button>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-gray-600 font-semibold">الطلبات النشطة</h3>
              <span className="text-3xl">📦</span>
            </div>
            <div className="text-3xl font-bold text-gray-900 mb-1">
              {orders.filter((o) => ['IN_PROGRESS', 'DELIVERED'].includes(o.status)).length}
            </div>
            <div className="text-sm text-gray-500">
              إجمالي الطلبات: {orders.length}
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-gray-600 font-semibold">التقييم</h3>
              <span className="text-3xl">⭐</span>
            </div>
            <div className="text-3xl font-bold text-gray-900 mb-1">
              4.8
            </div>
            <div className="text-sm text-gray-500">
              من 15 تقييم
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="border-b border-gray-200">
            <div className="flex gap-1 px-6">
              <button
                onClick={() => setActiveTab('overview')}
                className={`px-6 py-4 font-semibold transition border-b-2 ${
                  activeTab === 'overview'
                    ? 'border-blue-600 text-blue-600'
                    : 'border-transparent text-gray-600 hover:text-gray-900'
                }`}
              >
                نظرة عامة
              </button>
              <button
                onClick={() => setActiveTab('orders')}
                className={`px-6 py-4 font-semibold transition border-b-2 ${
                  activeTab === 'orders'
                    ? 'border-blue-600 text-blue-600'
                    : 'border-transparent text-gray-600 hover:text-gray-900'
                }`}
              >
                الطلبات
              </button>
              {user.role === 'PROVIDER' && (
                <button
                  onClick={() => setActiveTab('listings')}
                  className={`px-6 py-4 font-semibold transition border-b-2 ${
                    activeTab === 'listings'
                      ? 'border-blue-600 text-blue-600'
                      : 'border-transparent text-gray-600 hover:text-gray-900'
                  }`}
                >
                  خدماتي
                </button>
              )}
              <button
                onClick={() => setActiveTab('profile')}
                className={`px-6 py-4 font-semibold transition border-b-2 ${
                  activeTab === 'profile'
                    ? 'border-blue-600 text-blue-600'
                    : 'border-transparent text-gray-600 hover:text-gray-900'
                }`}
              >
                الملف الشخصي
              </button>
            </div>
          </div>

          <div className="p-6">
            {/* Overview Tab */}
            {activeTab === 'overview' && (
              <div>
                <h2 className="text-2xl font-bold mb-4">نظرة عامة</h2>
                <div className="space-y-4">
                  <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                    <h3 className="font-bold text-blue-900 mb-2">مرحباً بك في CreativeHub!</h3>
                    <p className="text-blue-800 text-sm">
                      {user.role === 'CLIENT' && 'استعرض الخدمات واطلب ما تحتاجه من المبدعين'}
                      {user.role === 'PROVIDER' && 'أنشئ خدماتك وابدأ في استقبال الطلبات'}
                      {user.role === 'ADMIN' && 'أدر المنصة وراجع الطلبات والنزاعات'}
                    </p>
                  </div>

                  {user.role === 'PROVIDER' && (
                    <div className="grid md:grid-cols-2 gap-4">
                      <Link
                        href="/listings/create"
                        className="p-6 border-2 border-dashed border-gray-300 rounded-xl hover:border-blue-500 hover:bg-blue-50 transition text-center group"
                      >
                        <div className="text-5xl mb-3">➕</div>
                        <h3 className="font-bold text-lg text-gray-900 group-hover:text-blue-600">
                          إنشاء خدمة جديدة
                        </h3>
                        <p className="text-gray-600 text-sm mt-1">
                          أضف خدمة جديدة وابدأ في استقبال الطلبات
                        </p>
                      </Link>

                      <div className="p-6 bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl border border-blue-100">
                        <div className="text-4xl mb-3">📊</div>
                        <h3 className="font-bold text-lg text-gray-900">
                          إحصائياتك
                        </h3>
                        <div className="mt-3 space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span className="text-gray-600">مشاهدات الخدمات</span>
                            <span className="font-bold">245</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">طلبات جديدة</span>
                            <span className="font-bold">8</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Orders Tab */}
            {activeTab === 'orders' && (
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-2xl font-bold">الطلبات</h2>
                  {user.role === 'CLIENT' && (
                    <Link
                      href="/listings"
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-semibold"
                    >
                      تصفح الخدمات
                    </Link>
                  )}
                </div>

                {orders.length === 0 ? (
                  <div className="text-center py-12">
                    <div className="text-6xl mb-4">📦</div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">لا توجد طلبات</h3>
                    <p className="text-gray-600 mb-4">لم تقم بإنشاء أي طلبات بعد</p>
                    {user.role === 'CLIENT' && (
                      <Link
                        href="/listings"
                        className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-semibold"
                      >
                        تصفح الخدمات
                      </Link>
                    )}
                  </div>
                ) : (
                  <div className="space-y-4">
                    {orders.map((order) => (
                      <Link
                        key={order.id}
                        href={`/orders/${order.id}`}
                        className="block p-4 border border-gray-200 rounded-lg hover:shadow-md transition"
                      >
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="font-bold text-lg">
                            {order.listing?.title || order.title}
                          </h3>
                          <span
                            className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(
                              order.status
                            )}`}
                          >
                            {getStatusText(order.status)}
                          </span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <div className="text-gray-600">
                            {user.role === 'CLIENT' && order.provider && (
                              <span>مقدم الخدمة: {order.provider.name}</span>
                            )}
                            {user.role === 'PROVIDER' && order.client && (
                              <span>العميل: {order.client.name}</span>
                            )}
                          </div>
                          <div className="font-bold text-gray-900">
                            {order.price} ر.س
                          </div>
                        </div>
                        <div className="text-xs text-gray-500 mt-2">
                          {new Date(order.createdAt).toLocaleDateString('ar-SA')}
                        </div>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Listings Tab (Provider Only) */}
            {activeTab === 'listings' && user.role === 'PROVIDER' && (
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-2xl font-bold">خدماتي</h2>
                  <Link
                    href="/listings/create"
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-semibold"
                  >
                    إضافة خدمة
                  </Link>
                </div>

                <div className="text-center py-12 border-2 border-dashed border-gray-300 rounded-xl">
                  <div className="text-6xl mb-4">📝</div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">لا توجد خدمات</h3>
                  <p className="text-gray-600 mb-4">أضف خدمتك الأولى وابدأ في استقبال الطلبات</p>
                  <Link
                    href="/listings/create"
                    className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-semibold"
                  >
                    إنشاء خدمة جديدة
                  </Link>
                </div>
              </div>
            )}

            {/* Profile Tab */}
            {activeTab === 'profile' && (
              <div>
                <h2 className="text-2xl font-bold mb-6">الملف الشخصي</h2>
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      الاسم الكامل
                    </label>
                    <input
                      type="text"
                      value={user.name}
                      readOnly
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      البريد الإلكتروني
                    </label>
                    <input
                      type="email"
                      value={user.email}
                      readOnly
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      نوع الحساب
                    </label>
                    <input
                      type="text"
                      value={
                        user.role === 'CLIENT'
                          ? 'عميل'
                          : user.role === 'PROVIDER'
                          ? 'مقدم خدمة'
                          : 'مدير'
                      }
                      readOnly
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50"
                    />
                  </div>

                  <button className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-semibold">
                    تحديث الملف الشخصي
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
