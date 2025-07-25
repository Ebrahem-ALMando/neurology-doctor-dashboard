import { apiHelpers } from "@/api/apiHelpers";
import type { APIResponse } from "@/api/api";
import type { ArticleCategory } from "./getArticleCategories";

export interface AddArticleCategoryData {
  name: string;
}

export const addArticleCategory = async (data: AddArticleCategoryData): Promise<APIResponse<{ data: ArticleCategory }>> => {
  return await apiHelpers.post("article-categories", data, { showSuccess: true });
}; 