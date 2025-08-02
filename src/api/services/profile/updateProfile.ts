import { apiHelpers } from "@/api/apiHelpers"
import type { APIResponse } from "@/api/api"
import type { UpdateProfileData, UpdateProfileResponse } from "./types"

/**
 * Update authenticated user's profile
 */
export async function updateProfile(data: UpdateProfileData): Promise<APIResponse<UpdateProfileResponse>> {
  return apiHelpers.put<UpdateProfileResponse>("/profile", data)
} 