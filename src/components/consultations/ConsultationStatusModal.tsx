"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Unlock, Clock, MessageCircle, Lock, Trash2 } from "lucide-react"

interface ConsultationStatusModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  currentStatus: string;
  onStatusChange: (status: string) => void;
  loading?: boolean;
}

const statusOptions = [
  {
    value: 'open',
    label: 'مفتوحة',
    icon: <Unlock className="h-5 w-5" />,
    description: 'الاستشارة مفتوحة وقابلة للرد',
    color: 'text-green-600'
  },
  {
    value: 'pending',
    label: 'قيد الانتظار',
    icon: <Clock className="h-5 w-5" />,
    description: 'في انتظار رد الطبيب',
    color: 'text-yellow-600'
  },
  {
    value: 'replied',
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
    value: 'canceled',
    label: 'ملغاة',
    icon: <Trash2 className="h-5 w-5" />,
    description: 'تم إلغاء الاستشارة',
    color: 'text-red-600'
  }
]

export function ConsultationStatusModal({ 
  open, 
  onOpenChange, 
  currentStatus, 
  onStatusChange, 
  loading = false 
}: ConsultationStatusModalProps) {
  const [selectedStatus, setSelectedStatus] = useState(currentStatus)

  const handleConfirm = () => {
    if (selectedStatus !== currentStatus) {
      onStatusChange(selectedStatus)
    }
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="text-lg font-semibold">تغيير حالة الاستشارة</DialogTitle>
          <DialogDescription className="text-sm text-gray-600 dark:text-gray-400">
            اختر الحالة الجديدة للاستشارة.
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-2 py-4">
          {statusOptions.map((option) => (
            <div
              key={option.value}
              className={`flex items-center gap-3 p-3 rounded-lg border-2 cursor-pointer transition-all ${
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
        
        <div className="flex gap-2 justify-end">
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            disabled={loading}
          >
            إلغاء
          </Button>
          <Button
            onClick={handleConfirm}
            disabled={loading || selectedStatus === currentStatus}
            className="bg-purple-500 hover:bg-purple-600 text-white"
          >
            {loading ? 'جاري التحديث...' : 'تأكيد التغيير'}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
} 