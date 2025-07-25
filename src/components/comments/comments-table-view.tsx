"use client"

import * as React from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { Reply, Check, X, Trash2, Flag } from "lucide-react"
import type { Comment } from "@/data/comments"
import { cn } from "@/lib/utils"

import { getRelativeTime } from "@/utils/General/formatDateRange"


interface CommentsTableViewProps {
  comments: Comment[]
  onApprove: (id: string) => void
  onReject: (id: string) => void
  onDelete: (id: string) => void
  onFlag: (id: string) => void
  onReply: (id: string, replyText: string) => void
}

export function CommentsTableView({
  comments,
  onApprove,
  onReject,
  onDelete,
  onFlag,
  onReply,
}: CommentsTableViewProps) {
  const [expandedCommentId, setExpandedCommentId] = React.useState<string | null>(null)
  const [showDeleteDialog, setShowDeleteDialog] = React.useState(false)
  const [commentToDelete, setCommentToDelete] = React.useState<string | null>(null)
  const [showRejectDialog, setShowRejectDialog] = React.useState(false)
  const [commentToReject, setCommentToReject] = React.useState<string | null>(null)
  const [showReplyDialog, setShowReplyDialog] = React.useState(false)
  const [commentToReply, setCommentToReply] = React.useState<string | null>(null)
  const [replyText, setReplyText] = React.useState("")

  const handleToggleExpand = (id: string) => {
    setExpandedCommentId(expandedCommentId === id ? null : id)
  }

  const handleDeleteClick = (id: string) => {
    setCommentToDelete(id)
    setShowDeleteDialog(true)
  }

  const handleConfirmDelete = () => {
    if (commentToDelete) {
      onDelete(commentToDelete)
      setCommentToDelete(null)
      setShowDeleteDialog(false)
    }
  }

  const handleRejectClick = (id: string) => {
    setCommentToReject(id)
    setShowRejectDialog(true)
  }

  const handleConfirmReject = () => {
    if (commentToReject) {
      onReject(commentToReject)
      setCommentToReject(null)
      setShowRejectDialog(false)
    }
  }

  const handleReplyClick = (id: string) => {
    setCommentToReply(id)
    setReplyText("") // Clear previous reply text
    setShowReplyDialog(true)
  }

  const handleSendReply = () => {
    if (commentToReply && replyText.trim()) {
      onReply(commentToReply, replyText.trim())
      setShowReplyDialog(false)
      setCommentToReply(null)
      setReplyText("")
    }
  }

  return (
    <TooltipProvider>
      <div className="rounded-xl border bg-card shadow-sm">
        <Table className="w-full">
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
            {comments.map((comment) => (
              <TableRow
                key={comment.id}
                onClick={() => handleToggleExpand(comment.id)}
                className="cursor-pointer transition-colors hover:bg-muted/50"
              >
                <TableCell className="font-medium">
                  <div className="flex items-center justify-end gap-2">
                    <span>{comment.commenter.name}</span>
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={comment.commenter.avatar || "/placeholder.svg"} alt={comment.commenter.name} />
                      <AvatarFallback>{comment.commenter.name.slice(0, 2)}</AvatarFallback>
                    </Avatar>
                  </div>
                </TableCell>
                <TableCell className="text-right">
                  <div
                    className={cn(
                      "max-w-[300px] overflow-hidden text-ellipsis",
                      expandedCommentId !== comment.id && "line-clamp-2",
                    )}
                  >
                    {comment.comment}
                  </div>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex flex-col items-end">
                    <span className="line-clamp-1 max-w-[200px]">{comment.article.title}</span>
                    <span className="text-xs text-muted-foreground">{comment.articleCode}</span>
                  </div>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex flex-col items-end">
                    <span>{comment.date}</span>
                    <span className="text-xs text-muted-foreground">{getRelativeTime(comment.date)}</span>
                  </div>
                </TableCell>
                <TableCell className="text-right">
                  <Badge
                    className={cn(
                      "px-2 py-1 text-xs",
                      comment.status === "approved" &&
                        "bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-300",
                      comment.status === "pending" &&
                        "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/20 dark:text-yellow-300",
                      comment.status === "rejected" &&
                        "bg-rose-100 text-rose-700 dark:bg-rose-900/20 dark:text-rose-300",
                      comment.status === "flagged" &&
                        "bg-orange-100 text-orange-700 dark:bg-orange-900/20 dark:text-orange-300",
                    )}
                  >
                    {comment.status === "approved" && "موافق عليه"}
                    {comment.status === "pending" && "معلق"}
                    {comment.status === "rejected" && "مرفوض"}
                    {comment.status === "flagged" && "مبلغ عنه"}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex items-center justify-end gap-1">
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8"
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
                    {comment.status !== "approved" && (
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 text-green-600 hover:bg-green-50 hover:text-green-700"
                            onClick={(e) => {
                              e.stopPropagation()
                              onApprove(comment.id)
                            }}
                          >
                            <Check className="h-4 w-4" />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>الموافقة</TooltipContent>
                      </Tooltip>
                    )}
                    {comment.status !== "rejected" && (
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 text-rose-600 hover:bg-rose-50 hover:text-rose-700"
                            onClick={(e) => {
                              e.stopPropagation()
                              handleRejectClick(comment.id)
                            }}
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>الرفض</TooltipContent>
                      </Tooltip>
                    )}
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-red-600 hover:bg-red-50 hover:text-red-700"
                          onClick={(e) => {
                            e.stopPropagation()
                            handleDeleteClick(comment.id)
                          }}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>الحذف</TooltipContent>
                    </Tooltip>
                    {comment.status !== "flagged" && (
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 text-orange-600 hover:bg-orange-50 hover:text-orange-700"
                            onClick={(e) => {
                              e.stopPropagation()
                              onFlag(comment.id)
                            }}
                          >
                            <Flag className="h-4 w-4" />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>الإبلاغ</TooltipContent>
                      </Tooltip>
                    )}
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>هل أنت متأكد تمامًا؟</AlertDialogTitle>
            <AlertDialogDescription>سيؤدي هذا الإجراء إلى حذف التعليق بشكل دائم من خوادمنا.</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>إلغاء</AlertDialogCancel>
            <AlertDialogAction onClick={handleConfirmDelete}>حذف</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <AlertDialog open={showRejectDialog} onOpenChange={setShowRejectDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>هل أنت متأكد من رفض هذا التعليق؟</AlertDialogTitle>
            <AlertDialogDescription>
              سيؤدي هذا الإجراء إلى تغيير حالة التعليق إلى "مرفوض" ولن يظهر للعامة.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>إلغاء</AlertDialogCancel>
            <AlertDialogAction onClick={handleConfirmReject}>رفض</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <Dialog open={showReplyDialog} onOpenChange={setShowReplyDialog}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>الرد على التعليق</DialogTitle>
            <DialogDescription>اكتب ردك على التعليق هنا.</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <Textarea
              placeholder="اكتب ردك هنا..."
              value={replyText}
              onChange={(e) => setReplyText(e.target.value)}
              rows={5}
            />
          </div>
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => setShowReplyDialog(false)}>
              إلغاء
            </Button>
            <Button onClick={handleSendReply}>إرسال الرد</Button>
          </div>
        </DialogContent>
      </Dialog>
    </TooltipProvider>
  )
}
