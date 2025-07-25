import useSWR from "swr";
import { getArticleCategories, getArticleCategoryById, type GetArticleCategoriesParams } from "@/api/services/articlecategory";
import { APIResponse } from "@/api/api";
import type { ArticleCategory } from "@/api/services/articlecategory";

export function useArticleCategories(params: GetArticleCategoriesParams = {}) {
  const {
    data,
    error: swrError,
    isLoading,
    mutate,
  } = useSWR<APIResponse<{ data: ArticleCategory[]; meta: any }>>(
    ["article-categories", params],
    () => getArticleCategories(params),
    {
      revalidateOnFocus: false,
    }
  );

  const hasError = swrError || data?.error;

  return {
    categories: data?.data || [],
    meta: data?.meta,
    isLoading,
    error: hasError,
    mutate,
  };
}

// Hook مبسط لجلب جميع التصنيفات (للاستخدام في القوائم المنسدلة)
export function useAllArticleCategories() {
  return useArticleCategories({ per_page: 100 }); // جلب 100 تصنيف كحد أقصى
}

// Hook لجلب تصنيف واحد بواسطة الـ ID
export function useArticleCategory(categoryId: number | null) {
  const {
    data,
    error: swrError,
    isLoading,
    mutate,
  } = useSWR<APIResponse<{ data: ArticleCategory }>>(
    categoryId ? ["article-category", categoryId] : null,
    () => getArticleCategoryById(categoryId!),
    {
      revalidateOnFocus: false,
    }
  );

  const hasError = swrError || data?.error;

  return {
    category: data?.data,
    isLoading,
    error: hasError,
    mutate,
  };
} 