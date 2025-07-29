import { apiHelpers } from "@/api/apiHelpers";
import type { APIResponse } from "@/api/api";
import type { DeleteConsultationAttachmentResponse } from "./types";

/**
 * حذف مرفق استشارة محدد
 * @param attachmentId - معرف المرفق
 * @returns Promise<APIResponse<DeleteConsultationAttachmentResponse>>
 */
export const deleteConsultationAttachment = async (
  attachmentId: number
): Promise<APIResponse<DeleteConsultationAttachmentResponse>> => {
  return await apiHelpers.delete(
    `consultation-attachments/${attachmentId}`,
    { showSuccess: true }
  );
}; 