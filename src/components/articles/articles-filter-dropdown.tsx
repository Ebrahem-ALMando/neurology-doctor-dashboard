"use client"

import { useState } from "react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { Filter, Loader2, RotateCcw } from "lucide-react"
import { articleStatuses } from "@/data/articles"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { useAllArticleCategories } from "@/hooks/useArticleCategories"

interface ArticlesFilterDropdownProps {
  onFilterChange: (filters: { category_id?: number; is_published?: boolean; search?: string }) => void
  currentFilters: { category_id?: number; is_published?: boolean; search?: string }
}

export function ArticlesFilterDropdown({ onFilterChange, currentFilters }: ArticlesFilterDropdownProps) {
  const { categories, isLoading: categoriesLoading } = useAllArticleCategories()
  
  // العثور على التصنيف المحدد
  const selectedCategory = (categories as any[]).find((cat: any) => cat.id === currentFilters.category_id)
  const [categoryFilter, setCategoryFilter] = useState(selectedCategory?.name || "الكل")
  const [statusFilter, setStatusFilter] = useState(
    currentFilters.is_published === true ? "published" : 
    currentFilters.is_published === false ? "draft" : "الكل"
  )

  const handleCategoryChange = (value: string) => {
    setCategoryFilter(value)
    if (value === "الكل") {
      onFilterChange({ ...currentFilters, category_id: undefined })
    } else {
      const category = (categories as any[]).find((cat: any) => cat.name === value)
      onFilterChange({ ...currentFilters, category_id: category?.id })
    }
  }

  const handleStatusChange = (value: string) => {
    setStatusFilter(value)
    if (value === "الكل") {
      onFilterChange({ ...currentFilters, is_published: undefined })
    } else if (value === "published") {
      onFilterChange({ ...currentFilters, is_published: true })
    } else if (value === "draft") {
      onFilterChange({ ...currentFilters, is_published: false })
    }
  }

  const handleResetFilters = () => {
    setCategoryFilter("الكل")
    setStatusFilter("الكل")
    onFilterChange({ search: currentFilters.search }) // نحتفظ بالبحث فقط
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
          <div className="flex items-center space-x-2 space-x-reverse  gap-2">
            <RadioGroupItem value="الكل" id="category-all" />
            <Label htmlFor="category-all">الكل</Label>
          </div>
          {categoriesLoading ? (
            <div className="flex items-center space-x-2 space-x-reverse">
              <Loader2 className="h-4 w-4 animate-spin" />
              <Label>جاري التحميل...</Label>
            </div>
          ) : (
            (categories as any[]).map((category: any) => (
              <div key={category.id} className="flex items-center space-x-2 space-x-reverse gap-2">
                <RadioGroupItem value={category.name} id={`category-${category.id}`} />
                <Label htmlFor={`category-${category.id}`}>{category.name}</Label>
              </div>
            ))
          )}
        </RadioGroup>

        <Separator className="my-4" />

        <h3 className="font-semibold text-sm mb-3">الحالة</h3>
        <RadioGroup onValueChange={handleStatusChange} value={statusFilter} className="space-y-2">
          <div className="flex items-center space-x-2 space-x-reverse  gap-2">
            <RadioGroupItem value="الكل" id="status-all" />
            <Label htmlFor="status-all">الكل</Label>
          </div>
          {articleStatuses.map((status) => (
            <div key={status} className="flex items-center space-x-2 space-x-reverse  gap-2">
              <RadioGroupItem value={status} id={`status-${status}`} />
              <Label htmlFor={`status-${status}`}>{getStatusLabel(status)}</Label>
            </div>
          ))}
        </RadioGroup>

        <Separator className="my-4" />

        {/* زر إعادة تعيين الفلاتر */}
        <Button
          variant="outline"
          size="sm"
          onClick={handleResetFilters}
          className="w-full gap-2 text-rose-600 hover:text-rose-700 hover:bg-rose-50 dark:hover:bg-rose-900/20"
        >
          <RotateCcw className="h-4 w-4" />
          إعادة تعيين الفلاتر
        </Button>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
