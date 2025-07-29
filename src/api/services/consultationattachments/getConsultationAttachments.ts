import {APIResponse, fetchAPI} from "@/api/api"
import ApiConfig from "@/api/apiConfig"
import { getTokenWithClient } from "@/utils/Token/getTokenWithClient"
import type { ConsultationAttachmentsResponse, GetConsultationAttachmentsParams } from "./types"

/**
 * الحصول على مرفقات الاستشارات
 * @param params - معايير البحث والتصفية
 * @returns Promise<APIResponse<ConsultationAttachment[]>>
 */
export const getConsultationAttachments = async (
  params: GetConsultationAttachmentsParams = {}
): Promise<APIResponse<ConsultationAttachmentsResponse[]>> => {
  const endPointKey = "consultation-attachments"
  const token = getTokenWithClient()

  // بناء query parameters
  const searchParams = new URLSearchParams()
  
  if (params.consultation_id) searchParams.append("consultation_id", params.consultation_id.toString())
  if (params.consultation_message_id) searchParams.append("consultation_message_id", params.consultation_message_id.toString())
  if (params.file_type) searchParams.append("file_type", params.file_type)
  if (params.search) searchParams.append("search", params.search)
  if (params.per_page) searchParams.append("per_page", params.per_page.toString())
  if (params.page) searchParams.append("page", params.page.toString())

  const endpoint = `${endPointKey}${searchParams.toString() ? `?${searchParams.toString()}` : ""}`

  const res = await fetchAPI(endpoint, "GET", null, {
    next: {
      revalidate: ApiConfig.revalidateTime,
      tags: [endPointKey, "attachments"],
    },
  })

  return res ?? []
} 