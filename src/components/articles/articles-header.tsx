"use client"
import { Input } from "@/components/ui/input"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import { LayoutGrid, List, Search, FileText, RotateCcw } from "lucide-react"
import { ArticlesFilterDropdown } from "./articles-filter-dropdown"
import { ArticlesCustomizer } from "./articles-customizer"
import type { ArticlesSectionVisibility } from "./articles-customizer"
import type { Article } from "@/data/articles"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import { useState, useEffect } from "react"

interface ArticlesHeaderProps {
  viewMode: "grid" | "table"
  onToggleView: (mode: "grid" | "table") => void
  onFilterChange: (filters: { category_id?: number; is_published?: boolean; search?: string }) => void
  currentFilters: { category_id?: number; is_published?: boolean; search?: string }
  visibility: ArticlesSectionVisibility
  onVisibilityChange: (visibility: ArticlesSectionVisibility) => void
  onAddNewArticle: () => void
}

export function ArticlesHeader({
  viewMode,
  onToggleView,
  onFilterChange,
  currentFilters,
  visibility,
  onVisibilityChange,
  onAddNewArticle
}: ArticlesHeaderProps) {
  const [searchTerm, setSearchTerm] = useState(currentFilters.search || "")
  
  // تأخير البحث لتحسين الأداء
  useEffect(() => {
    const timer = setTimeout(() => {
      onFilterChange({ ...currentFilters, search: searchTerm || undefined })
    }, 500) // تأخير 500 مللي ثانية

    return () => clearTimeout(timer)
  }, [searchTerm, onFilterChange])

  const handleResetAllFilters = () => {
    setSearchTerm("")
    onFilterChange({}) // إعادة تعيين جميع الفلاتر
  }

  const today = new Date()
  const arabicDate = new Intl.DateTimeFormat("ar-SA", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(today)

  return (
    <div className="w-full">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
        <div className="flex items-center gap-3 min-w-0 flex-1">
          <div className="rounded-lg bg-gradient-to-br from-violet-500 to-purple-600 p-2 text-white shadow-lg flex-shrink-0">
            <FileText className="h-6 w-6" />
          </div>
          <div className="min-w-0 flex-1">
            <h1 className="text-xl sm:text-2xl md:text-3xl font-bold truncate">المقالات الطبية</h1>
            <p className="text-sm text-muted-foreground truncate">{arabicDate}</p>
          </div>
        </div>

        <div className="flex items-center gap-2 flex-shrink-0">
          <div className="relative w-full max-w-xs">
            <Input
              type="search"
              placeholder="بحث عن مقال..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pr-8 w-full rounded-full bg-muted/50 focus-visible:ring-violet-500 text-sm"
            />
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            {searchTerm && (
              <Button
                variant="ghost"
                size="sm"
                onClick={handleResetAllFilters}
                className="absolute left-8 top-1/2 transform -translate-y-1/2 h-6 w-6 p-0 text-gray-400 hover:text-gray-600"
              >
                <RotateCcw className="h-3 w-3" />
              </Button>
            )}
          </div>

          <Button
            className="gap-2 bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700"
            onClick={onAddNewArticle}
          >
            <Plus className="h-4 w-4"/>
            إضافة مقال جديد
          </Button>

          <ArticlesCustomizer visibility={visibility} onVisibilityChange={onVisibilityChange} />

          <ToggleGroup type="single" value={viewMode} onValueChange={onToggleView} className="hidden sm:flex">
            <ToggleGroupItem value="grid" aria-label="عرض الشبكة">
              <LayoutGrid className="h-4 w-4" />
            </ToggleGroupItem>
            <ToggleGroupItem value="table" aria-label="عرض الجدول">
              <List className="h-4 w-4" />
            </ToggleGroupItem>
          </ToggleGroup>

          <ArticlesFilterDropdown onFilterChange={onFilterChange} currentFilters={currentFilters} />
        </div>
      </div>
    </div>
  )
}
