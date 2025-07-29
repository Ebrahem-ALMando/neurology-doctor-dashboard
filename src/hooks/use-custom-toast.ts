"use client"

import { useCallback } from "react"
import { useToast } from "@/components/ui/use-toast"

interface ToastOptions {
  title: string
  description?: string
  duration?: number
}

export function useCustomToast() {
  const { toast } = useToast()

  const showSuccess = useCallback((options: ToastOptions) => {
    toast({
      title: options.title,
      description: options.description,
      className: "bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-950/90 dark:to-emerald-950/90 border-l-4 border-l-green-500 text-green-800 dark:text-green-200 shadow-green-500/20",
    })
  }, [toast])

  const showError = useCallback((options: ToastOptions) => {
    toast({
      title: options.title,
      description: options.description,
      variant: "destructive",
      className: "bg-gradient-to-r from-red-50 to-rose-50 dark:from-red-950/90 dark:to-rose-950/90 border-l-4 border-l-red-500 text-red-800 dark:text-red-200 shadow-red-500/20",
    })
  }, [toast])

  const showWarning = useCallback((options: ToastOptions) => {
    toast({
      title: options.title,
      description: options.description,
      className: "bg-gradient-to-r from-yellow-50 to-amber-50 dark:from-yellow-950/90 dark:to-amber-950/90 border-l-4 border-l-yellow-500 text-yellow-800 dark:text-yellow-200 shadow-yellow-500/20",
    })
  }, [toast])

  const showInfo = useCallback((options: ToastOptions) => {
    toast({
      title: options.title,
      description: options.description,
      className: "bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-950/90 dark:to-cyan-950/90 border-l-4 border-l-blue-500 text-blue-800 dark:text-blue-200 shadow-blue-500/20",
    })
  }, [toast])

  const showLoading = useCallback((options: ToastOptions) => {
    toast({
      title: options.title,
      description: options.description,
      className: "bg-gradient-to-r from-violet-50 to-purple-50 dark:from-violet-950/90 dark:to-purple-950/90 border-l-4 border-l-violet-500 text-violet-800 dark:text-violet-200 shadow-violet-500/20",
    })
  }, [toast])

  // دوال مساعدة للرسائل الشائعة
  const showLoginSuccess = useCallback(() => {
    showSuccess({
      title: "تم إرسال رمز التحقق",
      description: "تم إرسال رمز التحقق إلى رقم هاتفك بنجاح"
    })
  }, [showSuccess])

  const showLoginError = useCallback((message?: string) => {
    showError({
      title: "خطأ في تسجيل الدخول",
      description: message || "حدث خطأ أثناء إرسال رمز التحقق"
    })
  }, [showError])

  const showOtpSuccess = useCallback(() => {
    showSuccess({
      title: "تم تسجيل الدخول بنجاح",
      description: "مرحباً بك في النظام"
    })
  }, [showSuccess])

  const showOtpError = useCallback((message?: string) => {
    showError({
      title: "خطأ في التحقق",
      description: message || "رمز التحقق غير صحيح"
    })
  }, [showError])

  const showLogoutSuccess = useCallback(() => {
    showSuccess({
      title: "تم تسجيل الخروج",
      description: "تم تسجيل الخروج بنجاح"
    })
  }, [showSuccess])

  const showLogoutError = useCallback(() => {
    showError({
      title: "خطأ في تسجيل الخروج",
      description: "حدث خطأ أثناء تسجيل الخروج"
    })
  }, [showError])

  const showResendSuccess = useCallback(() => {
    showSuccess({
      title: "تم إعادة الإرسال",
      description: "تم إعادة إرسال رمز التحقق بنجاح"
    })
  }, [showSuccess])

  const showResendError = useCallback((message?: string) => {
    showError({
      title: "خطأ في إعادة الإرسال",
      description: message || "فشل في إعادة إرسال رمز التحقق"
    })
  }, [showError])

  const showNetworkError = useCallback(() => {
    showError({
      title: "خطأ في الاتصال",
      description: "حدث خطأ في الاتصال بالخادم"
    })
  }, [showError])

  const showValidationError = useCallback((message: string) => {
    showError({
      title: "خطأ في البيانات",
      description: message
    })
  }, [showError])

  const showSaveSuccess = useCallback(() => {
    showSuccess({
      title: "تم الحفظ بنجاح",
      description: "تم حفظ البيانات بنجاح"
    })
  }, [showSuccess])

  const showDeleteSuccess = useCallback(() => {
    showSuccess({
      title: "تم الحذف بنجاح",
      description: "تم حذف العنصر بنجاح"
    })
  }, [showSuccess])

  const showUpdateSuccess = useCallback(() => {
    showSuccess({
      title: "تم التحديث بنجاح",
      description: "تم تحديث البيانات بنجاح"
    })
  }, [showSuccess])

  return {
    showSuccess,
    showError,
    showWarning,
    showInfo,
    showLoading,
    // دوال مساعدة
    showLoginSuccess,
    showLoginError,
    showOtpSuccess,
    showOtpError,
    showLogoutSuccess,
    showLogoutError,
    showResendSuccess,
    showResendError,
    showNetworkError,
    showValidationError,
    showSaveSuccess,
    showDeleteSuccess,
    showUpdateSuccess,
  }
} 