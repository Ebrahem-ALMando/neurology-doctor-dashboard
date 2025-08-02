import { fetchAPI } from "@/api/api"
import type { APIResponse } from "@/api/api"
import type { AvatarDeleteData, AvatarDeleteResponse } from "./types"

/**
 * Delete authenticated user's avatar
 */
export async function deleteAvatar(data: AvatarDeleteData): 
Promise<APIResponse<AvatarDeleteResponse>> {
  return fetchAPI<AvatarDeleteResponse>("/profile/avatar", "DELETE", data)
} 