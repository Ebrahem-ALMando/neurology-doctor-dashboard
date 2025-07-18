import { apiHelpers, type APIResponse } from "@/src/api/api"

// أنواع البيانات للمرضى
export interface Patient {
  id: string
  name: string
  phone: string
  email?: string
  dateOfBirth: string
  gender: "male" | "female"
  address?: string
  emergencyContact?: {
    name: string
    phone: string
    relationship: string
  }
  medicalHistory?: string[]
  allergies?: string[]
  currentMedications?: string[]
  bloodType?: string
  nationalId?: string
  insuranceNumber?: string
  isActive: boolean
  createdAt: string
  updatedAt: string
}

export interface CreatePatientData {
  name: string
  phone: string
  email?: string
  dateOfBirth: string
  gender: "male" | "female"
  address?: string
  emergencyContact?: {
    name: string
    phone: string
    relationship: string
  }
  medicalHistory?: string[]
  allergies?: string[]
  currentMedications?: string[]
  bloodType?: string
  nationalId?: string
  insuranceNumber?: string
}

export interface PatientsQuery {
  page?: number
  limit?: number
  search?: string
  gender?: "male" | "female"
  isActive?: boolean
  sortBy?: string
  sortOrder?: "asc" | "desc"
}

/**
 * الحصول على قائمة المرضى
 * @param query - معايير البحث والتصفية
 * @returns Promise<APIResponse<Patient[]>>
 */
export const getPatients = async (query: PatientsQuery = {}): Promise<APIResponse<Patient[]>> => {
  const searchParams = new URLSearchParams()

  Object.entries(query).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      searchParams.append(key, value.toString())
    }
  })

  const endpoint = `patients${searchParams.toString() ? `?${searchParams.toString()}` : ""}`

  return await apiHelpers.get<Patient[]>(endpoint, { cache: true })
}

/**
 * الحصول على بيانات مريض محدد
 * @param patientId - معرف المريض
 * @returns Promise<APIResponse<Patient>>
 */
export const getPatient = async (patientId: string): Promise<APIResponse<Patient>> => {
  return await apiHelpers.get<Patient>(`patients/${patientId}`)
}

/**
 * إضافة مريض جديد
 * @param patientData - بيانات المريض
 * @returns Promise<APIResponse<Patient>>
 */
export const createPatient = async (patientData: CreatePatientData): Promise<APIResponse<Patient>> => {
  return await apiHelpers.post<Patient>("patients", patientData, { showSuccess: true })
}

/**
 * تحديث بيانات مريض
 * @param patientId - معرف المريض
 * @param patientData - البيانات المحدثة
 * @returns Promise<APIResponse<Patient>>
 */
export const updatePatient = async (
  patientId: string,
  patientData: Partial<CreatePatientData>,
): Promise<APIResponse<Patient>> => {
  return await apiHelpers.put<Patient>(`patients/${patientId}`, patientData, { showSuccess: true })
}

/**
 * حذف مريض
 * @param patientId - معرف المريض
 * @returns Promise<APIResponse>
 */
export const deletePatient = async (patientId: string): Promise<APIResponse> => {
  return await apiHelpers.delete(`patients/${patientId}`, { showSuccess: true })
}

/**
 * البحث عن المرضى
 * @param searchTerm - مصطلح البحث
 * @returns Promise<APIResponse<Patient[]>>
 */
export const searchPatients = async (searchTerm: string): Promise<APIResponse<Patient[]>> => {
  return await apiHelpers.get<Patient[]>(`patients/search?q=${encodeURIComponent(searchTerm)}`)
}

/**
 * تفعيل/إلغاء تفعيل مريض
 * @param patientId - معرف المريض
 * @param isActive - حالة التفعيل
 * @returns Promise<APIResponse<Patient>>
 */
export const togglePatientStatus = async (patientId: string, isActive: boolean): Promise<APIResponse<Patient>> => {
  return await apiHelpers.patch<Patient>(`patients/${patientId}/status`, { isActive })
}

/**
 * رفع صورة للمريض
 * @param patientId - معرف المريض
 * @param file - ملف الصورة
 * @returns Promise<APIResponse>
 */
export const uploadPatientPhoto = async (patientId: string, file: File): Promise<APIResponse> => {
  const formData = new FormData()
  formData.append("photo", file)

  return await apiHelpers.upload(`patients/${patientId}/photo`, formData)
}
