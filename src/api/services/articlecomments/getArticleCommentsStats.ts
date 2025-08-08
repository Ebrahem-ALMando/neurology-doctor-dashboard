import { fetchAPI } from "@/api/api";
import ApiConfig from "@/api/apiConfig";
import type {ArticleCommentStatsResponse } from "./types";

export const getArticleCommentsStats = async (
): Promise<ArticleCommentStatsResponse> => {
  const endPointKey = "article-comments-stats";
  const res = await fetchAPI(endPointKey, "GET", null, {
    next: {
      revalidate: ApiConfig.revalidateTime,
      tags: [endPointKey],
    },
  });
  return res as ArticleCommentStatsResponse;
};
