"use client"

import Image from "next/image"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Edit, Trash2, Eye, Calendar, ImageIcon } from "lucide-react"
import type { Article } from "@/data/articles"
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationPrevious,
  PaginationNext,
} from "@/components/ui/pagination"

import StatusBadge from "@/components/articles/status-badge";
import { DeleteArticleDialog } from "@/components/articles/delete-article-dialog";
import { useState } from "react";

interface ArticlesGridViewProps {
  articles: Article[]
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
  onEdit: (article: Article) => void
  onDelete: (id: string) => void
  onView: (id: string) => void
}

export function ArticlesGridView({
  articles,
  currentPage,
  totalPages,
  onPageChange,
  onEdit,
  onDelete,
  onView,
}: ArticlesGridViewProps) {

  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [articleToDelete, setArticleToDelete] = useState<string | null>(null);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {articles.map((article) => {
          const coverImage = (article as any).images?.find((a: any) => a.is_cover)?.image_url;

          return (
              <Card key={article.id} className="overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-200">
                <div className="relative w-full h-40 bg-muted flex items-center justify-center">
                  {coverImage ? (
                      <Image
                          src={coverImage}
                          alt={article.title}
                          width={300}
                          height={200}
                          className="w-full h-full object-cover"
                      />
                  ) : (
                      <ImageIcon className="h-12 w-12 text-muted-foreground" />
                  )}
                  <Badge
                      className="absolute top-2 right-2 text-xs px-2 py-1 rounded-full bg-white/80 backdrop-blur-sm text-gray-700 dark:bg-gray-900/80 dark:text-gray-300"
                  >
                    {(article as any).category?.name || "-"}
                  </Badge>
                </div>

                <CardHeader className="pb-2">
                  <CardTitle className="text-lg font-semibold line-clamp-2">{article.title}</CardTitle>
                  <CardDescription className="text-sm line-clamp-2">{article.short_description}</CardDescription>
                </CardHeader>

                <CardContent className="text-sm text-muted-foreground space-y-2">
                  <div className="flex items-center gap-2">
                    <Avatar className="h-6 w-6">
                      <AvatarImage src={(article as any).doctor?.avatar || "/placeholder.svg"} alt={(article as any).doctor?.name || ""} />
                      <AvatarFallback>
                        {(article as any).doctor?.name
                            .split(" ")
                            .map((n: string) => n[0])
                            .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <span>{(article as any).doctor?.name || "-"}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    <span>{(article as any).published_at || (article as any).publishedDate || "غير منشور"}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Eye className="h-4 w-4" />
                    <span>{(article as any).views_count?.toLocaleString("ar-EG") || 0} مشاهدة</span>
                  </div>
                </CardContent>

                <CardFooter className="flex justify-between items-center pt-4 border-t">
                  <StatusBadge is_published={(article as any).is_published}/>
                  <div className="flex gap-1">
                    <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-blue-600 hover:bg-blue-100"
                        onClick={() => onEdit(article)}
                    >
                      <Edit className="h-4 w-4" />
                      <span className="sr-only">تعديل</span>
                    </Button>
                    <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-rose-600 hover:bg-rose-100"
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
                        className="h-8 w-8 text-emerald-600 hover:bg-emerald-100"
                        onClick={() => onView(String(article.id))}
                    >
                      <Eye className="h-4 w-4" />
                      <span className="sr-only">عرض</span>
                    </Button>
                  </div>
                </CardFooter>
              </Card>
          )
        })}

      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious href="#" onClick={() => onPageChange(Math.max(1, currentPage - 1))} />
            </PaginationItem>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <PaginationItem key={page}>
                <Button
                  variant={currentPage === page ? "default" : "outline"}
                  onClick={() => onPageChange(page)}
                  className={currentPage === page ? "bg-violet-600 hover:bg-violet-700" : ""}
                >
                  {page}
                </Button>
              </PaginationItem>
            ))}
            <PaginationItem>
              <PaginationNext href="#" onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))} />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )}

      <DeleteArticleDialog
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        onConfirm={() => { if (articleToDelete) { onDelete(articleToDelete); setDeleteDialogOpen(false); } }}
      />
    </div>
  )
}
