import { fetchAPI } from "@/api/api"
import type { APIResponse } from "@/api/api"
import ApiConfig from "@/api/apiConfig"
import { getTokenWithClient } from "@/utils/Token/getTokenWithClient"
import type { ProfileResponse } from "./types"

/**
 * Get authenticated user's profile
 */
export async function getProfile(): Promise<APIResponse<ProfileResponse>> {
  const endPointKey = "profile"
  const token = getTokenWithClient()
  const endpoint = `${endPointKey}`

  const res = await fetchAPI(endpoint, "GET", null, {
    next: {
      revalidate: ApiConfig.revalidateTime,
      tags: [endPointKey, "profile"],
    },
  })
  return res ??[]
} 