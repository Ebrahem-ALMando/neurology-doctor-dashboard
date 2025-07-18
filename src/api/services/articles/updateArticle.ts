import { apiHelpers } from "@/api/apiHelpers";
import type { APIResponse } from "@/api/api";

export interface UpdateArticleData {
  doctor_id?: number;
  category_id?: number;
  title?: string;
  short_description?: string;
  content?: string;
  is_published?: boolean;
}

export const updateArticle = async (articleId: number, data: UpdateArticleData): Promise<APIResponse<any>> => {
  return await apiHelpers.put(`articles/${articleId}`, data, { showSuccess: true });
};
