"use client"

import type React from "react"
import type { OTPVerificationFormProps } from "@/types/auth" // Declare the variable before using it

import { useState, useEffect, useRef } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Brain, Loader2, RotateCcw, CheckCircle } from "lucide-react"
import { verifyOTP, resendOTP } from "@/api/services/auth.service"
import { useToast } from "@/components/ui/use-toast" // Add this import
import { useRouter } from "next/navigation"
// ... (rest of the imports)

export function OTPVerificationForm({ phoneNumber, onVerify, onResendCode, isLoading }: OTPVerificationFormProps) {
  const [otp, setOtp] = useState(["", "", "", "", "", ""])
  const [error, setError] = useState("")
  const [countdown, setCountdown] = useState(60)
  const [canResend, setCanResend] = useState(false)
  const [isResending, setIsResending] = useState(false)
  const inputRefs = useRef<(HTMLInputElement | null)[]>([])
  const { toast } = useToast() // Initialize useToast
 const router = useRouter()
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
    setError("")

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
    setError("")

    // التركيز على الحقل التالي أو الأخير
    const nextIndex = Math.min(pastedData.length, 5)
    inputRefs.current[nextIndex]?.focus()
  }

  const handleVerify = async (otpString: string) => {
    const setIsLoading = (loading: boolean) => {
      // Assuming this is a local state management function
      // You might need to adjust this based on your actual implementation
    }

    setIsLoading(true)

    const result = await verifyOTP(
      { phone: phoneNumber, role: "admin", otp: otpString },
      {
        onSuccess: (message) => {
          toast({
            title: "نجاح",
            description: message,
            variant: "default",
          })
        },
        onError: (message) => {
          toast({
            title: "خطأ",
            description: message,
            variant: "destructive",
          })
        },
      },
    )

    if (result.error) {
      setError(result.message || "رمز التحقق غير صحيح")
      setIsLoading(false)
      return false // فشل التحقق
    } else {
      // Verification successful, navigate to dashboard
      return true
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    const otpString = otp.join("")

    if (otpString.length !== 6) {
      setError("يرجى إدخال الرمز كاملاً")
      return
    }

    const success = await handleVerify(otpString)
    
    if (!success) {
      setError("رمز التحقق غير صحيح")
      // مسح الحقول
      setOtp(["", "", "", "", "", ""])
      inputRefs.current[0]?.focus()
    }
    router.push('/dashboard');
  }

  const handleResendCode = async () => {
    setIsResending(true)
    const result = await resendOTP(phoneNumber)

    if (result.error) {
      setError(result.message || "فشل إعادة إرسال الرمز.")
      setIsResending(false)
      return false
    } else {
      setCountdown(60)
      setCanResend(false)
      setError("")
      setOtp(["", "", "", "", "", ""])
      setIsResending(false)
      return true
    }
  }

  const handleResend = async () => {
    setIsResending(true)
    const result = await resendOTP(phoneNumber)

    if (result.error) {
      setError(result.message || "فشل إعادة إرسال الرمز.")
      toast({
        title: "خطأ",
        description: result.message || "فشل إعادة إرسال الرمز.",
        variant: "destructive",
      })
    } else {
      setCountdown(60)
      setCanResend(false)
      setError("")
      setOtp(["", "", "", "", "", ""])
      toast({
        title: "نجاح",
        description: result.message || "تم إعادة إرسال رمز التحقق بنجاح.",
        variant: "default",
      })
    }
    setIsResending(false)
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
                  ref={(el) => (inputRefs.current[index] = el)}
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

            {error && <p className="text-sm text-red-500 dark:text-red-400 text-center">{error}</p>}
          </div>

          {/* Confirm Button */}
          <Button
            type="submit"
            className="w-full bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700 text-white font-medium py-3 rounded-lg shadow-lg hover:shadow-xl transition-all duration-200"
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
            className="text-violet-600 dark:text-violet-400 hover:text-violet-700 dark:hover:text-violet-300 hover:bg-violet-50 dark:hover:bg-violet-900/20"
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
