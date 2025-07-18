"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, Calendar } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { DayAppointmentsModal } from "./day-appointments-modal"

interface AppointmentsCalendarProps {
  selectedDate: Date
  onDateSelect: (date: Date) => void
  viewMode: "month" | "week" | "day"
  onViewModeChange: (mode: "month" | "week" | "day") => void
}

const appointments = [
  {
    date: 2,
    time: "09:30",
    patient: "نورة سعيد",
    status: "confirmed" as const,
    phone: "0501234567",
    visitType: "استشارة",
    notes: "مراجعة نتائج الفحوصات الأخيرة",
  },
  {
    date: 2,
    time: "12:00",
    patient: "عبدالله محمد",
    status: "pending" as const,
    phone: "0507654321",
    visitType: "فحص دوري",
    notes: "فحص دوري شامل",
  },
  {
    date: 11,
    time: "10:00",
    patient: "أحمد محمد",
    status: "confirmed" as const,
    phone: "0509876543",
    visitType: "متابعة",
    notes: "متابعة حالة ضغط الدم",
  },
  {
    date: 11,
    time: "14:30",
    patient: "فاطمة علي",
    status: "cancelled" as const,
    phone: "0502468135",
    visitType: "استشارة",
    notes: "تم الإلغاء بناءً على طلب المريضة",
  },
  {
    date: 4,
    time: "11:15",
    patient: "خالد عمر",
    status: "pending" as const,
    phone: "0508642097",
    visitType: "فحص أولي",
    notes: "فحص أولي للقلب",
  },
]

const daysOfWeek = ["الأحد", "الإثنين", "الثلاثاء", "الأربعاء", "الخميس", "الجمعة", "السبت"]

export function AppointmentsCalendar({
  selectedDate,
  onDateSelect,
  viewMode,
  onViewModeChange,
}: AppointmentsCalendarProps) {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [highlightedDay, setHighlightedDay] = useState<number | null>(11) // Today's date
  const [modalOpen, setModalOpen] = useState(false)
  const [selectedModalDay, setSelectedModalDay] = useState<number | null>(null)

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear()
    const month = date.getMonth()
    const firstDay = new Date(year, month, 1)
    const lastDay = new Date(year, month + 1, 0)
    const daysInMonth = lastDay.getDate()
    const startingDayOfWeek = firstDay.getDay()

    const days = []

    // Add empty cells for days before the first day of the month
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null)
    }

    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(day)
    }

    return days
  }

  const navigateMonth = (direction: "prev" | "next") => {
    const newDate = new Date(currentDate)
    if (direction === "prev") {
      newDate.setMonth(newDate.getMonth() - 1)
    } else {
      newDate.setMonth(newDate.getMonth() + 1)
    }
    setCurrentDate(newDate)
  }

  const getAppointmentsForDay = (day: number) => {
    return appointments.filter((apt) => apt.date === day)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "confirmed":
        return "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800"
      case "pending":
        return "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400 border-amber-200 dark:border-amber-800"
      case "cancelled":
        return "bg-rose-100 text-rose-700 dark:bg-rose-900/30 dark:text-rose-400 border-rose-200 dark:border-rose-800"
      default:
        return "bg-gray-100 text-gray-700 dark:bg-gray-900/30 dark:text-gray-400 border-gray-200 dark:border-gray-800"
    }
  }

  const monthName = currentDate.toLocaleDateString("ar-SA", { month: "long", year: "numeric" })

  return (
    <Card className="overflow-hidden border-0 shadow-lg dark:shadow-gray-900/20 bg-white dark:bg-gray-900">
      <CardHeader className="flex flex-row items-center justify-between pb-4 border-b border-gray-200 dark:border-gray-700 bg-gradient-to-r from-violet-50 to-purple-50 dark:from-violet-950/30 dark:to-purple-950/30">
        <div className="flex items-center gap-3 min-w-0 flex-1">
          <div className="rounded-xl bg-violet-100 dark:bg-violet-900/30 p-2 text-violet-600 dark:text-violet-400 flex-shrink-0">
            <Calendar className="h-5 w-5" />
          </div>
          <div className="min-w-0 flex-1">
            <CardTitle className="text-lg font-semibold flex items-center gap-2 truncate">التقويم</CardTitle>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* View Mode Buttons */}
          <div className="flex bg-muted rounded-lg p-1">
            {(["يومي", "أسبوعي", "شهري"] as const).map((mode, index) => {
              const modeValue = ["day", "week", "month"][index] as "day" | "week" | "month"
              return (
                <Button
                  key={mode}
                  variant={viewMode === modeValue ? "default" : "ghost"}
                  size="sm"
                  className={`text-xs px-3 ${viewMode === modeValue ? "bg-violet-600 hover:bg-violet-700" : ""}`}
                  onClick={() => onViewModeChange(modeValue)}
                >
                  {mode}
                </Button>
              )
            })}
          </div>
        </div>
      </CardHeader>

      <CardContent className="p-4">
        {/* Month Navigation */}
        <div className="flex items-center justify-between mb-4">
          <Button variant="ghost" size="icon" onClick={() => navigateMonth("prev")}>
            <ChevronRight className="h-4 w-4" />
          </Button>
          <h3 className="text-lg font-semibold">{monthName}</h3>
          <Button variant="ghost" size="icon" onClick={() => navigateMonth("next")}>
            <ChevronLeft className="h-4 w-4" />
          </Button>
        </div>

        {/* Calendar Container with Horizontal Scroll for Mobile */}
        <div className="overflow-x-auto pb-2 -mx-4 px-4 md:overflow-visible md:-mx-0 md:px-0">
          <div className="min-w-[640px] md:min-w-0">
            {/* Calendar Grid - Days of Week */}
            <div className="grid grid-cols-7 gap-1 mb-2">
              {daysOfWeek.map((day) => (
                <div key={day} className="text-center text-sm font-medium text-muted-foreground p-2 border-b">
                  {day}
                </div>
              ))}
            </div>

            {/* Calendar Grid - Days */}
            <div className="grid grid-cols-7 gap-1">
              {getDaysInMonth(currentDate).map((day, index) => (
                <div
                  key={index}
                  className={`min-h-[80px] w-full p-1 border border-gray-200 dark:border-gray-700 rounded-lg transition-all duration-200 ${
                    day ? "hover:bg-muted/50 cursor-pointer bg-white dark:bg-gray-800" : "border-transparent"
                  } ${
                    day === highlightedDay
                      ? "bg-violet-100 dark:bg-violet-900/30 border-violet-300 dark:border-violet-700"
                      : ""
                  }`}
                  onClick={() => {
                    if (day) {
                      setHighlightedDay(day)
                      onDateSelect(new Date(currentDate.getFullYear(), currentDate.getMonth(), day))
                      // فتح الـ modal إذا كان هناك مواعيد في هذا اليوم
                      const dayAppointments = getAppointmentsForDay(day)
                      if (dayAppointments.length > 0) {
                        setSelectedModalDay(day)
                        setModalOpen(true)
                      }
                    }
                  }}
                >
                  {day && (
                    <>
                      <div
                        className={`text-sm font-medium mb-1 ${
                          day === highlightedDay ? "text-violet-700 dark:text-violet-400" : ""
                        }`}
                      >
                        {day}
                      </div>
                      <div className="space-y-1 max-h-[60px] overflow-y-auto scrollbar-thin">
                        {getAppointmentsForDay(day).map((apt, aptIndex) => (
                          <div
                            key={aptIndex}
                            className={`text-xs px-1 py-0.5 rounded truncate border ${getStatusColor(apt.status)}`}
                            title={`${apt.time} - ${apt.patient}`}
                          >
                            {apt.time} - {apt.patient}
                          </div>
                        ))}
                      </div>
                    </>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Legend */}
        <div className="flex flex-wrap gap-3 mt-4 pt-3 border-t">
          <Badge className="bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800">
            مؤكد
          </Badge>
          <Badge className="bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400 border border-amber-200 dark:border-amber-800">
            قيد الانتظار
          </Badge>
          <Badge className="bg-rose-100 text-rose-700 dark:bg-rose-900/30 dark:text-rose-400 border border-rose-200 dark:border-rose-800">
            ملغي
          </Badge>
        </div>
      </CardContent>
      {/* Day Appointments Modal */}
      <DayAppointmentsModal
        open={modalOpen}
        onOpenChange={setModalOpen}
        selectedDay={selectedModalDay}
        appointments={appointments}
        monthName={monthName}
      />
    </Card>
  )
}
