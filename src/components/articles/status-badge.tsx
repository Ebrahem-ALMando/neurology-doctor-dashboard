import { Badge } from "@/components/ui/badge"
import { CheckCircle, Clock } from "lucide-react"

const StatusBadge = ({is_published}: {is_published: boolean}) => {
    return is_published ? (
        <Badge className="bg-gradient-to-r from-emerald-500 to-emerald-600 text-white border-0 shadow-lg px-3 py-1.5 text-xs font-medium rounded-full flex items-center gap-1.5 hover:from-emerald-600 hover:to-emerald-700 transition-all duration-200">
            <CheckCircle className="h-3 w-3" />
            منشور
        </Badge>
    ) : (
        <Badge className="bg-gradient-to-r from-amber-500 to-orange-500 text-white border-0 shadow-lg px-3 py-1.5 text-xs font-medium rounded-full flex items-center gap-1.5 hover:from-amber-600 hover:to-orange-600 transition-all duration-200">
            <Clock className="h-3 w-3" />
            مسودة
        </Badge>
    )
}

export default StatusBadge