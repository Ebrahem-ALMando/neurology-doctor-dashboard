import { apiHelpers } from "@/api/apiHelpers";
import type { UpdateArticleCommentData, ArticleCommentResponse } from "./types";

export const updateArticleComment = async (
  commentId: number,
  data: UpdateArticleCommentData
): Promise<ArticleCommentResponse> => {
  return await apiHelpers.put(`article-comments/${commentId}`, data, { showSuccess: true });
};
