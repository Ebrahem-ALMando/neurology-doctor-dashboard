import {APIResponse, fetchAPI} from "@/api/api"
import ApiConfig from "@/api/apiConfig"
import { getTokenWithClient } from "@/utils/Token/getTokenWithClient"
import type { ShowConsultationAttachmentResponse } from "./types"

/**
 * عرض مرفق استشارة محدد
 * @param attachmentId - معرف المرفق
 * @returns Promise<APIResponse<ConsultationAttachment>>
 */
export const showConsultationAttachment = async (
  attachmentId: number
): Promise<APIResponse<ShowConsultationAttachmentResponse>> => {
  const endPointKey = "consultation-attachments"
  const token = getTokenWithClient()

  const endpoint = `${endPointKey}/${attachmentId}`

  const res = await fetchAPI(endpoint, "GET", null, {
    next: {
      revalidate: ApiConfig.revalidateTime,
      tags: [endPointKey, `attachment-${attachmentId}`],
    },
  })

  return res
} 