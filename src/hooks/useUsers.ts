import useSWR from "swr";
import { getUsers, getDoctors, type GetUsersParams, type GetDoctorsParams } from "@/api/services/users";
import { APIResponse } from "@/api/api";
import type { User } from "@/api/services/users";
import { getUsersWithComments } from "@/api/services/users/getUsersWithComments";
import { UsersWithComments } from "@/api/services/users/types";
interface PaginatedResponse<T> {
  data: T[];
  meta: {
    total: number;
    per_page: number;
    current_page: number;
    last_page: number;
  };
}
export function useUsers(params: GetUsersParams = {}) {
  const { data, error: swrError, isLoading, mutate } = useSWR<APIResponse<{ data: User[]; meta: any }>>(
    ["users", params],
    () => getUsers(params),
    { revalidateOnFocus: false }
  );
  
  const {
    data: usersWithComments,
    error: errorUsersWithComments,
    isLoading: isLoadingUsersWithComments,
    mutate: mutateUsersWithComments
  } = useSWR<APIResponse<PaginatedResponse<UsersWithComments>>>(
    "usersWithComments",
    getUsersWithComments,
    { revalidateOnFocus: false }
  );  


  const hasError = swrError || data?.error;
  return { 
    users: data?.data || [], 
    meta: data?.meta, 
    isLoading, 
    error: hasError, 
    mutate ,
    usersWithComments,
    errorUsersWithComments,
    isLoadingUsersWithComments,
    mutateUsersWithComments
  };
}

export function useAllUsers() {
  return useUsers({ per_page: 100 }); // نجلب حتى 100 مستخدم
}

export function useDoctors(params: GetDoctorsParams = {}) {
  const { data, error: swrError, isLoading, mutate } = useSWR<APIResponse<{ data: User[]; meta: any }>>(
    ["doctors", params],
    () => getDoctors(params),
    { revalidateOnFocus: false }
  );
  
  const hasError = swrError || data?.error;
  return { 
    doctors: data?.data || [], 
    meta: data?.meta, 
    isLoading, 
    error: hasError, 
    mutate 
  };
}

export function useAllDoctors() {
  return useDoctors({ per_page: 100 }); // نجلب حتى 100 طبيب
}

export function useUser(userId: number | null) {
  const { data, error: swrError, isLoading, mutate } = useSWR<APIResponse<{ data: User[] }>>(
    userId ? ["user", userId] : null,
    () => getUsers({ search: userId?.toString() }),
    { revalidateOnFocus: false }
  );
  
  const hasError = swrError || data?.error;
  return { 
    user: data?.data?.[0], 
    isLoading, 
    error: hasError, 
    mutate 
  };
} 