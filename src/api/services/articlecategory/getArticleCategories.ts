import { fetchAPI } from "@/api/api";
import ApiConfig from "@/api/apiConfig";
import type { APIResponse } from "@/api/api";

export interface ArticleCategory {
  id: number;
  name: string;
  created_at: string;
  updated_at: string;
}

export interface GetArticleCategoriesParams {
  search?: string;
  page?: number;
  per_page?: number;
}

export interface GetArticleCategoriesResponse {
  data: ArticleCategory[];
  meta: {
    total: number;
    per_page: number;
    current_page: number;
    last_page: number;
  };
}

export const getArticleCategories = async (params: GetArticleCategoriesParams = {}): Promise<APIResponse<GetArticleCategoriesResponse>> => {
  const searchParams = new URLSearchParams();
  
  if (params.search) {
    searchParams.append("search", params.search);
  }
  
  if (params.page) {
    searchParams.append("page", params.page.toString());
  }
  
  if (params.per_page) {
    searchParams.append("per_page", params.per_page.toString());
  }

  const endPointKey = "article-categories";
  const endpoint = `${endPointKey}${searchParams.toString() ? `?${searchParams.toString()}` : ""}`;
  
  return await fetchAPI(endpoint, "GET", null, {
    next: {
      revalidate: ApiConfig.revalidateTime,
      tags: [endPointKey],
    },
  });
}; 