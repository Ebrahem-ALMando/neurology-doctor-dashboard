import { apiHelpers } from "@/api/apiHelpers";
import type { APIResponse } from "@/api/api";
import type { UpdateConsultationData, UpdateConsultationResponse } from "./types";

/**
 * تحديث استشارة
 * @param consultationId - معرف الاستشارة
 * @param data - بيانات التحديث
 * @returns Promise<APIResponse<UpdateConsultationResponse>>
 */
export const updateConsultation = async (
  consultationId: number,
  data: UpdateConsultationData
): Promise<APIResponse<UpdateConsultationResponse>> => {
  return await apiHelpers.put(
    `consultations/${consultationId}`,
    data,
    { showSuccess: true }
  );
}; 