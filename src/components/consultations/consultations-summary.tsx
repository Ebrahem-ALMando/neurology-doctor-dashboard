"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, PlusCircle, Clock, Lock } from "lucide-react"
import { cn } from "@/lib/utils"
import type { ConsultationStats } from "@/hooks/useConsultations"

interface ConsultationsSummaryProps {
  stats: ConsultationStats
}

export function ConsultationsSummary({ stats }: ConsultationsSummaryProps) {
  const kpiCards = [
    {
      title: "إجمالي الاستشارات",
      value: stats.totalConsultations,
      icon: Users,
      bgColor: "bg-blue-50 dark:bg-blue-950/20",
      iconColor: "text-blue-600 dark:text-blue-400",
      iconBg: "bg-blue-100 dark:bg-blue-900/30",
    },
    {
      title: "استشارات مفتوحة",
      value: stats.openConsultations,
      icon: PlusCircle,
      bgColor: "bg-green-50 dark:bg-green-950/20",
      iconColor: "text-green-600 dark:text-green-400",
      iconBg: "bg-green-100 dark:bg-green-900/30",
    },
    {
      title: "قيد الانتظار",
      value: stats.waitingConsultations,
      icon: Clock,
      bgColor: "bg-amber-50 dark:bg-amber-950/20",
      iconColor: "text-amber-600 dark:text-amber-400",
      iconBg: "bg-amber-100 dark:bg-amber-900/30",
    },
    {
      title: "استشارات مغلقة",
      value: stats.closedConsultations,
      icon: Lock,
      bgColor: "bg-violet-50 dark:bg-violet-950/20",
      iconColor: "text-violet-600 dark:text-violet-400",
      iconBg: "bg-violet-100 dark:bg-violet-900/30",
    },
  ]

  return (
    <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
      {kpiCards?.map((item, index) => (
        <Card
          key={index}
          className={`${item.bgColor} overflow-hidden relative group hover:shadow-lg dark:hover:shadow-gray-900/20 transition-all duration-300 border-0 shadow-md dark:shadow-gray-900/10`}
        >
          <div className="absolute -left-4 -bottom-6 opacity-10 transition-opacity group-hover:opacity-20">
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
            <div className={`text-3xl font-bold ${item.iconColor}`}>{item?.value?.toLocaleString("ar-EG")||''}</div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
