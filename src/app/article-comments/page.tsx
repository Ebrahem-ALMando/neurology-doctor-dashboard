"use client"

import * as React from "react"
import { CommentsSummary } from "@/components/comments/comments-summary"
import { CommentsFilterBar } from "@/components/comments/comments-filter-bar"
import { CommentsTableView } from "@/components/comments/comments-table-view"
import { CommentsPagination } from "@/components/comments/comments-pagination"
import { CommentsLoadingSkeleton } from "@/components/comments/comments-loading-skeleton"
import { CommentsCustomizer, type CommentsSectionVisibility } from "@/components/comments/comments-customizer"
import { CommentsHeader } from "@/components/comments/comments-header"
import { Header } from "@/components/header"
import { Sidebar } from "@/components/sidebar"
import { useArticleComments } from "@/hooks/comments/useArticleComments"
import { useCommentsFilters } from "@/hooks/comments/useCommentsFilters"
import type { ArticleComment } from "@/api/services/articlecomments/types"
import { useArticleCommentStats } from "@/hooks/comments/useArticleCommentStats"

export default function ArticleCommentsPage() {
  // استخدام هوك الفلاتر لإدارة حالة الفلاتر
  const {
    filters,
    setFilter,
    resetFilters,
    hasActiveFilters,
    toApiParams,
  } = useCommentsFilters()

  // استخدام هوك التعليقات لجلب البيانات الحقيقية
  const {
    comments,
    meta,
    isLoading,
    isLoadingInner,
    error,
    errorMessage,
    addComment,
    replyComment,
    deleteComment,
    updateComment,
    showComment,
    mutate,
    
  } = useArticleComments(toApiParams())

  const { stats: commentStats, isLoading: commentStatsLoading, error: commentStatsError } = useArticleCommentStats()

  const [visibility, setVisibility] = React.useState<CommentsSectionVisibility>({
    summaryCards: true,
    commentsList: true,
  })



  // معالجة تغيير الفلاتر
  const handleSearchChange = (query: string) => setFilter('searchQuery', query)
  const handleArticleChange = (articleId: string) => setFilter('selectedArticle', articleId)
  const handleCommenterChange = (commenterId: string) => setFilter('selectedCommenter', commenterId)
  const handleStatusChange = (status: string) => setFilter('isReply', status)
  const handleDateRangeChange = (range: any) => setFilter('dateRange', range)

  // معالجة تغيير الصفحة
  const handlePageChange = (page: number) => setFilter('page', page)

 

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
              
              {visibility.summaryCards && <CommentsSummary stats={commentStats || {
                totalComments: 0,
                totalReplyComments: 0,
                totalUniqueUsers: 0,
                totalArticles: 0,
                  }} 
                  isLoading={commentStatsLoading} />}
              
              <CommentsFilterBar
                searchQuery={filters.searchQuery}
                onSearchChange={handleSearchChange}
                selectedArticle={filters.selectedArticle}
                onArticleChange={handleArticleChange}
                selectedCommenter={filters.selectedCommenter}
                onCommenterChange={handleCommenterChange}
                selectedStatus={filters.isReply}
                onStatusChange={handleStatusChange}
                dateRange={filters.dateRange}
                onDateRangeChange={handleDateRangeChange}
              />
              
              {visibility.commentsList && (
                isLoading ? (
                  <div className="rounded-xl border bg-card shadow-sm w-full">
                    <CommentsLoadingSkeleton rows={meta?.limit || 20} />
                  </div>
                ) : error ? (
                  <div className="rounded-xl border bg-card p-6 text-center">
                    <p className="text-red-600">حدث خطأ في تحميل التعليقات: {errorMessage}</p>
                  </div>
                ) : (
                  <>
                    <CommentsTableView
                      comments={comments as ArticleComment[]}
                      addComment={addComment}
                      deleteComment={deleteComment}
                      updateComment={updateComment}
                      replyComment={addComment}
                      isLoading={isLoading}
                      mutate={mutate}
                      isLoadingInner={isLoadingInner}
                      selectedStatus={filters.isReply as any}
                    />
                    {meta && (
                      <div className="flex items-center justify-between">
                        <div className="text-sm text-muted-foreground">
                          عرض {comments.length} من {meta.total} تعليق
                        </div>
                        <CommentsPagination 
                          currentPage={meta.page || 1} 
                          totalPages={meta.totalPages || 1} 
                          onPageChange={handlePageChange} 
                        />
                      </div>
                    )}
                  </>
                )
              )}
            </div>
          </main>
        </div>
      </div>
    </div>
  )
}
