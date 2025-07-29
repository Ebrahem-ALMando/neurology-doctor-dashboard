import {APIResponse, fetchAPI} from "@/api/api"
import ApiConfig from "@/api/apiConfig"
import { getTokenWithClient } from "@/utils/Token/getTokenWithClient"
import type { Consultation, GetConsultationsParams } from "./types"
/**
 * الحصول على قائمة الاستشارات
 * @param params - معايير البحث والتصفية
 * @returns Promise<APIResponse<Consultation[]>>
 */
export const getConsultations = async (params: GetConsultationsParams = {}): Promise<APIResponse<Consultation[]>> => {
  const endPointKey = "consultations"
  const token = getTokenWithClient()

  const searchParams = new URLSearchParams()
  if (params.status) searchParams.append("status", params.status)
  if (params.patient_id) searchParams.append("patient_id", params.patient_id.toString())
  if (params.doctor_id) searchParams.append("doctor_id", params.doctor_id.toString())
  if (params.per_page) searchParams.append("per_page", params.per_page.toString())
  if (params.search) searchParams.append("search", params.search)
  if (params.page) searchParams.append("page", params.page.toString())
  if (params.from_date) searchParams.append("from_date", params.from_date)
  if (params.to_date) searchParams.append("to_date", params.to_date)

  const endpoint = `${endPointKey}${searchParams.toString() ? `?${searchParams.toString()}` : ""}`

  const res = await fetchAPI(endpoint, "GET", null, {
    next: {
      revalidate: ApiConfig.revalidateTime,
      tags: [endPointKey],
    },
  })

  return res ?? []
} 
