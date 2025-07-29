import { apiHelpers } from "@/api/apiHelpers";
import type { APIResponse } from "@/api/api";
import type { DeleteConsultationResponse } from "./types";

/**
 * حذف استشارة
 * @param consultationId - معرف الاستشارة
 * @returns Promise<APIResponse<DeleteConsultationResponse>>
 */
export const deleteConsultation = async (
  consultationId: number
): Promise<APIResponse<DeleteConsultationResponse>> => {
  return await apiHelpers.delete(
    `consultations/${consultationId}`,
    { showSuccess: true }
  );
}; 