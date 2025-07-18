"use client"

import { useEffect, useState } from "react"
import { Sparkles } from "lucide-react"

export function LoadingScreen() {
  const [isVisible, setIsVisible] = useState(true)
  const [progress, setProgress] = useState(0)
  const [loadingText, setLoadingText] = useState("جاري تحميل لوحة التحكم")

  useEffect(() => {
    // تحديث التقدم بشكل سلس
    const duration = 3500
    const interval = 50 // تحديث كل 50ms
    const increment = 100 / (duration / interval)

    const progressTimer = setInterval(() => {
      setProgress((prev) => {
        const newProgress = prev + increment
        if (newProgress >= 100) {
          clearInterval(progressTimer)
          return 100
        }
        return newProgress
      })
    }, interval)

    // تغيير النص بناءً على الوقت
    const textTimer1 = setTimeout(() => setLoadingText("إعداد لوحة التحكم..."), 1000)
    const textTimer2 = setTimeout(() => setLoadingText("تحميل البيانات..."), 2000)
    const textTimer3 = setTimeout(() => setLoadingText("جاهز تقريباً..."), 2800)

    // إخفاء الشاشة بعد 3.5 ثانية
    const hideTimer = setTimeout(() => {
      setIsVisible(false)
    }, 3500)

    return () => {
      clearInterval(progressTimer)
      clearTimeout(textTimer1)
      clearTimeout(textTimer2)
      clearTimeout(textTimer3)
      clearTimeout(hideTimer)
    }
  }, [])

  if (!isVisible) return null

  const circumference = 2 * Math.PI * 45
  const strokeDashoffset = circumference - (progress / 100) * circumference

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-gradient-to-b from-violet-50 to-slate-100 dark:from-violet-950/30 dark:to-slate-950">
      {/* دوائر الخلفية المتحركة */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-violet-200/20 rounded-full animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-24 h-24 bg-purple-200/20 rounded-full animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 right-1/3 w-16 h-16 bg-violet-300/20 rounded-full animate-pulse delay-500"></div>
      </div>

      {/* دائرة التحميل الرئيسية */}
      <div className="relative mb-8 z-10">
        <div className="relative">
          <svg className="h-24 w-24 transform -rotate-90" viewBox="0 0 100 100">
            {/* دائرة الخلفية */}
            <circle cx="50" cy="50" r="45" fill="none" stroke="rgba(139, 92, 246, 0.1)" strokeWidth="6" />

            {/* دائرة التقدم */}
            <circle
              cx="50"
              cy="50"
              r="45"
              fill="none"
              stroke="url(#progressGradient)"
              strokeWidth="6"
              strokeLinecap="round"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              style={{
                transition: "stroke-dashoffset 0.1s ease-out",
              }}
            />

            {/* تعريف التدرج اللوني */}
            <defs>
              <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#8b5cf6" />
                <stop offset="50%" stopColor="#a855f7" />
                <stop offset="100%" stopColor="#c084fc" />
              </linearGradient>
            </defs>
          </svg>

          {/* الأيقونة المركزية */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="h-16 w-16 rounded-full bg-white dark:bg-slate-900 flex items-center justify-center shadow-lg border border-violet-100 dark:border-violet-800">
              <Sparkles className="h-7 w-7 text-violet-500 animate-spin" style={{ animationDuration: "3s" }} />
            </div>
          </div>

          {/* تأثير الوهج */}
          <div className="absolute inset-0 rounded-full bg-violet-400/20 blur-xl animate-pulse"></div>
        </div>
      </div>

      {/* النص مع تأثير انتقالي سلس */}
      <div className="text-center z-10">
        <h2 className="text-2xl font-bold text-violet-600 dark:text-violet-400 mb-2 transition-all duration-500 ease-in-out">
          {loadingText}
        </h2>
        <p className="text-slate-500 dark:text-slate-400 animate-pulse">يرجى الانتظار...</p>
      </div>

      {/* شريط التقدم السلس */}
      <div className="mt-8 w-64 h-2 bg-violet-100 dark:bg-violet-900/30 rounded-full overflow-hidden z-10">
        <div
          className="h-full bg-gradient-to-r from-violet-500 via-purple-500 to-violet-600 rounded-full transition-all duration-100 ease-out relative"
          style={{ width: `${progress}%` }}
        >
          {/* تأثير الوميض */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-pulse"></div>
        </div>
      </div>

      {/* نسبة التقدم الصحيحة */}
      <div className="mt-3 text-sm font-medium text-violet-600 dark:text-violet-400 z-10">{Math.round(progress)}%</div>

      {/* نقاط متحركة */}
      <div className="flex space-x-1 mt-4 z-10">
        <div className="w-2 h-2 bg-violet-400 rounded-full animate-bounce"></div>
        <div className="w-2 h-2 bg-violet-400 rounded-full animate-bounce delay-100"></div>
        <div className="w-2 h-2 bg-violet-400 rounded-full animate-bounce delay-200"></div>
      </div>
    </div>
  )
}
