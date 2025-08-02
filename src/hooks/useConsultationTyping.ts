import { useState, useEffect, useRef } from "react"
import { sendTypingEvent } from "@/api/services/consultations"
import { updateEchoToken } from "@/lib/echo"
import { getTokenWithClient } from "@/utils/Token/getTokenWithClient"

export function useConsultationTyping(consultationId: number, currentUserId: number, currentUserType: "doctor" | "patient") {
  const [isTyping, setIsTyping] = useState(false)
  const [typingUsers, setTypingUsers] = useState<Set<number>>(new Set())
  const [isConnected, setIsConnected] = useState(false)
  const typingTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  const typingUsersTimeoutsRef = useRef<Map<number, NodeJS.Timeout>>(new Map())

  // إرسال مؤشر الكتابة
  const sendTypingStatus = async (typing: boolean) => {
    try {
      await sendTypingEvent(consultationId)
    } catch (error) {
      console.error('Error sending typing status:', error)
    }
  }

  // بدء الكتابة
  const startTyping = () => {
    if (!isTyping) {
      setIsTyping(true)
      sendTypingStatus(true)
    }

    // إلغاء timeout السابق
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current)
    }

    // إيقاف الكتابة بعد 2 ثانية
    typingTimeoutRef.current = setTimeout(() => {
      stopTyping()
    }, 2000)
  }

  // إيقاف الكتابة
  const stopTyping = () => {
    if (isTyping) {
      setIsTyping(false)
      sendTypingStatus(false)
    }

    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current)
      typingTimeoutRef.current = null
    }
  }

  // دالة لتحديث مؤشر الكتابة من الخارج
  const updateTypingUsers = (data: any) => {
    console.log('مؤشر الكتابة وصل:', data)
    
    if (data.user_id !== currentUserId) {
      // إضافة المستخدم إلى مؤشر الكتابة
      setTypingUsers(prev => {
        const newSet = new Set([...prev, data.user_id])
        return newSet
      })
      
      // إلغاء timeout السابق لهذا المستخدم
      if (typingUsersTimeoutsRef.current.has(data.user_id)) {
        clearTimeout(typingUsersTimeoutsRef.current.get(data.user_id)!)
      }
      
      // إضافة timeout لإزالة المستخدم بعد 2 ثانية
      const timeout = setTimeout(() => {
        setTypingUsers(prev => {
          const newSet = new Set(prev)
          newSet.delete(data.user_id)
          return newSet
        })
        typingUsersTimeoutsRef.current.delete(data.user_id)
      }, 2000)
      
      typingUsersTimeoutsRef.current.set(data.user_id, timeout)
    }
  }

  // دالة لإزالة مستخدم من مؤشر الكتابة
  const removeUserFromTyping = (userId: number) => {
    setTypingUsers(prev => {
      const newSet = new Set(prev)
      newSet.delete(userId)
      return newSet
    })
    
    // إلغاء timeout لهذا المستخدم
    if (typingUsersTimeoutsRef.current.has(userId)) {
      clearTimeout(typingUsersTimeoutsRef.current.get(userId)!)
      typingUsersTimeoutsRef.current.delete(userId)
    }
  }

  // الاتصال بـ Pusher
  useEffect(() => {
    const connectToPusher = async () => {
      try {
        console.log('🔌 useConsultationTyping - connecting to Pusher')
        
        // تحديث التوكن
        const token = getTokenWithClient()
        console.log('🔑 useConsultationTyping - token:', token ? 'exists' : 'missing')
        
        if (token) {
          updateEchoToken(token)
        }

        setIsConnected(true)
        console.log('✅ useConsultationTyping - تم الاتصال بـ Pusher بنجاح')
      } catch (error) {
        console.error('❌ useConsultationTyping - خطأ في الاتصال بـ Pusher:', error)
        setIsConnected(false)
      }
    }

    if (consultationId && currentUserId) {
      console.log('🎯 useConsultationTyping - starting connection - consultationId:', consultationId, 'currentUserId:', currentUserId)
      connectToPusher()
    }

    return () => {
      console.log('🔌 useConsultationTyping - cleaning up')
      // تنظيف عند إغلاق المكون
      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current)
      }
      
      // تنظيف timeouts للمستخدمين الآخرين
      typingUsersTimeoutsRef.current.forEach((timeout) => {
        clearTimeout(timeout)
      })
      typingUsersTimeoutsRef.current.clear()
      
      if (isTyping) {
        sendTypingStatus(false)
      }
    }
  }, [consultationId, currentUserId])

  return {
    isTyping,
    typingUsers,
    isConnected,
    startTyping,
    stopTyping,
    updateTypingUsers,
    removeUserFromTyping,
  }
} 