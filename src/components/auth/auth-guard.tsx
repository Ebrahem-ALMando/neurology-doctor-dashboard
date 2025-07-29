"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/hooks/useAuth"

interface AuthGuardProps {
  children: React.ReactNode
  fallback?: React.ReactNode
}

export function AuthGuard({ children, fallback }: AuthGuardProps) {
  const { isAuthenticated, isLoading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push("/auth/signin")
    }
  }, [isAuthenticated, isLoading, router])

  // عرض شاشة تحميل أثناء التحقق من حالة المصادقة
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-violet-600"></div>
      </div>
    )
  }

  // إذا لم يكن المستخدم مسجل دخوله، اعرض fallback أو انتقل إلى تسجيل الدخول
  if (!isAuthenticated) {
    return fallback || null
  }

  // إذا كان المستخدم مسجل دخوله، اعرض المحتوى
  return <>{children}</>
} 