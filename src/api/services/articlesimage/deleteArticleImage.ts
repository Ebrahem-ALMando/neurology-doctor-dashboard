import { apiHelpers } from "@/api/apiHelpers";
import type { APIResponse } from "@/api/api";

export const deleteArticleImage = async (imageId: number): Promise<APIResponse<any>> => {
  return await apiHelpers.delete(`article-images/${imageId}`, { showSuccess: true });
}; 