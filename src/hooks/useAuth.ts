"use client"

import { useState, useEffect, useCallback } from "react"
import { login, verifyOtp, logout } from "@/api/services/auth"
import { setCookie } from "@/utils/Cookie/setCookie"
import { getCookie } from "@/utils/Cookie/getCookie"
import { deleteCookie } from "@/utils/Cookie/deleteCookie"
import type { LoginData, VerifyOtpData, User, AuthState } from "@/api/services/auth"

interface UseAuthReturn extends AuthState {
  login: (data: LoginData) => Promise<{ success: boolean; message: string }>
  verifyOtp: (data: VerifyOtpData) => Promise<{ success: boolean; message: string; user?: User }>
  logout: () => Promise<void>
  checkAuth: () => boolean
}

export const useAuth = (): UseAuthReturn => {
  const [user, setUser] = useState<User | null>(null)
  const [token, setToken] = useState<string | null>(null)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  // التحقق من وجود توكن عند تحميل التطبيق
  useEffect(() => {
    const checkToken = () => {
      setIsLoading(true)
      const storedToken = getCookie("token")
      const storedUser = getCookie("user")
      
      if (storedToken && storedUser) {
        try {
          const userData = JSON.parse(storedUser)
          setToken(storedToken)
          setUser(userData)
          setIsAuthenticated(true)
        } catch (error) {
          // إذا كان هناك خطأ في تحليل بيانات المستخدم، احذف الكوكيز
          deleteCookie("token")
          deleteCookie("user")
          setIsAuthenticated(false)
        }
      } else {
        setIsAuthenticated(false)
      }
      setIsLoading(false)
    }

    checkToken()
  }, [])

  // دالة تسجيل الدخول
  const handleLogin = useCallback(async (data: LoginData) => {
    try {
      setIsLoading(true)
      const response = await login(data)
      
      if (!response.error) {
        return { success: true, message: response.message || "تم إرسال رمز التحقق بنجاح" }
      } else {
        return { success: false, message: response.message || "حدث خطأ في تسجيل الدخول" }
      }
    } catch (error) {
      return { success: false, message: "حدث خطأ في الاتصال بالخادم" }
    } finally {
      setIsLoading(false)
    }
  }, [])

  // دالة التحقق من OTP
  const handleVerifyOtp = useCallback(async (data: VerifyOtpData) => {
    try {
      setIsLoading(true)
      const response = await verifyOtp(data)
      
      if (!response.error && response.data) {
        const userData = (response.data as any).user
        const newToken = (response.data as any).token
        
        // حفظ التوكن وبيانات المستخدم في الكوكيز
        setCookie("token", newToken, 90)
        setCookie("user", JSON.stringify(userData), 90)
        
        // تحديث الحالة
        setToken(newToken)
        setUser(userData)
        setIsAuthenticated(true)
        
        return { 
          success: true, 
          message: response.message || "تم تسجيل الدخول بنجاح",
          user: userData
        }
      } else {
        return { 
          success: false, 
          message: response.message || "فشل في التحقق من رمز OTP" 
        }
      }
    } catch (error) {
      return { success: false, message: "حدث خطأ في الاتصال بالخادم" }
    } finally {
      setIsLoading(false)
    }
  }, [])

  // دالة تسجيل الخروج
  const handleLogout = useCallback(async () => {
    try {
      setIsLoading(true)
      
      // إرسال طلب تسجيل الخروج للخادم
      await logout()
      
      // حذف البيانات المحلية
      deleteCookie("token")
      deleteCookie("user")
      
      // تحديث الحالة
      setToken(null)
      setUser(null)
      setIsAuthenticated(false)
    } catch (error) {
      // حتى لو فشل الطلب، احذف البيانات المحلية
      deleteCookie("token")
      deleteCookie("user")
      setToken(null)
      setUser(null)
      setIsAuthenticated(false)
    } finally {
      setIsLoading(false)
    }
  }, [])

  // دالة التحقق من حالة المصادقة
  const checkAuth = useCallback(() => {
    const storedToken = getCookie("token")
    return !!storedToken
  }, [])

  return {
    user,
    token,
    isAuthenticated,
    isLoading,
    login: handleLogin,
    verifyOtp: handleVerifyOtp,
    logout: handleLogout,
    checkAuth
  }
} 