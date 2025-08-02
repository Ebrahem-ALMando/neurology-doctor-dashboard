"use client"

import type React from "react"
import type { OTPVerificationFormProps } from "@/types/auth" // Declare the variable before using it

import { useState, useEffect, useRef } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Brain, Loader2, RotateCcw, CheckCircle } from "lucide-react"
import { useAuth } from "@/hooks/useAuth"
import { useCustomToastWithIcons } from "@/hooks/use-custom-toast-with-icons"
import { useRouter } from "next/navigation"
import { getDeviceToken, getDeviceType } from "@/utils/device-token"
// ... (rest of the imports)

export function OTPVerificationForm({ phoneNumber, onVerify, onResendCode, userRole }: OTPVerificationFormProps) {
  const [otp, setOtp] = useState(["", "", "", "", "", ""])
  const [countdown, setCountdown] = useState(60)
  const [canResend, setCanResend] = useState(false)
  const [isResending, setIsResending] = useState(false)
  const inputRefs = useRef<(HTMLInputElement | null)[]>([])
  const { showOtpSuccess, showOtpError, showResendSuccess, showResendError, showNetworkError } = useCustomToastWithIcons()
  const router = useRouter()
  const { verifyOtp, login,isLoading } = useAuth()
  // العد التنازلي
  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000)
      return () => clearTimeout(timer)
    } else {
      setCanResend(true)
    }
  }, [countdown])

  const handleOtpChange = (index: number, value: string) => {
    if (value.length > 1) return // منع إدخال أكثر من رقم واحد

    const newOtp = [...otp]
    newOtp[index] = value
    setOtp(newOtp)

    // الانتقال إلى الحقل التالي تلقائياً
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus()
    }
  }

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    // العودة للحقل السابق عند الضغط على Backspace
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus()
    }
  }

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault()
    const pastedData = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 6)
    const newOtp = [...otp]

    for (let i = 0; i < pastedData.length && i < 6; i++) {
      newOtp[i] = pastedData[i]
    }

    setOtp(newOtp)

    // التركيز على الحقل التالي أو الأخير
    const nextIndex = Math.min(pastedData.length, 5)
    inputRefs.current[nextIndex]?.focus()
  }

  const handleVerify = async (otpString: string) => {
    try {
      const result = await verifyOtp({
        phone: phoneNumber,
        role: userRole,
        otp: otpString,
        device_token: getDeviceToken(),
        device_type: getDeviceType()
      })

      if (result.success) {
        showOtpSuccess()
        return true
      } else {
        console.log(result.message)
        return false
      }
    } catch (error) {
      console.log(error)
      return false
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const otpString = otp.join("")

    if (otpString.length !== 6) {
      showOtpError("يرجى إدخال الرمز كاملاً")
      return
    }
      console.log(getDeviceToken())
      console.log(getDeviceType())
    const success = await handleVerify(otpString)
    
    if (success) {
      // في حالة النجاح، انتقل إلى لوحة التحكم
      router.push('/dashboard')
    } else {
      showOtpError("رمز التحقق غير صحيح")
      // مسح الحقول
      setOtp(["", "", "", "", "", ""])
      inputRefs.current[0]?.focus()
    }
  }

  const handleResendCode = async () => {
    setIsResending(true)
    try {
  
      const result = await login({
        phone: phoneNumber,
        role: userRole,
        device_token: getDeviceToken(),
        device_type: getDeviceType()
      })

      if (result.success) {
        setCountdown(60)
        setCanResend(false)
        setOtp(["", "", "", "", "", ""])
        showResendSuccess()
        setIsResending(false)
        return true
      } else {
        showResendError(result.message)
        setIsResending(false)
        return false
      }
    } catch (error) {
      showNetworkError()
      setIsResending(false)
      return false
    }
  }

  const handleResend = async () => {
    return handleResendCode()
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
  }

  const maskedPhone = phoneNumber.replace(/(\+\d{2,3})(\d+)(\d{4})/, "$1****$3")

  return (
    <Card className="border-0 shadow-2xl bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl">
      <CardHeader className="text-center pb-6">
        {/* Logo */}
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-violet-500 to-purple-600 shadow-lg">
          <Brain className="h-8 w-8 text-white" />
        </div>

        <CardTitle className="text-2xl font-bold text-gray-900 dark:text-gray-100">رمز التحقق</CardTitle>
        <CardDescription className="text-gray-600 dark:text-gray-400 mt-2 leading-relaxed">
          تم إرسال رمز مكون من 6 أرقام إلى رقم هاتفك
          <br />
          <span className="font-medium text-violet-600 dark:text-violet-400">{maskedPhone}</span>
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* OTP Input Fields */}
          <div className="space-y-2">
            <div className="flex justify-center gap-3" dir="ltr">
              {otp.map((digit, index) => (
                <Input
                  key={index}
                  ref={(el) => {
                    inputRefs.current[index] = el
                  }}
                  type="text"
                  inputMode="numeric"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleOtpChange(index, e.target.value.replace(/\D/g, ""))}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  onPaste={handlePaste}
                  className="w-12 h-12 text-center text-lg font-bold border-2 focus:border-violet-500 dark:focus:border-violet-400 rounded-lg"
                  disabled={isLoading}
                />
              ))}
            </div>
          </div>

          {/* Confirm Button */}
          <Button
            type="submit"
            className="w-full bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700 text-white font-medium py-3 rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={isLoading || otp.join("").length !== 6}
          >
            {isLoading ? (
              <>
                <Loader2 className="ml-2 h-4 w-4 animate-spin" />
                جاري التحقق...
              </>
            ) : (
              <>
                تأكيد
                <CheckCircle className="mr-2 h-4 w-4" />
              </>
            )}
          </Button>
        </form>

        {/* Resend Code Section */}
        <div className="flex items-center justify-center gap-4 text-sm">
          <span className="text-gray-600 dark:text-gray-400">
            {canResend ? "يمكنك إعادة الإرسال الآن" : `إعادة الإرسال خلال ${formatTime(countdown)}`}
          </span>

          <Button
            variant="ghost"
            size="sm"
            onClick={handleResend}
            disabled={!canResend || isResending}
            className="text-violet-600 dark:text-violet-400 hover:text-violet-700 dark:hover:text-violet-300 hover:bg-violet-50 dark:hover:bg-violet-900/20 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isResending ? (
              <>
                <Loader2 className="ml-1 h-3 w-3 animate-spin" />
                جاري الإرسال...
              </>
            ) : (
              <>
                <RotateCcw className="ml-1 h-3 w-3" />
                إعادة إرسال الرمز
              </>
            )}
          </Button>
        </div>

        {/* Additional Info */}
        <div className="text-center text-xs text-gray-500 dark:text-gray-400 border-t pt-4">
          <p>لم تستلم الرمز؟ تأكد من رقم هاتفك</p>
          <p className="mt-1">الرمز صالح لمدة 10 دقائق</p>
        </div>
      </CardContent>
    </Card>
  )
}
