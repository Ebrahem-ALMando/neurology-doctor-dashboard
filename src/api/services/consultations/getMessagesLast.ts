import {APIResponse, fetchAPI} from "@/api/api"
import ApiConfig from "@/api/apiConfig"
import { getTokenWithClient } from "@/utils/Token/getTokenWithClient"
import type { LastMessageResponse } from "./types"
/**
 * الحصول على آخر رسالة في استشارة محددة
 * @param consultationId - معرف الاستشارة
 * @returns Promise<APIResponse<LastMessageResponse>>
 */
export const getMessagesLast = async (consultationId: number): Promise<APIResponse<LastMessageResponse>> => {
  const endPointKey = "consultations"
  const token = getTokenWithClient()
  const endpoint = `${endPointKey}/${consultationId}/messages/last`

  const res = await fetchAPI(endpoint, "GET", null, {
    next: {
      revalidate: ApiConfig.revalidateTime,
      tags: [endPointKey, `consultation-${consultationId}`, "last-message"],
    },
  })

  return res
} 