"use client"

import { Bell, Search, Sun, Moon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useTheme } from "next-themes"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { MobileSidebar } from "./mobile-sidebar"
import { useEffect, useState } from "react"
import type { User } from "@/services/auth.service"

export function Header() {
  const { setTheme, theme } = useTheme()
  const [user, setUser] = useState<User | null>(null)
  const today = new Date()
  const arabicDate = new Intl.DateTimeFormat("ar-EG", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(today)

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedUser = localStorage.getItem("user")
      if (storedUser) {
        setUser(JSON.parse(storedUser))
      }
    }
  }, [])

  const userDisplayName = user?.name || "د. جيمس ويلسون"
  const userAvatarFallback = user?.name
    ? user.name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2)
    : "JW"
  const userAvatarImage = user?.avatar || "/placeholder.svg?height=32&width=32"

  return (
    <header className="sticky top-0 z-50 flex h-16 items-center justify-between border-b bg-background/95 backdrop-blur-sm px-4 md:px-6">
      <div className="flex items-center gap-4">
        <MobileSidebar />
        <div className="flex items-center gap-2">
          <Avatar className="h-8 w-8 border border-violet-200 dark:border-violet-800 md:hidden">
            <AvatarImage src={userAvatarImage || "/placeholder.svg"} alt={userDisplayName} />
            <AvatarFallback className="bg-violet-100 text-violet-700 dark:bg-violet-900 dark:text-violet-300">
              {userAvatarFallback}
            </AvatarFallback>
          </Avatar>
          <div className="hidden md:block">
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse"></div>
              <span className="text-sm font-medium">SmartClinic</span>
            </div>
            <p className="text-xs text-muted-foreground">{arabicDate}</p>
          </div>
        </div>
      </div>

      <div className="flex flex-1 items-center gap-2 md:gap-4 md:justify-end">
        <div className="relative w-full max-w-sm md:max-w-md">
          <Search className="absolute right-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="البحث..."
            className="w-full pr-8 md:w-[300px] lg:w-[400px] rounded-full bg-muted/50 focus-visible:ring-violet-500 text-sm"
          />
        </div>

        <div className="flex items-center gap-1 md:gap-2">
          <Button
            variant="ghost"
            size="icon"
            className="relative rounded-full h-8 w-8 md:h-10 md:w-10"
            aria-label="الإشعارات"
          >
            <Bell className="h-4 w-4 md:h-5 md:w-5 text-gray-700 dark:text-gray-200" />
            <Badge className="absolute -top-1 -left-1 h-4 w-4 md:h-5 md:w-5 rounded-full p-0 text-xs bg-violet-500 text-white flex items-center justify-center shadow">
              3
            </Badge>
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="rounded-full h-8 w-8 md:h-10 md:w-10">
                {theme === "dark" ? (
                  <Moon className="h-4 w-4 md:h-5 md:w-5" />
                ) : (
                  <Sun className="h-4 w-4 md:h-5 md:w-5" />
                )}
                <span className="sr-only">تبديل السمة</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setTheme("light")}>
                <Sun className="ml-2 h-4 w-4" />
                فاتح
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme("dark")}>
                <Moon className="ml-2 h-4 w-4" />
                داكن
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme("system")}>
                <span className="ml-2">⚙️</span>
                النظام
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  )
}
