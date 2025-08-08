import type { APIResponse } from "@/api/api";
import { apiHelpers } from "@/api/apiHelpers";

/**
 * دالة رفع صور عامة
 * @param images ملفات الصور (File[])
 * @param folder اسم المجلد
 * @returns Promise<APIResponse<{ uploaded: { image_name: string; image_url: string }[]; failed: any[] }>>
 */
const uploadImage = async (
  images: File[],
  folder: string
): Promise<APIResponse<{ uploaded: { image_name: string; image_url: string }[]; failed: any[] }>> => {
  const formData = new FormData();
  images.forEach((img) => formData.append("images[]", img));
  formData.append("folder", folder);
  return await apiHelpers.upload("images/upload", formData);
};

export default uploadImage; 