"use client"

import { CalendarCheck2, Clock, XCircle, Calendar } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const summaryData = [
  {
    title: "إجمالي المواعيد",
    value: "7",
    icon: Calendar,
    bgColor: "bg-blue-50 dark:bg-blue-950/20",
    iconColor: "text-blue-600 dark:text-blue-400",
    iconBg: "bg-blue-100 dark:bg-blue-900/30",
    trend: "+2 عن الأسبوع الماضي",
    trendUp: true,
  },
  {
    title: "المواعيد المؤكدة",
    value: "4",
    icon: CalendarCheck2,
    bgColor: "bg-emerald-50 dark:bg-emerald-950/20",
    iconColor: "text-emerald-600 dark:text-emerald-400",
    iconBg: "bg-emerald-100 dark:bg-emerald-900/30",
    trend: "+1 عن الأسبوع الماضي",
    trendUp: true,
  },
  {
    title: "قيد الانتظار",
    value: "2",
    icon: Clock,
    bgColor: "bg-amber-50 dark:bg-amber-950/20",
    iconColor: "text-amber-600 dark:text-amber-400",
    iconBg: "bg-amber-100 dark:bg-amber-900/30",
    trend: "نفس الأسبوع الماضي",
    trendUp: null,
  },
  {
    title: "الملغاة",
    value: "1",
    icon: XCircle,
    bgColor: "bg-rose-50 dark:bg-rose-950/20",
    iconColor: "text-rose-600 dark:text-rose-400",
    iconBg: "bg-rose-100 dark:bg-rose-900/30",
    trend: "-1 عن الأسبوع الماضي",
    trendUp: false,
  },
]

export function AppointmentsSummary() {
  return (
    <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
      {summaryData.map((item, index) => (
        <Card
          key={index}
          className={`${item.bgColor} overflow-hidden relative group hover:shadow-lg dark:hover:shadow-gray-900/20 transition-all duration-300 border-0 shadow-md dark:shadow-gray-900/10`}
        >
          <div className="absolute -left-6 -bottom-6 opacity-10 transition-opacity group-hover:opacity-20">
            <item.icon className="h-16 w-16 md:h-20 md:w-20 text-muted-foreground" />
          </div>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground dark:text-gray-400 truncate">
              {item.title}
            </CardTitle>
            <div className={`rounded-full ${item.iconBg} p-2 ${item.iconColor} flex-shrink-0`}>
              <item.icon className="h-4 w-4" />
            </div>
          </CardHeader>
          <CardContent>
            <div className={`text-3xl font-bold ${item.iconColor}`}>{item.value}</div>
            <p className="text-xs text-muted-foreground mt-1 flex items-center truncate">
              {item.trendUp !== null && (
                <span className={`ml-1 h-3 w-3 rounded-full ${item.trendUp ? "bg-emerald-500" : "bg-rose-500"}`}></span>
              )}
              {item.trend}
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
