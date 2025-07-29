"use client"

import { useState, useEffect, Suspense } from "react"
import { useRouter } from "next/navigation"
import { OTPVerificationForm } from "@/components/auth/otp-verification-form"
import { AuthLayout } from "@/components/auth/auth-layout"
import { useAuth } from "@/hooks/useAuth"
import { useSearchParams } from "next/navigation"

function VerifyContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const phoneNumber = searchParams.get("phone") || ""
  const { isAuthenticated } = useAuth()
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    if (isAuthenticated) {
      router.push("/dashboard")
    }
  }, [isAuthenticated, router])

  useEffect(() => {
    if (!phoneNumber) {
      router.push("/auth/signin")
    }
  }, [phoneNumber, router])

  const handleVerify = async (otp: string) => {
    setIsLoading(true)
    // معالجة التحقق هنا
    setIsLoading(false)
    return true
  }

  const handleResendCode = async () => {
    return true
  }

  if (!phoneNumber) {
    return null
  }

  return (
    <OTPVerificationForm
      phoneNumber={phoneNumber}
      onVerify={handleVerify}
      onResendCode={handleResendCode}
      isLoading={isLoading}
    />
  )
}

export default function VerifyPage() {
  return (
    <AuthLayout>
      <Suspense fallback={<div>جاري التحميل...</div>}>
        <VerifyContent />
      </Suspense>
    </AuthLayout>
  )
}
