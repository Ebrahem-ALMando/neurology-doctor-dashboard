import { Badge } from "@/components/ui/badge"

 const StatusBadge = ({is_published}) => {
    return is_published ? (
        <Badge className="bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800">
            منشور
        </Badge>
    ) : (
        <Badge className="bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400 border border-amber-200 dark:border-amber-800">
            مسودة
        </Badge>
    )
}
export default StatusBadge