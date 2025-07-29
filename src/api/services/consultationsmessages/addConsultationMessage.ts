import { apiHelpers } from "@/api/apiHelpers";
import type { APIResponse } from "@/api/api";
import type { CreateConsultationMessageData, CreateConsultationMessageResponse } from "./types";

/**
 * إرسال رسالة جديدة في استشارة محددة
 * @param consultationId - معرف الاستشارة
 * @param messageData - بيانات الرسالة الجديدة
 * @returns Promise<APIResponse<CreateConsultationMessageResponse>>
 */
export const addConsultationMessage = async (
  consultationId: number,
  messageData: CreateConsultationMessageData
): Promise<APIResponse<CreateConsultationMessageResponse>> => {
  return await apiHelpers.post(
    `consultations/${consultationId}/messages`,
    messageData,
    { showSuccess: true }
  );
}; 