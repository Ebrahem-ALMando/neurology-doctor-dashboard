import { apiHelpers } from "@/api/apiHelpers"
import type { APIResponse } from "@/api/api"
import type { AvatarUpdateData, AvatarUpdateResponse } from "./types"

/**
 * Update authenticated user's avatar
 */
export async function updateAvatar(data: AvatarUpdateData): 
Promise<APIResponse<AvatarUpdateResponse>> {
  return apiHelpers.post<AvatarUpdateResponse>("/profile/avatar", data)
} 