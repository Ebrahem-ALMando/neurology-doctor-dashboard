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
            <Card key={article.id} className="group overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 bg-gradient-to-br from-white to-gray-50 dark:from-gray-900 dark:to-gray-800 border-0">
                <div className="relative w-full h-60 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-700 overflow-hidden">
                  {coverImage ? (
                    <div className="relative w-full h-full">
                      <Image
                        src={coverImage}
                        alt={article.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                      {/* Overlay gradient */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </div>
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-blue-900/20 dark:to-indigo-900/20">
                      <div className="text-center">
                        <ImageIcon className="h-16 w-16 text-gray-400 dark:text-gray-500 mx-auto mb-2" />
                        <p className="text-sm text-gray-500 dark:text-gray-400">لا توجد صورة</p>
                      </div>
                    </div>
                  )}
                  
                  {/* Category Badge with enhanced styling */}
                  <div className="absolute top-3 right-3 z-10">
                    <Badge className="px-3 py-1.5 text-xs font-medium rounded-full bg-white/95 backdrop-blur-md text-gray-800 dark:bg-gray-900/95 dark:text-gray-200 shadow-lg border border-gray-200/50 dark:border-gray-700/50 hover:bg-gradient-to-r hover:from-blue-500 hover:to-purple-600 hover:text-white dark:hover:from-blue-600 dark:hover:to-purple-700 hover:shadow-xl hover:scale-105 transition-all duration-300 cursor-pointer group/badge">
                      <span className="group-hover/badge:animate-pulse">
                        {(article as any).category?.name || "بدون تصنيف"}
                      </span>
                    </Badge>
                  </div>

                  {/* Status indicator */}
                  <div className="absolute top-3 left-3 z-10">
                    <div className={`w-3 h-3 rounded-full shadow-lg border-2 border-white dark:border-gray-800 ${
                      (article as any).is_published 
                        ? 'bg-emerald-500 animate-pulse' 
                        : 'bg-amber-500'
                    }`} />
                  </div>
                </div>

                <CardHeader className="pb-3 pt-4">
                  <CardTitle className="text-lg font-bold line-clamp-2 text-gray-900 dark:text-gray-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-200">
                    {article.title}
                  </CardTitle>
                  <CardDescription className="text-sm line-clamp-2 text-gray-600 dark:text-gray-400 leading-relaxed">
                    {article.short_description}
                  </CardDescription>
                </CardHeader>

                <CardContent className="text-sm space-y-3">
                  {/* Author section */}
                  <div className="flex items-center gap-3 p-2 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
                    <Avatar className="h-8 w-8 ring-2 ring-white dark:ring-gray-700 shadow-sm">
                      <AvatarImage
                        src={(article as any).doctor?.avatar}
                        alt={(article as any).doctor?.name || ""}
                      />

                      <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 text-white text-xs font-medium">
                        {(article as any).doctor?.name
                          ?.split(" ")
                          .map((n: string) => n[2])
                          .join("")
                          .slice(0, 2) || "??"}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-gray-900 dark:text-gray-100 truncate">
                        {(article as any).doctor?.name || "غير محدد"}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">المؤلف</p>
                    </div>
                  </div>

                  {/* Stats section */}
                  <div className="grid grid-cols-2 gap-3">
                    <div className="flex items-center gap-2 p-2 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                      <Calendar className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-medium text-blue-900 dark:text-blue-100">
                          {(article as any).published_at 
                            ? new Date((article as any).published_at).toLocaleDateString('ar-EG')
                            : "غير منشور"}
                        </p>
                        <p className="text-xs text-blue-600 dark:text-blue-400">تاريخ النشر</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2 p-2 bg-emerald-50 dark:bg-emerald-900/20 rounded-lg">
                      <Eye className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-medium text-emerald-900 dark:text-emerald-100">
                          {(article as any).views_count?.toLocaleString("ar-EG") || 0}
                        </p>
                        <p className="text-xs text-emerald-600 dark:text-emerald-400">المشاهدات</p>
                      </div>
                    </div>
                  </div>
                </CardContent>

                <CardFooter className="flex justify-between items-center pt-4 border-t border-gray-100 dark:border-gray-700 bg-gray-50/50 dark:bg-gray-800/50">
                  <StatusBadge is_published={(article as any).is_published}/>
                  
                  <div className="flex gap-1">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-9 w-9 text-blue-600 hover:bg-blue-100 dark:hover:bg-blue-900/20 rounded-full transition-all duration-200 hover:scale-110"
                      onClick={() => onEdit(article)}
                    >
                      <Edit className="h-4 w-4" />
                      <span className="sr-only">تعديل</span>
                    </Button>
                    
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-9 w-9 text-rose-600 hover:bg-rose-100 dark:hover:bg-rose-900/20 rounded-full transition-all duration-200 hover:scale-110"
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
                      className="h-9 w-9 text-emerald-600 hover:bg-emerald-100 dark:hover:bg-emerald-900/20 rounded-full transition-all duration-200 hover:scale-110"
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
