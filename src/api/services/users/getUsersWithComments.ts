import {APIResponse, fetchAPI} from "@/api/api"
import ApiConfig from "@/api/apiConfig"
import { getTokenWithClient } from "@/utils/Token/getTokenWithClient"
import {UsersWithComments} from "./types";

/**
 * @returns {Promise<{ error: boolean, data?: any, message?: string }>}
 */
export const getUsersWithComments = async ():Promise<APIResponse<UsersWithComments[]>> => {
    const endPointKey = "users/with-comments"
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
