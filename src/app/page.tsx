"use client"

import { useState, useEffect } from "react"
import { Header } from "@/components/header"
import { Sidebar } from "@/components/sidebar"
import { WelcomeScreen } from "@/components/welcome-screen"
import { EnhancedDashboard } from "@/components/dashboard/enhanced-dashboard"
import { LoadingScreen } from "@/components/loading-screen"
import { Button } from "@/components/ui/button"
import { LayoutDashboard } from "lucide-react"

export default function HomePage() {
  const [isLoading, setIsLoading] = useState(true)
  const [showContent, setShowContent] = useState(false)
  const [showWelcome, setShowWelcome] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
      setTimeout(() => {
        setShowContent(true)
      }, 100)
    }, 3500)

    return () => clearTimeout(timer)
  }, [])

  const handleStartDashboard = () => {
    setShowWelcome(false)
  }

  return (
    <div className="overflow-x-hidden w-full">
      {isLoading && <LoadingScreen />}

      <div
        className={`flex min-h-screen flex-col w-full overflow-x-hidden transition-all duration-700 ${
          showContent ? "opacity-100 transform translate-y-0" : "opacity-0 transform translate-y-4"
        }`}
      >
        <Header />
        <div className="flex flex-1 w-full overflow-x-hidden">
          {/* Desktop Sidebar */}
          <div className="hidden md:block w-64 flex-shrink-0">
            <Sidebar className="h-full border-l" />
          </div>

          {/* Main Content */}
          <main className="flex-1 min-w-0 p-4 md:p-6 overflow-x-hidden">
            <div className="w-full max-w-none">
              {showWelcome ? (
                <div className="space-y-6">
                  <div className="flex justify-end">
                    <Button
                      onClick={handleStartDashboard}
                      className="gap-2 bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700"
                    >
                      <LayoutDashboard className="h-4 w-4" />
                      الذهاب إلى لوحة التحكم
                    </Button>
                  </div>
                  <WelcomeScreen />
                </div>
              ) : (
                <EnhancedDashboard skipLoading={true} />
              )}
            </div>
          </main>
        </div>
      </div>
    </div>
  )
}
