import {APIResponse, fetchAPI} from "@/api/api"
import ApiConfig from "@/api/apiConfig"
import { getTokenWithClient } from "@/utils/Token/getTokenWithClient"
import {Article} from "@/data/articles";

interface GetArticlesParams {
  search?: string;
  category_id?: number;
  is_published?: boolean;
  page?: number;
  per_page?: number;
}

/**
 * @returns {Promise<{ error: boolean, data?: any, message?: string }>}
 */
export const getArticles = async (params: GetArticlesParams = {}):Promise<APIResponse<Article[]>> => {
    const endPointKey = "articles"
    const token = getTokenWithClient()
 // if (!token) {
    //     return {
    //         error: true,
    //         data: [],
    //         message: "Token not found",
    //     }
    // }
    // بناء query parameters
    const searchParams = new URLSearchParams();
    if (params.search) searchParams.append("search", params.search);
    if (params.category_id) searchParams.append("category_id", params.category_id.toString());
    if (params.is_published !== undefined) searchParams.append("is_published", params.is_published.toString());
    if (params.page) searchParams.append("page", params.page.toString());
    if (params.per_page) searchParams.append("per_page", params.per_page.toString());

    const endpoint = `${endPointKey}${searchParams.toString() ? `?${searchParams.toString()}` : ""}`;

    const res = await fetchAPI(endpoint, "GET", null, {
        next: {
            revalidate: ApiConfig.revalidateTime,
            tags: [endPointKey],
        },
    })

    return res ?? []
}
