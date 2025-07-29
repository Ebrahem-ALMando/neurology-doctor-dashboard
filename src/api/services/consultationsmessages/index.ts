// Export all consultation messages services
export { getConsultationMessages } from "./getConsultationMessages"
export { addConsultationMessage } from "./addConsultationMessage"
export { updateConsultationMessage } from "./updateConsultationMessage"
export { readByPatient } from "./readByPatient"
export { readByDoctor } from "./readByDoctor"
export { deleteConsultationMessage } from "./deleteConsultationMessage"

// Export types
export type {
  ConsultationMessage,
  ConsultationMessageAttachment,
  ConsultationMessageSender,
  ConsultationMessagesMeta,
  ConsultationMessagesResponse,
  GetConsultationMessagesParams,
  CreateConsultationMessageData,
  CreateConsultationMessageResponse,
  UpdateConsultationMessageData,
  UpdateConsultationMessageResponse,
  ReadStatusResponse,
  DeleteConsultationMessageResponse,
} from "./types" 