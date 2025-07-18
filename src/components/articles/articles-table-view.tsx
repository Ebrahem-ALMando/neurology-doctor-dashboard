"use client"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Edit, Trash2, Eye, ChevronLeft, ChevronRight, ArrowUp, ArrowDown } from "lucide-react"
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
        <ArrowUp className="h-3 w-3 ml-1" />
      ) : (
        <ArrowDown className="h-3 w-3 ml-1" />
      )
    }
    return null
  }

  return (
    <div className="w-full overflow-hidden">
      <div className="table-container">
        <Table>
          <TableHeader className="bg-muted/50">
            <TableRow>
              <TableHead className="text-center min-w-[150px] cursor-pointer" onClick={() => handleSortClick("title")}>
                <div className="flex items-center justify-center">العنوان {renderSortIcon("title")}</div>
              </TableHead>
              <TableHead className="text-center min-w-[100px] cursor-pointer" onClick={() => handleSortClick("author")}>
                <div className="flex items-center justify-center">المؤلف {renderSortIcon("author")}</div>
              </TableHead>
              <TableHead className="text-center min-w-[100px]">التصنيف</TableHead>
              <TableHead className="text-center min-w-[80px]">الحالة</TableHead>
              <TableHead className="text-center min-w-[80px] cursor-pointer" onClick={() => handleSortClick("views")}>
                <div className="flex items-center justify-center">المشاهدات {renderSortIcon("views")}</div>
              </TableHead>
              <TableHead
                className="text-center min-w-[120px] cursor-pointer"
                onClick={() => handleSortClick("publishedDate")}
              >
                <div className="flex items-center justify-center">تاريخ النشر {renderSortIcon("publishedDate")}</div>
              </TableHead>
              <TableHead className="text-center min-w-[100px]">الإجراءات</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {articles.map((article) => (
              <TableRow key={article.id} className="hover:bg-muted/30 transition-colors">
                <TableCell className="font-medium text-center text-sm p-2">{article.title}</TableCell>
                <TableCell className="text-center text-sm p-2">{(article as any).doctor?.name || "-"}</TableCell>
                <TableCell className="text-center text-xs p-2">{(article as any).category?.name || "-"}</TableCell>
                <TableCell className="text-center p-2"><StatusBadge is_published={(article as any).is_published}/></TableCell>
                <TableCell className="text-center text-sm p-2">{(article as any).views_count?.toLocaleString("ar-EG") || 0}</TableCell>
                <TableCell className="text-center text-sm p-2">{(article as any).published_at || (article as any).publishedDate || "غير منشور"}</TableCell>
                <TableCell className="p-2">
                  <div className="flex items-center justify-center gap-1">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="rounded-full h-6 w-6 text-blue-600 hover:text-blue-700 hover:bg-blue-100 dark:hover:bg-blue-900/20"
                      onClick={() => onEdit(article)}
                    >
                      <Edit className="h-3 w-3" />
                      <span className="sr-only">تعديل</span>
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="rounded-full h-6 w-6 text-rose-600 hover:text-rose-700 hover:bg-rose-100 dark:hover:bg-rose-900/20"
                      onClick={() => {
                        setArticleToDelete(String(article.id));
                        setDeleteDialogOpen(true);
                        
                      }}
                    >
                      <Trash2 className="h-3 w-3" />
                      <span className="sr-only">حذف</span>
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="rounded-full h-6 w-6 text-emerald-600 hover:text-emerald-700 hover:bg-emerald-100 dark:hover:bg-emerald-900/20"
                      onClick={() => onView(String(article.id))}
                    >
                      <Eye className="h-3 w-3" />
                      <span className="sr-only">عرض</span>
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between p-4 border-t bg-muted/20">
          <div className="text-sm text-muted-foreground">
            عرض {articles.length} من أصل {articles.length} مقال
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => onPageChange(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
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
                className={currentPage === page ? "bg-violet-600 hover:bg-violet-700" : ""}
              >
                {page}
              </Button>
            ))}
            <Button
              variant="outline"
              size="sm"
              onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
              disabled={currentPage === totalPages}
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
