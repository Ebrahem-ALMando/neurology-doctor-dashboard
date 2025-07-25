import { type Article, dummyArticles } from "./articles"

export interface Comment {
  id: string
  commenter: {
    name: string
    avatar: string
  }
  comment: string
  article: Pick<Article, "id" | "title" | "slug">
  articleCode: string
  date: string // Hijri date string
  status: "pending" | "approved" | "rejected" | "flagged"
}

export interface CommentStats {
  totalComments: number
  commentsToday: number
  publishedComments: number
  flaggedComments: number
}

export const commentStatuses = ["All", "pending", "approved", "rejected", "flagged"]

export const dummyDoctors = [
  { name: "د. جيمس ويلسون", avatar: "/placeholder.svg?height=32&width=32" },
  { name: "د. سارة أحمد", avatar: "/placeholder.svg?height=32&width=32" },
  { name: "د. محمد علي", avatar: "/placeholder.svg?height=32&width=32" },
  { name: "نورة سعد", avatar: "/placeholder.svg?height=32&width=32" },
  { name: "سليمان محمد", avatar: "/placeholder.svg?height=32&width=32" },
  { name: "أحمد محمد", avatar: "/placeholder.svg?height=32&width=32" },
  { name: "فاطمة علي", avatar: "/placeholder.svg?height=32&width=32" },
  { name: "خالد عبدالله", avatar: "/placeholder.svg?height=32&width=32" },
  { name: "ليلى عبدالرحمن", avatar: "/placeholder.svg?height=32&width=32" },
]

export const dummyComments: Comment[] = [
  {
    id: "c1",
    commenter: { name: "نورة سعد", avatar: "/placeholder.svg?height=32&width=32" },
    comment: "مقال رائع ومفيد جداً! أتمنى المزيد من المقالات التي تتحدث عن القلق والتوتر وكيفية التعامل معها بشكل يومي.",
    article: { id: "6", title: "الصحة النفسية: التعامل مع القلق والاكتئاب", slug: "mental-health-anxiety-depression" },
    articleCode: "A10048",
    date: "1446/12/3 هـ",
    status: "approved",
  },
  {
    id: "c2",
    commenter: { name: "سارة محمد", avatar: "/placeholder.svg?height=32&width=32" },
    comment: "شكراً جزيلاً على معلوماتك القيمة. هل يمكن إضافة المزيد من الوصفات الصحية؟",
    article: { id: "2", title: "دليل شامل للتغذية الصحية", slug: "comprehensive-guide-healthy-nutrition" },
    articleCode: "A10049",
    date: "1446/12/3 هـ",
    status: "pending",
  },
  {
    id: "c3",
    commenter: { name: "نورة سعد", avatar: "/placeholder.svg?height=32&width=32" },
    comment: "بالتأكيد سأوصي أصدقائي بهذا المقال. شكراً لكم على جهودكم المبذولة.",
    article: { id: "1", title: "أهمية النشاط البدني للصحة القلبية", slug: "importance-of-physical-activity" },
    articleCode: "A10048",
    date: "1446/12/3 هـ",
    status: "approved",
  },
  {
    id: "c4",
    commenter: { name: "سليمان محمد", avatar: "/placeholder.svg?height=32&width=32" },
    comment: "هذه النصائح الغذائية مفيدة جداً. هل يمكن إضافة وصفات محددة لوجبات الإفطار؟",
    article: { id: "2", title: "دليل شامل للتغذية الصحية", slug: "comprehensive-guide-healthy-nutrition" },
    articleCode: "A10049",
    date: "1446/12/2 هـ",
    status: "pending",
  },
  {
    id: "c5",
    commenter: { name: "أحمد محمد", avatar: "/placeholder.svg?height=32&width=32" },
    comment: "شكراً جزيلاً على هذه المعلومات القيمة. استفدت كثيراً من هذا المقال.",
    article: { id: "3", title: "كيفية التعامل مع ضغط الدم المرتفع", slug: "managing-high-blood-pressure" },
    articleCode: "A10045",
    date: "1446/12/2 هـ",
    status: "approved",
  },
  {
    id: "c6",
    commenter: { name: "فاطمة علي", avatar: "/placeholder.svg?height=32&width=32" },
    comment: "هل يمكنني استخدام هذا الدواء مع مرضى السكري؟ أنا مصابة بالنوع الثاني.",
    article: { id: "5", title: "أعراض وعلاج التهاب المفاصل", slug: "arthritis-symptoms-treatment" },
    articleCode: "A10046",
    date: "1446/12/1 هـ",
    status: "pending",
  },
  {
    id: "c7",
    commenter: { name: "د. محمد أحمد", avatar: "/placeholder.svg?height=32&width=32" },
    comment: "شكراً على معلوماتك القيمة. سأطبق هذه الإرشادات في عيادتي.",
    article: { id: "8", title: "الإسعافات الأولية الأساسية التي يجب أن يعرفها الجميع", slug: "basic-first-aid" },
    articleCode: "A10047",
    date: "1446/12/1 هـ",
    status: "approved",
  },
  {
    id: "c8",
    commenter: { name: "خالد عبدالله", avatar: "/placeholder.svg?height=32&width=32" },
    comment: "المقال يحتوي على معلومات غير دقيقة. الفيتامينات المذكورة لا تتوافق مع توصيات منظمة الصحة العالمية.",
    article: { id: "9", title: "أهمية التطعيمات للأطفال والبالغين", slug: "importance-of-vaccinations" },
    articleCode: "A10047",
    date: "1446/11/29 هـ",
    status: "rejected",
  },
  {
    id: "c9",
    commenter: { name: "ليلى عبدالرحمن", avatar: "/placeholder.svg?height=32&width=32" },
    comment: "محتوى غير لائق وخارج عن موضوع المقال. أرجو حذف هذا التعليق.",
    article: { id: "4", title: "الوقاية من السكري من النوع الثاني", slug: "preventing-type2-diabetes" },
    articleCode: "A10050",
    date: "1446/11/28 هـ",
    status: "flagged",
  },
]

export const getCommentStats = (): CommentStats => {
  const totalComments = dummyComments.length
  const commentsToday = dummyComments.filter((c) => c.date === "1446/12/3 هـ").length // Assuming "today" is 1446/12/3 for dummy data
  const publishedComments = dummyComments.filter((c) => c.status === "approved").length
  const flaggedComments = dummyComments.filter((c) => c.status === "flagged").length

  return {
    totalComments,
    commentsToday,
    publishedComments,
    flaggedComments,
  }
}

export const getArticleTitles = () => {
  return dummyArticles.map((article) => ({
    value: article.id,
    label: article.title,
  }))
}
