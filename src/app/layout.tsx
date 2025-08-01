import type React from "react"
import type { Metadata } from "next"
import { Cairo } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { CustomToaster } from "@/components/ui/custom-toaster"
import { AuthProvider } from "@/components/auth/auth-provider"

const cairo = Cairo({
  subsets: ["latin", "arabic"],
  weight: ["300", "400", "500", "600", "700"],
})

export const metadata: Metadata = {
  title: "SmartClinic - لوحة التحكم",
  description: "لوحة تحكم طبية للأطباء المختصين بأمراض القلب",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    // <html lang="ar" dir="rtl" className="overflow-x-hidden">
    //   <body className={`${cairo.className} overflow-x-hidden`}>
    <html lang="ar" dir="rtl">
      <body className={`${cairo.className}`}>
      {/* <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange> */}
        <ThemeProvider attribute="class" enableSystem disableTransitionOnChange>
          <AuthProvider>
            <div className="min-h-screen w-full">{children}</div>
            <CustomToaster />
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
