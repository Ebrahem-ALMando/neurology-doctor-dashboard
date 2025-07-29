"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { SignInForm } from "@/components/auth/signin-form"
import { AuthLayout } from "@/components/auth/auth-layout"
import { useAuth } from "@/hooks/useAuth"

export default function SignInPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const { isAuthenticated } = useAuth()

  // إذا كان المستخدم مسجل دخوله بالفعل، انتقل إلى لوحة التحكم
  if (isAuthenticated) {
    router.push("/dashboard")
    return null
  }

  const handleSignIn = async (phoneNumber: string) => {
    setIsLoading(true)
    
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
