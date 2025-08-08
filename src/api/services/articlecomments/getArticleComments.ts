import { fetchAPI } from "@/api/api";
import {ArticleCommentsParams,ArticleCommentsListResponse} from '@/api/services/articlecomments'
import ApiConfig from '@/api/apiConfig'
export const getArticleComments = async (
  params: ArticleCommentsParams = {}
): Promise<ArticleCommentsListResponse> => {
  const endPointKey = "article-comments";
  const searchParams = new URLSearchParams();

  if (params.article_id) searchParams.append("article_id", params.article_id.toString());
  if (params.user_id) searchParams.append("user_id", params.user_id.toString());
  if (params.is_reply !== undefined && params.is_reply !== null) {
    searchParams.append("is_reply", params.is_reply ? "true" : "false");
  }
  if (params.from_date) searchParams.append("from_date", params.from_date);
  if (params.to_date) searchParams.append("to_date", params.to_date);
  if (params.search) searchParams.append("search", params.search);

  if (params.page) searchParams.append("page", params.page.toString());
  if (params.per_page) searchParams.append("per_page", params.per_page.toString());

  const endpoint = `${endPointKey}${searchParams.toString() ? `?${searchParams.toString()}` : ""}`;

  const res = await fetchAPI(endpoint, "GET", null, {
    next: {
      revalidate: ApiConfig.revalidateTime,
      tags: [endPointKey],
    },
  });

  return res as ArticleCommentsListResponse;
};
  