import {APIResponse, fetchAPI} from "@/api/api"
import ApiConfig from "@/api/apiConfig"
import { getTokenWithClient } from "@/utils/Token/getTokenWithClient"
import type { UnreadMessagesCountResponse } from "./types"
/**
 * الحصول على عدد الرسائل غير المقروءة في استشارة محددة
 * @param consultationId - معرف الاستشارة
 * @returns Promise<APIResponse<UnreadMessagesCountResponse>>
 */
export const getMessagesUnreadCount = async (consultationId: number): Promise<APIResponse<UnreadMessagesCountResponse>> => {
  const endPointKey = "consultations"
  const token = getTokenWithClient()
  const endpoint = `${endPointKey}/${consultationId}/messages/unread-count`

  const res = await fetchAPI(endpoint, "GET", null, {
    next: {
      revalidate: ApiConfig.revalidateTime,
      tags: [endPointKey, `consultation-${consultationId}`, "unread-count"],
    },
  })

  return res
} 