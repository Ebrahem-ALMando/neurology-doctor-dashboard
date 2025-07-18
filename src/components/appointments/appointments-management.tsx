"use client"

import { useState } from "react"
import { AppointmentsSummary } from "./appointments-summary"
import { AppointmentsCalendar } from "./appointments-calendar"
import { AppointmentsChart } from "./appointments-chart"
import { AppointmentsTable } from "./appointments-table"
import { AppointmentsActions } from "./appointments-actions"
import { AppointmentsCustomizer } from "./appointments-customizer"
import { CalendarDays, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface AppointmentsSectionVisibility {
  summaryCards: boolean
  calendar: boolean
  chart: boolean
  table: boolean
}

export function AppointmentsManagement() {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date())
  const [viewMode, setViewMode] = useState<"month" | "week" | "day">("month")
  const [visibility, setVisibility] = useState<AppointmentsSectionVisibility>({
    summaryCards: true,
    calendar: true,
    chart: true,
    table: true,
  })

  // Get current date in Arabic format
  const today = new Date()
  const arabicDate = new Intl.DateTimeFormat("ar-SA", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(today)

  return (
    <div className="w-full max-w-none overflow-x-hidden">
      <div className="space-y-6 animate-in fade-in-50 duration-700">
        {/* Page Header */}
        <div className="w-full">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
            <div className="flex items-center gap-3 min-w-0 flex-1">
              <div className="rounded-lg bg-gradient-to-br from-violet-500 to-purple-600 p-2 text-white shadow-lg flex-shrink-0">
                <CalendarDays className="h-6 w-6" />
              </div>
              <div className="min-w-0 flex-1">
                <h1 className="text-xl sm:text-2xl md:text-3xl font-bold truncate">إدارة المواعيد</h1>
                <p className="text-sm text-muted-foreground truncate">{arabicDate}</p>
              </div>
            </div>

            <div className="flex items-center gap-2 flex-shrink-0">
              <Button variant="outline" size="sm" className="gap-2 text-xs">
                <Sparkles className="h-4 w-4" />
                <span className="hidden sm:inline">تحديث</span>
              </Button>
              <AppointmentsCustomizer visibility={visibility} onVisibilityChange={setVisibility} />
              <Select defaultValue={viewMode} onValueChange={(value) => setViewMode(value as "month" | "week" | "day")}>
                <SelectTrigger className="w-[120px] border-violet-200 focus:ring-violet-500">
                  <SelectValue placeholder="العرض" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="day">يومي</SelectItem>
                  <SelectItem value="week">أسبوعي</SelectItem>
                  <SelectItem value="month">شهري</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* Summary Cards */}
        {visibility.summaryCards && (
          <div className="w-full animate-in slide-in-from-top-4 duration-500">
            <AppointmentsSummary />
          </div>
        )}

        {/* Calendar and Chart Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 animate-in slide-in-from-bottom-4 duration-500 delay-200">
          {/* Chart */}
          {visibility.chart && (
            <div className="lg:col-span-1">
              <AppointmentsChart />
            </div>
          )}

          {/* Calendar */}
          {visibility.calendar && (
            <div className={visibility.chart ? "lg:col-span-2" : "lg:col-span-3"}>
              <AppointmentsCalendar
                selectedDate={selectedDate}
                onDateSelect={setSelectedDate}
                viewMode={viewMode}
                onViewModeChange={setViewMode}
              />
            </div>
          )}
        </div>

        {/* Appointments Table */}
        {visibility.table && (
          <div className="w-full animate-in slide-in-from-left-4 duration-500 delay-300">
            <AppointmentsTable />
          </div>
        )}

        {/* Floating Actions */}
        <AppointmentsActions />
      </div>
    </div>
  )
}
