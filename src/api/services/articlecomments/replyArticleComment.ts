import { apiHelpers } from "@/api/apiHelpers";
import type { AddArticleCommentData, ArticleCommentResponse } from "./types";

export const replyArticleComment = async (
  data: AddArticleCommentData
): Promise<ArticleCommentResponse> => {
  return await apiHelpers.post("reply-article-comments", data, { showSuccess: true });
};
