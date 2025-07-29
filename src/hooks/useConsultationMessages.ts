import useSWR from "swr"
import { getConsultationMessages } from "@/api/services/consultationsmessages/getConsultationMessages"
import { addConsultationMessage } from "@/api/services/consultationsmessages/addConsultationMessage"
import { deleteConsultationMessage } from "@/api/services/consultationsmessages/deleteConsultationMessage"
import type { ConsultationMessage, CreateConsultationMessageData } from "@/api/services/consultationsmessages/types"

export function useConsultationMessages(consultationId: number | string) {
  const {
    data,
    isLoading,
    mutate,
    error,
  } = useSWR(
    consultationId ? ["consultation-messages", consultationId] : null,
    () => getConsultationMessages(Number(consultationId)),
    { revalidateOnFocus: false }
  )

  const messages: ConsultationMessage[] = data?.data || []

  // إرسال رسالة جديدة
  const sendMessage = async (messageData: CreateConsultationMessageData) => {
    await addConsultationMessage(Number(consultationId), messageData)
    await mutate()
  }

  // حذف رسالة
  const removeMessage = async (messageId: number) => {
    await deleteConsultationMessage(messageId)
    await mutate()
  }

  // تحميل مرفق
  const downloadAttachment = (url: string) => {
    window.open(url, '_blank')
  }

  // مؤشرات الكتابة (placeholder)
  const typing = false

  return {
    messages,
    isLoading,
    error,
    sendMessage,
    removeMessage,
    downloadAttachment,
    typing,
    mutate,
  }
} 