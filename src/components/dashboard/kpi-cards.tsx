"use client"

import { TrendingUp, CalendarCheck2, UserCheck, Activity, HeartPulse, Stethoscope } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export function KpiCards() {
  return (
    <div className="w-full">
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        <Card className="bg-emerald-50 dark:bg-emerald-950/20 overflow-hidden relative group hover:shadow-lg transition-all duration-300 w-full">
          <div className="absolute -left-6 -bottom-6 opacity-10 transition-opacity group-hover:opacity-20">
            <HeartPulse className="h-16 w-16 md:h-20 md:w-20 text-emerald-600 dark:text-emerald-400" />
          </div>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground truncate">نسبة الحضور</CardTitle>
            <div className="rounded-full bg-emerald-100 dark:bg-emerald-900/30 p-2 text-emerald-600 dark:text-emerald-400 flex-shrink-0">
              <Activity className="h-4 w-4" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl md:text-3xl font-bold text-emerald-600 dark:text-emerald-400">85%</div>
            <p className="text-xs text-muted-foreground mt-1 flex items-center truncate">
              <TrendingUp className="ml-1 h-3 w-3 text-emerald-600 dark:text-emerald-400 flex-shrink-0" />
              زيادة 5% عن الشهر الماضي
            </p>
          </CardContent>
        </Card>

        <Card className="bg-violet-50 dark:bg-violet-950/20 overflow-hidden relative group hover:shadow-lg transition-all duration-300 w-full">
          <div className="absolute -left-6 -bottom-6 opacity-10 transition-opacity group-hover:opacity-20">
            <CalendarCheck2 className="h-16 w-16 md:h-20 md:w-20 text-violet-600 dark:text-violet-400" />
          </div>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground truncate">المواعيد الأسبوعية</CardTitle>
            <div className="rounded-full bg-violet-100 dark:bg-violet-900/30 p-2 text-violet-600 dark:text-violet-400 flex-shrink-0">
              <CalendarCheck2 className="h-4 w-4" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl md:text-3xl font-bold text-violet-600 dark:text-violet-400">18</div>
            <p className="text-xs text-muted-foreground mt-1 flex items-center truncate">
              <TrendingUp className="ml-1 h-3 w-3 text-violet-600 dark:text-violet-400 flex-shrink-0" />
              زيادة 3 عن الأسبوع الماضي
            </p>
          </CardContent>
        </Card>

        <Card className="bg-sky-50 dark:bg-sky-950/20 overflow-hidden relative group hover:shadow-lg transition-all duration-300 w-full sm:col-span-2 lg:col-span-1">
          <div className="absolute -left-6 -bottom-6 opacity-10 transition-opacity group-hover:opacity-20">
            <Stethoscope className="h-16 w-16 md:h-20 md:w-20 text-sky-600 dark:text-sky-400" />
          </div>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground truncate">المرضى اليوم</CardTitle>
            <div className="rounded-full bg-sky-100 dark:bg-sky-900/30 p-2 text-sky-600 dark:text-sky-400 flex-shrink-0">
              <UserCheck className="h-4 w-4" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl md:text-3xl font-bold text-sky-600 dark:text-sky-400">24</div>
            <p className="text-xs text-muted-foreground mt-1 flex items-center truncate">
              <TrendingUp className="ml-1 h-3 w-3 text-sky-600 dark:text-sky-400 flex-shrink-0" />
              زيادة 2 عن الأسبوع الماضي
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
