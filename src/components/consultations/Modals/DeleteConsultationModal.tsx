"use client"


import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Loader2, Trash2 } from "lucide-react"
import { useConsultations } from "@/hooks/useConsultations"
import { useCustomToastWithIcons } from "@/hooks/use-custom-toast-with-icons"

interface DeleteConsultationModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void   
  consultationId: number
  mutate: () => void
}

export function DeleteConsultationModal({
  open,
  onOpenChange,
  consultationId,
  mutate
}: DeleteConsultationModalProps) {

const {handleDelete,eventIsLoading} = useConsultations()
const {showDeleteSuccess,showError} = useCustomToastWithIcons()

const deleteConsultation = () => {
  handleDelete(consultationId,()=>{
    showDeleteSuccess() 
    onOpenChange(false)
  },()=>{
    showError({
      title: "خطأ في الحذف",
      description: "فشل في حذف الاستشارة"
    })
  })
}

  const handleCancel = () => {
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-right flex items-center gap-2">
            <Trash2 className="h-5 w-5 text-red-600" />
            حذف الاستشارة
          </DialogTitle>
          <DialogDescription className="text-right">
            هل أنت متأكد من حذف هذه الاستشارة؟ لا يمكن التراجع عن هذا الإجراء.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div className="p-4 bg-red-50 dark:bg-red-900/20 rounded-lg border border-red-200 dark:border-red-800">
            <div className="flex items-center gap-2">
              <Trash2 className="h-5 w-5 text-red-600" />
              <span className="text-sm font-medium text-red-800 dark:text-red-200">
                سيتم حذف الاستشارة رقم #{consultationId} نهائياً
              </span>
            </div>
          </div>
        </div>

        <DialogFooter className="flex gap-2">
          <Button
            variant="outline" 
            onClick={handleCancel} 
            disabled={eventIsLoading}
            className="w-full"
          >
            إلغاء
          </Button>
          <Button 
            onClick={deleteConsultation} 
            disabled={eventIsLoading}
            className="bg-red-600 hover:bg-red-700 w-full"
          >
            {eventIsLoading ? (
              <>
                <Loader2 className="ml-2 h-4 w-4 animate-spin" />
                جاري الحذف...
              </>
            ) : (
              <>
                <Trash2 className="ml-2 h-4 w-4" />
                حذف الاستشارة
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
} 