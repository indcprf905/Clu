export default function HomePage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-500 to-purple-600">
      <div className="text-center text-white p-8">
        <h1 className="text-5xl font-bold mb-4">المركز الإبداعي السعودي</h1>
        <h2 className="text-3xl mb-6">CreativeHub KSA</h2>
        <p className="text-xl mb-8">منصة موثوقة لربط المبدعين بأصحاب المشاريع</p>
        <div className="flex gap-4 justify-center">
          <button className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition">
            تصفح الخدمات
          </button>
          <button className="border-2 border-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition">
            ابدأ كمقدم خدمة
          </button>
        </div>
        <div className="mt-12 text-sm opacity-80">
          <p>✅ API متاح على: http://localhost:4000/api</p>
          <p>✅ Health Check: http://localhost:4000/api/health</p>
        </div>
      </div>
    </div>
  );
}
