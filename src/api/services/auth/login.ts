import { APIResponse, fetchAPI } from "@/api/api"
import type { LoginData, LoginResponse } from "./types"

/**
 * تسجيل الدخول وإرسال رمز التحقق
 * @param data بيانات تسجيل الدخول
 * @returns Promise<APIResponse<LoginResponse>>
 */
export const login = async (data: LoginData): Promise<APIResponse<LoginResponse>> => {
  const endpoint = "auth/login"
  
  const res = await fetchAPI(endpoint, "POST", data)
  
  return res
} 