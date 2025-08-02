import { useState } from "react"
import { updateConsultationStatus } from "@/api/services/consultations"
import { useCustomToastWithIcons } from "@/hooks/use-custom-toast-with-icons"
import type { UpdateConsultationStatusData } from "@/api/services/consultations"

export function useConsultationStatus() {
  const [isLoading, setIsLoading] = useState(false)
  const { showUpdateSuccess, showError, showNetworkError } = useCustomToastWithIcons()

  const changeConsultationStatus = async (
    consultationId: number,
    data: UpdateConsultationStatusData,
    onSuccess?: () => void,
    showSuccess=true
  ) => {
    setIsLoading(true)
    try {
      const response = await updateConsultationStatus(consultationId, data)
      
      if (response.data && !response.error) {
        if(showSuccess) showUpdateSuccess()
        onSuccess?.()
        return { success: true, data: response.data }
      } else {
        showError({
          title: "خطأ في التحديث",
          description: response.message || "فشل في تحديث حالة الاستشارة"
        })
        return { success: false, message: response.message }
      }
    } catch (error) {
      console.log(error)
      return { success: false, message: "حدث خطأ في الاتصال بالخادم" }
    } finally {
      setIsLoading(false)
    }
  }

  return {
    isLoading,
    changeConsultationStatus,
  }
} 