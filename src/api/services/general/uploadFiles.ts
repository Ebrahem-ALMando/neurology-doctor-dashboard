import type { APIResponse } from "@/api/api";
import { apiHelpers } from "@/api/apiHelpers";
import type { UploadFilesResponse } from "./types";

/**
 * دالة رفع ملفات عامة
 * @param files ملفات المرفقات (File[])
 * @param folder اسم المجلد
 * @returns Promise<APIResponse<UploadFilesResponse>>
 */
const uploadFiles = async (
  files: File[],
  folder: string
): Promise<APIResponse<UploadFilesResponse>> => {
  const formData = new FormData();
  files.forEach((file) => formData.append("files[]", file));
  formData.append("folder", folder);
  return await apiHelpers.upload("files/upload", formData);
};

export default uploadFiles; 