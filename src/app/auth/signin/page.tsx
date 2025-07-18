"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { SignInForm } from "@/components/auth/signin-form"
import { AuthLayout } from "@/components/auth/auth-layout"

export default function SignInPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  const handleSignIn = async (phoneNumber: string) => {
    setIsLoading(true)

    // محاكاة إرسال رمز التحقق
    await new Promise((resolve) => setTimeout(resolve, 1500))

    // الانتقال إلى صفحة رمز التحقق مع تمرير رقم الهاتف
    router.push(`/auth/verify?phone=${encodeURIComponent(phoneNumber)}`)

    setIsLoading(false)
  }

  return (
    <AuthLayout>
      <SignInForm onSubmit={handleSignIn} isLoading={isLoading} />
    </AuthLayout>
  )
}
