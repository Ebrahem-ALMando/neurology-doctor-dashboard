import { fetchAPI } from "@/api/api";
import ApiConfig from "@/api/apiConfig";
import type { APIResponse } from "@/api/api";
import { log } from "console";

export interface User {
  id: number;
  name: string;
  email: string | null;
  phone: string | null;
  role: string;
  avatar: string | null;
  gender: string | null;
  birthdate: string | null;
  is_active: boolean;
  device_token: string | null;
  device_type: string | null;
  created_at: string;
  updated_at: string;
}

export interface GetUsersParams {
  search?: string;
  role?: string;
  page?: number;
  per_page?: number;
  is_active?: boolean;
  phone?: string;
}

export interface GetUsersResponse {
  data: User[];
  meta: {
    total: number;
    per_page: number;
    current_page: number;
    last_page: number;
  };
}

export const getUsers = async (params: GetUsersParams = {}): Promise<APIResponse<GetUsersResponse>> => {
  const searchParams = new URLSearchParams();
  console.log(params)
  if (params.search) searchParams.append("search", params.search);
  if (params.role) searchParams.append("role", params.role);
  if (params.page) searchParams.append("page", params.page.toString());
  if (params.per_page) searchParams.append("per_page", params.per_page.toString());
  if (params.is_active !== undefined) searchParams.append("is_active", params.is_active.toString());
  if (params.phone) searchParams.append("phone", params.phone);
  
  const endPointKey = "users";
  const endpoint = `${endPointKey}${searchParams.toString() ? `?${searchParams.toString()}` : ""}`;
  
  return await fetchAPI(endpoint, "GET", null, { 
    next: { 
      revalidate: ApiConfig.revalidateTime, 
      tags: [endPointKey] 
    } 
  });
}; 