// Common types for consultation messages API
export interface ConsultationMessageAttachment {
  original_name: string
  file_name: string
  file_type: string
  file_path: string
  file_url: string
}

export interface ConsultationMessageSender {
  id: number
  name: string
  role: string
  avatar_url: string | null
}

export interface ConsultationMessage {
  id: number
  consultation_id: number
  sender_id: number
  sender_type: "patient" | "doctor" | "admin"
  subject: string | null
  message: string
  read_by_patient: boolean
  read_by_doctor: boolean
  deleted_at: string | null
  created_at: string
  sender: ConsultationMessageSender
  attachments: ConsultationMessageAttachment[]
}

export interface ConsultationMessagesMeta {
  total: number
  per_page: number
  current_page: number
  last_page: number
}

export interface ConsultationMessagesResponse {
  data: ConsultationMessage[]
  meta: ConsultationMessagesMeta
}



// Get consultation messages params
export interface GetConsultationMessagesParams {
  sender_id?: number
  sender_type?:"patient" | "doctor" | "admin"
  search?: string
  per_page?: number
  page?: number
}

// Create consultation message types
export interface CreateConsultationMessageData {
  sender_id: number
  sender_type: "patient" | "doctor" | "admin"
  subject?: string
  message: string
  attachments?: {
    file_name: string
    original_name: string
    file_path: string
    file_type: string
  }[]
}

export interface CreateConsultationMessageResponse {
  status: number
  message: string
  data: ConsultationMessage
}

// Update consultation message types
export interface UpdateConsultationMessageData {
  subject?: string
  message?: string
  // attachments?: {
  //   file_name: string
  //   original_name: string
  //   file_path: string
  //   file_type: string
  // }[]
}

export interface UpdateConsultationMessageResponse {
  status: number
  message: string
  data: ConsultationMessage
}

// Read status types
export interface ReadStatusResponse {
  status: number
  message: string
  data: ConsultationMessage
}

// Delete consultation message types
export interface DeleteConsultationMessageResponse {
  status: number
  message: string
  data: null
} 