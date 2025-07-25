"use client"

import { TableBody } from "@/components/ui/table"

import { TableHead } from "@/components/ui/table"

import { TableRow } from "@/components/ui/table"

import { TableHeader } from "@/components/ui/table"

import { Table } from "@/components/ui/table"

import * as React from "react"
import { CommentsSummary } from "@/components/comments/comments-summary"
import { CommentsFilterBar } from "@/components/comments/comments-filter-bar"
import { CommentsTableView } from "@/components/comments/comments-table-view"
import { CommentsPagination } from "@/components/comments/comments-pagination"
import { CommentsLoadingSkeleton } from "@/components/comments/comments-loading-skeleton"
import { dummyComments, getCommentStats, type Comment } from "@/data/comments"
import type { DateRange } from "react-day-picker"
import { useToast } from "@/components/ui/use-toast"
import { Sidebar } from "@/components/sidebar"
import { CommentsCustomizer, type CommentsSectionVisibility } from "@/components/comments/comments-customizer"
import { CommentsHeader } from "@/components/comments/comments-header"
import { Header } from "@/components/header"

export default function ArticleCommentsPage() {
  const { toast } = useToast()
  const [loading, setLoading] = React.useState(true)
  const [comments, setComments] = React.useState<Comment[]>(dummyComments)
  const [searchQuery, setSearchQuery] = React.useState("")
  const [selectedArticle, setSelectedArticle] = React.useState("All")
  const [selectedCommenter, setSelectedCommenter] = React.useState("All")
  const [selectedStatus, setSelectedStatus] = React.useState("All")
  const [dateRange, setDateRange] = React.useState<DateRange | undefined>(undefined)
  const [currentPage, setCurrentPage] = React.useState(1)
  const commentsPerPage = 6
  const [visibility, setVisibility] = React.useState<CommentsSectionVisibility>({
    summaryCards: true,
    commentsList: true,
  })

  React.useEffect(() => {
    // Simulate data fetching
    setLoading(true)
    const timer = setTimeout(() => {
      setComments(dummyComments)
      setLoading(false)
    }, 500)
    return () => clearTimeout(timer)
  }, [])

  const filteredComments = React.useMemo(() => {
    let filtered = comments

    if (searchQuery) {
      filtered = filtered.filter(
        (comment) =>
          comment.comment.toLowerCase().includes(searchQuery.toLowerCase()) ||
          comment.commenter.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          comment.article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          comment.articleCode.toLowerCase().includes(searchQuery.toLowerCase()),
      )
    }

    if (selectedArticle !== "All") {
      filtered = filtered.filter((comment) => comment.article.id === selectedArticle)
    }

    if (selectedCommenter !== "All") {
      filtered = filtered.filter((comment) => comment.commenter.name === selectedCommenter)
    }

    if (selectedStatus !== "All") {
      filtered = filtered.filter((comment) => comment.status === selectedStatus)
    }

    if (dateRange?.from) {
      filtered = filtered.filter((comment) => {
        const commentDate = new Date(comment.date.split(" ")[0].replace(/هـ/g, "").split("/").reverse().join("-")) // Simplified for dummy Hijri
        return dateRange.from && commentDate >= dateRange.from
      })
    }
    if (dateRange?.to) {
      filtered = filtered.filter((comment) => {
        const commentDate = new Date(comment.date.split(" ")[0].replace(/هـ/g, "").split("/").reverse().join("-")) // Simplified for dummy Hijri
        return dateRange.to && commentDate <= dateRange.to
      })
    }

    return filtered
  }, [comments, searchQuery, selectedArticle, selectedCommenter, selectedStatus, dateRange])

  const totalPages = Math.ceil(filteredComments.length / commentsPerPage)
  const paginatedComments = filteredComments.slice((currentPage - 1) * commentsPerPage, currentPage * commentsPerPage)

  const handleApprove = (id: string) => {
    setComments((prev) => prev.map((c) => (c.id === id ? { ...c, status: "approved" } : c)))
    toast({
      title: "نجاح",
      description: "تمت الموافقة على التعليق بنجاح.",
      variant: "default",
    })
  }

  const handleReject = (id: string) => {
    setComments((prev) => prev.map((c) => (c.id === id ? { ...c, status: "rejected" } : c)))
    toast({
      title: "نجاح",
      description: "تم رفض التعليق بنجاح.",
      variant: "default",
    })
  }

  const handleDelete = (id: string) => {
    setComments((prev) => prev.filter((c) => c.id !== id))
    toast({
      title: "نجاح",
      description: "تم حذف التعليق بنجاح.",
      variant: "default",
    })
  }

  const handleFlag = (id: string) => {
    setComments((prev) => prev.map((c) => (c.id === id ? { ...c, status: "flagged" } : c)))
    toast({
      title: "نجاح",
      description: "تم الإبلاغ عن التعليق بنجاح.",
      variant: "default",
    })
  }

  const handleReply = (id: string, replyText: string) => {
    console.log(`Replying to comment ${id}: ${replyText}`)
    toast({
      title: "نجاح",
      description: "تم إرسال الرد بنجاح.",
      variant: "default",
    })
    // In a real app, you'd send this reply to your backend
  }

  const commentStats = getCommentStats()

  return (
    <div className="w-full">
      <div className="flex min-h-screen flex-col w-full">
        <Header />
        <div className="flex flex-1 w-full overflow-x-hidden">
          {/* Desktop Sidebar */}
          <div className="hidden md:block w-64 flex-shrink-0">
            <Sidebar className="h-full border-l" />
          </div>
          {/* Main Content */}
          <main className="flex-1 min-w-0 p-4 md:p-6">
            <div className="w-full max-w-none space-y-6 animate-in fade-in-50 duration-700">
              <CommentsHeader>
                <CommentsCustomizer visibility={visibility} onVisibilityChange={setVisibility} />
              </CommentsHeader>
              {visibility.summaryCards && <CommentsSummary stats={commentStats} />}
              <CommentsFilterBar
                searchQuery={searchQuery}
                onSearchChange={setSearchQuery}
                selectedArticle={selectedArticle}
                onArticleChange={setSelectedArticle}
                selectedCommenter={selectedCommenter}
                onCommenterChange={setSelectedCommenter}
                selectedStatus={selectedStatus}
                onStatusChange={setSelectedStatus}
                dateRange={dateRange}
                onDateRangeChange={setDateRange}
              />
              {visibility.commentsList && (loading ? (
                <div className="rounded-xl border bg-card shadow-sm">
                  <Table>
                    <TableHeader>
                      <TableRow className="bg-muted/50">
                        <TableHead className="w-[150px] text-right">المعلق</TableHead>
                        <TableHead className="w-[300px] text-right">التعليق</TableHead>
                        <TableHead className="w-[200px] text-right">المقالة</TableHead>
                        <TableHead className="w-[120px] text-right">التاريخ</TableHead>
                        <TableHead className="w-[100px] text-right">الحالة</TableHead>
                        <TableHead className="w-[150px] text-right">الإجراءات</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <CommentsLoadingSkeleton rows={commentsPerPage} />
                    </TableBody>
                  </Table>
                </div>
              ) : (
                <>
                  <CommentsTableView
                    comments={paginatedComments}
                    onApprove={handleApprove}
                    onReject={handleReject}
                    onDelete={handleDelete}
                    onFlag={handleFlag}
                    onReply={handleReply}
                  />
                  <div className="flex items-center justify-between">
                    <div className="text-sm text-muted-foreground">
                      عرض {Math.min(commentsPerPage, paginatedComments.length)} من {filteredComments.length} تعليق
                    </div>
                    <CommentsPagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
                  </div>
                </>
              ))}
            </div>
          </main>
        </div>
      </div>
    </div>
  )
}
