"use client"

import type React from "react"

import { UserPlus, ClipboardEdit, CheckCircle, FileBarChart, Clock, BadgeAlert } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface Activity {
  id: number
  message: string
  time: string
  icon: React.ReactNode
  color: string
  bgColor: string
}

const activities: Activity[] = [
  {
    id: 1,
    message: "تسجيل مريض جديد - سارة أحمد",
    time: "قبل 10 دقائق",
    icon: <UserPlus className="h-4 w-4" />,
    color: "text-blue-600",
    bgColor: "bg-blue-100 dark:bg-blue-900/30",
  },
  {
    id: 2,
    message: "تحديث السجل الطبي - محمد خالد",
    time: "قبل 30 دقيقة",
    icon: <ClipboardEdit className="h-4 w-4" />,
    color: "text-violet-600",
    bgColor: "bg-violet-100 dark:bg-violet-900/30",
  },
  {
    id: 3,
    message: "اكتمال الموعد - فاطمة علي",
    time: "قبل ساعة",
    icon: <CheckCircle className="h-4 w-4" />,
    color: "text-emerald-600",
    bgColor: "bg-emerald-100 dark:bg-emerald-900/30",
  },
  {
    id: 4,
    message: "استلام نتائج المختبر - أحمد محمود",
    time: "قبل ساعتين",
    icon: <FileBarChart className="h-4 w-4" />,
    color: "text-amber-600",
    bgColor: "bg-amber-100 dark:bg-amber-900/30",
  },
]

export function RecentActivities() {
  return (
    <Card className="overflow-hidden">
      <CardHeader className="flex flex-row items-center justify-between pb-2 border-b">
        <CardTitle className="text-lg font-medium flex items-center gap-2">
          <BadgeAlert className="h-5 w-5 text-violet-600" />
          النشاطات الأخيرة
        </CardTitle>
        <Clock className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent className="p-0">
        <div className="divide-y">
          {activities.map((activity) => (
            <div key={activity.id} className="flex items-start gap-4 p-4 hover:bg-muted/50 transition-colors">
              <div className={`mt-1 rounded-full p-2 ${activity.color} ${activity.bgColor}`}>{activity.icon}</div>
              <div className="space-y-1">
                <p className="text-sm font-medium leading-none">{activity.message}</p>
                <p className="text-xs text-muted-foreground">{activity.time}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
