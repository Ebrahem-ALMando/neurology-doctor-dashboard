"use client"

import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { BarChart3, Calendar, FileText, Home, MessageSquare, Settings, Users, LogOut, HeartPulse, ClipboardList,MessageSquareText } from "lucide-react"
import { cn } from "@/lib/utils"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { useEffect, useState } from "react"
import { useAuth } from "@/hooks/useAuth"
import { useProfile } from "@/hooks/useProfile"
import { useCustomToastWithIcons } from "@/hooks/use-custom-toast-with-icons"

interface SidebarProps {
  className?: string
  onItemClick?: () => void
}

export function Sidebar({ className, onItemClick }: SidebarProps) {
  const pathname = usePathname()
  const router = useRouter()
  const { logout } = useAuth()
  const { profile, isLoading: profileLoading } = useProfile()
  const { showLoginSuccess, showLoginError, showNetworkError, showLogoutSuccess, showLogoutError } = useCustomToastWithIcons()

  const handleItemClick = () => {
    if (onItemClick) {
      onItemClick()
    }
  }

  const handleLogout = async () => {
    try {
      await logout()
      showLogoutSuccess()
      router.push("/auth/signin")
    } catch (error) {
      showLogoutError()
    }
    handleItemClick() // Close sidebar on mobile after logout attempt
  }

  // استخدام بيانات المستخدم من API الجديد
  const userDisplayName = profile?.user?.name || "د. مهران"
  const userRole = profile?.user?.role === 'doctor' ? 'طبيب' : 
                   profile?.user?.role === 'admin' ? 'مدير' :
                   profile?.user?.role === 'receptionist' ? 'موظف استقبال' :
                   profile?.user?.role === 'patient' ? 'مريض' : 'أخصائي أمراض القلب'
  
  const userAvatarFallback = profile?.user?.name
    ? profile.user.name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2)
    : "JW"
  
  const userAvatarImage = profile?.user?.avatar_url || profile?.user?.avatar || "/placeholder.svg?height=64&width=64"

  return (
    <div className={cn("pb-12 border-l relative", className)}>
      <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-violet-500/10 to-transparent pointer-events-none z-0"></div>
      <div className="space-y-4 py-4 relative z-10">
        <div className="px-4 py-2">
          <div className="flex flex-col items-center justify-center space-y-2">
            <div className="relative z-10">
              <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-violet-500 to-violet-300 blur-md opacity-30"></div>
              <Avatar className="h-16 w-16 border-2 border-white dark:border-gray-800 shadow-md relative z-20 ">
                <AvatarImage src={userAvatarImage || "/placeholder.svg"} alt={userDisplayName} />
                <AvatarFallback className="text-white text-xs font-medium">{userAvatarFallback}</AvatarFallback>
              </Avatar>
            </div>
            <div className="text-center relative z-20">
              <h2 className="text-lg font-semibold">{userDisplayName}</h2>
              <div className="flex items-center justify-center gap-1 text-sm text-muted-foreground">
                <HeartPulse className="h-3 w-3 text-violet-500" />
                <span>{userRole}</span>
              </div>
            </div>
          </div>
        </div>
        <div className="px-3 relative z-20">
          <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">القائمة</h2>
          <div className="space-y-1">
            <Button
              variant={pathname === "/dashboard" ? "secondary" : "ghost"}
              size="lg"
              className={cn(
                "w-full justify-start transition-all",
                pathname === "/dashboard" &&
                  "bg-violet-100 text-violet-900 dark:bg-violet-900/20 dark:text-violet-300 font-medium",
              )}
              asChild
            >
              <Link href="/dashboard" onClick={handleItemClick}>
                <Home className="ml-2 h-5 w-5" />
                لوحة التحكم
              </Link>
            </Button>
            <Button
              variant={pathname === "/appointments" ? "secondary" : "ghost"}
              size="lg"
              className={cn(
                "w-full justify-start transition-all",
                pathname === "/appointments" &&
                  "bg-violet-100 text-violet-900 dark:bg-violet-900/20 dark:text-violet-300 font-medium",
              )}
              asChild
            >
              <Link href="/appointments" onClick={handleItemClick}>
                <Calendar className="ml-2 h-5 w-5" />
                المواعيد
              </Link>
            </Button>
            <Button
              variant={pathname === "/medical-records" ? "secondary" : "ghost"}
              size="lg"
              className={cn(
                "w-full justify-start transition-all",
                pathname === "/medical-records" &&
                  "bg-violet-100 text-violet-900 dark:bg-violet-900/20 dark:text-violet-300 font-medium",
              )}
              asChild
            >
              <Link href="/medical-records" onClick={handleItemClick}>
                <FileText className="ml-2 h-5 w-5" />
                السجلات الطبية
              </Link>
            </Button>
            <Button
              variant={pathname === "/consultations" ? "secondary" : "ghost"}
              size="lg"
              className={cn(
                "w-full justify-start transition-all",
                pathname === "/consultations" &&
                  "bg-violet-100 text-violet-900 dark:bg-violet-900/20 dark:text-violet-300 font-medium",
              )}
              asChild
            >
              <Link href="/consultations" onClick={handleItemClick}>
                <MessageSquareText className="ml-2 h-5 w-5" />
                الاستشارات الطبية
              </Link>
            </Button>
            <Button
              variant={pathname === "/articles" ? "secondary" : "ghost"}
              size="lg"
              className={cn(
                "w-full justify-start transition-all",
                pathname === "/articles" &&
                  "bg-violet-100 text-violet-900 dark:bg-violet-900/20 dark:text-violet-300 font-medium",
              )}
              asChild
            >
              <Link href="/articles" onClick={handleItemClick}>
                <BarChart3 className="ml-2 h-5 w-5" />
                المقالات
              </Link>
            </Button>
            <Button
              variant={pathname === "/article-comments" ? "secondary" : "ghost"}
              size="lg"
              className={cn(
                "w-full justify-start transition-all",
                pathname === "/article-comments" &&
                  "bg-violet-100 text-violet-900 dark:bg-violet-900/20 dark:text-violet-300 font-medium",
              )}
              asChild
            >
              <Link href="/article-comments" onClick={handleItemClick}>
                <MessageSquare className="ml-2 h-5 w-5" />
                تعليقات المقالات
              </Link>
            </Button>
            <Button
              variant={pathname === "/questions" ? "secondary" : "ghost"}
              size="lg"
              className={cn(
                "w-full justify-start transition-all",
                pathname === "/questions" &&
                  "bg-violet-100 text-violet-900 dark:bg-violet-900/20 dark:text-violet-300 font-medium",
              )}
              asChild
            >
              <Link href="/questions" onClick={handleItemClick}>
                <MessageSquare className="ml-2 h-5 w-5" />
                الأسئلة
              </Link>
            </Button>
            <Button
              variant={pathname === "/patients" ? "secondary" : "ghost"}
              size="lg"
              className={cn(
                "w-full justify-start transition-all",
                pathname === "/patients" &&
                  "bg-violet-100 text-violet-900 dark:bg-violet-900/20 dark:text-violet-300 font-medium",
              )}
              asChild
            >
              <Link href="/patients" onClick={handleItemClick}>
                <Users className="ml-2 h-5 w-5" />
                المرضى
              </Link>
            </Button>
        
        
            <Button
              variant={pathname === "/settings" ? "secondary" : "ghost"}
              size="lg"
              className={cn(
                "w-full justify-start transition-all",
                pathname === "/settings" &&
                  "bg-violet-100 text-violet-900 dark:bg-violet-900/20 dark:text-violet-300 font-medium",
              )}
              asChild
            >
              <Link href="/settings" onClick={handleItemClick}>
                <Settings className="ml-2 h-5 w-5" />
                الإعدادات
              </Link>
            </Button>
          </div>
        </div>
      </div>
      <div className="px-3 absolute bottom-4 w-full relative z-20">
        <Button
          variant="ghost"
          size="lg"
          className="w-full justify-start text-rose-600 hover:text-rose-700 hover:bg-rose-50 dark:hover:bg-rose-900/20"
          onClick={handleLogout} // Call handleLogout
        >
          <LogOut className="ml-2 h-5 w-5" />
          تسجيل الخروج
        </Button>
      </div>
    </div>
  )
}
