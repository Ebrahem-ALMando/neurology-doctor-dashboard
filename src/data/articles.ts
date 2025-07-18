export interface ArticleImage {
  id: number;
  article_id: number;
  image_name: string;
  folder: string;
  is_cover: boolean;
  caption: string | null;
  image_url: string;
  created_at: string;
  updated_at: string;
}

export interface ArticleDoctor {
  id: number;
  name: string;
  avatar: string | null;
}

export interface ArticleCategory {
  id: number;
  name: string;
}

export interface Article {
  id: number;
  doctor: ArticleDoctor;
  category: ArticleCategory;
  title: string;
  short_description: string;
  content: string;
  views_count: number;
  is_published: boolean;
  published_at: string | null;
  images: ArticleImage[];
  comments_count: number;
  comments: any[];
  created_at: string;
  updated_at: string;
}

export interface ArticleStats {
  totalArticles: number;
  publishedArticles: number;
  draftArticles: number;
  totalViews: number;
}

export const articleCategories = [
  "صحة القلب",
  "تغذية",
  "أمراض مزمنة",
  "صحة العظام",
  "صحة نفسية",
  "صحة العيون",
  "إسعافات أولية",
  "وقاية",
]

export const articleStatuses = ["published", "draft"]

export const dummyArticles: Article[] = [];

export const getArticleStats = (data: { data: Article[]; meta: { total: number } }): ArticleStats => {
  const articles = data?.data || [];
  const totalArticles = data?.meta.total || 0;
  const publishedArticles = articles.filter((a: Article) => a.is_published)?.length || 0;
  const draftArticles = articles.filter((a: Article) => !a.is_published)?.length || 0;
  const totalViews = articles.reduce((sum: number, a: Article) => sum + a.views_count, 0);

  return {
    totalArticles,
    publishedArticles,
    draftArticles,
    totalViews,
  }
}
