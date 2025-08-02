import {APIResponse, fetchAPI} from "@/api/api"
import ApiConfig from "@/api/apiConfig"
import { getTokenWithClient } from "@/utils/Token/getTokenWithClient"
import type {ConsultationMessage, ConsultationMessagesResponse, GetConsultationMessagesParams } from "./types"

/**
 * الحصول على رسائل استشارة محددة
 * @param consultationId - معرف الاستشارة
 * @param params - معايير البحث والتصفية
 * @returns Promise<APIResponse<ConsultationMessage[]>>
 */
export const getConsultationMessages = async (
  consultationId: number,
  params: GetConsultationMessagesParams = {}
):Promise<APIResponse<ConsultationMessage[]>> => {
  const endPointKey = "consultations"
  const token = getTokenWithClient()

  // بناء query parameters
  const searchParams = new URLSearchParams()
  
  if (params.sender_id) searchParams.append("sender_id", params.sender_id.toString())
  if (params.sender_type) searchParams.append("sender_type", params.sender_type)
  if (params.search) searchParams.append("search", params.search)
  if (params.per_page) searchParams.append("per_page", params.per_page.toString())
  if (params.page) searchParams.append("page", params.page.toString())

  const endpoint = `${endPointKey}/${consultationId}/messages${searchParams.toString() ? `?${searchParams.toString()}` : ""}`

  const res = await fetchAPI(endpoint, "GET", null, {
    cache: "no-store",
    next: { revalidate: 0 },
  }
  )

  return res ?? []
} 