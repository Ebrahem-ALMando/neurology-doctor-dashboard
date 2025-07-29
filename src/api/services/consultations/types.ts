// Common types for consultations API
export interface ConsultationMessage {
  id: number
  consultation_id: number
  sender_id: number
  sender_type: "patient" | "doctor"
  subject: string | null
  message: string
  read_by_patient: boolean
  read_by_doctor: boolean
  deleted_at: string | null
  created_at: string
}

export interface ConsultationMessageWithSender extends ConsultationMessage {
  sender: {
    id: number
    name: string
    role: string
    avatar_url: string | null
  }
  attachments: {
    original_name: string
    file_name: string
    file_type: string
    file_path: string
    file_url: string
  }[]
}

export interface ConsultationAttachment {
  original_name: string
  file_name: string
  file_type: string
  file_path: string
  file_url: string
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
}

export interface ConsultationStatusLogWithChanger extends ConsultationStatusLog {
  changer: {
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
}

export interface ConsultationUser {
  id: number
  name: string
  role: string
  avatar_url: string | null
}

export interface Consultation {
  id: number
  patient_id: number
  doctor_id: number
  status: "open" | "waiting_response" | "answered" | "closed" | "cancelled"
  closed_at: string | null
  last_message_at: string | null
  last_sender_id: number | null
  created_at: string
  updated_at: string
  patient: ConsultationUser
  doctor: ConsultationUser
  last_sender: ConsultationUser | null
  messages: ConsultationMessage[]
  attachments: ConsultationAttachment[]
  status_logs: ConsultationStatusLog[]
  last_message: ConsultationMessage | null
}

export interface DetailedConsultation {
  id: number
  patient_id: number
  doctor_id: number
  status: "open" | "waiting_response" | "answered" | "closed" | "cancelled"
  closed_at: string | null
  last_message_at: string | null
  last_sender_id: number | null
  created_at: string
  updated_at: string
  patient: ConsultationUser
  doctor: ConsultationUser
  last_sender: ConsultationUser | null
  messages: ConsultationMessageWithSender[]
  attachments: ConsultationAttachment[]
  status_logs: ConsultationStatusLogWithChanger[]
  last_message: ConsultationMessageWithSender | null
}

export interface ConsultationsMeta {
  total: number
  per_page: number
  current_page: number
  last_page: number
}

export interface ConsultationsResponse {
  status: number
  message: string
  data: Consultation[]
  meta: ConsultationsMeta
}

export interface ShowConsultationResponse {
  status: number
  message: string
  data: DetailedConsultation
}

export interface UnreadMessagesCount {
  unread_count: number
}

export interface UnreadMessagesCountResponse {
  status: number
  message: string
  data: UnreadMessagesCount
}

export interface LastMessageResponse {
  status: number
  message: string
  data: ConsultationMessageWithSender
}

// Create consultation types
export interface CreateConsultationData {
  patient_id: number
  doctor_id: number
  status?: "open" | "waiting_response" | "answered" | "closed" | "cancelled"
}

export interface CreateConsultationResponse {
  status: number
  message: string
  data: DetailedConsultation
}

// Update consultation types
export interface UpdateConsultationData {
  patient_id?: number
  doctor_id?: number
  status?: "open" | "waiting_response" | "answered" | "closed" | "cancelled"
}

export interface UpdateConsultationResponse {
  status: number
  message: string
  data: DetailedConsultation
}

// Update consultation status types
export interface UpdateConsultationStatusData {
  status: "open" | "waiting_response" | "answered" | "closed" | "cancelled"
  note?: string
}

export interface UpdateConsultationStatusResponse {
  status: number
  message: string
  data: DetailedConsultation
}

// Delete consultation types
export interface DeleteConsultationResponse {
  status: number
  message: string
  data: null
}

// Typing event types
export interface TypingEventResponse {
  status: number
  message: string
  data: null
}

export interface GetConsultationsParams {
  status?: "open" | "waiting_response" | "answered" | "closed" | "cancelled"
  patient_id?: number
  doctor_id?: number
  per_page?: number
  search?: string
  page?: number
  from_date?: string
  to_date?: string
}