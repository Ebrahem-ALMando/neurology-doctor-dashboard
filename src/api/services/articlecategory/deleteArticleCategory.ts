import { apiHelpers } from "@/api/apiHelpers";
import type { APIResponse } from "@/api/api";

export const deleteArticleCategory = async (categoryId: number): Promise<APIResponse<any>> => {
  return await apiHelpers.delete(`article-categories/${categoryId}`, { showSuccess: true });
}; 