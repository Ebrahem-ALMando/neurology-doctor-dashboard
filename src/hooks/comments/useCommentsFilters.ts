import { CommentsFilters  } from "@/api/services/articlecomments/types";
import { useMemo, useState } from "react";
import { format } from "date-fns";

const defaultFilters: CommentsFilters = {
    searchQuery: "",
    selectedArticle: "All",
    selectedCommenter: "All",
    isReply: "All",
    dateRange: undefined,
    page: 1,
    per_page: 20,
  };
  export function useCommentsFilters(initialFilters: Partial<CommentsFilters> = {}) {
    const [filters, setFilters] = useState<CommentsFilters>({
      ...defaultFilters,
      ...initialFilters,
    });
  
    const setFilter = (key: keyof CommentsFilters, value: any) => {
        setFilters((prev) => ({ ...prev, [key]: value, page: 1 }));
    };
  
    const resetFilters = () => {
      setFilters({ ...defaultFilters, ...initialFilters });
    };
  
    const hasActiveFilters = useMemo(() => {
      return (
        filters.searchQuery ||
        filters.selectedArticle !== "All" ||
        filters.selectedCommenter !== "All" ||
        filters.isReply !== "All" ||
        filters.dateRange?.from ||
        filters.dateRange?.to
      );
    }, [filters]);
  
    const activeFilters = useMemo(() => {
      const actives: Partial<CommentsFilters> = {};
      if (filters.searchQuery) actives.searchQuery = filters.searchQuery;
      if (filters.selectedArticle !== "All") actives.selectedArticle = filters.selectedArticle;
      if (filters.selectedCommenter !== "All") actives.selectedCommenter = filters.selectedCommenter;
      if (filters.isReply !== "All") actives.isReply = filters.isReply;
      if (filters.dateRange?.from || filters.dateRange?.to) actives.dateRange = filters.dateRange;
      return actives;
    }, [filters]);
  
    // تحويل القيم لباراميترات API مطابقة للباك
    const toApiParams = () => {
      return {
        search: filters.searchQuery || undefined,
        article_id: filters.selectedArticle !== "All" ? Number(filters.selectedArticle) : undefined,
        user_id: filters.selectedCommenter !== "All" ? Number(filters.selectedCommenter) : undefined,
        is_reply:
          filters.isReply === "reply"
            ? true
            : filters.isReply === "main"
            ? false
            : undefined,
        from_date: filters.dateRange?.from
          ? format(filters.dateRange.from, "yyyy-MM-dd")
          : undefined,
        to_date: filters.dateRange?.to
          ? format(filters.dateRange.to, "yyyy-MM-dd")
          : undefined,
        page: filters.page,
        per_page: filters.per_page,
      };
    };
  
    return {
      filters,
      setFilter,
      resetFilters,
      hasActiveFilters,
      activeFilters,
      setFilters,
      toApiParams,
    };
  }
  


