import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { MessageSquare, User, FileText, MessageSquarePlus } from "lucide-react"
import type { ArticleCommentStats } from "@/api/services/articlecomments"
import { Skeleton } from "../ui/skeleton"

interface CommentsSummaryProps {
  stats: ArticleCommentStats
  isLoading: boolean
}

export function CommentsSummary({ stats,isLoading }: CommentsSummaryProps) {
  const kpiCards = [
    {
      title: "إجمالي التعليقات",
      value: stats.totalComments,
      icon: MessageSquarePlus,
      bgColor: "bg-blue-50 dark:bg-blue-950/20",
      textColor: "text-blue-600 dark:text-blue-300",
      iconColor: "text-blue-600 dark:text-blue-400",
      iconBg: "bg-blue-100 dark:bg-blue-900/30",
    },
    {
      title: "إجمالي الردود",
      value: stats.totalReplyComments,
      icon: MessageSquare,
      bgColor: "bg-emerald-50 dark:bg-emerald-950/20",
      textColor: "text-green-600 dark:text-green-300",
      iconColor: "text-emerald-600 dark:text-emerald-400",
      iconBg: "bg-emerald-100 dark:bg-emerald-900/30",
    },
    {
      title: "إجمالي المقالات",
      value: stats.totalArticles,
      icon: FileText,
      bgColor: "bg-amber-50 dark:bg-amber-950/20",
      textColor: "text-violet-600 dark:text-violet-300",
      iconColor: "text-amber-600 dark:text-amber-400",
      iconBg: "bg-amber-100 dark:bg-amber-900/30",
    },
    {
      title: "إجمالي المعلقين",
      value: stats.totalUniqueUsers,
      icon: User,
      bgColor: "bg-violet-50 dark:bg-violet-950/20",
      textColor: "text-rose-600 dark:text-rose-300",
      iconColor: "text-violet-600 dark:text-violet-400",
      iconBg: "bg-violet-100 dark:bg-violet-900/30",
    },
  ]

  return (
    <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
      {isLoading ? (
      <>
        {[...Array(4)].map((_, idx) => (
          <Card
            key={idx}
            className="overflow-hidden relative group border-0 shadow-md dark:shadow-gray-900/10"
          >
            <div className="absolute -left-4 -bottom-6 opacity-10">
              <Skeleton className="h-20 w-20 rounded-full" />
            </div>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <Skeleton className="h-4 w-24" />
              <div className="rounded-full p-2 flex-shrink-0">
                <Skeleton className="h-6 w-6 rounded-full" />
              </div>
            </CardHeader>
            <CardContent>
              <Skeleton className="h-8 w-20" />
            </CardContent>
          </Card>
        ))}
      </>
      ) : (
        <>
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
        </>
      )}
     
    </div>
  )
}
