import { apiHelpers } from "@/api/apiHelpers";
import type { APIResponse } from "@/api/api";
import type { DeleteConsultationMessageResponse } from "./types";

/**
 * حذف رسالة استشارة محددة
 * @param messageId - معرف الرسالة
 * @returns Promise<APIResponse<DeleteConsultationMessageResponse>>
 */
export const deleteConsultationMessage = async (
  messageId: number
): Promise<APIResponse<DeleteConsultationMessageResponse>> => {
  return await apiHelpers.delete(
    `consultation-messages/${messageId}`,
    { showSuccess: true }
  );
}; 