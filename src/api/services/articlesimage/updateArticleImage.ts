import { apiHelpers } from "@/api/apiHelpers";
import type { APIResponse } from "@/api/api";

export interface UpdateArticleImageData {
  is_cover?: boolean;
  caption?: string;
}

export const updateArticleImage = async (
  imageId: number,
  data: UpdateArticleImageData
): Promise<APIResponse<any>> => {
  return await apiHelpers.put(`article-images/${imageId}`, data, { showSuccess: true });
}; 