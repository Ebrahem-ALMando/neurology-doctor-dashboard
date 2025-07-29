// Common types for consultation attachments API
export interface ConsultationAttachment {
  original_name: string
  file_name: string
  file_type: string
  file_path: string
  file_url: string
}

export interface ConsultationAttachmentsMeta {
  total: number
  per_page: number
  current_page: number
  last_page: number
}

export interface ConsultationAttachmentsResponse {
  status: number
  message: string
  data: ConsultationAttachment[]
  meta: ConsultationAttachmentsMeta
}

export interface ShowConsultationAttachmentResponse {
  status: number
  message: string
  data: ConsultationAttachment
}

export interface DeleteConsultationAttachmentResponse {
  status: number
  message: string
  data: null
}

// Get consultation attachments params
export interface GetConsultationAttachmentsParams {
  consultation_id?: number
  consultation_message_id?: number
  file_type?: string
  search?: string
  per_page?: number
  page?: number
} 