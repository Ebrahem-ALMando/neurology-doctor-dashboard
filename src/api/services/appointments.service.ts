import { apiHelpers, type APIResponse } from "@/src/api/api"


export interface Appointment {
  id: string
  patientId: string
  patient?: {
    id: string
    name: string
    phone: string
  }
  doctorId: string
  doctor?: {
    id: string
    name: string
    specialization: string
  }
  date: string
  time: string
  duration: number // بالدقائق
  type: "consultation" | "checkup" | "followup" | "emergency" | "initial" | "results"
  status: "scheduled" | "confirmed" | "in_progress" | "completed" | "cancelled" | "no_show"
  notes?: string
  symptoms?: string[]
  diagnosis?: string
  prescription?: string
  followUpDate?: string
  createdAt: string
  updatedAt: string
}

export interface CreateAppointmentData {
  patientId: string
  date: string
  time: string
  duration?: number
  type: "consultation" | "checkup" | "followup" | "emergency" | "initial" | "results"
  notes?: string
  symptoms?: string[]
}

export interface AppointmentsQuery {
  page?: number
  limit?: number
  date?: string
  dateFrom?: string
  dateTo?: string
  patientId?: string
  status?: string
  type?: string
  sortBy?: string
  sortOrder?: "asc" | "desc"
}

/**
 * الحصول على قائمة المواعيد
 * @param query - معايير البحث والتصفية
 * @returns Promise<APIResponse<Appointment[]>>
 */
export const getAppointments = async (query: AppointmentsQuery = {}): Promise<APIResponse<Appointment[]>> => {
  const searchParams = new URLSearchParams()

  Object.entries(query).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      searchParams.append(key, value.toString())
    }
  })

  const endpoint = `appointments${searchParams.toString() ? `?${searchParams.toString()}` : ""}`

  return await apiHelpers.get<Appointment[]>(endpoint)
}

/**
 * الحصول على موعد محدد
 * @param appointmentId - معرف الموعد
 * @returns Promise<APIResponse<Appointment>>
 */
export const getAppointment = async (appointmentId: string): Promise<APIResponse<Appointment>> => {
  return await apiHelpers.get<Appointment>(`appointments/${appointmentId}`)
}

/**
 * إضافة موعد جديد
 * @param appointmentData - بيانات الموعد
 * @returns Promise<APIResponse<Appointment>>
 */
export const createAppointment = async (appointmentData: CreateAppointmentData): Promise<APIResponse<Appointment>> => {
  return await apiHelpers.post<Appointment>("appointments", appointmentData, { showSuccess: true })
}

/**
 * تحديث موعد
 * @param appointmentId - معرف الموعد
 * @param appointmentData - البيانات المحدثة
 * @returns Promise<APIResponse<Appointment>>
 */
export const updateAppointment = async (
  appointmentId: string,
  appointmentData: Partial<CreateAppointmentData>,
): Promise<APIResponse<Appointment>> => {
  return await apiHelpers.put<Appointment>(`appointments/${appointmentId}`, appointmentData, { showSuccess: true })
}

/**
 * حذف موعد
 * @param appointmentId - معرف الموعد
 * @returns Promise<APIResponse>
 */
export const deleteAppointment = async (appointmentId: string): Promise<APIResponse> => {
  return await apiHelpers.delete(`appointments/${appointmentId}`, { showSuccess: true })
}

/**
 * تأكيد موعد
 * @param appointmentId - معرف الموعد
 * @returns Promise<APIResponse<Appointment>>
 */
export const confirmAppointment = async (appointmentId: string): Promise<APIResponse<Appointment>> => {
  return await apiHelpers.patch<Appointment>(`appointments/${appointmentId}/confirm`, {})
}

/**
 * إلغاء موعد
 * @param appointmentId - معرف الموعد
 * @param reason - سبب الإلغاء
 * @returns Promise<APIResponse<Appointment>>
 */
export const cancelAppointment = async (appointmentId: string, reason?: string): Promise<APIResponse<Appointment>> => {
  return await apiHelpers.patch<Appointment>(`appointments/${appointmentId}/cancel`, { reason })
}

/**
 * بدء موعد
 * @param appointmentId - معرف الموعد
 * @returns Promise<APIResponse<Appointment>>
 */
export const startAppointment = async (appointmentId: string): Promise<APIResponse<Appointment>> => {
  return await apiHelpers.patch<Appointment>(`appointments/${appointmentId}/start`, {})
}

/**
 * إنهاء موعد
 * @param appointmentId - معرف الموعد
 * @param data - بيانات إنهاء الموعد
 * @returns Promise<APIResponse<Appointment>>
 */
export const completeAppointment = async (
  appointmentId: string,
  data: {
    diagnosis?: string
    prescription?: string
    notes?: string
    followUpDate?: string
  },
): Promise<APIResponse<Appointment>> => {
  return await apiHelpers.patch<Appointment>(`appointments/${appointmentId}/complete`, data)
}

/**
 * الحصول على المواعيد المتاحة
 * @param date - التاريخ
 * @param duration - مدة الموعد بالدقائق
 * @returns Promise<APIResponse<string[]>>
 */
export const getAvailableSlots = async (date: string, duration = 30): Promise<APIResponse<string[]>> => {
  return await apiHelpers.get<string[]>(`appointments/available-slots?date=${date}&duration=${duration}`)
}

/**
 * الحصول على إحصائيات المواعيد
 * @param dateFrom - من تاريخ
 * @param dateTo - إلى تاريخ
 * @returns Promise<APIResponse>
 */
export const getAppointmentsStats = async (dateFrom?: string, dateTo?: string): Promise<APIResponse> => {
  const params = new URLSearchParams()
  if (dateFrom) params.append("dateFrom", dateFrom)
  if (dateTo) params.append("dateTo", dateTo)

  const endpoint = `appointments/stats${params.toString() ? `?${params.toString()}` : ""}`
  return await apiHelpers.get(endpoint)
}
