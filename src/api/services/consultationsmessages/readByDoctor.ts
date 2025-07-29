import { apiHelpers } from "@/api/apiHelpers";
import type { APIResponse } from "@/api/api";
import type { ReadStatusResponse } from "./types";

/**
 * وضع علامة مقروءة من قبل الطبيب على رسالة محددة
 * @param messageId - معرف الرسالة
 * @returns Promise<APIResponse<ReadStatusResponse>>
 */
export const readByDoctor = async (
  messageId: number
): Promise<APIResponse<ReadStatusResponse>> => {
  return await apiHelpers.patch(
    `consultation-messages/${messageId}/read-by-doctor`,
    {},
    { showSuccess: true }
  );
}; 