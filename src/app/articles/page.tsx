"use client"

import { useState, useEffect, useMemo } from "react"
import { Header } from "@/components/header"
import { Sidebar } from "@/components/sidebar"
import { ArticlesHeader } from "@/components/articles/articles-header"
import { ArticlesSummary } from "@/components/articles/articles-summary"
import { ArticlesGridView } from "@/components/articles/articles-grid-view"
import { ArticlesTableView } from "@/components/articles/articles-table-view"
import { dummyArticles, getArticleStats, type Article, type ArticleStats } from "@/data/articles"
import {
  ArticlesGridSkeleton,
  ArticlesSummarySkeleton,
  ArticlesTableSkeleton,
} from "@/components/articles/articles-loading-skeleton"
import { useToast } from "@/components/ui/use-toast"
import type { ArticlesSectionVisibility } from "@/components/articles/articles-customizer"
import {useArticles} from "@/hooks/useArticles";
import { addArticle } from "@/api/services/articles/addArticle";
import uploadImage from "@/api/services/general/uploadImage";
import { addArticleImage } from "@/api/services/articlesimage/addArticleImage";
import { deleteArticle } from "@/api/services/articles/deleteArticle";
import { updateArticle } from "@/api/services/articles/updateArticle";
import { AddArticleModal } from "@/components/articles/add-article-modal";

export default function ArticlesPage() {
  const [viewMode, setViewMode] = useState<"grid" | "table">("grid")
  // const [articles, setArticles] = useState<Article[]>([])
  // const [stats, setStats] = useState<ArticleStats | null>(null)
  // const [isLoading, setIsLoading] = useState(true)
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 6 // 6 for grid, 7 for table (adjust as needed)
  const [filters, setFilters] = useState<{ category?: string; status?: string }>({})
  const [sort, setSort] = useState<{ sortBy: keyof Article; sortOrder: "asc" | "desc" }>({
    sortBy: "publishedDate",
    sortOrder: "desc",
  })
  const [visibility, setVisibility] = useState<ArticlesSectionVisibility>({
    summaryCards: true,
    articlesList: true,
  })
  const { toast } = useToast()
  const {articles,articleStats:stats,isLoading,error,mutate}=useArticles()
  const [editingArticle, setEditingArticle] = useState<Article | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<'add' | 'edit' | 'view'>('add');




  const filteredAndSortedArticles = useMemo(() => {
    let filtered = articles.filter((article) => {
      const matchCategory = filters.category ? article.category.name === filters.category : true
      const matchStatus = filters.status
        ? (filters.status === "published" ? article.is_published : !article.is_published)
        : true;
      return matchCategory && matchStatus
    })


    filtered.sort((a, b) => {
      const aValue = a[sort.sortBy]
      const bValue = b[sort.sortBy]
      if (typeof aValue === "string" && typeof bValue === "string") {
        return sort.sortOrder === "asc" ? aValue.localeCompare(bValue) : bValue.localeCompare(aValue)
      }
      if (typeof aValue === "number" && typeof bValue === "number") {
        return sort.sortOrder === "asc" ? aValue - bValue : bValue - aValue
      }
      return 0
    })

    return filtered
  }, [articles, filters, sort])

  const totalPages = Math.ceil(filteredAndSortedArticles.length / itemsPerPage)
  const currentArticles = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage
    return filteredAndSortedArticles.slice(startIndex, startIndex + itemsPerPage)
  }, [filteredAndSortedArticles, currentPage])


  const handlePageChange = (page: number) => {
    setCurrentPage(page)
  }

  const handleAddArticle = async (articleData: any) => {
    try {
      const articlePayload = {
        title: articleData.title,
        short_description: articleData.short_description,
        content: articleData.content,
        category_id: 1,
        doctor_id: 1,
        is_published: articleData.is_published,
        published_at: articleData.published_at,
      };
      const res = await addArticle(articlePayload);
      if (res.error || !res.data?.id) {
        toast({ title: "خطأ", description: res.message || "فشل إضافة المقال!", variant: "destructive" });
        return;
      }
      const articleId = res.data.id;
      if (articleData.uploadedImages && articleData.uploadedImages.length > 0) {
        await Promise.all(
          articleData.uploadedImages.map((img: any) => {
            return addArticleImage({
              article_id: articleId,
              image_name: img.image_name,
              folder: "articles",
              is_cover: img.is_cover,
              caption: "",
            });
          })
        );
      }
      mutate && mutate();
      toast({ title: "نجاح", description: "تم إضافة المقال بنجاح!", variant: "default" });
    } catch (err: any) {
      toast({ title: "خطأ", description: err?.message || "حدث خطأ أثناء إضافة المقال!", variant: "destructive" });
    }
  };

  const handleAddNewArticle = () => {
    setEditingArticle(null);
    setModalMode('add');
    setModalOpen(true);
    mutate && mutate();
  };
  const handleEditArticle = (article: Article) => {
    setEditingArticle(article);
    
    setModalMode('edit');
    setModalOpen(true);
    mutate && mutate();
  };
  const handleViewArticle = (id: string) => {
    const article = articles.find((a) => String(a.id) === String(id));
    if (article) {
      setEditingArticle(article);
      setModalMode('view');
      setModalOpen(true);
    }
  };

  const handleSaveArticle = async (articleData: any) => {
    try {
      if (editingArticle && editingArticle.id) {
        const articlePayload = {
          title: articleData.title,
          short_description: articleData.short_description,
          content: articleData.content,
          // category_id: Number(articleData.category_id),
          // doctor_id: Number(articleData.doctor_id),
          category_id: 1,
          doctor_id: 1,
          is_published: articleData.is_published,
          published_at: articleData.published_at,
        };
        const res = await updateArticle(Number(editingArticle.id), articlePayload);
        if (res.error) {
          toast({ title: "خطأ", description: res.message || "فشل تعديل المقال!", variant: "destructive" });
          return;
        }
        if (articleData.uploadedImages && articleData.uploadedImages.length > 0) {
          await Promise.all(
            articleData.uploadedImages.map((img: any) => {
              return addArticleImage({
                article_id: Number(editingArticle.id),
                image_name: img.image_name,
                folder: "articles",
                is_cover: img.is_cover,
                caption: "",
              });
            })
          );
        }
        setEditingArticle(null);
        setModalOpen(false);
        mutate && mutate();
        toast({ title: "نجاح", description: "تم تعديل المقال بنجاح!", variant: "default" });
      } else {
        await handleAddArticle(articleData);
        setModalOpen(false);
      }
    } catch (err: any) {
      toast({ title: "خطأ", description: err?.message || "حدث خطأ أثناء حفظ المقال!", variant: "destructive" });
    }
  };

  const handleDeleteArticle = async (id: string) => {
    try {
      const res = await deleteArticle(Number(id));
      if (res.error) {
        toast({ title: "خطأ", description: res.message || "فشل حذف المقال!", variant: "destructive" });
        return;
      }
      mutate && mutate();
      toast({ title: "حذف", description: "تم حذف المقال بنجاح.", variant: "destructive" });
    } catch (err: any) {
      toast({ title: "خطأ", description: err?.message || "حدث خطأ أثناء حذف المقال!", variant: "destructive" });
    }
  };

  // const handleViewArticle = (id: string) => {
  //   toast({
  //     title: "عرض",
  //     description: `عرض تفاصيل المقال ID: ${id}`,
  //     variant: "default",
  //   })
  //   // In a real app, navigate to article detail page or open a view modal
  //   console.log("View article:", id)
  // }

  const handleSort = (sortBy: keyof Article, sortOrder: "asc" | "desc") => {
    setSort({ sortBy, sortOrder })
    setCurrentPage(1) // Reset to first page on sort
  }

  return (
    <div className="overflow-x-hidden w-full">
      <AddArticleModal
        article={editingArticle}
        onSave={handleSaveArticle}
        open={modalOpen}
        onOpenChange={setModalOpen}
        mode={modalMode}
      />
      <div className="flex min-h-screen flex-col w-full overflow-x-hidden">
        <Header />
        <div className="flex flex-1 w-full overflow-x-hidden">
          {/* Desktop Sidebar */}
          <div className="hidden md:block w-64 flex-shrink-0">
            <Sidebar className="h-full border-l" />
          </div>

          {/* Main Content */}
          <main className="flex-1 min-w-0 p-4 md:p-6 overflow-x-hidden">
            <div className="w-full max-w-none space-y-6 animate-in fade-in-50 duration-700">
              <ArticlesHeader
                viewMode={viewMode}
                onToggleView={setViewMode}
                onFilterChange={setFilters}
                currentFilters={filters}
                onAddNewArticle={handleAddNewArticle}
                visibility={visibility}
                onVisibilityChange={setVisibility}

              />

              {visibility.summaryCards &&
                (isLoading ? <ArticlesSummarySkeleton /> : stats && <ArticlesSummary stats={stats} />)}

              {visibility.articlesList &&
                (isLoading ? (
                  viewMode === "grid" ? (
                    <ArticlesGridSkeleton />
                  ) : (
                    <ArticlesTableSkeleton />
                  )
                ) : viewMode === "grid" ? (
                  <ArticlesGridView
                    articles={currentArticles}
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={handlePageChange}
                    onEdit={handleEditArticle}
                    onDelete={handleDeleteArticle}
                    onView={handleViewArticle}
                  />
                ) : (
                  <ArticlesTableView
                    articles={currentArticles}
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={handlePageChange}
                    onEdit={handleEditArticle}
                    onDelete={handleDeleteArticle}
                    onView={handleViewArticle}
                    onSort={handleSort}
                    currentSort={sort}
                  />
                ))}
            </div>
          </main>
        </div>
      </div>
    </div>
  )
}
