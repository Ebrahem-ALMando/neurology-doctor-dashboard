"use client"

import { MessageSquare } from "lucide-react"
import { ReactNode } from "react"

export function CommentsHeader({ children }: { children?: ReactNode }) {
  const today = new Date()
  const arabicDate = new Intl.DateTimeFormat("ar-SA", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(today)

  return (
    <div className="w-full">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
        <div className="flex items-center gap-3 min-w-0 flex-1">
          <div className="rounded-lg bg-gradient-to-br from-violet-500 to-purple-600 p-2 text-white shadow-lg flex-shrink-0">
            <MessageSquare className="h-6 w-6" />
          </div>
          <div className="min-w-0 flex-1">
            <h1 className="text-xl sm:text-2xl md:text-3xl font-bold truncate">تعليقات المقالات</h1>
            <p className="text-sm text-muted-foreground truncate">{arabicDate}</p>
          </div>
        </div>
        <div className="flex items-center gap-2 flex-shrink-0">{children}</div>
      </div>
    </div>
  )
} 