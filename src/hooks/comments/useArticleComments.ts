import useSWR from "swr";
import {
  getArticleComments,
  ArticleCommentsListResponse,
  ArticleCommentsParams,
  AddArticleCommentData,
  replyArticleComment,
  deleteArticleComment,
  updateArticleComment,
  UpdateArticleCommentData,
  addArticleComment,
  showArticleComment,
  ArticleCommentStats,
} from "@/api/services/articlecomments";

import { useCustomToastWithIcons } from "@/hooks/use-custom-toast-with-icons";
import { useEffect, useState } from "react";


export const useArticleComments = (params: ArticleCommentsParams = {}) => {
  const { showError, showSaveSuccess, showDeleteSuccess, showUpdateSuccess } =
    useCustomToastWithIcons();

  const [isLoadingInner, setIsLoadingInner] = useState(false);

  const {
    data,
    error: swrError,
    isLoading,
    mutate,
  } = useSWR<ArticleCommentsListResponse>(
    params ? ["article-comments", JSON.stringify(params)] : "article-comments",
    () => getArticleComments(params),
    { revalidateOnFocus: false }
  );

  const hasError = swrError || data?.error;
  const errorMessage =
    data?.message || (swrError as any)?.message || undefined;


  const handleAction = async (
    action: () => Promise<any>,
    onSuccess?: () => void
  ) => {
    setIsLoadingInner(true);
    try {
      const response = await action();
      if (response.error) {
        showError({
          title: "فشلت العملية",
          description: "حدث خطأ اثناء تنفيذ العملية",
        });
        console.log(
          "%c[ArticleComments Error]%c " + response.message,
          "color: white; background: red; padding: 2px 4px; border-radius: 2px",
          "color: red"
        );
        
      } else {
        onSuccess?.();
        // await mutate(undefined, { revalidate: true });
      }
      return response.data;
    } finally {
      setIsLoadingInner(false);
    }
  };


  const addComment = (data: AddArticleCommentData) =>
    handleAction(() => addArticleComment(data), showSaveSuccess);

  const replyComment = (data: AddArticleCommentData) =>
    handleAction(() => replyArticleComment(data), showSaveSuccess);

  const deleteComment = (commentId: number) =>
    handleAction(() => deleteArticleComment(commentId), showDeleteSuccess);

  const updateComment = (
    commentId: number,
    data: UpdateArticleCommentData
  ) =>
    handleAction(
      () => updateArticleComment(commentId, data),
      showUpdateSuccess
    );

  const showComment = (commentId: number) =>
    handleAction(() => showArticleComment(commentId));

 



  return {
    comments: data?.data ?? [],
    meta: data?.meta,
    isLoading: isLoading,
    isLoadingInner,
    error: hasError,
    errorMessage,
    mutate,
    addComment,
    replyComment,
    deleteComment,
    updateComment,
    showComment,
  };
};
