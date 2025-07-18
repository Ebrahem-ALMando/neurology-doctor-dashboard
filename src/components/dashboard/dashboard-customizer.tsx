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

interface WidgetVisibility {
  kpiCards: boolean
  recentActivities: boolean
  diagnosesChart: boolean
  attendanceChart: boolean
  diseasesChart: boolean
  appointmentsTable: boolean
}

interface DashboardCustomizerProps {
  visibility: WidgetVisibility
  onVisibilityChange: (visibility: WidgetVisibility) => void
}

export function DashboardCustomizer({ visibility, onVisibilityChange }: DashboardCustomizerProps) {
  const [localVisibility, setLocalVisibility] = useState<WidgetVisibility>(visibility)

  const handleChange = (key: keyof WidgetVisibility) => {
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
          تخصيص لوحة التحكم
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>تخصيص لوحة التحكم</DialogTitle>
          <DialogDescription>قم بتخصيص العناصر التي تريد عرضها في لوحة التحكم</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="flex items-center space-x-2 space-x-reverse">
            <Checkbox
              id="kpiCards"
              checked={localVisibility.kpiCards}
              onCheckedChange={() => handleChange("kpiCards")}
            />
            <Label htmlFor="kpiCards">بطاقات المؤشرات</Label>
          </div>
          <div className="flex items-center space-x-2 space-x-reverse">
            <Checkbox
              id="recentActivities"
              checked={localVisibility.recentActivities}
              onCheckedChange={() => handleChange("recentActivities")}
            />
            <Label htmlFor="recentActivities">النشاطات الأخيرة</Label>
          </div>
          <div className="flex items-center space-x-2 space-x-reverse">
            <Checkbox
              id="diagnosesChart"
              checked={localVisibility.diagnosesChart}
              onCheckedChange={() => handleChange("diagnosesChart")}
            />
            <Label htmlFor="diagnosesChart">رسم بياني للتشخيصات</Label>
          </div>
          <div className="flex items-center space-x-2 space-x-reverse">
            <Checkbox
              id="attendanceChart"
              checked={localVisibility.attendanceChart}
              onCheckedChange={() => handleChange("attendanceChart")}
            />
            <Label htmlFor="attendanceChart">رسم بياني للحضور</Label>
          </div>
          <div className="flex items-center space-x-2 space-x-reverse">
            <Checkbox
              id="diseasesChart"
              checked={localVisibility.diseasesChart}
              onCheckedChange={() => handleChange("diseasesChart")}
            />
            <Label htmlFor="diseasesChart">رسم بياني للأمراض</Label>
          </div>
          <div className="flex items-center space-x-2 space-x-reverse">
            <Checkbox
              id="appointmentsTable"
              checked={localVisibility.appointmentsTable}
              onCheckedChange={() => handleChange("appointmentsTable")}
            />
            <Label htmlFor="appointmentsTable">جدول المواعيد</Label>
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
