// Common types for consultation status logs API
export interface ConsultationStatusLogChanger {
  id: number
  name: string
  role: string
  email: string | null
  phone: string
  changer_type: string
  avatar: string | null
  avatar_url: string | null
  gender: string
  birthdate: string
  blood_type: string | null
  allergy: string | null
  chronic_diseases: string | null
  is_active: boolean
  device_token: string
  device_type: string
}

export interface ConsultationStatusLog {
  id: number
  consultation_id: number
  from_status: string
  to_status: string
  changed_by_id: number
  changed_by_type: string
  note: string
  created_at: string
  changer: ConsultationStatusLogChanger
}

export interface ConsultationStatusLogsMeta {
  total: number
  per_page: number
  current_page: number
  last_page: number
}

export interface ConsultationStatusLogsResponse {
  status: number
  message: string
  data: ConsultationStatusLog[]
  meta: ConsultationStatusLogsMeta
}

// Get consultation status logs params
export interface GetConsultationStatusLogsParams {
  consultation_id?: number
  from_status?: string
  to_status?: string
  changed_by_id?: number
  changed_by_type?: string
  from_date?: string
  to_date?: string
  search?: string
  per_page?: number
  page?: number
} 