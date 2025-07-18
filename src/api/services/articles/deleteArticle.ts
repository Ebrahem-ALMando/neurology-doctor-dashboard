import { apiHelpers } from "@/api/apiHelpers";
import type { APIResponse } from "@/api/api";

export const deleteArticle = async (articleId: number): Promise<APIResponse<any>> => {
  return await apiHelpers.delete(`articles/${articleId}`, { showSuccess: true });
};
