import { Skeleton } from "@/components/ui/skeleton"
import { Table, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

export function CommentsLoadingSkeleton({ rows = 5 }: { rows?: number }) {
  return (
    <>
    
<Table className="w-full">
<TableHeader>
  <TableRow className="bg-muted/50">
    <TableHead className="w-[80px] text-right text-blue-600">#</TableHead>
    <TableHead className="w-[150px] text-right">المعلق</TableHead>
    <TableHead className="w-[300px] text-right">التعليق</TableHead>
    <TableHead className="w-[200px] text-right">اسم المقال</TableHead>
    <TableHead className="w-[120px] text-right">عدد الردود</TableHead>
    <TableHead className="w-[120px] text-right">نوع التعليق</TableHead>
    <TableHead className="w-[180px] text-right">التاريخ</TableHead>
    <TableHead className="w-[150px] text-right">الإجراءات</TableHead>
  </TableRow>
</TableHeader>
    {Array.from({ length: rows }).map((_, index) => (
        <TableRow key={index} className="w-full">
             <TableCell className="text-right">
            <Skeleton className="w-8 h-8" />
          </TableCell>
          <TableCell className="font-medium">
            <div className="flex items-center justify-end gap-2">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-8 w-8 rounded-full" />
            </div>
          </TableCell>
          <TableCell className="text-right">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="mt-1 h-4 w-3/4" />
          </TableCell>
          <TableCell className="text-right">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="mt-1 h-4 w-3/4" />
          </TableCell>
          <TableCell className="text-right">
            <Skeleton className="h-4 w-32" />
            <Skeleton className="mt-1 h-3 w-20" />
          </TableCell>
          <TableCell className="text-right">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="mt-1 h-3 w-16" />
          </TableCell>
          <TableCell className="text-right">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="mt-1 h-4 w-3/4" />
          </TableCell>
          <TableCell className="text-right">
            <div className="flex items-center justify-end gap-1">
              <Skeleton className="h-8 w-8 rounded-md" />
              <Skeleton className="h-8 w-8 rounded-md" />
              <Skeleton className="h-8 w-8 rounded-md" />
              <Skeleton className="h-8 w-8 rounded-md" />
              <Skeleton className="h-8 w-8 rounded-md" />
            </div>
          </TableCell>
        </TableRow>
             ))}
        </Table>
 
    </>
  )
}
