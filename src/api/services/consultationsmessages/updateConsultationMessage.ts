import { apiHelpers } from "@/api/apiHelpers";
import type { APIResponse } from "@/api/api";
import type { UpdateConsultationMessageData, UpdateConsultationMessageResponse } from "./types";

/**
 * تحديث رسالة استشارة محددة
 * @param messageId - معرف الرسالة
 * @param messageData - البيانات المحدثة للرسالة
 * @returns Promise<APIResponse<UpdateConsultationMessageResponse>>
 */
export const updateConsultationMessage = async (
  messageId: number,
  messageData: UpdateConsultationMessageData
): Promise<APIResponse<UpdateConsultationMessageResponse>> => {
  return await apiHelpers.put(
    `consultation-messages/${messageId}`,
    messageData,
    { showSuccess: true }
  );
}; 