import type { APIResponse } from "@/api/api";
import { apiHelpers } from "@/api/apiHelpers";
import type { UploadImagesResponse } from "./types";

/**
 * دالة رفع صور عامة
 * @param images ملفات الصور (File[])
 * @param folder اسم المجلد
 * @returns Promise<APIResponse<UploadImagesResponse>>
 */
const uploadImage = async (
  images: File[],
  folder: string
): Promise<APIResponse<UploadImagesResponse>> => {
  const formData = new FormData();
  images.forEach((img) => formData.append("images[]", img));
  formData.append("folder", folder);
  return await apiHelpers.upload("images/upload", formData);
};

export default uploadImage; 