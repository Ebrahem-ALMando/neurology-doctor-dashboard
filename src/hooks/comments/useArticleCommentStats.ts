import useSWR from "swr";
import { ArticleCommentStatsResponse, getArticleCommentsStats } from "@/api/services/articlecomments";

export function useArticleCommentStats() {
  const { data, error, isLoading } = useSWR<ArticleCommentStatsResponse>(
    "article-comment-stats",
    () => getArticleCommentsStats(),
    {
      revalidateOnFocus: false,
    }
  );
  
  // let stats: ArticleCommentStats = {
  //   totalComments: 0,       
  //   totalReplyComments: 0,    
  //   totalUniqueUsers: 0,      
  //   totalArticles: 0, 
  // }
  return {
    stats: data?.data,
    isLoading: isLoading || !data,
    error: error || data?.error,
  };
}
  