import { apiHelpers } from "@/api/apiHelpers";
import type { DeleteArticleCommentResponse } from "./types";

export const deleteArticleComment = async (
  commentId: number
): Promise<DeleteArticleCommentResponse> => {
  return await apiHelpers.delete(`article-comments/${commentId}`, { showSuccess: true });
};
