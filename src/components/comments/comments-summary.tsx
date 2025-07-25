import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { MessageSquare, CalendarDays, CheckCircle, Flag } from "lucide-react"
import type { CommentStats } from "@/data/comments"
import { cn } from "@/lib/utils"

interface CommentsSummaryProps {
  stats: CommentStats
}

export function CommentsSummary({ stats }: CommentsSummaryProps) {
  const kpiCards = [
    {
      title: "إجمالي التعليقات",
      value: stats.totalComments,
      icon: MessageSquare,
      bgColor: "bg-blue-50 dark:bg-blue-950/20",
      textColor: "text-blue-600 dark:text-blue-300",
      iconColor: "text-blue-600 dark:text-blue-400",
      iconBg: "bg-blue-100 dark:bg-blue-900/30",
    },
    {
      title: "تعليقات اليوم",
      value: stats.commentsToday,
      icon: CalendarDays,
      bgColor: "bg-emerald-50 dark:bg-emerald-950/20",
      textColor: "text-green-600 dark:text-green-300",
      iconColor: "text-emerald-600 dark:text-emerald-400",
      iconBg: "bg-emerald-100 dark:bg-emerald-900/30",
    },
    {
      title: "تعليقات منشورة",
      value: stats.publishedComments,
      icon: CheckCircle,
      bgColor: "bg-amber-50 dark:bg-amber-950/20",
      textColor: "text-violet-600 dark:text-violet-300",
      iconColor: "text-amber-600 dark:text-amber-400",
      iconBg: "bg-amber-100 dark:bg-amber-900/30",
    },
    {
      title: "تعليقات مبلغ عنها",
      value: stats.flaggedComments,
      icon: Flag,
      bgColor: "bg-violet-50 dark:bg-violet-950/20",
      textColor: "text-rose-600 dark:text-rose-300",
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
