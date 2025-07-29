"use client"

import React from "react"

import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Eye, CheckCircle, Trash2, MessageCircle, Lock, Unlock, Loader2, Clock, PlusCircle, RotateCcw } from "lucide-react"
import type { Consultation } from "@/api/services/consultations"
import { getRelativeTime, toHijriDate } from "@/utils/General/formatDateRange"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { ConsultationsLoadingSkeleton } from "./consultations-loading-skeleton"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogClose, DialogTrigger } from "@/components/ui/dialog"
import { Paperclip, Send, X, Download, Check, CheckCheck, User, UserCheck } from "lucide-react"
import { useRef } from "react"
import { Input } from "@/components/ui/input"
import  ConsultationChatModal  from "@/components/consultations/ConsultationChatModal"
import { ConsultationStatusModal } from "./ConsultationStatusModal"
import { useToast } from "@/hooks/use-toast"

// مودال تغيير الحالة
function StatusChangeModal({ open, onOpenChange, onConfirm, currentStatus }: { open: boolean; onOpenChange: (v: boolean) => void; onConfirm: (status: string) => void; currentStatus: string }) {
  const [loading, setLoading] = useState(false)
  const [selectedStatus, setSelectedStatus] = useState(currentStatus)
  const statuses = [
    { value: "open", label: "مفتوحة", icon: <Unlock className="h-4 w-4 mr-1" /> },
    { value: "waiting_response", label: "قيد الانتظار", icon: <Clock className="h-4 w-4 mr-1" /> },
    { value: "answered", label: "تم الرد", icon: <MessageCircle className="h-4 w-4 mr-1" /> },
    { value: "closed", label: "مغلقة", icon: <Lock className="h-4 w-4 mr-1" /> },
    { value: "cancelled", label: "ملغاة", icon: <Trash2 className="h-4 w-4 mr-1" /> },
  ]

  // تحديث الحالة المختارة عند فتح المودال
  React.useEffect(() => {
    if (open) {
      setSelectedStatus(currentStatus)
    }
  }, [open, currentStatus])

  const handleConfirm = async () => {
    if (selectedStatus === currentStatus) {
      onOpenChange(false)
      return
    }
    
    setLoading(true)
    try {
      await onConfirm(selectedStatus)
    } finally {
      setLoading(false)
      onOpenChange(false)
    }
  }

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>تغيير حالة الاستشارة</AlertDialogTitle>
          <AlertDialogDescription>اختر الحالة الجديدة للاستشارة.</AlertDialogDescription>
        </AlertDialogHeader>
        <div className="flex flex-col gap-2">
          {statuses.map((s) => (
            <Button
              key={s.value}
              variant={s.value === selectedStatus ? "default" : "outline"}
              className="flex items-center gap-2 justify-start"
              disabled={loading}
              onClick={() => setSelectedStatus(s.value)}
            >
              {s.icon} {s.label}
            </Button>
          ))}
        </div>
        <AlertDialogFooter className="bg-gray-100 dark:bg-gray-800 flex justify-between w-100 gap-5">
          <AlertDialogAction 
            onClick={handleConfirm} 
            className="w-full"
            disabled={loading || selectedStatus === currentStatus}
          >
            {loading ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}
            تأكيد التغيير
          </AlertDialogAction>
          <AlertDialogCancel className="w-full bg-red-500 hover:bg-red-600 hover:text-white text-white">
            إلغاء
          </AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

// مودال تأكيد إغلاق الاستشارة
function QuickCloseModal({ open, onOpenChange, onConfirm }: { open: boolean; onOpenChange: (v: boolean) => void; onConfirm: () => void }) {
  const [loading, setLoading] = useState(false)
  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>تأكيد إغلاق الاستشارة</AlertDialogTitle>
          <AlertDialogDescription>هل أنت متأكد أنك تريد وضع علامة "مكتملة" على هذه الاستشارة؟</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="bg-gray-100 dark:bg-gray-800 flex justify-between w-100 gap-5">
          <AlertDialogAction
            onClick={async () => {
              setLoading(true)
              await onConfirm()
              setLoading(false)
              onOpenChange(false)
            }}
            className="w-full"
            disabled={loading}
          >
            {loading ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}
            تأكيد الإغلاق
          </AlertDialogAction>
          <AlertDialogCancel className="w-full bg-red-500 hover:bg-red-600 hover:text-white text-white">
            إلغاء
          </AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

// مودال تأكيد الحذف
function DeleteConsultationModal({ open, onOpenChange, onConfirm }: { open: boolean; onOpenChange: (v: boolean) => void; onConfirm: () => void }) {
  const [loading, setLoading] = useState(false)
  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>تأكيد حذف الاستشارة</AlertDialogTitle>
          <AlertDialogDescription>هل أنت متأكد أنك تريد حذف هذه الاستشارة؟ لا يمكن التراجع عن هذا الإجراء.</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="bg-gray-100 dark:bg-gray-800 flex justify-between w-100 gap-5">
          <AlertDialogAction
            onClick={async () => {
              setLoading(true)
              await onConfirm()
              setLoading(false)
              onOpenChange(false)
            }}
            className="w-full"
            disabled={loading}
          >
            {loading ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}
            تأكيد الحذف
          </AlertDialogAction>
          <AlertDialogCancel className="w-full bg-red-500 hover:bg-red-600 hover:text-white text-white">
            إلغاء
          </AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

const statusMap: Record<string, { label: string; color: string; icon: React.ReactNode; hover: string }> = {
  open: { label: "مفتوحة", color: "bg-gradient-to-r from-green-400 to-green-600 text-white", icon: <Unlock className="h-4 w-4 mr-1 animate-bounce" />, hover: "hover:shadow-lg hover:scale-105" },
  waiting_response: { label: "قيد الانتظار", color: "bg-gradient-to-r from-amber-400 to-amber-600 text-white", icon: <Clock className="h-4 w-4 mr-1 animate-pulse" />, hover: "hover:shadow-lg hover:scale-105" },
  answered: { label: "تم الرد", color: "bg-gradient-to-r from-blue-400 to-blue-600 text-white", icon: <MessageCircle className="h-4 w-4 mr-1 animate-spin-slow" />, hover: "hover:shadow-lg hover:scale-105" },
  closed: { label: "مغلقة", color: "bg-gradient-to-r from-gray-400 to-gray-600 text-white", icon: <Lock className="h-4 w-4 mr-1" />, hover: "hover:shadow-lg hover:scale-105" },
  cancelled: { label: "ملغاة", color: "bg-gradient-to-r from-red-400 to-red-600 text-white", icon: <Trash2 className="h-4 w-4 mr-1 animate-wiggle" />, hover: "hover:shadow-lg hover:scale-105" },
}

interface ConsultationsTableViewProps {
  consultations: Consultation[]
  loading: boolean
  onViewDetails: (consultation: Consultation) => void
  onMarkAsDone: (id: string) => void
  onDelete: (id: string) => void
}

export function ConsultationsTableView({
  consultations,
  loading,
  onViewDetails,
  onMarkAsDone,
  onDelete,
}: ConsultationsTableViewProps) {
  const { toast } = useToast()
  const [statusModalOpen, setStatusModalOpen] = useState(false)
  const [selectedConsultation, setSelectedConsultation] = useState<any>(null)
  const [statusLoading, setStatusLoading] = useState(false)
  const [quickCloseModal, setQuickCloseModal] = useState<{ open: boolean; id: string | null }>({ open: false, id: null })
  const [deleteModal, setDeleteModal] = useState<{ open: boolean; id: string | null }>({ open: false, id: null })
  const [replyModal, setReplyModal] = useState<{ open: boolean; consultation: Consultation | null }>({ open: false, consultation: null })

  const handleStatusChange = async (newStatus: string) => {
    if (!selectedConsultation) return
    
    setStatusLoading(true)
    try {
      // هنا يتم استدعاء API لتحديث الحالة
      // await updateConsultationStatus(selectedConsultation.id, newStatus)
      console.log(`تحديث حالة الاستشارة ${selectedConsultation.id} إلى ${newStatus}`)
      
      // إعادة تحميل البيانات
      // await mutate()
      
      toast({
        title: "تم التحديث بنجاح",
        description: `تم تغيير حالة الاستشارة إلى ${newStatus}`,
      })
    } catch (error) {
      toast({
        title: "خطأ في التحديث",
        description: "فشل في تحديث حالة الاستشارة",
        variant: "destructive",
      })
    } finally {
      setStatusLoading(false)
    }
  }

  const openStatusModal = (consultation: any) => {
    setSelectedConsultation(consultation)
    setStatusModalOpen(true)
  }

  return (
    <div className="rounded-lg border bg-white dark:bg-muted/40 shadow-md overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[60px] text-center">#</TableHead>
            <TableHead className="w-[180px] text-center">المريض</TableHead>
            <TableHead className="text-center">الموضوع</TableHead>
            <TableHead className="w-[140px] text-center">التاريخ (ميلادي)</TableHead>
            <TableHead className="w-[110px] text-center">الحالة</TableHead>
            <TableHead className="w-[160px] text-center">الإجراءات</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {loading ? (
            <ConsultationsLoadingSkeleton rows={5} />
          ) : consultations.length === 0 ? (
            <TableRow>
              <TableCell colSpan={6} className="h-24 text-center text-muted-foreground">
                لا توجد استشارات مطابقة.
              </TableCell>
            </TableRow>
          ) : (
            consultations.map((consultation) => {
              const statusInfo = statusMap[consultation.status] || statusMap.open
              return (
                <TableRow key={consultation.id} className="hover:bg-muted/40 transition-all">
                  <TableCell className="text-center font-bold text-primary align-middle">#{consultation.id}</TableCell>
                  <TableCell className="text-center align-middle">
                    <div className="flex flex-col items-center gap-1">
                      <div className="rounded-full w-10 h-10 flex items-center justify-center bg-gradient-to-br from-blue-400 to-purple-500 shadow-md">
                          <Avatar>
                            <AvatarImage src={consultation.patient.avatar_url || ""} className="w-10 h-10 rounded-full object-cover" />
                            <AvatarFallback className="w-full h-full rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-xs font-medium">
                              {consultation.patient.name?.split(" ")
                                  .map((n: string) => n[0])
                                  .join("")
                                  .slice(0, 2) || "??"}
                              </AvatarFallback>
                          </Avatar>
                      </div>
                      <span className="font-medium text-xs text-gray-700 dark:text-gray-200">{consultation.patient.name}</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-center align-middle">
                    <div className="max-w-[220px] mx-auto truncate">
                      <span className="font-medium block text-gray-900 dark:text-gray-100">{consultation.messages.length > 0 ? consultation.messages[0].subject : "لا يوجد موضوع"}</span>
                      <div className="text-xs text-muted-foreground line-clamp-2 mt-1">
                        {consultation.last_message && consultation.last_message.message && consultation.last_message.message.length > 0 
                          ? `${consultation.last_message.message.substring(0, 50)}${consultation.last_message.message.length > 50 ? '...' : ''}`
                          : 'لا توجد رسائل'
                        }
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="text-center align-middle">
                    <div className="flex flex-col items-center">
                      <span className="text-sm text-gray-900 dark:text-gray-100">{new Date(consultation.created_at).toLocaleDateString("ar-EG")}</span>
                      <span className="text-xs text-muted-foreground">{getRelativeTime(consultation.created_at)}</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-center align-middle">
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <span
                            className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold cursor-pointer transition-all duration-300 ${statusInfo.color} ${statusInfo.hover}`}
                            style={{ minWidth: 90 }}
                            onClick={() => openStatusModal(consultation)}
                          >
                            {statusInfo.icon}
                            {statusInfo.label}
                          </span>
                        </TooltipTrigger>
                        <TooltipContent side="top">انقر لتغيير الحالة</TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </TableCell>
                  <TableCell className="text-center align-middle">
                    <div className="flex items-center justify-center gap-1">
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button variant="ghost" size="icon" onClick={() => onViewDetails(consultation)}>
                              <Eye className="h-4 w-4" />
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent side="top">عرض التفاصيل</TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button variant="ghost" size="icon" onClick={() => setQuickCloseModal({ open: true, id: consultation.id.toString() })}>
                              <CheckCircle className="h-4 w-4 text-green-600" />
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent side="top">إغلاق سريع (مكتملة)</TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button variant="ghost" size="icon" onClick={() => openStatusModal(consultation)}>
                              <RotateCcw className="h-4 w-4 text-amber-600" />
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent side="top">تغيير الحالة</TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button variant="ghost" size="icon" onClick={() => setReplyModal({ open: true, consultation })}>
                              <MessageCircle className="h-4 w-4 text-blue-600" />
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent side="top">رد</TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button variant="ghost" size="icon" onClick={() => setDeleteModal({ open: true, id: consultation.id.toString() })}>
                              <Trash2 className="h-4 w-4 text-red-600" />
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent side="top">حذف</TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                  </TableCell>
                </TableRow>
              )
            })
          )}
        </TableBody>
      </Table>
      {/* Status Change Modal */}
      <ConsultationStatusModal
        open={statusModalOpen}
        onOpenChange={setStatusModalOpen}
        currentStatus={selectedConsultation?.status || 'open'}
        onStatusChange={handleStatusChange}
        loading={statusLoading}
      />
      <QuickCloseModal
        open={quickCloseModal.open}
        onOpenChange={(v) => setQuickCloseModal((prev) => ({ ...prev, open: v }))}
        onConfirm={async () => {
          if (quickCloseModal.id) {
            // await closeConsultation(quickCloseModal.id)
            onMarkAsDone(quickCloseModal.id)
          }
        }}
      />
      <DeleteConsultationModal
        open={deleteModal.open}
        onOpenChange={(v) => setDeleteModal((prev) => ({ ...prev, open: v }))}
        onConfirm={async () => {
          if (deleteModal.id) {
            // await deleteConsultation(deleteModal.id)
            onDelete(deleteModal.id)
          }
        }}
      />
      <ConsultationChatModal
        open={replyModal.open}
        onOpenChange={v => setReplyModal(prev => ({ ...prev, open: v }))}
        consultationId={replyModal.consultation?.id || 0}
        currentUserId={1}
        consultation={replyModal.consultation}
      />
    </div>
  )
}
