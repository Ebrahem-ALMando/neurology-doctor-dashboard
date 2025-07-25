import { apiHelpers } from "@/api/apiHelpers";
import type { APIResponse } from "@/api/api";

// بيانات إضافة مقال جديد
export interface AddArticleData {
  doctor_id: number;
  category_id: number;
  title: string;
  short_description: string;
  content: string;
  is_published: boolean;
  published_at: string;
}

// دالة إضافة مقال جديد
export const addArticle = async (data: AddArticleData): Promise<APIResponse<any>> => {
  return await apiHelpers.post("articles", data, { showSuccess: true });
};
