"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Loader2, CheckCircle, Lock, RotateCcw } from "lucide-react"
import { useConsultationStatus } from "@/hooks/useConsultationStatus"

interface QuickCloseModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  consultationId: number
  mutate: () => void;
}

export function QuickCloseModal({
  open,
  onOpenChange,
  consultationId,
  mutate
}: QuickCloseModalProps) {
  const [note, setNote] = useState("")
  const { isLoading, changeConsultationStatus } = useConsultationStatus()
  const handleSuccess = () => {
    mutate()
  }
  const handleSubmit = async () => {
     await changeConsultationStatus(consultationId, {
      status: "closed",
      note: note.trim() || "تم الإغلاق من قبل الطبيب"
    },
    handleSuccess
  )
  onOpenChange(false)
  }

  const handleCancel = () => {
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-right flex items-center gap-2">
            <RotateCcw className="h-5 w-5 text-amber-600" />
            إغلاق سريع للاستشارة
          </DialogTitle>
          <DialogDescription className="text-right">
            هل أنت متأكد من إغلاق هذه الاستشارة؟ يمكنك إضافة ملاحظة اختيارية.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div className="p-4 bg-amber-50 dark:bg-amber-900/20 rounded-lg border border-amber-200 dark:border-amber-800">
            <div className="flex items-center gap-2">
              <Lock className="h-5 w-5 text-amber-600" />   
              <span className="text-sm font-medium text-amber-800 dark:text-amber-200">
                سيتم تغيير حالة الاستشارة إلى "مغلقة"
              </span>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="note" className="text-right block">
              ملاحظة (اختيارية)
            </Label>
            <Textarea
              id="note"
              placeholder="أضف ملاحظة حول إغلاق الاستشارة..."
              value={note}
              onChange={(e) => setNote(e.target.value)}
              className="text-right"
              rows={3}
            />
          </div>
        </div>

        <DialogFooter className="flex gap-2">
        <div className="flex gap-2 justify-between w-full ">
        <Button
            className="text-white w-full bg-red-500 hover:bg-red-600"
            variant="destructive"
            onClick={() => onOpenChange(false)}
            disabled={isLoading}
          >
            إلغاء
          </Button>
          <Button
          onClick={handleSubmit} 
          disabled={isLoading}
            className="bg-purple-500 hover:bg-purple-600 text-white w-full"
          >
                  {isLoading ? (
              <>
                <Loader2 className="ml-2 h-4 w-4 animate-spin" />
                جاري الإغلاق...
              </>
            ) : (
              <>
                <CheckCircle className="ml-2 h-4 w-4" />
                إغلاق الاستشارة
              </>
            )}
          </Button>
  
        </div>
       
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
} 