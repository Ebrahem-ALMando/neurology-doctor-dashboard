import useSWR from "swr"
import { getArticles } from "@/api/services/articles/getArticles"
import { APIResponse } from "@/api/api"
import {Article, getArticleStats} from "@/data/articles"

interface UseArticlesParams {
  search?: string;
  category_id?: number;
  is_published?: boolean;
  page?: number;
  per_page?: number;
}

export const useArticles = (params: UseArticlesParams = {}) => {
    const {
        data,
        error: swrError,
        isLoading,
        mutate,
    } = useSWR<APIResponse<Article[]>>(
        ["articles", params], 
        () => getArticles(params), 
        {
            revalidateOnFocus: false,
        }
    )

    const hasError = swrError || data?.error
    let articleStats= {}
    if(!hasError&&!isLoading&&data?.data){
         articleStats=getArticleStats({ data: data.data, meta: { total: data.data.length } })
    }
    return {
        articles: data?.data || [],
        articleStats,
        isLoading,
        error: hasError,
        mutate,
    }
}
