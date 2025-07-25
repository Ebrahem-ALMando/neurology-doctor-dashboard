"use client"

import { Card } from "@/components/ui/card"
import { Eye, ClipboardList, Bookmark, ListChecks } from "lucide-react"

interface ConsultationsSummaryProps {
  stats: {
    new: number
    underReview: number
    saved: number
    total: number
  }
}

export function ConsultationsSummary({ stats }: ConsultationsSummaryProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
      <Card className="flex flex-col items-center justify-center p-4 bg-violet-50">
        <Eye className="h-6 w-6 text-violet-500 mb-2" />
        <div className="text-2xl font-bold">{stats.new}</div>
        <div className="text-sm text-muted-foreground">استشارات جديدة</div>
      </Card>
      <Card className="flex flex-col items-center justify-center p-4 bg-yellow-50">
        <ClipboardList className="h-6 w-6 text-yellow-500 mb-2" />
        <div className="text-2xl font-bold">{stats.underReview}</div>
        <div className="text-sm text-muted-foreground">قيد المراجعة</div>
      </Card>
      <Card className="flex flex-col items-center justify-center p-4 bg-green-50">
        <Bookmark className="h-6 w-6 text-green-500 mb-2" />
        <div className="text-2xl font-bold">{stats.saved}</div>
        <div className="text-sm text-muted-foreground">محفوظة</div>
      </Card>
      <Card className="flex flex-col items-center justify-center p-4 bg-blue-50">
        <ListChecks className="h-6 w-6 text-blue-500 mb-2" />
        <div className="text-2xl font-bold">{stats.total}</div>
        <div className="text-sm text-muted-foreground">إجمالي الاستشارات</div>
      </Card>
    </div>
  )
} 