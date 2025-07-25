"use client"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Edit, Trash2, Eye, ChevronLeft, ChevronRight, ArrowUp, ArrowDown, Calendar, User, Eye as EyeIcon } from "lucide-react"
import type { Article } from "@/data/articles"
import StatusBadge from "@/components/articles/status-badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { useState } from "react";
import { DeleteArticleDialog } from "@/components/articles/delete-article-dialog";

interface ArticlesTableViewProps {
  articles: Article[]
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
  onEdit: (article: Article) => void
  onDelete: (id: string) => void
  onView: (id: string) => void
  onSort: (sortBy: keyof Article, sortOrder: "asc" | "desc") => void
  currentSort: { sortBy: keyof Article; sortOrder: "asc" | "desc" }
}

export function ArticlesTableView({
  articles,
  currentPage,
  totalPages,
  onPageChange,
  onEdit,
  onDelete,
  onView,
  onSort,
  currentSort,
}: ArticlesTableViewProps) {
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [articleToDelete, setArticleToDelete] = useState<string | null>(null);


  const handleSortClick = (column: keyof Article) => {
    const newSortOrder = currentSort.sortBy === column && currentSort.sortOrder === "asc" ? "desc" : "asc"
    onSort(column, newSortOrder)
  }

  const renderSortIcon = (column: keyof Article) => {
    if (currentSort.sortBy === column) {
      return currentSort.sortOrder === "asc" ? (
        <ArrowUp className="h-3 w-3 ml-1 text-blue-600" />
      ) : (
        <ArrowDown className="h-3 w-3 ml-1 text-blue-600" />
      )
    }
    return null
  }

  return (
    <div className="w-full overflow-hidden rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm">
      <div className="table-container">
        <Table>
          <TableHeader className="bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900">
            <TableRow className="border-b border-gray-200 dark:border-gray-700">
              <TableHead className="text-center min-w-[200px] cursor-pointer font-semibold text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200" onClick={() => handleSortClick("title")}>
                <div className="flex items-center justify-center gap-2">
                  <span>العنوان</span>
                  {renderSortIcon("title")}
                </div>
              </TableHead>
              <TableHead className="text-center min-w-[120px] font-semibold text-gray-700 dark:text-gray-300">
                <div className="flex items-center justify-center gap-2">
                  <User className="h-4 w-4" />
                  <span>المؤلف</span>
                </div>
              </TableHead>
              <TableHead className="text-center min-w-[100px] font-semibold text-gray-700 dark:text-gray-300">التصنيف</TableHead>
              <TableHead className="text-center min-w-[100px] font-semibold text-gray-700 dark:text-gray-300">الحالة</TableHead>
              <TableHead className="text-center min-w-[100px] font-semibold text-gray-700 dark:text-gray-300">
                <div className="flex items-center justify-center gap-2">
                  <EyeIcon className="h-4 w-4" />
                  <span>المشاهدات</span>
                </div>
              </TableHead>
              <TableHead className="text-center min-w-[140px] font-semibold text-gray-700 dark:text-gray-300">
                <div className="flex items-center justify-center gap-2">
                  <Calendar className="h-4 w-4" />
                  <span>تاريخ النشر</span>
                </div>
              </TableHead>
              <TableHead className="text-center min-w-[120px] font-semibold text-gray-700 dark:text-gray-300">الإجراءات</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {articles.map((article, index) => (
              <TableRow 
                key={article.id} 
                className="hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 dark:hover:from-blue-900/10 dark:hover:to-indigo-900/10 transition-all duration-200 border-b border-gray-100 dark:border-gray-800"
              >
                <TableCell className="font-medium text-center text-sm p-4">
                  <div className="max-w-[180px] truncate" title={article.title}>
                    {article.title}
                  </div>
                </TableCell>
                <TableCell className="text-center text-sm p-4">
                  <div className="flex items-center justify-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-xs font-medium">
                      {(article as any).doctor?.name
                          ?.split(" ")
                          .map((n: string) => n[2])
                          .join("")
                          .slice(0, 2) || "??"}
                    </div>
                    <span className="truncate max-w-[80px]" title={(article as any).doctor?.name}>
                      {(article as any).doctor?.name || "-"}
                    </span>
                  </div>
                </TableCell>
                <TableCell className="text-center text-xs p-4">
                  <Badge variant="secondary" className="bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-600 hover:bg-gradient-to-r hover:from-blue-500 hover:to-purple-600 hover:text-white dark:hover:from-blue-600 dark:hover:to-purple-700 hover:shadow-lg hover:scale-105 transition-all duration-300 cursor-pointer group/badge">
                    <span className="group-hover/badge:animate-pulse">
                      {(article as any).category?.name || "-"}
                    </span>
                  </Badge>
                </TableCell>
                <TableCell className="text-center p-4">
                  <StatusBadge is_published={(article as any).is_published}/>
                </TableCell>
                <TableCell className="text-center text-sm p-4">
                  <div className="flex items-center justify-center gap-1">
                    <EyeIcon className="h-4 w-4 text-emerald-600" />
                    <span className="font-medium text-emerald-700 dark:text-emerald-400">
                      {(article as any).views_count?.toLocaleString("ar-EG") || 0}
                    </span>
                  </div>
                </TableCell>
                <TableCell className="text-center text-sm p-4">
                  <div className="flex items-center justify-center gap-1">
                    <Calendar className="h-4 w-4 text-blue-600" />
                    <span className="text-blue-700 dark:text-blue-400">
                      {(article as any).published_at 
                        ? new Date((article as any).published_at).toLocaleDateString('ar-EG')
                        : "غير منشور"}
                    </span>
                  </div>
                </TableCell>
                <TableCell className="p-4">
                  <div className="flex items-center justify-center gap-1">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="rounded-full h-8 w-8 text-blue-600 hover:text-blue-700 hover:bg-blue-100 dark:hover:bg-blue-900/20 transition-all duration-200 hover:scale-110"
                      onClick={() => onEdit(article)}
                    >
                      <Edit className="h-4 w-4" />
                      <span className="sr-only">تعديل</span>
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="rounded-full h-8 w-8 text-rose-600 hover:text-rose-700 hover:bg-rose-100 dark:hover:bg-rose-900/20 transition-all duration-200 hover:scale-110"
                      onClick={() => {
                        setArticleToDelete(String(article.id));
                        setDeleteDialogOpen(true);
                      }}
                    >
                      <Trash2 className="h-4 w-4" />
                      <span className="sr-only">حذف</span>
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="rounded-full h-8 w-8 text-emerald-600 hover:text-emerald-700 hover:bg-emerald-100 dark:hover:bg-emerald-900/20 transition-all duration-200 hover:scale-110"
                      onClick={() => onView(String(article.id))}
                    >
                      <Eye className="h-4 w-4" />
                      <span className="sr-only">عرض</span>
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Enhanced Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between p-6 border-t border-gray-200 dark:border-gray-700 bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900">
          <div className="text-sm text-gray-600 dark:text-gray-400 font-medium">
            عرض {articles.length} من أصل {articles.length} مقال
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => onPageChange(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
              className="hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors duration-200"
            >
              <ChevronRight className="h-4 w-4 ml-1" />
              السابق
            </Button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <Button
                key={page}
                variant={currentPage === page ? "default" : "outline"}
                size="sm"
                onClick={() => onPageChange(page)}
                className={currentPage === page 
                  ? "bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700 text-white shadow-lg" 
                  : "hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
                }
              >
                {page}
              </Button>
            ))}
            <Button
              variant="outline"
              size="sm"
              onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
              disabled={currentPage === totalPages}
              className="hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors duration-200"
            >
              التالي
              <ChevronLeft className="h-4 w-4 mr-1" />
            </Button>
          </div>
        </div>
      )}


      <DeleteArticleDialog
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        onConfirm={() => { if (articleToDelete) { onDelete(articleToDelete); setDeleteDialogOpen(false); } }}
      />
    </div>
  )
}
