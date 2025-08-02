import type { APIResponse } from "@/api/api";
import { apiHelpers } from "@/api/apiHelpers";

interface DownloadFileRequest {
  file_url: string; 
}

interface DownloadFileResponse {
  file_name: string;
  file_content: string; 
}

/**
 * 
 * @param fileUrl رابط الملف المطلوب تحميله
 * @returns Promise<void>
 */
export const downloadFile = async (fileUrl: string): Promise<void> => {
  try {
    const response: APIResponse<DownloadFileResponse> = await apiHelpers.post(
      "files/download", 
      {
        file_url: fileUrl,
      }
    );

    if (response.error || !response.data) {
      throw new Error(response.message || "فشل في تحميل الملف");
    }

    // تحويل المحتوى إلى Blob وتحميله
    const byteCharacters = atob(response.data?.file_content || "");
    const byteNumbers = new Array(byteCharacters.length)
      .fill(0)
      .map((_, i) => byteCharacters.charCodeAt(i));
    const blob = new Blob([new Uint8Array(byteNumbers)]);
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = response.data?.file_name || "";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  } catch (error: any) {
    console.error("Download error:", error);
    throw error;
  }
};
