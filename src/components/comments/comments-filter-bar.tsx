"use client"

import * as React from "react"
import { Search, ChevronDown, CalendarIcon, X } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import { cn } from "@/lib/utils"
import { arSA } from "date-fns/locale"
import type { DateRange } from "react-day-picker"
import { formatDateRange } from "@/utils/General/formatDateRange"
import { useArticles } from "@/hooks/useArticles"
import { useUsers } from "@/hooks/useUsers"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"

interface CommentsFilterBarProps {
  searchQuery: string
  onSearchChange: (query: string) => void
  selectedArticle: string
  onArticleChange: (articleId: string) => void
  selectedCommenter: string
  onCommenterChange: (commenterId: string) => void
  selectedStatus: string
  onStatusChange: (status: string) => void
  dateRange: DateRange | undefined
  onDateRangeChange: (range: DateRange | undefined) => void
}

export function CommentsFilterBar({
  searchQuery,
  onSearchChange,
  selectedArticle,
  onArticleChange,
  selectedCommenter,
  onCommenterChange,
  selectedStatus,
  onStatusChange,
  dateRange,
  onDateRangeChange,
}: CommentsFilterBarProps) {
  const [showAdvancedSearch, setShowAdvancedSearch] = React.useState(false)
  const [articleSearch, setArticleSearch] = React.useState("")
  const [userSearch, setUserSearch] = React.useState("")


  const { articleWithComments, isLoadingArticleWithComments } = useArticles()


  const { usersWithComments, isLoadingUsersWithComments: isLoadingUsers } = useUsers()

  const statusOptions = [
    { value: "All", label: "جميع الحالات" },
    { value: "main", label: "تعليقات رئيسية" },
    { value: "reply", label: "ردود" },
  ]

  const articlesList: any[] = Array.isArray(articleWithComments)
    ? (articleWithComments as any[])
    : ((articleWithComments as any)?.data ?? [])

  const usersList: any[] = Array.isArray(usersWithComments)
    ? (usersWithComments as any[])
    : ((usersWithComments as any)?.data ?? [])

  const filteredArticles = articlesList.filter((article: any) =>
    String(article?.title || "").toLowerCase().includes(articleSearch.toLowerCase())
  )

  const filteredUsers = usersList.filter((user: any) =>
    String(user?.name || "").toLowerCase().includes(userSearch.toLowerCase())
  )

  const clearFilters = () => {
    onSearchChange("")
    onArticleChange("All")
    onCommenterChange("All")
    onStatusChange("All")
    onDateRangeChange?.(undefined)
  }

  const hasActiveFilters =
    Boolean(searchQuery) ||
    (selectedArticle && selectedArticle !== "All") ||
    (selectedCommenter && selectedCommenter !== "All") ||
    (selectedStatus && selectedStatus !== "All") ||
    Boolean(dateRange?.from) ||
    Boolean(dateRange?.to)

  const selectedArticleLabel = () => {
    if (!selectedArticle || selectedArticle === "All") return undefined
    const found = articlesList.find((a: any) => String(a.id) === String(selectedArticle))
    return found?.title
  }

  const selectedUserLabel = () => {
    if (!selectedCommenter || selectedCommenter === "All") return undefined
    const found = usersList.find((u: any) => String(u.id) === String(selectedCommenter))
    return found?.name
  }

  return (
    <div className="flex flex-col gap-4 rounded-xl border bg-card p-4 shadow-sm">
      <div className="flex flex-col gap-4 md:flex-row md:items-center">
        <div className="relative flex-1">
          <Search className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="البحث في التعليقات..."
            className="w-full pr-10"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-2">
   
          <Button
            variant="outline"
            className="flex items-center gap-2 bg-transparent"
            onClick={() => setShowAdvancedSearch(!showAdvancedSearch)}
          >
            بحث متقدم
            <ChevronDown className={cn("h-4 w-4 transition-transform", showAdvancedSearch && "rotate-180")} />
          </Button>
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
      </div>

      {/* الفلاتر المتقدمة مع أنيميشن */}
      <div
        className={cn(
          "overflow-hidden transition-all duration-300 ease-in-out",
          showAdvancedSearch ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        )}
      >
        <div className="grid grid-cols-1 gap-4 pt-8 pb-4 pr-4 md:grid-cols-2 lg:grid-cols-4 border-t border-gray-200 dark:border-gray-700">
          {/* فلتر المقال */}
          <div className="space-y-2">
            {isLoadingArticleWithComments ? (
              <Skeleton className="w-full h-10 bg-gray-200 dark:bg-gray-700" />
            ) : (
              <Select value={selectedArticle} onValueChange={onArticleChange}>
                <SelectTrigger className="w-full h-10">
                  <SelectValue placeholder="جميع المقالات" />
                </SelectTrigger>
                <SelectContent>
                  <div className="p-2">
                    <Input
                      placeholder="البحث في المقالات..."
                      value={articleSearch}
                      onChange={(e) => setArticleSearch(e.target.value)}
                      className="mb-2"
                    />
                  </div>
                  <SelectItem value="All">جميع المقالات</SelectItem>
                  {filteredArticles.map((article: any) => (
                    <SelectItem key={article.id} value={String(article.id)}>
                      {article.title}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          </div>

          {/* فلتر المستخدم */}
          <div className="space-y-2">
            {isLoadingUsers ? (
              <Skeleton className="w-full h-10 bg-gray-200 dark:bg-gray-700" />
            ) : (
              <Select value={selectedCommenter} onValueChange={onCommenterChange}>
                <SelectTrigger className="w-full h-10">
                  <SelectValue placeholder="اسم المعلق" />
                </SelectTrigger>
                <SelectContent>
                  <div className="p-2">
                    <Input
                      placeholder="البحث في المستخدمين..."
                      value={userSearch}
                      onChange={(e) => setUserSearch(e.target.value)}
                      className="mb-2"
                    />
                  </div>
                  <SelectItem value="All">جميع المستخدمين</SelectItem>
                  {filteredUsers.map((user: any) => (
                    <SelectItem key={user.id} value={String(user.id)}>
                      {user.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          </div>

          {/* فلتر نوع التعليق */}
          <div className="space-y-2">
            <Select value={selectedStatus} onValueChange={onStatusChange}>
              <SelectTrigger className="w-full h-10">
                <SelectValue placeholder="نوع التعليق" />
              </SelectTrigger>
              <SelectContent>
                {statusOptions.map((status) => (
                  <SelectItem key={status.value} value={status.value}>
                    {status.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* فلتر النطاق الزمني */}
          <div className="space-y-2">
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  id="date"
                  variant={"outline"}
                  className={cn(
                    "w-full justify-start text-left font-normal h-10",
                    !dateRange && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="ml-2 h-4 w-4" />
                  {formatDateRange(dateRange?.from, dateRange?.to)}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  initialFocus
                  mode="range"
                  defaultMonth={dateRange?.from}
                  selected={dateRange}
                  onSelect={onDateRangeChange}
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
          {searchQuery && (
            <Badge variant="secondary" className="bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200">
              البحث: {searchQuery}
            </Badge>
          )}
          {selectedArticle !== "All" && (
            <Badge variant="secondary" className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
              المقال: {selectedArticleLabel() || selectedArticle}
            </Badge>
          )}
          {selectedCommenter !== "All" && (
            <Badge variant="secondary" className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
              المستخدم: {selectedUserLabel() || selectedCommenter}
            </Badge>
          )}
          {selectedStatus !== "All" && (
            <Badge variant="secondary" className="bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200">
              النوع: {statusOptions.find((s) => s.value === selectedStatus)?.label || selectedStatus}
            </Badge>
          )}
          {(dateRange?.from || dateRange?.to) && (
            <Badge variant="secondary" className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200">
              التاريخ: {dateRange?.from && new Intl.DateTimeFormat("ar-EG").format(dateRange.from)}
              {dateRange?.to && ` - ${new Intl.DateTimeFormat("ar-EG").format(dateRange.to)}`}
            </Badge>
          )}
        </div>
      )}
    </div>
  )
}
