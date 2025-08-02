  import useSWR from "swr"
  import { getConsultationMessages } from "@/api/services/consultationsmessages/getConsultationMessages"
  import { addConsultationMessage } from "@/api/services/consultationsmessages/addConsultationMessage"
  import { deleteConsultationMessage } from "@/api/services/consultationsmessages/deleteConsultationMessage"
  import type { ConsultationMessage, ConsultationMessagesResponse, CreateConsultationMessageData, UpdateConsultationMessageData } from "@/api/services/consultationsmessages/types"
  import { readByDoctor } from "@/api/services/consultationsmessages/readByDoctor"
  import { APIResponse } from "@/api/api"
  import { useState, useEffect } from "react"
  import { updateConsultationMessage } from "@/api/services/consultationsmessages/updateConsultationMessage"
  import { subscribeToConsultation } from "@/lib/echo"

  export function useConsultationMessages(consultationId: number | string) {
    const {
      data,
      isLoading,
      mutate,
      error,
    } = useSWR<APIResponse<ConsultationMessage[]>>(
      consultationId ? ["consultation-messages", consultationId] : null,
      () => getConsultationMessages(Number(consultationId)),
      {
        revalidateOnFocus: false,
        keepPreviousData: true,
      }
    );
    
    const [eventLoading, setEventLoading] = useState<boolean>(false)
  
    const messages: ConsultationMessage[] = data?.data || []
    const refetch = async () => {
      setEventLoading(true)
      const newData = await getConsultationMessages(Number(consultationId));
      await mutate({ ...newData }, false);
      setEventLoading(false)
    };
    

    // استماع للرسائل الجديدة من Pusher


    // إرسال رسالة جديدة
    const sendMessage = async (messageData: CreateConsultationMessageData, onError: () => void) => {
      setEventLoading(true)
      const response = await addConsultationMessage(Number(consultationId), messageData)
      if (response.error) {
        onError()
      }
      await refetch();
      
      setEventLoading(false)
    }

    // حذف رسالة
    const removeMessage = async (messageId: number, onError: () => void) => {
      setEventLoading(true)
      const response = await deleteConsultationMessage(messageId)
      if (response.error) {
        onError()
      }
      await refetch();
      
      setEventLoading(false)
    }

    const updateMessage = async (messageId: number, messageData: UpdateConsultationMessageData, onError: () => void) => {
      setEventLoading(true)
      const response = await updateConsultationMessage(messageId, messageData)
      if (response.error) {
        onError()
      }
      await refetch();
      
      setEventLoading(false)
    }

    // تحميل مرفق
    const downloadAttachment = (url: string) => {
      window.open(url, '_blank')
    }

    const markMessagesAsRead = async (messageIds: number[]) => {
      await Promise.all(messageIds.map(messageId => readByDoctor(messageId)))
      await refetch();
      
    }

    return {
      messages,
      isLoading,
      error,
      eventLoading,
      sendMessage,
      removeMessage,
      downloadAttachment,
      mutate,
      markMessagesAsRead,
      updateMessage,
      refetch,
    }
  } 