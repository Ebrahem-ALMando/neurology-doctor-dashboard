import {APIConfig, fetchAPI} from "@/api/api";
import type { APIResponse } from "@/api/api";


export const apiHelpers = {
    get: <T = any>(endpoint: string, config?: APIConfig) =>
        fetchAPI<T>(endpoint, "GET", null, {}, config),

    post: <T = any>(endpoint: string, data: any, config?: APIConfig) =>
        fetchAPI<T>(endpoint, "POST", data, {}, config),

    put: <T = any>(endpoint: string, data: any, config?: APIConfig) =>
        fetchAPI<T>(endpoint, "PUT", data, {}, config),

    delete: <T = any>(endpoint: string, config?: APIConfig) =>
        fetchAPI<T>(endpoint, "DELETE", null, {}, config),

    patch: <T = any>(endpoint: string, data: any, config?: APIConfig) =>
        fetchAPI<T>(endpoint, "PATCH", data, {}, config),

    upload: <T = any>(endpoint: string, formData: FormData, config?: APIConfig) =>
        fetchAPI<T>(endpoint, "POST", formData, {}, { ...config, timeout: 120000 }),
}
