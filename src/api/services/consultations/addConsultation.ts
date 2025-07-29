import { apiHelpers } from "@/api/apiHelpers";
import type { APIResponse } from "@/api/api";
import type { CreateConsultationData, CreateConsultationResponse } from "./types";

/**
 * إنشاء استشارة جديدة
 * @param data - بيانات الاستشارة
 * @returns Promise<APIResponse<CreateConsultationResponse>>
 */
export const addConsultation = async (
  data: CreateConsultationData
): Promise<APIResponse<CreateConsultationResponse>> => {
  return await apiHelpers.post(
    `consultations`,
    data,
    { showSuccess: true }
  );
}; 