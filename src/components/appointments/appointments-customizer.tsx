"use client"

import { useState } from "react"
import { Settings } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"

interface AppointmentsSectionVisibility {
  summaryCards: boolean
  calendar: boolean
  chart: boolean
  table: boolean
}

interface AppointmentsCustomizerProps {
  visibility: AppointmentsSectionVisibility
  onVisibilityChange: (visibility: AppointmentsSectionVisibility) => void
}

export function AppointmentsCustomizer({ visibility, onVisibilityChange }: AppointmentsCustomizerProps) {
  const [localVisibility, setLocalVisibility] = useState<AppointmentsSectionVisibility>(visibility)

  const handleChange = (key: keyof AppointmentsSectionVisibility) => {
    const newVisibility = {
      ...localVisibility,
      [key]: !localVisibility[key],
    }
    setLocalVisibility(newVisibility)
  }

  const handleSave = () => {
    onVisibilityChange(localVisibility)
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="gap-2">
          <Settings className="h-4 w-4" />
          تخصيص الصفحة
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>تخصيص صفحة المواعيد</DialogTitle>
          <DialogDescription>قم بتخصيص العناصر التي تريد عرضها في صفحة المواعيد</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="flex items-center space-x-2 space-x-reverse">
            <Checkbox
              id="summaryCards"
              checked={localVisibility.summaryCards}
              onCheckedChange={() => handleChange("summaryCards")}
            />
            <Label htmlFor="summaryCards">بطاقات الملخص</Label>
          </div>
          <div className="flex items-center space-x-2 space-x-reverse">
            <Checkbox
              id="calendar"
              checked={localVisibility.calendar}
              onCheckedChange={() => handleChange("calendar")}
            />
            <Label htmlFor="calendar">التقويم</Label>
          </div>
          <div className="flex items-center space-x-2 space-x-reverse">
            <Checkbox id="chart" checked={localVisibility.chart} onCheckedChange={() => handleChange("chart")} />
            <Label htmlFor="chart">رسم بياني للتوزيع</Label>
          </div>
          <div className="flex items-center space-x-2 space-x-reverse">
            <Checkbox id="table" checked={localVisibility.table} onCheckedChange={() => handleChange("table")} />
            <Label htmlFor="table">جدول المواعيد</Label>
          </div>
        </div>
        <DialogFooter>
          <Button type="submit" onClick={handleSave}>
            حفظ التغييرات
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
