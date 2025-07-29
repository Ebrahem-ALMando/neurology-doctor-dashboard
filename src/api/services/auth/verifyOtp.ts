import { APIResponse, fetchAPI } from "@/api/api"
import type { VerifyOtpData, VerifyOtpResponse } from "./types"

/**
 * التحقق من رمز OTP وإكمال تسجيل الدخول
 * @param data بيانات التحقق من OTP
 * @returns Promise<APIResponse<VerifyOtpResponse>>
 */
export const verifyOtp = async (data: VerifyOtpData): Promise<APIResponse<VerifyOtpResponse>> => {
  const endpoint = "auth/verify-otp"
  
  const res = await fetchAPI(endpoint, "POST", data)
  
  return res
} 