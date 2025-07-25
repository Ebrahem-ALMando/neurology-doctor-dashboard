"use client"

import * as React from "react"
import { Search, ChevronDown, CalendarIcon } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import { cn } from "@/lib/utils"
import { arSA } from "date-fns/locale"
import type { DateRange } from "react-day-picker"
import { getArticleTitles, dummyDoctors, commentStatuses } from "@/data/comments"
import { formatDateRange } from "@/utils/General/formatDateRange"

interface CommentsFilterBarProps {
  searchQuery: string
  onSearchChange: (query: string) => void
  selectedArticle: string
  onArticleChange: (articleId: string) => void
  selectedCommenter: string
  onCommenterChange: (commenterName: string) => void
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
  const articleOptions = getArticleTitles()
  const commenterOptions = dummyDoctors.map((d) => d.name)

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
        <Button
          variant="outline"
          className="flex items-center gap-2 bg-transparent"
          onClick={() => setShowAdvancedSearch(!showAdvancedSearch)}
        >
          بحث متقدم
          <ChevronDown className={cn("h-4 w-4 transition-transform", showAdvancedSearch && "rotate-180")} />
        </Button>
      </div>

      {showAdvancedSearch && (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Select value={selectedArticle} onValueChange={onArticleChange}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="جميع المقالات" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="All">جميع المقالات</SelectItem>
              {articleOptions.map((article) => (
                <SelectItem key={article.value} value={article.value}>
                  {article.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={selectedCommenter} onValueChange={onCommenterChange}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="اسم المعلق" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="All">جميع المعلقين</SelectItem>
              {commenterOptions.map((commenter) => (
                <SelectItem key={commenter} value={commenter}>
                  {commenter}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={selectedStatus} onValueChange={onStatusChange}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="حالة التعليق" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="All">جميع الحالات</SelectItem>
              {commentStatuses
                .filter((s) => s !== "All")
                .map((status) => (
                  <SelectItem key={status} value={status}>
                    {status === "pending" && "معلق"}
                    {status === "approved" && "موافق عليه"}
                    {status === "rejected" && "مرفوض"}
                    {status === "flagged" && "مبلغ عنه"}
                  </SelectItem>
                ))}
            </SelectContent>
          </Select>

          <Popover>
            <PopoverTrigger asChild>
              <Button
                id="date"
                variant={"outline"}
                className={cn("w-full justify-start text-left font-normal", !dateRange && "text-muted-foreground")}
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
      )}
    </div>
  )
}
