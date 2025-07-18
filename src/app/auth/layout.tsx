import type React from "react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "تسجيل الدخول - عيادة طب الأعصاب",
  description: "تسجيل الدخول إلى نظام إدارة عيادة طب الأعصاب",
}

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
