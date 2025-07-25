import { apiHelpers } from "@/api/apiHelpers";
import type { APIResponse } from "@/api/api";
import type { ArticleCategory } from "./getArticleCategories";

export interface UpdateArticleCategoryData {
  name: string;
}

export const updateArticleCategory = async (categoryId: number, data: UpdateArticleCategoryData): Promise<APIResponse<{ data: ArticleCategory }>> => {
  return await apiHelpers.put(`article-categories/${categoryId}`, data, { showSuccess: true });
}; 