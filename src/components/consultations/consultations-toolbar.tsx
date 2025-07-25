"use client"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar } from "@/components/ui/calendar"
import { Plus, Filter, Calendar as CalendarIcon, SortAsc } from "lucide-react"
import { useState } from "react"

interface ConsultationsToolbarProps {
  filters: any
  onFilterChange: (filters: any) => void
  onAddNew: () => void
}

export function ConsultationsToolbar({ filters, onFilterChange, onAddNew }: ConsultationsToolbarProps) {
  const [search, setSearch] = useState("")
  const [type, setType] = useState("")
  const [status, setStatus] = useState("")
  const [date, setDate] = useState<Date | undefined>(undefined)
  const [sort, setSort] = useState("date")

  // تحديث الفلاتر عند التغيير
  const handleFilterChange = (key: string, value: any) => {
    const newFilters = { ...filters, [key]: value }
    onFilterChange(newFilters)
  }

  return (
    <div className="flex flex-col md:flex-row items-center gap-2 md:gap-4 mb-4">
      <Input
        type="search"
        placeholder="البحث عن استشارة..."
        value={search}
        onChange={e => { setSearch(e.target.value); handleFilterChange("search", e.target.value) }}
        className="w-full md:w-64 rounded-full bg-muted/50 focus-visible:ring-violet-500 text-sm"
      />
      <Button className="gap-2 bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700" onClick={onAddNew}>
        <Plus className="h-4 w-4" />
        إضافة استشارة جديدة
      </Button>
      <Select value={type} onValueChange={v => { setType(v); handleFilterChange("type", v) }}>
        <SelectTrigger className="w-32">
          <SelectValue placeholder="نوع الاستشارة" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="">جميع الأنواع</SelectItem>
          <SelectItem value="نصية">نصية</SelectItem>
          <SelectItem value="صوتية">صوتية</SelectItem>
        </SelectContent>
      </Select>
      <Select value={status} onValueChange={v => { setStatus(v); handleFilterChange("status", v) }}>
        <SelectTrigger className="w-32">
          <SelectValue placeholder="حالة الاستشارة" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="">جميع الحالات</SelectItem>
          <SelectItem value="جديدة">جديدة</SelectItem>
          <SelectItem value="قيد المراجعة">قيد المراجعة</SelectItem>
          <SelectItem value="محفوظة">محفوظة</SelectItem>
        </SelectContent>
      </Select>
      <div className="flex items-center gap-2">
        <CalendarIcon className="h-4 w-4 text-muted-foreground" />
        <Calendar mode="single" selected={date} onSelect={d => { setDate(d); handleFilterChange("date", d) }} className="rounded-md border" />
      </div>
      <Select value={sort} onValueChange={v => { setSort(v); handleFilterChange("sort", v) }}>
        <SelectTrigger className="w-28">
          <SelectValue placeholder="ترتيب حسب" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="date">التاريخ</SelectItem>
          <SelectItem value="status">الحالة</SelectItem>
        </SelectContent>
      </Select>
    </div>
  )
} 