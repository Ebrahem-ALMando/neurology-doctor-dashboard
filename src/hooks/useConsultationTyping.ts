import { useState, useEffect } from "react"
import { apiHelpers } from "@/api/apiHelpers"

interface TypingData {
  consultation_id: number
  user_id: number
  user_type: "doctor" | "patient"
  is_typing: boolean
}

interface ReadStatusData {
  consultation_id: number
  message_id: number
  read_by_doctor?: boolean
  read_by_patient?: boolean
}

export function useConsultationTyping(consultationId: number, currentUserId: number, currentUserType: "doctor" | "patient") {
  const [isTyping, setIsTyping] = useState(false)
  const [typingUsers, setTypingUsers] = useState<Set<number>>(new Set())
  const [readStatus, setReadStatus] = useState<Map<number, { read_by_doctor: boolean; read_by_patient: boolean }>>(new Map())

  // إرسال مؤشر الكتابة
  const sendTypingStatus = async (typing: boolean) => {
    try {
      const typingData: TypingData = {
        consultation_id: consultationId,
        user_id: currentUserId,
        user_type: currentUserType,
        is_typing: typing
      }

      await apiHelpers.post(
        `consultations/${consultationId}/typing`,
        typingData,
        { showSuccess: false }
      )
    } catch (error) {
      console.error('Error sending typing status:', error)
    }
  }

  // تحديث حالة القراءة
  const updateReadStatus = async (messageId: number) => {
    try {
      const readData: ReadStatusData = {
        consultation_id: consultationId,
        message_id: messageId,
        ...(currentUserType === 'doctor' ? { read_by_doctor: true } : { read_by_patient: true })
      }

      await apiHelpers.patch(
        `consultation-messages/${messageId}/read`,
        readData,
        { showSuccess: false }
      )

      // تحديث الحالة المحلية
      setReadStatus(prev => {
        const newMap = new Map(prev)
        const current = newMap.get(messageId) || { read_by_doctor: false, read_by_patient: false }
        newMap.set(messageId, {
          ...current,
          ...(currentUserType === 'doctor' ? { read_by_doctor: true } : { read_by_patient: true })
        })
        return newMap
      })
    } catch (error) {
      console.error('Error updating read status:', error)
    }
  }

  // بدء الكتابة
  const startTyping = () => {
    if (!isTyping) {
      setIsTyping(true)
      sendTypingStatus(true)
    }
  }

  // إيقاف الكتابة
  const stopTyping = () => {
    if (isTyping) {
      setIsTyping(false)
      sendTypingStatus(false)
    }
  }

  // تحديث حالة القراءة للرسائل الجديدة
  const markMessagesAsRead = (messageIds: number[]) => {
    messageIds.forEach(messageId => {
      updateReadStatus(messageId)
    })
  }

  // تنظيف مؤشرات الكتابة عند إغلاق المحادثة
  useEffect(() => {
    return () => {
      if (isTyping) {
        sendTypingStatus(false)
      }
    }
  }, [isTyping])

  return {
    isTyping,
    typingUsers,
    readStatus,
    startTyping,
    stopTyping,
    markMessagesAsRead,
    updateReadStatus,
  }
} 