"use client"

import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Loader2, Reply } from "lucide-react"
import { Textarea } from "@/components/ui/textarea"

interface ReplyCommentModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  commentId: number
  articleTitle: string
  isLoading: boolean
  replyText: string
  setReplyText: (text: string) => void
  onReply: () => void
}

export function ReplyCommentModal({
  open,
  onOpenChange,
  commentId,
  articleTitle,
  isLoading,
  replyText,
  setReplyText,
  onReply
}: ReplyCommentModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-right flex items-center gap-2">
            <Reply className="h-5 w-5 text-purple-600" />
            الرد على التعليق
          </DialogTitle>
          <DialogDescription className="text-right">
            اكتب ردك على التعليق رقم #{commentId} من مقال: {articleTitle}
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 ml-2 sm:max-w-[425px]">
          <Textarea
            placeholder="اكتب ردك هنا..."
            value={replyText}
            onChange={(e) => setReplyText(e.target.value)}
            rows={5}
            disabled={isLoading}
          />
        </div>
        <DialogFooter className="flex gap-2 sm:max-w-[425px]">
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            disabled={isLoading}
            className="w-full"
          >
            إلغاء
          </Button>
          <Button
            onClick={onReply}
            disabled={isLoading || !replyText.trim()}
          className="bg-purple-500 hover:bg-purple-600 text-white w-full "
          >
            {isLoading ? (
              <>
                <Loader2 className="ml-2 h-4 w-4 animate-spin" />
                جاري الإرسال...
              </>
            ) : (
              <>
                إرسال الرد
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}