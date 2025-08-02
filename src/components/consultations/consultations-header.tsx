"use client"

import { Plus, Settings, SlidersHorizontal, LayoutGrid, List, MessageCircleIcon ,MessageSquareText } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { getHijriToday } from "@/utils/General/formatDateRange"

import { ConsultationsCustomizer, type ConsultationsSectionVisibility } from "./consultations-customizer"
import { ReactNode } from "react"

interface ConsultationsHeaderProps {
  onAddNew: () => void
  children?: ReactNode
}

export function ConsultationsHeader({ onAddNew, children }: ConsultationsHeaderProps) {
  const hijriDate = getHijriToday()

  return (
    <header className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-purple-100 text-purple-600">
            <MessageSquareText className="h-6 w-6" />
          </div>
          <div>
            <h1 className="text-2xl font-bold">الاستشارات الطبية</h1>
            <p className="text-sm text-muted-foreground">{hijriDate}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {children}
          {/* <AddConsultationModal>
            <Button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700" onClick={onAddNew}>
              <Plus className="h-4 w-4" />
              إضافة استشارة جديدة
            </Button>
          </AddConsultationModal> */}
        </div>
      </div>
      <Separator />
    </header>
  )
}
