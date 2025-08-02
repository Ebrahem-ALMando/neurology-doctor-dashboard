// "use client"
//
//
// const baseUrl = process.env.NEXT_PUBLIC_API_URL || "https://prog.eilmalriyada.com/api/"
//
//
// export interface APIResponse<T = any> {
//   error: boolean
//   data?: T
//   message?: string
//   meta?: {
//     total?: number
//     page?: number
//     limit?: number
//     totalPages?: number
//   }
// }
//
// export interface APIConfig {
//   showError?: boolean
//   showSuccess?: boolean
//   cache?: boolean
//   timeout?: number
//   onSuccess?: (message: string) => void // Callback for success toast
//   onError?: (message: string) => void // Callback for error toast
// }
//
// export interface FetchOptions extends RequestInit {
//   next?: {
//     revalidate?: number
//     tags?: string[]
//   }
// }
//
// /**
//  * دالة مساعدة لتعيين الكوكيز
//  */
// function setCookie(name: string, value: string, days: number) {
//   if (typeof document === "undefined") return
//   const expires = new Date()
//   expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000)
//   document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/;SameSite=Lax;Secure`
// }
//
// /**
//  * دالة مساعدة للحصول على الكوكيز
//  */
// function getCookie(name: string): string | null {
//   if (typeof document === "undefined") return null
//
//   const value = `; ${document.cookie}`
//   const parts = value.split(`; ${name}=`)
//   if (parts.length === 2) {
//     return parts.pop()?.split(";").shift() || null
//   }
//   return null
// }
//
// /**
//  * دالة مساعدة لحذف الكوكيز
//  */
// function deleteCookie(name: string) {
//   if (typeof document === "undefined") return
//   document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:01 GMT;path=/;SameSite=Lax;Secure`
// }
//
// /**
//  * دالة عامة لاستدعاء API
//  * @param endpoint - نقطة النهاية للـ API
//  * @param method - طريقة HTTP (GET, POST, PUT, DELETE, etc.)
//  * @param data - البيانات المرسلة
//  * @param options - خيارات إضافية للـ fetch
//  * @param config - إعدادات إضافية للدالة
//  * @returns Promise<APIResponse>
//  */
// export const fetchAPI = async <T = any>(
//   endpoint: string,
//   method = "GET",
//   data: any = null,
//   options: FetchOptions = {},
//   config: APIConfig = { showError: true },
// ): Promise<APIResponse<T>> => {
//   const url = `${baseUrl}${endpoint}`
//
//   // الحصول على التوكن واللغة من الكوكيز
//   const token: string | null = getCookie("token")
//   const lang = getCookie("NEXT_LOCALE") || "ar"
//
//   // إعداد الهيدرز
//   const headers = new Headers({
//     "Accept-Language": lang,
//     Accept: "application/json",
//     ...(process.env.NEXT_PUBLIC_API_KEY && { "X-API-KEY": process.env.NEXT_PUBLIC_API_KEY }),
//     ...(token && { Authorization: `Bearer ${token}` }),
//   })
//
//   // إعداد البيانات والهيدرز حسب نوع البيانات
//   let body: string | FormData | URLSearchParams | undefined
//
//   if (data instanceof URLSearchParams) {
//     headers.set("Content-Type", "application/x-www-form-urlencoded")
//     body = data.toString()
//   } else if (data instanceof FormData) {
//     body = data
//   } else if (data && typeof data === "object" && method !== "GET") {
//     headers.set("Content-Type", "application/json")
//     body = JSON.stringify(data)
//   }
//
//   // إعداد خيارات الـ fetch
//   const fetchOptions: RequestInit = {
//     method,
//     headers,
//     ...options,
//   }
//
//   // إضافة البيانات للطرق التي تدعمها
//   if (method !== "GET" && method !== "HEAD" && body) {
//     fetchOptions.body = body
//   }
//
//   // إعداد التايم أوت
//   const timeout = config.timeout || (body instanceof FormData ? 60000 : 30000)
//   const controller = new AbortController()
//   const timeoutId = setTimeout(() => controller.abort(), timeout)
//
//   const startTime = Date.now()
//
//   try {
//     console.log(`🚀 [${method}] ${endpoint}`)
//
//     const response = await fetch(url, {
//       ...fetchOptions,
//       signal: controller.signal,
//     })
//
//     clearTimeout(timeoutId)
//     const duration = Date.now() - startTime
//     console.log(`⏱️ [${endpoint}] استغرقت ${duration}ms`)
//
//     // التحقق من حالة الاستجابة
//     if (!response.ok) {
//       // معالجة خطأ انتهاء الجلسة
//       if (response.status === 401 && typeof window !== "undefined") {
//         if (config.showError) {
//           console.warn("انتهت الجلسة، يرجى تسجيل الدخول من جديد")
//           config.onError?.("انتهت الجلسة، يرجى تسجيل الدخول من جديد")
//         }
//         deleteCookie("token") // Clear token on 401
//         localStorage.removeItem("user") // Clear user data
//         setTimeout(() => {
//           if (typeof window !== "undefined") {
//             window.location.href = "/auth/signin"
//           }
//         }, 2000)
//       }
//
//       // محاولة قراءة رسالة الخطأ من الاستجابة
//       let errorData: any = {}
//       try {
//         errorData = await response.json()
//       } catch {
//         // في حالة فشل قراءة JSON
//       }
//
//       const message = errorData.message || errorData.error || response.statusText || "حدث خطأ غير معروف"
//
//       if (config.showError) {
//         console.warn(`❌ [${endpoint}] ${message}`)
//         config.onError?.(message) // Show error toast
//       }
//
//       return {
//         error: true,
//         message,
//         data: errorData,
//       }
//     }
//
//     // قراءة البيانات من الاستجابة
//     const responseData = await response.json()
//
//     if (config.showSuccess && responseData.message) {
//       console.log(`✅ [${endpoint}] ${responseData.message}`)
//       config.onSuccess?.(responseData.message)
//     }
//
//     return {
//       error: false,
//       data: responseData?.data ?? responseData,
//       message: responseData?.message,
//       meta: responseData?.meta,
//     }
//   } catch (error: any) {
//     clearTimeout(timeoutId)
//
//     let errorMessage = "حدث خطأ في الاتصال"
//
//     if (error.name === "AbortError") {
//       errorMessage = "انتهت مهلة الاتصال"
//     } else if (error.message) {
//       errorMessage = error.message
//     }
//
//     if (config.showError) {
//       console.warn(`❌ [${endpoint}] ${errorMessage}`)
//       config.onError?.(errorMessage) // Show error toast
//     }
//
//     console.error("fetchAPI error:", error)
//
//     return {
//       error: true,
//       message: errorMessage,
//     }
//   }
// }
//
// /**
//  * دوال مساعدة للعمليات الشائعة
//  */
// export const apiHelpers = {
//   // GET request
//   get: <T = any>(endpoint: string, config?: APIConfig) => fetchAPI<T>(endpoint, "GET", null, {}, config),
//
//   // POST request
//   post: <T = any>(endpoint: string, data: any, config?: APIConfig) => fetchAPI<T>(endpoint, "POST", data, {}, config),
//
//   // PUT request
//   put: <T = any>(endpoint: string, data: any, config?: APIConfig) => fetchAPI<T>(endpoint, "PUT", data, {}, config),
//
//   // DELETE request
//   delete: <T = any>(endpoint: string, config?: APIConfig) => fetchAPI<T>(endpoint, "DELETE", null, {}, config),
//
//   // PATCH request
//   patch: <T = any>(endpoint: string, data: any, config?: APIConfig) => fetchAPI<T>(endpoint, "PATCH", data, {}, config),
//
//   // Upload file
//   upload: <T = any>(endpoint: string, formData: FormData, config?: APIConfig) =>
//     fetchAPI<T>(endpoint, "POST", formData, {}, { ...config, timeout: 120000 }),
// }


// File: api/api.ts

import Cookies from "js-cookie"

const baseUrl = process.env.NEXT_PUBLIC_API_URL?.replace(/\/+$/, "") || "https://prog.eilmalriyada.com/api/"

export interface APIResponse<T = any> {
  error: boolean
  data?: T
  message?: string
  meta?: {
    total?: number
    page?: number
    limit?: number
    totalPages?: number
  }
}

export interface APIConfig {
  showError?: boolean
  showSuccess?: boolean
  cache?: boolean
  timeout?: number
  onSuccess?: (message: string) => void
  onError?: (message: string) => void
}

export interface FetchOptions extends RequestInit {
  next?: {
    revalidate?: number
    tags?: string[]
  }
}

export const fetchAPI = async <T = any>(
    endpoint: string,
    method: string = "GET",
    data: any = null,
    options: RequestInit = {},
    config: APIConfig = { showError: true }
): Promise<APIResponse<T>> => {
  const url = `${baseUrl}/${endpoint}`.replace(/\/+$/, "")
  const token = Cookies.get("token")
  const lang = Cookies.get("NEXT_LOCALE") || "ar"

  const headers = new Headers({
    "Accept-Language": lang,
    Accept: "application/json",
    ...(process.env.NEXT_PUBLIC_API_KEY && { "X-API-KEY": process.env.NEXT_PUBLIC_API_KEY }),
    ...(token && { Authorization: `Bearer ${token}` }),
  })

  let body
  if (data instanceof URLSearchParams) {
    headers.set("Content-Type", "application/x-www-form-urlencoded")
    body = data.toString()
  } else if (data instanceof FormData) {
    body = data
  } else if (data && typeof data === "object" && method !== "GET") {
    headers.set("Content-Type", "application/json")
    body = JSON.stringify(data)
  }

  const fetchOptions: RequestInit = {
    method,
    headers,
    ...options,
  }

  if (method !== "GET" && method !== "HEAD") {
    fetchOptions.body = body
  }

  const timeout = config.timeout || (body instanceof FormData ? 60000 : 30000)
  const controller = new AbortController()
  const timeoutId = setTimeout(() => controller.abort(), timeout)

  const startTime = Date.now()

  try {
    const response = await fetch(url, { ...fetchOptions, signal: controller.signal })
    clearTimeout(timeoutId)

    const duration = Date.now() - startTime
    console.log(`⏱️ [${endpoint}] استغرقت ${duration}ms`)

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))
      const message = errorData.message || response.statusText || "حدث خطأ غير معروف"
      if (config.showError) console.warn(`❌ [${endpoint}] ${message}`)
      return { error: true, message, data: errorData }
    }

    const responseData = await response.json()
    if (config.showSuccess && responseData.message) {
      console.log(`✅ [${endpoint}] ${responseData.message}`)
      config.onSuccess?.(responseData.message)
    }

    return {
      error: false,
      data: responseData?.data ?? responseData,
      message: responseData?.message,
      meta: responseData?.meta,
    }
  } catch (error: any) {
    console.log(error)
    clearTimeout(timeoutId)
    const errorMessage = error.name === "AbortError"
        ? "انتهت مهلة الاتصال"
        : error.message || "حدث خطأ في الاتصال"
      
    if (config.showError) console.warn(`❌ [${endpoint}] ${errorMessage}`)

    return {
      error: true,
      message: errorMessage,
    }
  }
}
