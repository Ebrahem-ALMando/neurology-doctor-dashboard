"use client"

import { useState, useEffect } from "react"
import useSWR from "swr"
import { deleteConsultation, getConsultations } from "@/api/services/consultations"
import type { Consultation, GetConsultationsParams } from "@/api/services/consultations"
import type { DateRange } from "react-day-picker"
import { useCustomToastWithIcons } from "./use-custom-toast-with-icons"



  
export interface ConsultationStats {
  totalConsultations: number
  openConsultations: number
  waitingConsultations: number
  closedConsultations: number
  answeredConsultations: number
  cancelledConsultations: number
  uniquePatients: number
  uniqueDoctors: number
  todayConsultations: number
}

export interface ConsultationsFilters {
  status: string
  patient_id: string
  dateRange: DateRange
  search: string
}

export interface UseConsultationsReturn {
  consultations: Consultation[]
  stats: ConsultationStats
  isLoading: boolean
  error: any
  filters: ConsultationsFilters
  setFilters: (filters: ConsultationsFilters) => void
  pagination: {
    currentPage: number
    totalPages: number
    totalItems: number
    itemsPerPage: number
  }
  mutate: () => void
  handleDelete: (id: number,onSuccess:()=>void ,onError:()=>void ) => void 
  eventIsLoading: boolean
}

const initialFilters: ConsultationsFilters = {
  status: "",
  patient_id: "",
  dateRange: { from: undefined, to: undefined },
  search: "",
}

export function useConsultations(): UseConsultationsReturn {
  const [eventIsLoading, setEventIsLoading] = useState(false)
  const [filters, setFilters] = useState<ConsultationsFilters>(initialFilters)
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    totalItems: 0,
    itemsPerPage: 20,
  })

  // تحويل الفلاتر إلى معايير API
  const params: GetConsultationsParams = {
    page: pagination.currentPage,
    per_page: pagination.itemsPerPage,
  }
  if (filters.status) params.status = filters.status as any
  if (filters.patient_id) params.patient_id = parseInt(filters.patient_id)
  if (filters.search) params.search = filters.search
  if (filters.dateRange?.from) params.from_date = filters.dateRange.from.toISOString().split("T")[0]
  if (filters.dateRange?.to) params.to_date = filters.dateRange.to.toISOString().split("T")[0]

  // fetcher يعيد APIResponse<Consultation[]>
  const fetcher = () => getConsultations(params)

  const {
    data,
    error: swrError,
    isLoading,
    mutate,
  } = useSWR(["consultations", params], fetcher, {
    revalidateOnFocus: false,
  })

  // إحصائيات
  let stats: ConsultationStats = {
    totalConsultations: 0,
    openConsultations: 0,
    waitingConsultations: 0,
    closedConsultations: 0,
    answeredConsultations: 0,
    cancelledConsultations: 0,
    uniquePatients: 0,
    uniqueDoctors: 0,
    todayConsultations: 0,
  }

  // تحديث الإحصائيات والتصفح في useEffect لتجنب re-render لا نهائي
  useEffect(() => {
    if (!swrError && !isLoading && !data?.error && data?.data) {
      const consultationsData = data.data
      const today = new Date()
      today.setHours(0, 0, 0, 0)
      stats = {
        totalConsultations: consultationsData.length,
        openConsultations: consultationsData.filter(c => c.status === "open").length,
        waitingConsultations: consultationsData.filter(c => c.status === "waiting_response").length,
        closedConsultations: consultationsData.filter(c => c.status === "closed").length,
        answeredConsultations: consultationsData.filter(c => c.status === "answered").length,
        cancelledConsultations: consultationsData.filter(c => c.status === "cancelled").length,
        uniquePatients: new Set(consultationsData.map(c => c.patient_id)).size,
        uniqueDoctors: new Set(consultationsData.map(c => c.doctor_id)).size,
        todayConsultations: consultationsData.filter(c => {
          const consultationDate = new Date(c.created_at)
          consultationDate.setHours(0, 0, 0, 0)
          return consultationDate.getTime() === today.getTime()
        }).length,
      }
      // تحديث بيانات التصفح من meta إذا وجدت
      if (data?.meta) {
        const meta = data.meta as { current_page?: number; last_page?: number; total?: number; per_page?: number }
        setPagination(prev => ({
          ...prev,
          currentPage: meta.current_page || 1,
          totalPages: meta.last_page || 1,
          totalItems: meta.total || consultationsData.length,
          itemsPerPage: meta.per_page || prev.itemsPerPage,
        }))
      }
    }
  }, [data, swrError, isLoading])

  // حساب الإحصائيات للعودة
  if (!swrError && !isLoading && !data?.error && data?.data) {
    const consultationsData = data.data
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    stats = {
      totalConsultations: consultationsData.length,
      openConsultations: consultationsData.filter(c => c.status === "open").length,
      waitingConsultations: consultationsData.filter(c => c.status === "waiting_response").length,
      closedConsultations: consultationsData.filter(c => c.status === "closed").length,
      answeredConsultations: consultationsData.filter(c => c.status === "answered").length,
      cancelledConsultations: consultationsData.filter(c => c.status === "cancelled").length,
      uniquePatients: new Set(consultationsData.map(c => c.patient_id)).size,
      uniqueDoctors: new Set(consultationsData.map(c => c.doctor_id)).size,
      todayConsultations: consultationsData.filter(c => {
        const consultationDate = new Date(c.created_at)
        consultationDate.setHours(0, 0, 0, 0)
        return consultationDate.getTime() === today.getTime()
      }).length,
    }
  }

  const handleDelete = async (id: number,onSuccess:()=>void ,onError:()=>void ) => {
    setEventIsLoading(true)
    const response = await deleteConsultation(id)
    if (response.data && !response.error) {
      onSuccess() 
      mutate()
    }
    else{
      onError()
    }
    setEventIsLoading(false)
  }
    
  return {
    consultations: data?.data || [],
    stats,
    isLoading,
    error: swrError || data?.error,
    filters,
    setFilters,
    pagination,
    mutate: () => mutate(),
    handleDelete, 
    eventIsLoading
  }
} 