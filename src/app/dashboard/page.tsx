"use client"

import { Header } from "@/components/header"
import { Sidebar } from "@/components/sidebar"
import { EnhancedDashboard } from "@/components/dashboard/enhanced-dashboard"

export default function DashboardPage() {
  return (
    <div className="overflow-x-hidden w-full">
      <div className="flex min-h-screen flex-col w-full overflow-x-hidden">
        <Header />
        <div className="flex flex-1 w-full overflow-x-hidden">
          {/* Desktop Sidebar - عرض ثابت فقط للشاشات الكبيرة */}
          <div className="hidden md:block w-64 flex-shrink-0">
            <Sidebar className="h-full border-l" />
          </div>

          {/* Main Content - يأخذ باقي المساحة */}
          <main className="flex-1 min-w-0 p-4 md:p-6 overflow-x-hidden">
            <div className="w-full max-w-none">
              <EnhancedDashboard skipLoading={true} />
            </div>
          </main>
        </div>
      </div>
    </div>
  )
}
