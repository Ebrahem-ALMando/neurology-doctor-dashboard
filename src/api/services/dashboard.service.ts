import { apiHelpers, type APIResponse } from "@/src/api/api"

// أنواع البيانات للوحة التحكم
export interface DashboardStats {
  totalPatients: number
  totalAppointments: number
  todayAppointments: number
  weeklyAppointments: number
  monthlyAppointments: number
  completedAppointments: number
  cancelledAppointments: number
  attendanceRate: number
  newPatientsThisMonth: number
  totalMedicalRecords: number
}

export interface ChartData {
  name: string
  value: number
  color?: string
}

export interface AppointmentsByStatus {
  confirmed: number
  pending: number
  cancelled: number
  completed: number
}

export interface RecentActivity {
  id: string
  type: "patient_registered" | "appointment_created" | "appointment_completed" | "medical_record_added"
  message: string
  timestamp: string
  patientName?: string
  doctorName?: string
}

/**
 * الحصول على إحصائيات لوحة التحكم
 * @returns Promise<APIResponse<DashboardStats>>
 */
export const getDashboardStats = async (): Promise<APIResponse<DashboardStats>> => {
  return await apiHelpers.get<DashboardStats>("dashboard/stats", { cache: true })
}

/**
 * الحصول على بيانات مخطط التشخيصات
 * @param period - الفترة الزمنية (week, month, year)
 * @returns Promise<APIResponse<ChartData[]>>
 */
export const getDiagnosesChartData = async (period = "month"): Promise<APIResponse<ChartData[]>> => {
  return await apiHelpers.get<ChartData[]>(`dashboard/charts/diagnoses?period=${period}`)
}

/**
 * الحصول على بيانات مخطط الحضور
 * @param period - الفترة الزمنية
 * @returns Promise<APIResponse<ChartData[]>>
 */
export const getAttendanceChartData = async (period = "month"): Promise<APIResponse<ChartData[]>> => {
  return await apiHelpers.get<ChartData[]>(`dashboard/charts/attendance?period=${period}`)
}

/**
 * الحصول على بيانات مخطط الأمراض الشائعة
 * @param period - الفترة الزمنية
 * @returns Promise<APIResponse<ChartData[]>>
 */
export const getDiseasesChartData = async (period = "month"): Promise<APIResponse<ChartData[]>> => {
  return await apiHelpers.get<ChartData[]>(`dashboard/charts/diseases?period=${period}`)
}

/**
 * الحصول على المواعيد حسب الحالة
 * @param period - الفترة الزمنية
 * @returns Promise<APIResponse<AppointmentsByStatus>>
 */
export const getAppointmentsByStatus = async (period = "month"): Promise<APIResponse<AppointmentsByStatus>> => {
  return await apiHelpers.get<AppointmentsByStatus>(`dashboard/appointments-by-status?period=${period}`)
}

/**
 * الحصول على النشاطات الأخيرة
 * @param limit - عدد النشاطات
 * @returns Promise<APIResponse<RecentActivity[]>>
 */
export const getRecentActivities = async (limit = 10): Promise<APIResponse<RecentActivity[]>> => {
  return await apiHelpers.get<RecentActivity[]>(`dashboard/recent-activities?limit=${limit}`)
}

/**
 * الحصول على تقرير شامل للوحة التحكم
 * @param dateFrom - من تاريخ
 * @param dateTo - إلى تاريخ
 * @returns Promise<APIResponse>
 */
export const getDashboardReport = async (dateFrom?: string, dateTo?: string): Promise<APIResponse> => {
  const params = new URLSearchParams()
  if (dateFrom) params.append("dateFrom", dateFrom)
  if (dateTo) params.append("dateTo", dateTo)

  const endpoint = `dashboard/report${params.toString() ? `?${params.toString()}` : ""}`
  return await apiHelpers.get(endpoint)
}

/**
 * تصدير تقرير لوحة التحكم
 * @param format - صيغة التصدير (pdf, excel)
 * @param dateFrom - من تاريخ
 * @param dateTo - إلى تاريخ
 * @returns Promise<APIResponse>
 */
export const exportDashboardReport = async (
  format: "pdf" | "excel" = "pdf",
  dateFrom?: string,
  dateTo?: string,
): Promise<APIResponse> => {
  const params = new URLSearchParams()
  params.append("format", format)
  if (dateFrom) params.append("dateFrom", dateFrom)
  if (dateTo) params.append("dateTo", dateTo)

  return await apiHelpers.get(`dashboard/export?${params.toString()}`)
}
