"use client"

import { useCallback } from "react"
import { toast } from "@/components/ui/custom-toast-with-icons"

interface ToastOptions {
  title: string
  description?: string
  duration?: number
}

export function useCustomToastWithIcons() {
  const showSuccess = useCallback((options: ToastOptions) => {
    toast({
      title: options.title,
      description: options.description,
      variant: "success",
    })
  }, [])

  const showError = useCallback((options: ToastOptions) => {
    toast({
      title: options.title,
      description: options.description,
      variant: "error",
    })
  }, [])

  const showWarning = useCallback((options: ToastOptions) => {
    toast({
      title: options.title,
      description: options.description,
      variant: "warning",
    })
  }, [])

  const showInfo = useCallback((options: ToastOptions) => {
    toast({
      title: options.title,
      description: options.description,
      variant: "info",
    })
  }, [])

  const showLoading = useCallback((options: ToastOptions) => {
    toast({
      title: options.title,
      description: options.description,
      variant: "loading",
    })
  }, [])

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