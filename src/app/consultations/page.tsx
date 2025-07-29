"use client"

import { useState } from "react"
import { Header } from "@/components/header"
import { Sidebar } from "@/components/sidebar"
import { ConsultationsHeader } from "@/components/consultations/consultations-header"
import { ConsultationsSummary } from "@/components/consultations/consultations-summary"
import { ConsultationsFilterBar } from "@/components/consultations/consultations-filter-bar"
import { ConsultationsTableView } from "@/components/consultations/consultations-table-view"
import { ConsultationsPagination } from "@/components/consultations/consultations-pagination"
import { ConsultationsLoadingSkeleton } from "@/components/consultations/consultations-loading-skeleton"
import { ConsultationsCustomizer, type ConsultationsSectionVisibility } from "@/components/consultations/consultations-customizer"
import { AddConsultationModal } from "@/components/consultations/add-consultation-modal"
import { useToast } from "@/components/ui/use-toast"
import { useConsultations } from "@/hooks/useConsultations"
import { Table, TableBody, TableHead, TableHeader, TableRow } from "@/components/ui/table"

export default function ConsultationsPage() {
  const { toast } = useToast()
  const {
    consultations,
    stats,
    isLoading,
    error,
    filters,
    setFilters,
    pagination,
    mutate,
  } = useConsultations()
  
  const [visibility, setVisibility] = useState<ConsultationsSectionVisibility>({
    summaryCards: true,
    consultationsList: true,
  })
  const [modalOpen, setModalOpen] = useState(false)

  // فلترة الرسائل غير المقروءة (يتم تطبيقها على النتائج بعد جلبها)
  const unreadMessages = (filters as any).unreadMessages as string | undefined
  const filteredConsultations = consultations?.filter((consultation) => {
    if (unreadMessages === "has_unread") {
      return consultation.messages.some((msg) => !msg.read_by_doctor)
    }
    if (unreadMessages === "no_unread") {
      return consultation.messages.length === 0 || consultation.messages.every((msg) => msg.read_by_doctor)
    }
    return true
  })

  const handleAddNewConsultation = () => {
    setModalOpen(true)
  }

  const handleViewDetails = (consultation: any) => {
    toast({
      title: "عرض التفاصيل",
      description: `عرض تفاصيل الاستشارة: ${consultation.id}`,
      variant: "default",
    })
  }

  const handleMarkAsDone = (id: string) => {
    toast({
      title: "نجاح",
      description: "تم وضع علامة 'مكتملة' على الاستشارة بنجاح.",
      variant: "default",
    })
    mutate()
  }

  const handleDelete = (id: string) => {
    toast({
      title: "نجاح",
      description: "تم حذف الاستشارة بنجاح.",
      variant: "default",
    })
    mutate()
  }

  return (
    <div className="w-full">
      <div className="flex min-h-screen flex-col w-full">
        <Header />
        <div className="flex flex-1 w-full overflow-x-hidden">
          {/* Desktop Sidebar */}
          <div className="hidden md:block w-64 flex-shrink-0">
            <Sidebar className="h-full border-l" />
          </div>
          {/* Main Content */}
          <main className="flex-1 min-w-0 p-4 md:p-6">
            <div className="w-full max-w-none space-y-6 animate-in fade-in-50 duration-700">
              <ConsultationsHeader onAddNew={handleAddNewConsultation}>
                <ConsultationsCustomizer visibility={visibility} onVisibilityChange={setVisibility} />
              </ConsultationsHeader>

              {visibility.summaryCards && <ConsultationsSummary stats={stats} />}

              {visibility.consultationsList && (
                <>
                  <ConsultationsFilterBar
                    filters={filters}
                    onFiltersChange={setFilters}
                  />

                  {isLoading ? (
                    <div className="rounded-lg border bg-white dark:bg-muted/40">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead className="w-[60px] text-center">#</TableHead>
                            <TableHead className="w-[180px]">المريض</TableHead>
                            <TableHead>الموضوع</TableHead>
                            <TableHead className="w-[140px]">التاريخ</TableHead>
                            <TableHead className="w-[110px]">الحالة</TableHead>
                            <TableHead className="w-[160px] text-center">الإجراءات</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          <ConsultationsLoadingSkeleton rows={5} />
                        </TableBody>
                      </Table>
                    </div>
                  ) : (
                    <>
                      <ConsultationsTableView
                        consultations={filteredConsultations}
                        loading={isLoading}
                        onViewDetails={handleViewDetails}
                        onMarkAsDone={handleMarkAsDone}
                        onDelete={handleDelete}
                      />
                      <ConsultationsPagination
                        currentPage={pagination.currentPage}
                        totalPages={pagination.totalPages}
                        onPageChange={() => mutate()}
                        totalItems={pagination.totalItems}
                        itemsPerPage={pagination.itemsPerPage}
                      />
                    </>
                  )}
                </>
              )}
            </div>
          </main>
        </div>
      </div>

      <AddConsultationModal>
        <div style={{ display: 'none' }} />
      </AddConsultationModal>
    </div>
  )
}
