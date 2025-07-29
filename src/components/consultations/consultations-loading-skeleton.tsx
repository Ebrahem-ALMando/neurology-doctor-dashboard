"use client"

import { TableCell, TableRow } from "@/components/ui/table"
import { Skeleton } from "@/components/ui/skeleton"

interface ConsultationsLoadingSkeletonProps {
  rows?: number
}

export function ConsultationsLoadingSkeleton({ rows = 5 }: ConsultationsLoadingSkeletonProps) {
  return (
    <>
      {Array.from({ length: rows }).map((_, index) => (
        <TableRow key={index}>
          <TableCell>
            <div className="flex items-center gap-2">
              <Skeleton className="h-8 w-8 rounded-full" />
              <Skeleton className="h-4 w-24" />
            </div>
          </TableCell>
          <TableCell>
            <div className="flex flex-col gap-1">
              <Skeleton className="h-4 w-28" />
              <Skeleton className="h-3 w-20" />
            </div>
          </TableCell>
          <TableCell>
            <div className="flex items-center gap-1">
              <Skeleton className="h-4 w-4" />
              <Skeleton className="h-4 w-16" />
            </div>
          </TableCell>
          <TableCell>
            <Skeleton className="h-4 w-full" />
          </TableCell>
          <TableCell>
            <Skeleton className="h-4 w-16" />
          </TableCell>
          <TableCell>
            <div className="flex flex-col gap-1">
              <Skeleton className="h-4 w-20" />
              <Skeleton className="h-3 w-16" />
            </div>
          </TableCell>
          <TableCell>
            <Skeleton className="h-6 w-20 rounded-full" />
          </TableCell>
          <TableCell className="text-center">
            <div className="flex items-center justify-center gap-1">
              <Skeleton className="h-8 w-8 rounded-full" />
              <Skeleton className="h-8 w-8 rounded-full" />
              <Skeleton className="h-8 w-8 rounded-full" />
            </div>
          </TableCell>
        </TableRow>
      ))}
    </>
  )
}
