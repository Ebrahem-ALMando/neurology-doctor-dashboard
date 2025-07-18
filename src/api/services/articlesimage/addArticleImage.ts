import { apiHelpers } from "@/api/apiHelpers";
import type { APIResponse } from "@/api/api";

export interface AddArticleImageData {
  article_id: number;
  image_name: string;
  folder: string;
  is_cover: boolean;
  caption: string;
}

export const addArticleImage = async (data: AddArticleImageData): Promise<APIResponse<any>> => {
  return await apiHelpers.post("article-images", data, { showSuccess: true });
}; 