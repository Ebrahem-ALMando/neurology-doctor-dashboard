"use client"

import * as React from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Reply, Trash2, FolderSearch } from "lucide-react"
import { cn } from "@/lib/utils"

import { getRelativeTime } from "@/utils/General/formatDateRange"
import { ArticleComment } from "@/api/services/articlecomments/types"
import { DeleteCommentModal } from "./modals/DeleteCommentModal"
import { ReplyCommentModal } from "./modals/ReplyCommentModal"


interface CommentsTableViewProps {

  isLoading:boolean
  isLoadingInner:boolean
  comments: ArticleComment[]
  addComment: (data: { article_id: number; content: string; parent_id?: number | null }) => Promise<any>
  deleteComment: (id: number) => Promise<any>
  updateComment: (id: number, data: { content: string }) => Promise<any>
  replyComment: (data: { article_id: number; content: string; parent_id?: number | null }) => Promise<any>
  mutate: () => void
  selectedStatus?: "All" | "main" | "reply"
}

export function CommentsTableView({
  isLoading,
  isLoadingInner,
  comments,
  deleteComment,
  replyComment,
  mutate,
  selectedStatus = "All",
}: CommentsTableViewProps) {
  const [expandedCommentId, setExpandedCommentId] = React.useState<number | null>(null)
  const [showDeleteDialog, setShowDeleteDialog] = React.useState(false)
  const [commentToDelete, setCommentToDelete] = React.useState<{ id: number; articleTitle: string } | null>(null)
  const [showReplyDialog, setShowReplyDialog] = React.useState(false)
  const [commentToReply, setCommentToReply] = React.useState<number | null>(null)
  const [replyText, setReplyText] = React.useState("")

  const handleToggleExpand = (id: number) => {
    setExpandedCommentId(expandedCommentId === id ? null : id)
  }

  const handleDeleteClick = (comment: ArticleComment) => {
    setCommentToDelete({ id: comment.id, articleTitle: resolveArticleTitle(comment) })
    setShowDeleteDialog(true)
  }
  const handleDelete = async (id: number) => {
    await deleteComment(id)
    mutate()
  }
  const handleConfirmDelete = async () => {
    if (commentToDelete) {
      await handleDelete(commentToDelete.id)
      setCommentToDelete(null)
      setShowDeleteDialog(false)
    }
  }

  const handleReplyClick = (id: number) => {
    setCommentToReply(id)
    setShowReplyDialog(true)
  }
  const handleSendReply = async () => {
    if (commentToReply && replyText.trim()) {
      const parentComment = comments.find(c => c.id === commentToReply)
      if (parentComment) {
        await replyComment({
          article_id: parentComment.article_id,
          content: replyText,
          parent_id: commentToReply,
        })
        setShowReplyDialog(false)
        setCommentToReply(null)
        setReplyText("")
        mutate()
      }
    }
  }

  // خريطة للتعليقات بالمعرف لاستخدامها كمرجع للأب
  const commentsMap = React.useMemo(() => {
    const map = new Map<number, ArticleComment>()
    const addToMap = (c: ArticleComment) => {
      map.set(c.id, c)
      if (Array.isArray(c.children)) {
        c.children.forEach(addToMap)
      }
    }
    comments.forEach(addToMap)
    return map
  }, [comments])

  const resolveArticleTitle = (c: ArticleComment): string => {
    if (c.article_title) return c.article_title
    if (c.parent_id != null) {
      const parent = commentsMap.get(c.parent_id)
      if (parent?.article_title) return parent.article_title
    }
    return ""
  }

  const flatComments = React.useMemo(() => {
    if (selectedStatus === "reply") {
      return comments
        .filter((c) => c.parent_id !== null)
        .map((c) => ({ ...c, article_title: c.article_title || resolveArticleTitle(c) }))
    }
    if (selectedStatus === "main") {
      return comments.filter((c) => c.parent_id === null)
    }

    const result: ArticleComment[] = []
    comments.forEach((comment) => {
      if (!comment.parent_id) {
        result.push(comment)
        if (comment.children && comment.children.length > 0) {
          comment.children.forEach((child) => {
            result.push({ ...child, article_title: child.article_title || comment.article_title })
          })
        }
      }
    })
    return result
  }, [comments, selectedStatus])

  return (
    <TooltipProvider>
      <div className="rounded-xl border bg-card shadow-sm">
        <Table className="w-full">
          <TableHeader>
            <TableRow className="bg-muted/50">
              <TableHead className="w-[80px] text-right text-blue-600">#</TableHead>
              <TableHead className="w-[150px] text-right">المعلق</TableHead>
              <TableHead className="w-[300px] text-right">التعليق</TableHead>
              <TableHead className="w-[200px] text-right">اسم المقال</TableHead>
              <TableHead className="w-[120px] text-right">عدد الردود</TableHead>
              <TableHead className="w-[120px] text-right">نوع التعليق</TableHead>
              <TableHead className="w-[180px] text-right">التاريخ</TableHead>
              <TableHead className="w-[150px] text-right">الإجراءات</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {flatComments.length===0?
            <TableRow>
              <TableCell colSpan={8} className="py-12">
                <div className="flex flex-col items-center justify-center gap-4">
                  <span className="animate-bounce text-blue-400">
                    <FolderSearch  className="w-16 h-16 text-blue-400" strokeWidth={1.5} />
                  </span>
                  <span className="text-lg font-semibold text-blue-500">لا يوجد بيانات لعرضها</span>
                  <span className="text-muted-foreground text-sm">لم يتم العثور على تعليقات مطابقة للفلتر الحالي.</span>
                </div>
              </TableCell>
            </TableRow>
            :
            <>  
              {flatComments.map((comment,index) => (
              <TableRow
                key={comment.id}
                onClick={() => handleToggleExpand(comment.id)}
                className={cn(
                  "cursor-pointer transition-colors hover:bg-muted/50 group border-b-2",
                  !comment.parent_id && "bg-gradient-to-l from-blue-50/60 via-white to-white dark:from-blue-950/20 dark:via-card dark:to-card border-blue-200 dark:border-blue-800",
                  comment.parent_id && "bg-blue-300/10 dark:bg-blue-950/10 border-blue-100 dark:border-blue-900"
                )}
              >
                <TableCell className="font-bold text-md text-muted-foreground text-blue-600">{index+1}</TableCell>
                <TableCell className="font-medium">
                  <div className="flex items-center justify-start gap-2">
                  <Avatar className="h-8 w-8">
                      <AvatarImage src={comment.user.avatar_url || ""} alt={comment.user.name} />
                      <AvatarFallback>{comment.user.name.slice(0, 2)}</AvatarFallback>
                    </Avatar>
                    <span className={cn(
                      comment.parent_id && "text-blue-600 dark:text-blue-400 font-medium"
                    )}>
            
                      {comment.user.name}
                
                    </span>
                    
                  </div>
                </TableCell>
                <TableCell className="text-right">
                  <div
                    className={cn(
                      "max-w-[250px] overflow-hidden text-ellipsis ",
                      expandedCommentId !== comment.id && "line-clamp-2",
                      comment.parent_id && "text-blue-600 dark:text-blue-400"
                    )}
                  >
                    {comment.content}
                  </div>
                </TableCell>
                <TableCell className="text-right">
                  <div      className={cn(
                      "max-w-[250px] overflow-hidden text-ellipsis",
                      expandedCommentId !== comment.id && "line-clamp-2",
                      comment.parent_id && "text-blue-600 dark:text-blue-400"
                    )}
                  >
                    {resolveArticleTitle(comment)}</div>
                </TableCell>
                <TableCell className="text-right">
                  <Badge 
         
                  className="bg-amber-100 w-[30px] d-flex  justify-center dark:bg-amber-900/30 text-amber-700 dark:text-amber-200 px-2 py-1 text-xs font-bold group-hover:scale-105 group-hover:shadow-lg">
                    {comment.children?.length || 0}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  <Badge
                    className={cn(
                      "px-2 py-1 w-[90px]  d-flex  justify-center text-xs transition-all duration-200 cursor-pointer group-hover:scale-105 group-hover:shadow-lg border border-transparent text-center",
                      comment.parent_id === null && "bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-300 hover:border-green-400",
                      comment.parent_id !== null && "bg-blue-100 text-blue-700 dark:bg-blue-900/20 dark:text-blue-300 hover:border-blue-400"
                    )}
                    title={comment.parent_id === null ? "تعليق رئيسي" : "رد"}
                  >
                    {comment.parent_id === null ? "تعليق رئيسي" : "رد"}
                    {comment.parent_id && <Reply className="h-4 w-4 mr-1" />}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex flex-col ">
                    <span>{new Date(comment.created_at).toLocaleDateString('ar-EG', { year: '2-digit', month: '2-digit', day: '2-digit' })}</span>
                    <span className="text-xs text-muted-foreground">{getRelativeTime(comment.created_at)}</span>
                  </div>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex items-center  gap-1">
                
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          disabled={isLoadingInner}
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-red-600 hover:bg-red-50 hover:text-red-700"
                          onClick={(e) => {
                            e.stopPropagation()
                            handleDeleteClick(comment)
                          }}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>الحذف</TooltipContent>
                    </Tooltip>
                    {!comment.parent_id&&
                    <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        disabled={isLoadingInner}
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-purple-600 hover:bg-purple-50 hover:text-purple-700"
                        onClick={(e) => {
                          e.stopPropagation()
                          handleReplyClick(comment.id)
                        }}
                      >
                        <Reply className="h-4 w-4" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>الرد</TooltipContent>
                  </Tooltip>
                  }
                  </div>
                </TableCell>
              </TableRow>
            ))}
            </>
          }
          
          </TableBody>
        </Table>
      </div>
      <DeleteCommentModal
        open={showDeleteDialog}
        onOpenChange={setShowDeleteDialog}
        commentId={commentToDelete?.id ?? 0}
        articleTitle={commentToDelete?.articleTitle || ""}
        isLoading={isLoadingInner}
        onDelete={handleConfirmDelete}
      />
      <ReplyCommentModal
        open={showReplyDialog}
        onOpenChange={setShowReplyDialog}
        commentId={commentToReply ?? 0}
        articleTitle={comments.find(c => c.id === commentToReply)?.article_title || ""}
        isLoading={isLoadingInner}
        replyText={replyText}
        setReplyText={setReplyText}
        onReply={handleSendReply}
      />
    </TooltipProvider>
  )
}
