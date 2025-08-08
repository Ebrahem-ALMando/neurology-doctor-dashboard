import { APIResponse } from "@/api/api";

import type { DateRange } from "react-day-picker";

export interface CommentsFilters {
    searchQuery: string;      
    selectedArticle: string;  
    selectedCommenter: string;
    isReply: "All" | "reply" | "main"; 
    dateRange: DateRange | undefined;  
    page?: number;
    per_page?: number;
  }
  export interface ArticleCommentsParams {
    article_id?: number;
    user_id?: number;
    is_reply?: boolean;
    from_date?: string;
    to_date?: string;
    page?: number;
    per_page?: number;
    search?: string;
  }

export interface ArticleCommentUser {
    id: number;
    name: string;
    avatar: string | null;
    avatar_url: string | null;
  }
  
  export interface ArticleComment {
    id: number;
    article_id: number;
    article_title: string;
    user: ArticleCommentUser;
    parent_id: number | null;
    content: string;
    children: ArticleComment[];
    created_at: string;
    updated_at: string;
  }
  
  export interface AddArticleCommentData {
    article_id: number;
    content: string;
    parent_id?: number | null;
  }
  
  export interface UpdateArticleCommentData {
    content: string;
  }
  
export interface ArticleCommentStats {
totalComments: number;       
totalReplyComments: number;    
totalUniqueUsers: number;      
totalArticles: number;         
}
  

export type ArticleCommentResponse = APIResponse<ArticleComment>;
export type ArticleCommentStatsResponse = APIResponse<ArticleCommentStats>;

export type ArticleCommentsListResponse = APIResponse<ArticleComment[]>;
export type DeleteArticleCommentResponse = APIResponse<null>;