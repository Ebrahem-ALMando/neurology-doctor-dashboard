"use client"
import React from "react"
import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Eye, CheckCircle, Trash2, MessageCircle, Lock, Unlock, Loader2, Clock, PlusCircle, RotateCcw } from "lucide-react"
import type { Consultation } from "@/api/services/consultations"
import { getRelativeTime   } from "@/utils/General/formatDateRange"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { ConsultationsLoadingSkeleton } from "./consultations-loading-skeleton"
import  ConsultationChatModal  from "@/components/consultations/Modals/Chat/ConsultationChatModal"
import { ConsultationStatusModal } from "./Modals/ConsultationStatusModal"
import { QuickCloseModal } from "./Modals/QuickCloseModal"
import { useCustomToastWithIcons } from "@/hooks/use-custom-toast-with-icons"
import { DeleteConsultationModal } from "./Modals/DeleteConsultationModal"
import { useProfile } from "@/hooks/useProfile"

interface ConsultationsTableViewProps {
  consultations: Consultation[]
  loading: boolean
  onViewDetails: (consultation: Consultation) => void
  onMarkAsDone: (id: string) => void
  mutate: () => void
}

const statusMap: Record<string, { label: string; color: string; icon: React.ReactNode; hover: string }> = {
  open: { label: "مفتوحة", color: "bg-gradient-to-r from-green-400 to-green-600 text-white", icon: <Unlock className="h-4 w-4 mr-1 animate-bounce" />, hover: "hover:shadow-lg hover:scale-105" },
  waiting_response: { label: "قيد الانتظار", color: "bg-gradient-to-r from-amber-400 to-amber-600 text-white", icon: <Clock className="h-4 w-4 mr-1 animate-pulse" />, hover: "hover:shadow-lg hover:scale-105" },
  answered: { label: "تم الرد", color: "bg-gradient-to-r from-blue-400 to-blue-600 text-white", icon: <MessageCircle className="h-4 w-4 mr-1 animate-spin-slow" />, hover: "hover:shadow-lg hover:scale-105" },
  closed: { label: "مغلقة", color: "bg-gradient-to-r from-gray-400 to-gray-600 text-white", icon: <Lock className="h-4 w-4 mr-1" />, hover: "hover:shadow-lg hover:scale-105" },
  cancelled: { label: "ملغاة", color: "bg-gradient-to-r from-red-400 to-red-600 text-white", icon: <Trash2 className="h-4 w-4 mr-1 animate-wiggle" />, hover: "hover:shadow-lg hover:scale-105" },
}



export function ConsultationsTableView({
  consultations,
  loading,
  onViewDetails,
  onMarkAsDone,
  mutate,
}: ConsultationsTableViewProps) {
  const [statusModalOpen, setStatusModalOpen] = useState <boolean>(false)
  const [quickCloseModal, setQuickCloseModal] = useState <boolean>(false)
  const [deleteModal, setDeleteModal] = useState <boolean>(false)
  const [replyModal, setReplyModal] = useState<boolean>(false)
  const [viewModal, setViewModal] = useState<boolean>(false)
  const [selectedConsultation, setSelectedConsultation] = useState<Consultation | null>(null)
  const { showInfo } = useCustomToastWithIcons()

  const {profile} = useProfile()


  const openModal = (consultation: any ,setOpenModle:any) => {
    setSelectedConsultation(consultation)
    setOpenModle(true)
  }

  const openQuickCloseModal = (consultation: any) => {
    if(consultation.status!== "closed"){
      setSelectedConsultation(consultation)
      setQuickCloseModal(true)
    }
    else{
      showInfo({
        title: "الاستشارة مغلقة",
        description: "لا يمكن إغلاق الاستشارة المغلقة" 
      })
    }
  }

  const openViewModal = (consultation: any) => {
    setSelectedConsultation(consultation)
    setViewModal(true)
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
            consultations?.map((consultation:Consultation) => {
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
                      <span className="font-medium block text-gray-900 dark:text-gray-100">{consultation.messages.length > 0 ? consultation.messages[0].subject || "لا يوجد موضوع" : "لا يوجد موضوع"}</span>
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
                  <TableCell className="min-w-[140px]  text-center align-middle">
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <span
                            className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold cursor-pointer transition-all duration-300 ${statusInfo.color} ${statusInfo.hover}`}
                            style={{ minWidth: 90 }}
                            onClick={() => openModal(consultation,setStatusModalOpen)}
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
                            <Button variant="ghost" size="icon" onClick={() => openViewModal(consultation)}>
                              <Eye className="h-4 w-4" />
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent side="top">عرض التفاصيل</TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                      
                        <>
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <Button variant="ghost" size="icon" onClick={() => openQuickCloseModal(consultation)}>
                                  <CheckCircle className="h-4 w-4 text-green-600" />
                                </Button>
                              </TooltipTrigger>
                              <TooltipContent side="top">إغلاق سريع (مكتملة)</TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <Button variant="ghost" size="icon" onClick={() => openModal(consultation,setStatusModalOpen)}>
                                  <RotateCcw className="h-4 w-4 text-amber-600" />
                                </Button>
                              </TooltipTrigger>
                              <TooltipContent side="top">تغيير الحالة</TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <Button variant="ghost" size="icon" onClick={() => openModal(consultation,setReplyModal)}>
                                  <MessageCircle className="h-4 w-4 text-blue-600" />
                                </Button>
                              </TooltipTrigger>
                              <TooltipContent side="top">رد</TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        </>
                   
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button variant="ghost" size="icon" 
                            onClick={() => openModal(consultation,setDeleteModal)}>
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
        currentNote={selectedConsultation?.status_logs[selectedConsultation?.status_logs.length - 1]?.note || ''}
        consultationId={selectedConsultation?.id || 0}
        mutate={mutate}
      />
      <QuickCloseModal
        open={quickCloseModal}
        onOpenChange={setQuickCloseModal}
        consultationId={selectedConsultation?.id || 0}
        mutate={mutate}
      />
      <DeleteConsultationModal
        open={deleteModal}
        onOpenChange={setDeleteModal}
        consultationId={selectedConsultation?.id || 0}
        mutate={mutate}
      />
      <ConsultationChatModal
        open={replyModal}
        onOpenChange={setReplyModal}
        consultationId={selectedConsultation?.id || 0}
        currentUserId={profile?.user?.id || 0}
        logmutate={mutate}
        // currentUserRole={"doctor"}

        currentUserRole={profile?.user?.role==="patient" ? "patient" : "doctor"}
        consultation={selectedConsultation}
        // mutate={mutate}
      />
      <ConsultationChatModal
        open={viewModal}
        onOpenChange={setViewModal}
        consultationId={selectedConsultation?.id || 0}
        currentUserId={profile?.user?.id || 0}
        logmutate={mutate}
        currentUserRole={profile?.user?.role==="patient" ? "patient" : "doctor"}
        consultation={selectedConsultation}
        isViewOnly={true}
      />
    </div>
  )
}
