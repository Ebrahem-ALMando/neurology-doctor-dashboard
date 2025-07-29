import { apiHelpers } from "@/api/apiHelpers";
import type { APIResponse } from "@/api/api";
import type { TypingEventResponse } from "./types";

/**
 * إرسال حدث الكتابة (Typing) لاستشارة محددة
 * @param consultationId - معرف الاستشارة
 * @returns Promise<APIResponse<TypingEventResponse>>
 */
export const sendTypingEvent = async (
  consultationId: number
): Promise<APIResponse<TypingEventResponse>> => {
  return await apiHelpers.post(
    `consultations/${consultationId}/typing`,
    null,
    { showSuccess: true }
  );
}; 