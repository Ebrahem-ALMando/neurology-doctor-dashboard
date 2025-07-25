import { fetchAPI } from "@/api/api";
import ApiConfig from "@/api/apiConfig";
import type { APIResponse } from "@/api/api";
import type { ArticleCategory } from "./getArticleCategories";

export const getArticleCategoryById = async (categoryId: number): Promise<APIResponse<{ data: ArticleCategory }>> => {
  const endPointKey = "article-categories";
  const endpoint = `${endPointKey}/${categoryId}`;
  
  return await fetchAPI(endpoint, "GET", null, {
    next: {
      revalidate: ApiConfig.revalidateTime,
      tags: [endPointKey],
    },
  });
}; 