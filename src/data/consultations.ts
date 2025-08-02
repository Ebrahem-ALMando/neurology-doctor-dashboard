export interface ConsultationStats {
  totalPatients: number
  totalPatientsTrend: number
  activePatients: number
  activePatientsTrend: number
  todayConsultations: number
  todayConsultationsTrend: number
  pendingConsultations: number
  pendingConsultationsTrend: number
}

export interface Doctor {
  id: string
  name: string
  specialization: string
  avatar?: string
}

export interface Patient {
  id: string
  name: string
  phone: string
  email?: string
}

export type ConsultationStatus = "open" | "waiting_response" | "answered" | "closed" | "cancelled"

export interface Consultation {
  id: string
  doctor: Doctor
  patient: Patient
  type: "text" | "audio" | "follow-up"
  topic: string
  code: string
  status: ConsultationStatus
  date: string
  audioUrl?: string
}

export const dummyDoctors: Doctor[] = [
  {
    id: "1",
    name: "د. أحمد محمد",
    specialization: "أخصائي أمراض القلب",
    avatar: "/placeholder.svg",
  },
  {
    id: "2",
    name: "د. فاطمة علي",
    specialization: "أخصائية طب الأطفال",
    avatar: "/placeholder.svg",
  },
  {
    id: "3",
    name: "د. محمد حسن",
    specialization: "أخصائي الجراحة العامة",
    avatar: "/placeholder.svg",
  },
]

export const consultationTypes = [
  { value: "text", label: "نصية" },
  { value: "audio", label: "صوتية" },
  { value: "follow-up", label: "متابعة" },
]

export const consultationStatuses = [
  { value: "new", label: "جديدة" },
  { value: "in-progress", label: "قيد المعالجة" },
  { value: "completed", label: "مكتملة" },
  { value: "rejected", label: "مرفوضة" },
]

export const dummyConsultations: Consultation[] = [
  {
    id: "1",
    doctor: dummyDoctors[0],
    patient: { id: "1", name: "أحمد محمد", phone: "0501234567" },
    type: "text",
    topic: "استشارة حول آلام في الصدر",
    code: "CONS-001",
    status: "open",
    date: "2024-01-15T10:30:00Z",
  },
  {
    id: "2",
    doctor: dummyDoctors[1],
    patient: { id: "2", name: "فاطمة أحمد", phone: "0502345678" },
    type: "audio",
    topic: "متابعة حالة الطفل",
    code: "CONS-002",
    status: "waiting_response",
    date: "2024-01-14T14:20:00Z",
    audioUrl: "/audio/consultation-2.mp3",
  },
  {
    id: "3",
    doctor: dummyDoctors[2],
    patient: { id: "3", name: "محمد علي", phone: "0503456789" },
    type: "follow-up",
    topic: "متابعة بعد العملية",
    code: "CONS-003",
    status: "answered",
    date: "2024-01-13T09:15:00Z",
  },
]

export function getConsultationStats(): ConsultationStats {
  return {
    totalPatients: 156,
    totalPatientsTrend: 0.12,
    activePatients: 89,
    activePatientsTrend: -0.05,
    todayConsultations: 12,
    todayConsultationsTrend: 0.25,
    pendingConsultations: 8,
    pendingConsultationsTrend: 0.15,
  }
}

export function getFilteredConsultations(
  consultations: Consultation[],
  filters: {
    search: string
    type: string
    status: string
    doctor: string
    dateRange: { from?: Date; to?: Date }
  },
): Consultation[] {
  return consultations.filter((consultation) => {
    const matchesSearch =
      consultation.topic.toLowerCase().includes(filters.search.toLowerCase()) ||
      consultation.patient.name.toLowerCase().includes(filters.search.toLowerCase()) ||
      consultation.doctor.name.toLowerCase().includes(filters.search.toLowerCase()) ||
      consultation.code.toLowerCase().includes(filters.search.toLowerCase())

    const matchesType = filters.type === "all" || consultation.type === filters.type
    const matchesStatus = filters.status === "all" || consultation.status === filters.status
    const matchesDoctor = filters.doctor === "all" || consultation.doctor.id === filters.doctor

    const consultationDate = new Date(consultation.date)
    const matchesDateRange =
      (!filters.dateRange.from || consultationDate >= filters.dateRange.from) &&
      (!filters.dateRange.to || consultationDate <= filters.dateRange.to)

    return matchesSearch && matchesType && matchesStatus && matchesDoctor && matchesDateRange
  })
}
