"use client"

import { useState } from "react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { Filter } from "lucide-react"
import { articleCategories, articleStatuses } from "@/data/articles"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"

interface ArticlesFilterDropdownProps {
  onFilterChange: (filters: { category?: string; status?: string }) => void
  currentFilters: { category?: string; status?: string }
}

export function ArticlesFilterDropdown({ onFilterChange, currentFilters }: ArticlesFilterDropdownProps) {
  const [categoryFilter, setCategoryFilter] = useState(currentFilters.category || "الكل")
  const [statusFilter, setStatusFilter] = useState(currentFilters.status || "الكل")

  const handleCategoryChange = (value: string) => {
    setCategoryFilter(value)
    onFilterChange({ ...currentFilters, category: value === "الكل" ? undefined : value })
  }

  const handleStatusChange = (value: string) => {
    setStatusFilter(value)
    onFilterChange({ ...currentFilters, status: value === "الكل" ? undefined : value })
  }

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "published":
        return "منشور"
      case "draft":
        return "مسودة"
      case "featured":
        return "مميز"
      default:
        return status
    }
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" className="gap-2 bg-transparent">
          <Filter className="h-4 w-4" />
          تصفية
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-64 p-4">
        <h3 className="font-semibold text-sm mb-3">التصنيف</h3>
        <RadioGroup onValueChange={handleCategoryChange} value={categoryFilter} className="space-y-2">
          <div className="flex items-center space-x-2 space-x-reverse">
            <RadioGroupItem value="الكل" id="category-all" />
            <Label htmlFor="category-all">الكل</Label>
          </div>
          {articleCategories.map((category) => (
            <div key={category} className="flex items-center space-x-2 space-x-reverse">
              <RadioGroupItem value={category} id={`category-${category}`} />
              <Label htmlFor={`category-${category}`}>{category}</Label>
            </div>
          ))}
        </RadioGroup>

        <Separator className="my-4" />

        <h3 className="font-semibold text-sm mb-3">الحالة</h3>
        <RadioGroup onValueChange={handleStatusChange} value={statusFilter} className="space-y-2">
          <div className="flex items-center space-x-2 space-x-reverse">
            <RadioGroupItem value="الكل" id="status-all" />
            <Label htmlFor="status-all">الكل</Label>
          </div>
          {articleStatuses.map((status) => (
            <div key={status} className="flex items-center space-x-2 space-x-reverse">
              <RadioGroupItem value={status} id={`status-${status}`} />
              <Label htmlFor={`status-${status}`}>{getStatusLabel(status)}</Label>
            </div>
          ))}
        </RadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
