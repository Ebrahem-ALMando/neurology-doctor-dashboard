"use client"

import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Loader2, Trash2 } from "lucide-react"

interface DeleteCommentModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  commentId: number
  articleTitle: string
  isLoading: boolean
  onDelete: () => void
}

export function DeleteCommentModal({
  open,
  onOpenChange,
  commentId,
  articleTitle,
  isLoading,
  onDelete,
}: DeleteCommentModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-right flex items-center gap-2">
            <Trash2 className="h-5 w-5 text-red-600" />
            حذف التعليق
          </DialogTitle>
          <DialogDescription className="text-right">
            هل أنت متأكد من حذف هذا التعليق؟ لا يمكن التراجع عن هذا الإجراء.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <div className="p-4 bg-red-50 dark:bg-red-900/20 rounded-lg border border-red-200 dark:border-red-800">
            <div className="flex items-center gap-2">
              <Trash2 className="h-5 w-5 text-red-600" />
              <span className="text-sm font-medium text-red-800 dark:text-red-200">
                سيتم حذف التعليق رقم #{commentId} من مقال: {articleTitle}
              </span>
            </div>
          </div>
        </div>
        <DialogFooter className="flex gap-2">
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            disabled={isLoading}
            className="w-full"
          >
            إلغاء
          </Button>
          <Button
            onClick={onDelete}
            disabled={isLoading}
            className="bg-red-600 hover:bg-red-700 w-full"
          >
            {isLoading ? (
              <>
                <Loader2 className="ml-2 h-4 w-4 animate-spin" />
                جاري الحذف...
              </>
            ) : (
              <>
                <Trash2 className="ml-2 h-4 w-4" />
                حذف التعليق
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}