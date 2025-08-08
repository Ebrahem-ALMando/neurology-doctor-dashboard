import { apiHelpers } from "@/api/apiHelpers";
import type { AddArticleCommentData, ArticleCommentResponse } from "./types";

export const addArticleComment = async (
  data: AddArticleCommentData   
): Promise<ArticleCommentResponse> => {
  return await apiHelpers.post("article-comments", data, { showSuccess: true });
};
