import { getTokenWithClient } from "@/utils/Token/getTokenWithClient"
import Echo from "laravel-echo"
import Pusher from "pusher-js"

// تعريف Pusher للـ window object
if (typeof window !== "undefined") {
  window.Pusher = Pusher
}

// تهيئة Echo مع دالة للحصول على التوكن
const getEchoConfig = () => {
  const token = getTokenWithClient()
  console.log('Echo config - token:', token ? 'exists' : 'missing')
  
  return {
    broadcaster: "pusher",
    key: "075be5c32f5efcf0fb3a",
    cluster: "eu",
    forceTLS: true,
    encrypted: true,
    authEndpoint: `${process.env.NEXT_PUBLIC_API_URL || "https://prog.eilmalriyada.com/api/"}broadcasting/auth`,
    auth: {
      headers: {
        Authorization: `Bearer ${token}`,
        "X-API-KEY": process.env.NEXT_PUBLIC_API_KEY || ""
      }
    }
  }
}

// تهيئة Echo فقط في المتصفح
let echo: Echo | null = null

if (typeof window !== "undefined") {
  echo = new Echo(getEchoConfig())
}

// دالة للحصول على Echo
export const getEcho = (): Echo | null => {
  if (!echo && typeof window !== "undefined") {
    echo = new Echo(getEchoConfig())
  }
  return echo
}

// دالة لتحديث التوكن في Echo
export const updateEchoToken = (token: string) => {
  const echoInstance = getEcho()
  if (echoInstance?.connector.options.auth?.headers) {
    echoInstance.connector.options.auth.headers.Authorization = `Bearer ${token}`
  }
}

// دالة للاشتراك في قناة الاستشارة
export const subscribeToConsultation = (consultationId: number, onNewMessage: (message: any) => void, onTyping: (data: any) => void) => {
  console.log('🔗 subscribeToConsultation - consultationId:', consultationId)
  
  const echoInstance = getEcho()
  if (!echoInstance) {
    console.error('❌ Echo not available')
    return {
      unsubscribe: () => {}
    }
  }
  
  try {
    // الاشتراك في قناة الرسائل
    const consultationChannel = echoInstance.private(`consultation.${consultationId}`)
    console.log('📡 Subscribed to consultation channel:', `consultation.${consultationId}`)
    
    consultationChannel.listen('NewConsultationMessage', (e: any) => {
      console.log('📨 NewConsultationMessage event received:', e)
      console.log('📨 Message data:', e.message)
      onNewMessage(e.message)
    })

    // الاشتراك في قناة مؤشر الكتابة
    const typingChannel = echoInstance.private(`typing.consultation.${consultationId}`)
    console.log('📡 Subscribed to typing channel:', `typing.consultation.${consultationId}`)
    
    typingChannel.listen('TypingIndicator', (e: any) => {
      console.log('⌨️ TypingIndicator event received:', e)
      onTyping(e)
    })
    
    
    return {
      unsubscribe: () => {
        console.log('🔌 Unsubscribing from channels')
        echoInstance.leave(`consultation.${consultationId}`)
        echoInstance.leave(`typing.consultation.${consultationId}`)
      }
    }
  } catch (error) {
    console.error('❌ Error subscribing to channels:', error)
    return {
      unsubscribe: () => {}
    }
  }
} 