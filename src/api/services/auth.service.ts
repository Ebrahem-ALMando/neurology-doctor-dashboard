import { fetchAPI, apiHelpers, type APIResponse } from "@/api/api"

// أنواع البيانات للمصادقة
export interface LoginData {
  phone: string
  role?: string
  device_token?: string
  device_type?: string
}

export interface VerifyOTPData {
  phone: string
  role?: string
  otp: string
  device_token?: string
  device_type?: string
}

export interface User {
  id: string
  name: string
  phone: string
  email?: string | null
  role: string
  avatar?: string | null
  gender?: string | null
  birthdate?: string | null
  is_active: boolean
  device_token?: string | null
  device_type?: string | null
  created_at: string
  updated_at: string
  specialization?: string | null // Added specialization for doctor
}

export interface AuthResponse {
  user: User
  token: string
  refreshToken?: string
  expiresIn: number
}

// Helper to set cookie (moved from api.ts for direct use here)
function setCookie(name: string, value: string, days: number) {
  if (typeof document === "undefined") return
  const expires = new Date()
  expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000)
  document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/;SameSite=Lax;Secure`
}

// Helper to delete cookie (moved from api.ts for direct use here)
function deleteCookie(name: string) {
  if (typeof document === "undefined") return
  document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:01 GMT;path=/;SameSite=Lax;Secure`
}

/**
 * تسجيل الدخول باستخدام رقم الهاتف
 * @param formData - بيانات تسجيل الدخول
 * @returns Promise<APIResponse<AuthResponse>>
 */
export const login = async (formData: LoginData): Promise<APIResponse<AuthResponse>> => {
  const endpoint = "auth/login"

  const response = await fetchAPI<AuthResponse>(
    endpoint,
    "POST",
    {
      phone: formData.phone,
      role: formData.role || "admin",
      device_token: formData.device_token || "device_token_example",
      device_type: formData.device_type || "mobile",
    },
    {
      next: {
        revalidate: 0,
        tags: [endpoint],
      },
    },
  )

  if (!response.error && response.data) {
    return {
      error: false,
      message: response.message,
      data: {
        user: response.data as any,
        token: "",
        expiresIn: 0,
      },
    }
  }

  return response
}

/**
 * التحقق من رمز OTP
 * @param formData - بيانات التحقق
 * @returns Promise<APIResponse<AuthResponse>>
 */
export const verifyOTP = async (formData: VerifyOTPData): Promise<APIResponse<AuthResponse>> => {
  const endpoint = "auth/verify-otp"

  const response = await fetchAPI<AuthResponse>(
    endpoint,
    "POST",
    {
      phone: formData.phone,
      role: formData.role || "admin",
      otp: formData.otp,
      device_token: formData.device_token || "device_token_example",
      device_type: formData.device_type || "mobile",
    },
    { showError: true, showSuccess: true },
  )

  if (!response.error && response.data) {
    const apiData = response.data as any
    if (apiData.user && apiData.token) {
      if (typeof window !== "undefined") {
        setCookie("token", apiData.token, 7) // Store token in cookie for 7 days
        localStorage.setItem("user", JSON.stringify(apiData.user)) // Store user object in localStorage
      }
      return {
        error: false,
        message: response.message,
        data: {
          user: apiData.user,
          token: apiData.token,
          expiresIn: 3600, // Assuming a default expiry, adjust if API provides it
        },
      }
    } else {
      return {
        error: true,
        message: "Invalid response structure from API",
      }
    }
  }

  return response
}

/**
 * إعادة إرسال رمز OTP
 * @param phone - رقم الهاتف
 * @returns Promise<APIResponse>
 */
export const resendOTP = async (phone: string): Promise<APIResponse> => {
  return await apiHelpers.post("auth/login", {
    phone,
    role: "admin", // Assuming role 'admin' for resend
    device_token: "device_token_example",
    device_type: "mobile",
  })
}

/**
 * تسجيل الخروج
 * @returns Promise<APIResponse>
 */
export const logout = async (): Promise<APIResponse> => {
  const response = await apiHelpers.post("auth/logout", {})

  // مسح البيانات من localStorage والكوكيز
  if (typeof window !== "undefined") {
    deleteCookie("token")
    localStorage.removeItem("user")
    localStorage.removeItem("refreshToken")
  }

  return response
}

/**
 * تحديث التوكن
 * @returns Promise<APIResponse<AuthResponse>>
 */
export const refreshToken = async (): Promise<APIResponse<AuthResponse>> => {
  const refreshToken = typeof window !== "undefined" ? localStorage.getItem("refreshToken") : null

  if (!refreshToken) {
    return { error: true, message: "لا يوجد refresh token" }
  }

  const response = await fetchAPI<AuthResponse>("auth/refresh", "POST", { refreshToken })

  // تحديث التوكن الجديد
  if (!response.error && response.data?.token) {
    if (typeof window !== "undefined") {
      setCookie("token", response.data.token, 7) // Update token in cookie
      if (response.data.refreshToken) {
        localStorage.setItem("refreshToken", response.data.refreshToken)
      }
    }
  }

  return response
}

/**
 * الحصول على بيانات المستخدم الحالي
 * @returns Promise<APIResponse<User>>
 */
export const getCurrentUser = async (): Promise<APIResponse<User>> => {
  return await apiHelpers.get<User>("auth/me")
}

/**
 * تحديث الملف الشخصي
 * @param userData - بيانات المستخدم المحدثة
 * @returns Promise<APIResponse<User>>
 */
export const updateProfile = async (userData: Partial<User>): Promise<APIResponse<User>> => {
  return await apiHelpers.put<User>("auth/profile", userData)
}

/**
 * تغيير كلمة المرور
 * @param passwords - كلمات المرور القديمة والجديدة
 * @returns Promise<APIResponse>
 */
export const changePassword = async (passwords: {
  currentPassword: string
  newPassword: string
  confirmPassword: string
}): Promise<APIResponse> => {
  return await apiHelpers.put("auth/change-password", passwords)
}
