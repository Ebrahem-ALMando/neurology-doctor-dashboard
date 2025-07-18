import useSWR from "swr"
import { getArticles } from "@/api/services/articles/getArticles"
import { APIResponse } from "@/api/api"
import {Article, getArticleStats} from "@/data/articles"

export const useArticles = () => {
    const {
        data,
        error: swrError,
        isLoading,
        mutate,
    } = useSWR<APIResponse<Article[]>>("articles", getArticles, {
        revalidateOnFocus: false,
    })

    const hasError = swrError || data?.error
    let articleStats= {}
    if(!hasError&&!isLoading){
         articleStats=getArticleStats(data)
    }
    return {
        articles: data?.data || [],
        articleStats,
        isLoading,
        error: hasError,
        mutate,
    }
}
