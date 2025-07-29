"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { 
  Search, 
  Filter, 
  Calendar as CalendarIcon, 
  X, 
  ChevronDown, 
  ChevronUp,
  Users,
  Clock,
  MessageSquare,
  Eye
} from "lucide-react"
import { format } from "date-fns"
import { arSA } from "date-fns/locale"
import { cn } from "@/lib/utils"
import type { ConsultationsFilters } from "@/hooks/useConsultations"
import type { DateRange } from "react-day-picker"

interface ConsultationsFilterBarProps {
  filters: ConsultationsFilters
  onFiltersChange: (filters: ConsultationsFilters) => void
}

const statusOptions = [
  { value: "all", label: "جميع الحالات" },
  { value: "open", label: "مفتوحة" },
  { value: "waiting_response", label: "قيد الانتظار" },
  { value: "answered", label: "تم الرد" },
  { value: "closed", label: "مغلقة" },
  { value: "cancelled", label: "ملغاة" },
]

const unreadOptions = [
  { value: "all", label: "جميع الرسائل" },
  { value: "has_unread", label: "رسائل غير مقروءة" },
  { value: "no_unread", label: "رسائل مقروءة" },
]

// قائمة المرضى (يمكن جلبها من API)
const patientOptions = [
  { value: "1", label: "أحمد محمد علي" },
  { value: "2", label: "فاطمة أحمد حسن" },
  { value: "3", label: "محمد عبدالله سالم" },
  { value: "4", label: "عائشة محمود أحمد" },
  { value: "5", label: "علي حسن محمد" },
  { value: "6", label: "خديجة عبدالرحمن" },
  { value: "7", label: "عبدالله محمد علي" },
  { value: "8", label: "مريم أحمد حسن" },
]

export function ConsultationsFilterBar({ filters, onFiltersChange }: ConsultationsFilterBarProps) {
  const [isAdvancedOpen, setIsAdvancedOpen] = useState(false)
  const [localFilters, setLocalFilters] = useState<ConsultationsFilters>(filters)
  const [patientSearch, setPatientSearch] = useState("")

  const handleFilterChange = (key: keyof ConsultationsFilters, value: any) => {
    const newFilters = { ...localFilters, [key]: value }
    setLocalFilters(newFilters)
    onFiltersChange(newFilters)
  }

  const clearFilters = () => {
    const clearedFilters: ConsultationsFilters = {
      status: "",
      patient_id: "",
      dateRange: { from: undefined, to: undefined },
      search: "",
    }
    setLocalFilters(clearedFilters)
    onFiltersChange(clearedFilters)
  }

  // فلترة المرضى حسب البحث
  const filteredPatients = patientOptions.filter(patient =>
    patient.label.toLowerCase().includes(patientSearch.toLowerCase())
  )

  const hasActiveFilters = filters.status || filters.patient_id || filters.search || filters.dateRange.from || filters.dateRange.to

  return (
    <Card className="border-0 shadow-sm bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-gray-900">
      <CardContent className="p-4">
        <div className="space-y-4">
          {/* الفلاتر الأساسية */}
          <div className="flex flex-wrap items-center gap-3">
            {/* زر الفلاتر المتقدمة */}
            <div className="relative flex-1 min-w-[200px]">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="البحث في الاستشارات..."
                value={localFilters.search}
                onChange={(e) => handleFilterChange("search", e.target.value)}
                className="pl-10 pr-4 h-10 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              />
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsAdvancedOpen(!isAdvancedOpen)}
              className="h-10 px-4 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-200 flex items-center gap-2"
            >
              <Filter className="h-4 w-4" />
              فلاتر متقدمة
              {isAdvancedOpen ? (
                <ChevronUp className="h-4 w-4 transition-transform duration-200" />
              ) : (
                <ChevronDown className="h-4 w-4 transition-transform duration-200" />
              )}
            </Button>

            {/* زر مسح الفلاتر */}
            {hasActiveFilters && (
              <Button
                variant="ghost"
                size="sm"
                onClick={clearFilters}
                className="h-10 px-3 text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20 transition-all duration-200"
              >
                <X className="h-4 w-4 mr-1" />
                مسح الفلاتر
              </Button>
            )}
          </div>

          {/* الفلاتر المتقدمة مع أنيميشن */}
          <div
            className={cn(
              "overflow-hidden transition-all duration-300 ease-in-out",
              isAdvancedOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
            )}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 pt-8 pb-4 pr-4 border-t border-gray-200 dark:border-gray-700">
      
              {/* فلتر الحالة */}
              <div className="space-y-2">
                <Label className="text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  الحالة
                </Label>
                <Select value={localFilters.status || "all"} onValueChange={(value) => handleFilterChange("status", value === "all" ? "" : value)}>
                  <SelectTrigger className="w-full h-10 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700  transition-all duration-200">
                    <SelectValue placeholder="الحالة" />
                  </SelectTrigger>
                  <SelectContent>
                    {statusOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              {/* فلتر الرسائل غير المقروءة */}
              <div className="space-y-2">
                <Label className="text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center gap-2">
                  <MessageSquare className="h-4 w-4" />
                  الرسائل غير المقروءة
                </Label>
                <Select value={(localFilters as any).unreadMessages || "all"} onValueChange={(value) => handleFilterChange("unreadMessages" as any, value === "all" ? "" : value)}>
                  <SelectTrigger className="w-full h-10 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700  transition-all duration-200">
                    <SelectValue placeholder="الرسائل غير المقروءة" />
                  </SelectTrigger>
                  <SelectContent>
                    {unreadOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              {/* فلتر المريض */}
              <div className="space-y-2">
                <Label className="text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center gap-2">
                  <Users className="h-4 w-4" />
                  المريض
                </Label>
                <Select value={localFilters.patient_id || "all"} onValueChange={(value) => handleFilterChange("patient_id", value === "all" ? "" : value)}>
                  <SelectTrigger className="w-full h-10 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700  transition-all duration-200">
                    <SelectValue placeholder="اختر المريض" />
                  </SelectTrigger>
                  <SelectContent>
                    <div className="p-2">
                      <Input
                        placeholder="البحث في المرضى..."
                        value={patientSearch}
                        onChange={(e) => setPatientSearch(e.target.value)}
                        className="mb-2"
                      />
                    </div>
                    <SelectItem value="all">جميع المرضى</SelectItem>
                    {filteredPatients.map((patient) => (
                      <SelectItem key={patient.value} value={patient.value}>
                        {patient.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              {/* فلتر النطاق الزمني */}
              <div className="space-y-2">
                <Label className="text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center gap-2">
                  <CalendarIcon className="h-4 w-4" />
                  النطاق الزمني
                </Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal h-10 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-200",
                        !localFilters.dateRange.from && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {localFilters.dateRange.from ? (
                        localFilters.dateRange.to ? (
                          <>
                            {format(localFilters.dateRange.from, "LLL dd, y", { locale: arSA })} -{" "}
                            {format(localFilters.dateRange.to, "LLL dd, y", { locale: arSA })}
                          </>
                        ) : (
                          format(localFilters.dateRange.from, "LLL dd, y", { locale: arSA })
                        )
                      ) : (
                        <span>اختر التاريخ</span>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      initialFocus
                      mode="range"
                      defaultMonth={localFilters.dateRange.from}
                      selected={localFilters.dateRange}
                      onSelect={(range) => handleFilterChange("dateRange", range || { from: undefined, to: undefined })}
                      numberOfMonths={2}
                      locale={arSA}
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </div>
          </div>

          {/* عرض الفلاتر النشطة */}
          {hasActiveFilters && (
            <div className="flex flex-wrap items-center gap-2 pt-2">
              <span className="text-sm text-gray-600 dark:text-gray-400">الفلاتر النشطة:</span>
              {filters.status && (
                <Badge variant="secondary" className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                  الحالة: {statusOptions.find(s => s.value === filters.status)?.label || statusOptions.find(s => s.value === "all")?.label}
                </Badge>
              )}
              {filters.patient_id && (
                <Badge variant="secondary" className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                  المريض: {patientOptions.find(p => p.value === filters.patient_id)?.label || filters.patient_id}
                </Badge>
              )}
              {filters.search && (
                <Badge variant="secondary" className="bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200">
                  البحث: {filters.search}
                </Badge>
              )}
              {(filters.dateRange.from || filters.dateRange.to) && (
                <Badge variant="secondary" className="bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200">
                  التاريخ: {filters.dateRange.from && format(filters.dateRange.from, "dd/MM/yyyy")}
                  {filters.dateRange.to && ` - ${format(filters.dateRange.to, "dd/MM/yyyy")}`}
                </Badge>
              )}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
