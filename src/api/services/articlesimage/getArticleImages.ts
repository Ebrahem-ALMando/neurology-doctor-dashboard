import { fetchAPI } from "@/api/api";
import ApiConfig from "@/api/apiConfig";
import type { APIResponse } from "@/api/api";

export interface GetArticleImagesParams {
  article_id?: number;
  is_cover?: boolean;
  page?: number;
  per_page?: number;
}

export interface ArticleImage {
  id: number;
  article_id: number;
  image_name: string;
  folder: string;
  is_cover: boolean;
  caption: string;
  image_url: string;
  created_at: string;
  updated_at: string;
}

export const getArticleImages = async (params: GetArticleImagesParams = {}): Promise<APIResponse<{ data: ArticleImage[]; meta: any }>> => {
  const searchParams = new URLSearchParams();
  if (params.article_id !== undefined) searchParams.append("article_id", String(params.article_id));
  if (params.is_cover !== undefined) searchParams.append("is_cover", String(params.is_cover));
  if (params.page !== undefined) searchParams.append("page", String(params.page));
  if (params.per_page !== undefined) searchParams.append("per_page", String(params.per_page));
  const endPointKey = "article-images";
  const endpoint = `${endPointKey}${searchParams.toString() ? `?${searchParams.toString()}` : ""}`;
  return await fetchAPI(endpoint, "GET", null, {
    next: {
      revalidate: ApiConfig.revalidateTime,
      tags: [endPointKey],
    },
  });
}; 