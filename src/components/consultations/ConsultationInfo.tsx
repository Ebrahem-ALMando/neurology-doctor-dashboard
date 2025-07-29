"use client"

import { MessageCircle, Calendar, User, Clock, FileText, CheckCircle, XCircle, AlertCircle } from "lucide-react"

interface ConsultationInfoProps {
  consultation: any;
  subject: string;
}

export function ConsultationInfo({ consultation, subject }: ConsultationInfoProps) {
  if (!consultation) return null

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'open': 
        return <CheckCircle className="h-4 w-4 text-green-500" />
      case 'closed': 
        return <XCircle className="h-4 w-4 text-red-500" />
      case 'pending': 
        return <AlertCircle className="h-4 w-4 text-yellow-500" />
      default: 
        return <MessageCircle className="h-4 w-4 text-gray-500" />
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case 'open': return 'مفتوحة'
      case 'closed': return 'مغلقة'
      case 'pending': return 'قيد الانتظار'
      default: return status
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'open': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
      case 'closed': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
      case 'pending': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200'
    }
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("ar-EG", {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  return (
    <div className="mt-1 flex flex-wrap gap-3">
      {/* معلومات المريض */}
      <div className="flex items-center gap-2 px-3 py-2 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-700">
        <User className="h-4 w-4 text-blue-600 dark:text-blue-400" />
        <div className="text-sm">
          <span className="text-blue-600 dark:text-blue-400 font-medium">المريض:</span>
          <span className="text-blue-900 dark:text-blue-100 mr-1">{consultation.patient?.name || 'غير محدد'}</span>
        </div>
      </div>
      
      {/* موضوع الاستشارة */}
      <div className="flex items-center gap-2 px-3 py-2 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-700">
        <FileText className="h-4 w-4 text-green-600 dark:text-green-400" />
        <div className="text-sm">
          <span className="text-green-600 dark:text-green-400 font-medium">الموضوع:</span>
          <span className="text-green-900 dark:text-green-100 mr-1 truncate max-w-[150px]">{subject}</span>
        </div>
      </div>
      
      {/* حالة الاستشارة */}
      <div className="flex items-center gap-2 px-3 py-2 bg-purple-50 dark:bg-purple-900/20 rounded-lg border border-purple-200 dark:border-purple-700">
        {getStatusIcon(consultation.status)}
        <div className="text-sm">
          <span className="text-purple-600 dark:text-purple-400 font-medium">الحالة:</span>
          <span className={`mr-1 px-2 py-0.5 rounded-full text-xs font-medium ${getStatusColor(consultation.status)}`}>
            {getStatusText(consultation.status)}
          </span>
        </div>
      </div>
      
      {/* تاريخ الاستشارة */}
      <div className="flex items-center gap-2 px-3 py-2 bg-orange-50 dark:bg-orange-900/20 rounded-lg border border-orange-200 dark:border-orange-700">
        <Calendar className="h-4 w-4 text-orange-600 dark:text-orange-400" />
        <div className="text-sm">
          <span className="text-orange-600 dark:text-orange-400 font-medium">التاريخ:</span>
          <span className="text-orange-900 dark:text-orange-100 mr-1">{formatDate(consultation.created_at)}</span>
        </div>
      </div>
    </div>
  )
} 