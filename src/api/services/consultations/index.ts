// Export all consultation services
export { getConsultations } from "./getConsultations"
export { showConsultation } from "./showConsultations"
export { getMessagesUnreadCount } from "./getMessagesUnreadCount"
export { getMessagesLast } from "./getMessagesLast"
export { addConsultation } from "./addConsultation"
export { sendTypingEvent } from "./consultationsTyping"
export { updateConsultation } from "./updateConsultation"
export { updateConsultationStatus } from "./updateConsultationStatus"
export { deleteConsultation } from "./deleteConsultation"

// Export types
export type {
  Consultation,
  DetailedConsultation,
  ConsultationMessage,
  ConsultationMessageWithSender,
  ConsultationAttachment,
  ConsultationStatusLog,
  ConsultationStatusLogWithChanger,
  ConsultationUser,
  ConsultationsMeta,
  ConsultationsResponse,
  ShowConsultationResponse,
  UnreadMessagesCount,
  UnreadMessagesCountResponse,
  LastMessageResponse,
  CreateConsultationData,
  CreateConsultationResponse,
  UpdateConsultationData,
  UpdateConsultationResponse,
  UpdateConsultationStatusData,
  UpdateConsultationStatusResponse,
  DeleteConsultationResponse,
  TypingEventResponse,
  GetConsultationsParams,
} from "./types" 