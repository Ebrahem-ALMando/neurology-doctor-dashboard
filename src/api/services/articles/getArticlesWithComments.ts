import {APIResponse, fetchAPI} from "@/api/api"
import ApiConfig from "@/api/apiConfig"
import { getTokenWithClient } from "@/utils/Token/getTokenWithClient"
import {ArticleWithComments} from "./types";

/**
 * @returns {Promise<{ error: boolean, data?: any, message?: string }>}
 */
export const getArticlesWithComments = async ():Promise<APIResponse<ArticleWithComments[]>> => {
    const endPointKey = "articles-with-comments"
    const token = getTokenWithClient()
 // if (!token) {
    //     return {
    //         error: true,
    //         data: [],
    //         message: "Token not found",
    //     }
    // }
    const res = await fetchAPI(endPointKey, "GET", null, {
        next: {
            revalidate: ApiConfig.revalidateTime,
            tags: [endPointKey],
        },
    })

    return res ?? []
}
