import { fetchAPI } from "@/api/api";
import ApiConfig from "@/api/apiConfig";
import type { ArticleCommentResponse } from "./types";

export const showArticleComment = async (
  commentId: number
): Promise<ArticleCommentResponse> => {
  const endPointKey = "article-comments";
  const endpoint = `${endPointKey}/${commentId}`;
  const res = await fetchAPI(endpoint, "GET", null, {
    next: {
      revalidate: ApiConfig.revalidateTime,
      tags: [endPointKey, `comment-${commentId}`],
    },
  });
  return res as ArticleCommentResponse;
};
