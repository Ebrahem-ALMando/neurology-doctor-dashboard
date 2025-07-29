import { APIResponse, fetchAPI } from "@/api/api"
import type { LogoutResponse } from "./types"

/**
 * تسجيل الخروج
 * @returns Promise<APIResponse<LogoutResponse>>
 */
export const logout = async (): Promise<APIResponse<LogoutResponse>> => {
  const endpoint = "auth/logout"
  
  const res = await fetchAPI(endpoint, "POST", {})
  
  return res
} 