"use client"

import { useState, useEffect } from "react"
import { KpiCards } from "./kpi-cards"
import { RecentActivities } from "./recent-activities"
import { ChartsGrid } from "./charts-grid"
import { AppointmentsTable } from "./appointments-table"
import { DashboardCustomizer } from "./dashboard-customizer"
import { EnhancedLoading } from "@/components/ui/enhanced-loading"
import { LayoutDashboard, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"

interface WidgetVisibility {
  kpiCards: boolean
  recentActivities: boolean
  diagnosesChart: boolean
  attendanceChart: boolean
  diseasesChart: boolean
  appointmentsTable: boolean
}

interface EnhancedDashboardProps {
  skipLoading?: boolean
}

export function EnhancedDashboard({ skipLoading = false }: EnhancedDashboardProps) {
  const [isLoading, setIsLoading] = useState(!skipLoading)
  const [visibility, setVisibility] = useState<WidgetVisibility>({
    kpiCards: true,
    recentActivities: true,
    diagnosesChart: true,
    attendanceChart: true,
    diseasesChart: true,
    appointmentsTable: true,
  })

  useEffect(() => {
    if (!skipLoading) {
      const timer = setTimeout(() => {
        setIsLoading(false)
      }, 2500)
      return () => clearTimeout(timer)
    }
  }, [skipLoading])

  if (isLoading) {
    return <EnhancedLoading />
  }

  return (
    <div className="w-full max-w-none overflow-x-hidden">
      <div className="space-y-6 animate-in fade-in-50 duration-700">
        {/* Dashboard Header */}
        <div className="w-full">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
            <div className="flex items-center gap-3 min-w-0 flex-1">
              <div className="rounded-lg bg-gradient-to-br from-violet-500 to-purple-600 p-2 text-white shadow-lg flex-shrink-0">
                <LayoutDashboard className="h-6 w-6" />
              </div>
              <div className="min-w-0 flex-1">
                <h1 className="text-xl sm:text-2xl md:text-3xl font-bold truncate">لوحة التحكم</h1>
                <p className="text-sm text-muted-foreground truncate">مرحباً بك في نظام إدارة العيادة</p>
              </div>
            </div>

            <div className="flex items-center gap-2 flex-shrink-0">
              <Button variant="outline" size="sm" className="gap-2 text-xs">
                <Sparkles className="h-4 w-4" />
                <span className="hidden sm:inline">تحديث</span>
              </Button>
              <DashboardCustomizer visibility={visibility} onVisibilityChange={setVisibility} />
            </div>
          </div>
        </div>

        {/* Content Sections */}
        <div className="w-full space-y-6">
          {/* KPI Cards */}
          {visibility.kpiCards && (
            <div className="w-full animate-in slide-in-from-top-4 duration-500">
              <KpiCards />
            </div>
          )}

          {/* Recent Activities */}
          {visibility.recentActivities && (
            <div className="w-full animate-in slide-in-from-right-4 duration-500 delay-100">
              <RecentActivities />
            </div>
          )}

          {/* Charts Grid */}
          <div className="w-full animate-in slide-in-from-bottom-4 duration-500 delay-200">
            <ChartsGrid
              visibility={{
                diagnosesChart: visibility.diagnosesChart,
                attendanceChart: visibility.attendanceChart,
                diseasesChart: visibility.diseasesChart,
              }}
            />
          </div>

          {/* Appointments Table */}
          {visibility.appointmentsTable && (
            <div className="w-full animate-in slide-in-from-left-4 duration-500 delay-300">
              <AppointmentsTable />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
