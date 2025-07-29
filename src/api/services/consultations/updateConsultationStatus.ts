import { apiHelpers } from "@/api/apiHelpers";
import type { APIResponse } from "@/api/api";
import type { UpdateConsultationStatusData, UpdateConsultationStatusResponse } from "./types";

/**
 * تحديث حالة الاستشارة
 * @param consultationId - معرف الاستشارة
 * @param data - بيانات الحالة
 * @returns Promise<APIResponse<UpdateConsultationStatusResponse>>
 */
export const updateConsultationStatus = async (
  consultationId: number,
  data: UpdateConsultationStatusData
): Promise<APIResponse<UpdateConsultationStatusResponse>> => {
  return await apiHelpers.patch(
    `consultations/${consultationId}/status`,
    data,
    { showSuccess: true }
  );
}; 