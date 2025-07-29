import {APIResponse, fetchAPI} from "@/api/api"
import ApiConfig from "@/api/apiConfig"
import { getTokenWithClient } from "@/utils/Token/getTokenWithClient"
import type { ShowConsultationResponse } from "./types"

export const showConsultation = async (consultationId: number): Promise<APIResponse<ShowConsultationResponse>> => {
  const endPointKey = "consultations"
  const token = getTokenWithClient()
  const endpoint = `${endPointKey}/${consultationId}`

  const res = await fetchAPI(endpoint, "GET", null, {
    next: {
      revalidate: ApiConfig.revalidateTime,
      tags: [endPointKey, `consultation-${consultationId}`],
    },
  })

  return res
} 