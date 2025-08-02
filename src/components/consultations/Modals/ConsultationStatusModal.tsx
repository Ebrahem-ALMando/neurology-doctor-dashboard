"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Unlock, Clock, MessageCircle, Lock, Trash2, RotateCcw } from "lucide-react"
import { useConsultationStatus } from "@/hooks/useConsultationStatus"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { ConsultationStatus } from "@/data/consultations"
import { useEffect } from "react"


const statusOptions = [
  {
    value: 'open',
    label: 'مفتوحة',
    icon: <Unlock className="h-5 w-5" />,
    description: 'الاستشارة مفتوحة وقابلة للرد',
    color: 'text-green-600'
  },
  {
    value: 'waiting_response',
    label: 'قيد الانتظار',
    icon: <Clock className="h-5 w-5" />,
    description: 'في انتظار الرد',
    color: 'text-yellow-600'
  },
  {
    value: 'answered',
    label: 'تم الرد',
    icon: <MessageCircle className="h-5 w-5" />,
    description: 'تم الرد على الاستشارة',
    color: 'text-blue-600'
  },
  {
    value: 'closed',
    label: 'مغلقة',
    icon: <Lock className="h-5 w-5" />,
    description: 'الاستشارة مغلقة',
    color: 'text-gray-600'
  },
  {
    value: 'cancelled',
    label: 'ملغاة',
    icon: <Trash2 className="h-5 w-5" />,
    description: 'تم إلغاء الاستشارة',
    color: 'text-red-600'
  }
]
interface ConsultationStatusModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;    
  currentStatus: string;
  consultationId: number;
  currentNote: string;
  mutate: () => void;
}
export function ConsultationStatusModal({ 
  open, 
  onOpenChange, 
  currentStatus, 
  consultationId,
  currentNote,
  mutate
  // onStatusChange, 
}: ConsultationStatusModalProps) {
  const [selectedStatus, setSelectedStatus] = useState(currentStatus)
  const [note, setNote] = useState(currentNote)
  const { changeConsultationStatus ,isLoading} = useConsultationStatus()
  const handleSuccess = () => {
    mutate()
  }
  const handleConfirm = () => {
    if (selectedStatus !== currentStatus) {
     changeConsultationStatus(consultationId, {
      status: selectedStatus as ConsultationStatus,
      note: note.trim() as string || undefined
    },
    handleSuccess
  )
    }
    onOpenChange(false)
  }
useEffect(() => {
    setSelectedStatus(currentStatus)
    setNote(currentNote)
}, [currentStatus,currentNote])
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md ">
        <DialogHeader className="">
          <DialogTitle className="text-lg font-semibold rtl:text-right flex items-center gap-2"
          >
              <RotateCcw className="h-4 w-4 text-amber-600" />
            تغيير حالة الاستشارة</DialogTitle>
          <DialogDescription className="text-sm text-gray-600 dark:text-gray-400 rtl:text-right mr-6">
            اختر الحالة الجديدة للاستشارة.
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-2 py-2">
          {statusOptions.map((option) => (
            <div
              key={option.value}
              className={`flex items-center gap-3 p-2 rounded-lg border-2 cursor-pointer transition-all ${
                selectedStatus === option.value
                  ? 'border-purple-500 bg-purple-50 dark:bg-purple-900/20'
                  : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
              }`}
              onClick={() => setSelectedStatus(option.value)}
            >
              <div className={`${option.color} ${selectedStatus === option.value ? 'text-purple-600' : ''}`}>
                {option.icon}
              </div>
              <div className="flex-1">
                <div className="font-medium text-gray-900 dark:text-gray-100">
                  {option.label}
                </div>
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  {option.description}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="space-y-2 py-2">
          <Label htmlFor="note">ملاحظة</Label>
          <Textarea
            id="note"
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder=" تمت مناقشة الموضوع مع المريض"
        className="min-h-[70px]"
          />
        </div>
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
            onClick={handleConfirm}
            disabled={isLoading || selectedStatus === currentStatus}
            className="bg-purple-500 hover:bg-purple-600 text-white w-full"
          >
            {isLoading ? 'جاري التحديث...' : 'تأكيد التغيير'}
          </Button>
  
        </div>
      </DialogContent>
    </Dialog>
  )
} 