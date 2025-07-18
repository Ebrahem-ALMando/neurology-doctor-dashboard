"use client"

import { useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { OTPVerificationForm } from "@/components/auth/otp-verification-form"
import { AuthLayout } from "@/components/auth/auth-layout"

export default function VerifyPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [isLoading, setIsLoading] = useState(false)
  const phoneNumber = searchParams.get("phone") || ""

  const handleVerify = async (otp: string) => {
    setIsLoading(true)

    // محاكاة التحقق من رمز OTP
    await new Promise((resolve) => setTimeout(resolve, 1500))

    // في حالة النجاح، الانتقال إلى لوحة التحكم
    if (otp === "666666") {
      // رمز تجريبي
      router.push("/dashboard")
    } else {
      setIsLoading(false)
      return false // فشل التحقق
    }

    return true
  }

  const handleResendCode = async () => {
    // محاكاة إعادة إرسال الرمز
    await new Promise((resolve) => setTimeout(resolve, 1000))
    return true
  }

  return (
    <AuthLayout>
      <OTPVerificationForm
        phoneNumber={phoneNumber}
        onVerify={handleVerify}
        onResendCode={handleResendCode}
        isLoading={isLoading}
      />
    </AuthLayout>
  )
}
