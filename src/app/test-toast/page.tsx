"use client"

import { Button } from "@/components/ui/button"
import { useCustomToastWithIcons } from "@/hooks/use-custom-toast-with-icons"

export default function TestToastPage() {
  const {
    showSuccess,
    showError,
    showWarning,
    showInfo,
    showLoading,
    showLoginSuccess,
    showLoginError,
    showOtpSuccess,
    showOtpError,
  } = useCustomToastWithIcons()

  const showMultipleToasts = () => {
    showSuccess({ title: "نجاح", description: "التوست الأول" })
    setTimeout(() => showError({ title: "خطأ", description: "التوست الثاني" }), 500)
    setTimeout(() => showWarning({ title: "تحذير", description: "التوست الثالث" }), 1000)
    setTimeout(() => showInfo({ title: "معلومات", description: "التوست الرابع" }), 1500)
    setTimeout(() => showLoading({ title: "تحميل", description: "التوست الخامس" }), 2000)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 via-purple-50 to-blue-50 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8">🎨 التوست المخصص مع البوردر والظلال</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* أنواع التوست الأساسية */}
          <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-xl border border-white/20">
                          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <span className="w-2 h-2 bg-gradient-to-r from-violet-500 to-purple-500 rounded-full"></span>
                أنواع التوست مع البوردر والظلال
              </h2>
            <div className="space-y-3">
              <Button 
                onClick={() => showSuccess({ title: "نجاح", description: "عملية ناجحة" })}
                className="w-full bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white shadow-lg"
              >
                نجاح (أخضر) ✅
              </Button>
              
              <Button 
                onClick={() => showError({ title: "خطأ", description: "حدث خطأ" })}
                variant="destructive"
                className="w-full bg-gradient-to-r from-red-500 to-rose-500 hover:from-red-600 hover:to-rose-600 shadow-lg"
              >
                خطأ (أحمر) ❌
              </Button>
              
              <Button 
                onClick={() => showWarning({ title: "تحذير", description: "تحذير مهم" })}
                variant="outline"
                className="w-full border-yellow-500 text-yellow-700 hover:bg-yellow-50 shadow-lg"
              >
                تحذير (أصفر) ⚠️
              </Button>
              
              <Button 
                onClick={() => showInfo({ title: "معلومات", description: "معلومات مفيدة" })}
                variant="outline"
                className="w-full border-blue-500 text-blue-700 hover:bg-blue-50 shadow-lg"
              >
                معلومات (أزرق) ℹ️
              </Button>
              
              <Button 
                onClick={() => showLoading({ title: "تحميل", description: "جاري التحميل..." })}
                variant="outline"
                className="w-full border-violet-500 text-violet-700 hover:bg-violet-50 shadow-lg"
              >
                تحميل (بنفسجي) ⏳
              </Button>
            </div>
          </div>

          {/* رسائل المصادقة */}
          <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-xl border border-white/20">
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <span className="w-2 h-2 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full"></span>
              رسائل المصادقة
            </h2>
            <div className="space-y-3">
              <Button 
                onClick={showLoginSuccess}
                className="w-full bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white shadow-lg"
              >
                نجاح تسجيل الدخول
              </Button>
              
              <Button 
                onClick={() => showLoginError("رقم الهاتف غير صحيح")}
                variant="destructive"
                className="w-full bg-gradient-to-r from-red-500 to-rose-500 hover:from-red-600 hover:to-rose-600 shadow-lg"
              >
                خطأ تسجيل الدخول
              </Button>
              
              <Button 
                onClick={showOtpSuccess}
                className="w-full bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white shadow-lg"
              >
                نجاح التحقق من OTP
              </Button>
              
              <Button 
                onClick={() => showOtpError("الرمز غير صحيح")}
                variant="destructive"
                className="w-full bg-gradient-to-r from-red-500 to-rose-500 hover:from-red-600 hover:to-rose-600 shadow-lg"
              >
                خطأ التحقق من OTP
              </Button>
            </div>
          </div>
        </div>

        {/* اختبار التوست المتعدد */}
        <div className="mt-6 bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-xl border border-white/20">
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <span className="w-2 h-2 bg-gradient-to-r from-orange-500 to-red-500 rounded-full"></span>
            اختبار التوست المتعدد
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            اضغط على الزر أدناه لاختبار عرض عدة توستات معاً وملاحظة المارجن بينها
          </p>
          <Button 
            onClick={showMultipleToasts}
            className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white shadow-lg"
          >
            عرض 5 توستات متتالية 🚀
          </Button>
        </div>

        {/* معلومات التوست */}
        <div className="mt-8 bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-xl border border-white/20">
                      <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <span className="w-2 h-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"></span>
              مميزات التوست المخصص مع البوردر والظلال
            </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
            <div>
              <h3 className="font-semibold mb-3 text-green-700 dark:text-green-400">🎨 التصميم المحسن:</h3>
              <ul className="space-y-2 text-gray-600 dark:text-gray-300">
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-green-500 rounded-full"></span>
                  بوردر ملون وواضح
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-green-500 rounded-full"></span>
                  ظلال قوية وملونة
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-green-500 rounded-full"></span>
                  أيقونات مع بوردر ملون
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-green-500 rounded-full"></span>
                  مارجن بين التوستات
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-3 text-blue-700 dark:text-blue-400">🔧 الوظائف المتقدمة:</h3>
              <ul className="space-y-2 text-gray-600 dark:text-gray-300">
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-blue-500 rounded-full"></span>
                  بوردر ملون لكل نوع
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-blue-500 rounded-full"></span>
                  ظلال قوية وواضحة
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-blue-500 rounded-full"></span>
                  عرض متعدد للتوستات
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-blue-500 rounded-full"></span>
                  وضوح عالي على جميع الخلفيات
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* معلومات تقنية */}
        <div className="mt-6 bg-gradient-to-r from-violet-50 to-purple-50 dark:from-violet-950/50 dark:to-purple-950/50 rounded-xl p-4 border border-violet-200/50 dark:border-violet-800/50">
          <p className="text-center text-sm text-violet-700 dark:text-violet-300">
            <strong>💡 نصيحة:</strong> الآن التوست يظهر بوضوح تام مع بوردر ملون وواضح وظلال قوية على جميع الخلفيات!
          </p>
        </div>
      </div>
    </div>
  )
} 