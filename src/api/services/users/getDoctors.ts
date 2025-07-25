import { getUsers, type User, type GetUsersParams } from "./getUsers";
import type { APIResponse } from "@/api/api";

export interface GetDoctorsParams extends Omit<GetUsersParams, 'role'> {
  search?: string;
  page?: number;
  per_page?: number;
  is_active?: boolean;
}

export interface GetDoctorsResponse {
  data: User[];
  meta: {
    total: number;
    per_page: number;
    current_page: number;
    last_page: number;
  };
}

export const getDoctors = async (params: GetDoctorsParams = {}): Promise<APIResponse<GetDoctorsResponse>> => {
  return await getUsers({
    ...params,
    role: "doctor",
    is_active: true // نجلب فقط الأطباء النشطين
  });
}; 