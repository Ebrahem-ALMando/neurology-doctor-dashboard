"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { LogOut, Loader2 } from "lucide-react"
import { useAuth } from "@/hooks/useAuth"
import { useCustomToast } from "@/hooks/use-custom-toast"

interface LogoutButtonProps {
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link"
  size?: "default" | "sm" | "lg" | "icon"
  className?: string
  children?: React.ReactNode
}

export function LogoutButton({ 
  variant = "outline", 
  size = "default", 
  className = "",
  children 
}: LogoutButtonProps) {
  const [isLoading, setIsLoading] = useState(false)
  const { logout } = useAuth()
  const router = useRouter()
  const { showLogoutSuccess, showLogoutError } = useCustomToast()

  const handleLogout = async () => {
    try {
      setIsLoading(true)
      await logout()
      
      showLogoutSuccess()
      router.push("/auth/signin")
    } catch (error) {
      showLogoutError()
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Button
      variant={variant}
      size={size}
      onClick={handleLogout}
      disabled={isLoading}
      className={className}
    >
      {isLoading ? (
        <>
          <Loader2 className="ml-2 h-4 w-4 animate-spin" />
          جاري تسجيل الخروج...
        </>
      ) : (
        <>
          {children || (
            <>
              <LogOut className="ml-2 h-4 w-4" />
              تسجيل الخروج
            </>
          )}
        </>
      )}
    </Button>
  )
} 