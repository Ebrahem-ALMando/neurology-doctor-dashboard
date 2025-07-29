import {APIResponse, fetchAPI} from "@/api/api"
import ApiConfig from "@/api/apiConfig"
import { getTokenWithClient } from "@/utils/Token/getTokenWithClient"
import type { ConsultationStatusLogsResponse, GetConsultationStatusLogsParams } from "./types"

/**
 * الحصول على سجلات حالة الاستشارات
 * @param params - معايير البحث والتصفية
 * @returns Promise<APIResponse<ConsultationStatusLog[]>>
 */
export const getConsultationStatusLogs = async (
  params: GetConsultationStatusLogsParams = {}
): Promise<APIResponse<ConsultationStatusLogsResponse[]>> => {
  const endPointKey = "consultation-status-logs"
  const token = getTokenWithClient()

  // بناء query parameters
  const searchParams = new URLSearchParams()
  
  if (params.consultation_id) searchParams.append("consultation_id", params.consultation_id.toString())
  if (params.from_status) searchParams.append("from_status", params.from_status)
  if (params.to_status) searchParams.append("to_status", params.to_status)
  if (params.changed_by_id) searchParams.append("changed_by_id", params.changed_by_id.toString())
  if (params.changed_by_type) searchParams.append("changed_by_type", params.changed_by_type)
  if (params.from_date) searchParams.append("from_date", params.from_date)
  if (params.to_date) searchParams.append("to_date", params.to_date)
  if (params.search) searchParams.append("search", params.search)
  if (params.per_page) searchParams.append("per_page", params.per_page.toString())
  if (params.page) searchParams.append("page", params.page.toString())

  const endpoint = `${endPointKey}${searchParams.toString() ? `?${searchParams.toString()}` : ""}`

  const res = await fetchAPI(endpoint, "GET", null, {
    next: {
      revalidate: ApiConfig.revalidateTime,
      tags: [endPointKey, "status-logs"],
    },
  })

  return res ?? []
} 