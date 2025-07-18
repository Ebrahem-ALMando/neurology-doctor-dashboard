import { apiHelpers, type APIResponse } from "@/api/api"

// أنواع البيانات للسجلات الطبية
export interface MedicalRecord {
  id: string
  patientId: string
  patient?: {
    id: string
    name: string
    phone: string
  }
  appointmentId?: string
  doctorId: string
  doctor?: {
    id: string
    name: string
    specialization: string
  }
  date: string
  type: "consultation" | "diagnosis" | "treatment" | "surgery" | "test_result" | "prescription"
  title: string
  description: string
  symptoms?: string[]
  diagnosis?: string[]
  treatment?: string
  medications?: {
    name: string
    dosage: string
    frequency: string
    duration: string
    instructions?: string
  }[]
  testResults?: {
    testName: string
    result: string
    normalRange?: string
    notes?: string
  }[]
  attachments?: {
    id: string
    name: string
    type: string
    url: string
    size: number
  }[]
  followUpInstructions?: string
  nextAppointmentDate?: string
  isConfidential: boolean
  createdAt: string
  updatedAt: string
}

export interface CreateMedicalRecordData {
  patientId: string
  appointmentId?: string
  type: "consultation" | "diagnosis" | "treatment" | "surgery" | "test_result" | "prescription"
  title: string
  description: string
  symptoms?: string[]
  diagnosis?: string[]
  treatment?: string
  medications?: {
    name: string
    dosage: string
    frequency: string
    duration: string
    instructions?: string
  }[]
  testResults?: {
    testName: string
    result: string
    normalRange?: string
    notes?: string
  }[]
  followUpInstructions?: string
  nextAppointmentDate?: string
  isConfidential?: boolean
}

export interface MedicalRecordsQuery {
  page?: number
  limit?: number
  patientId?: string
  type?: string
  dateFrom?: string
  dateTo?: string
  search?: string
  sortBy?: string
  sortOrder?: "asc" | "desc"
}

/**
 * الحصول على السجلات الطبية
 * @param query - معايير البحث والتصفية
 * @returns Promise<APIResponse<MedicalRecord[]>>
 */
export const getMedicalRecords = async (query: MedicalRecordsQuery = {}): Promise<APIResponse<MedicalRecord[]>> => {
  const searchParams = new URLSearchParams()

  Object.entries(query).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      searchParams.append(key, value.toString())
    }
  })

  const endpoint = `medical-records${searchParams.toString() ? `?${searchParams.toString()}` : ""}`

  return await apiHelpers.get<MedicalRecord[]>(endpoint)
}

/**
 * الحصول على سجل طبي محدد
 * @param recordId - معرف السجل
 * @returns Promise<APIResponse<MedicalRecord>>
 */
export const getMedicalRecord = async (recordId: string): Promise<APIResponse<MedicalRecord>> => {
  return await apiHelpers.get<MedicalRecord>(`medical-records/${recordId}`)
}

/**
 * إضافة سجل طبي جديد
 * @param recordData - بيانات السجل
 * @returns Promise<APIResponse<MedicalRecord>>
 */
export const createMedicalRecord = async (recordData: CreateMedicalRecordData): Promise<APIResponse<MedicalRecord>> => {
  return await apiHelpers.post<MedicalRecord>("medical-records", recordData, { showSuccess: true })
}

/**
 * تحديث سجل طبي
 * @param recordId - معرف السجل
 * @param recordData - البيانات المحدثة
 * @returns Promise<APIResponse<MedicalRecord>>
 */
export const updateMedicalRecord = async (
  recordId: string,
  recordData: Partial<CreateMedicalRecordData>,
): Promise<APIResponse<MedicalRecord>> => {
  return await apiHelpers.put<MedicalRecord>(`medical-records/${recordId}`, recordData, { showSuccess: true })
}

/**
 * حذف سجل طبي
 * @param recordId - معرف السجل
 * @returns Promise<APIResponse>
 */
export const deleteMedicalRecord = async (recordId: string): Promise<APIResponse> => {
  return await apiHelpers.delete(`medical-records/${recordId}`, { showSuccess: true })
}

/**
 * الحصول على السجلات الطبية لمريض محدد
 * @param patientId - معرف المريض
 * @param query - معايير إضافية
 * @returns Promise<APIResponse<MedicalRecord[]>>
 */
export const getPatientMedicalRecords = async (
  patientId: string,
  query: Omit<MedicalRecordsQuery, "patientId"> = {},
): Promise<APIResponse<MedicalRecord[]>> => {
  return await getMedicalRecords({ ...query, patientId })
}

/**
 * رفع مرفق لسجل طبي
 * @param recordId - معرف السجل
 * @param file - الملف
 * @returns Promise<APIResponse>
 */
export const uploadMedicalRecordAttachment = async (recordId: string, file: File): Promise<APIResponse> => {
  const formData = new FormData()
  formData.append("attachment", file)

  return await apiHelpers.upload(`medical-records/${recordId}/attachments`, formData)
}

/**
 * حذف مرفق من سجل طبي
 * @param recordId - معرف السجل
 * @param attachmentId - معرف المرفق
 * @returns Promise<APIResponse>
 */
export const deleteMedicalRecordAttachment = async (recordId: string, attachmentId: string): Promise<APIResponse> => {
  return await apiHelpers.delete(`medical-records/${recordId}/attachments/${attachmentId}`)
}

/**
 * البحث في السجلات الطبية
 * @param searchTerm - مصطلح البحث
 * @param filters - فلاتر إضافية
 * @returns Promise<APIResponse<MedicalRecord[]>>
 */
export const searchMedicalRecords = async (
  searchTerm: string,
  filters: Partial<MedicalRecordsQuery> = {},
): Promise<APIResponse<MedicalRecord[]>> => {
  return await getMedicalRecords({ ...filters, search: searchTerm })
}
