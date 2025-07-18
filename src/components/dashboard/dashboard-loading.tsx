"use client"

import { SkeletonCard } from "@/components/ui/skeleton-card"
import { SkeletonChart } from "@/components/ui/skeleton-chart"
import { SkeletonActivities } from "@/components/ui/skeleton-activities"
import { SkeletonTable } from "@/components/ui/skeleton-table"

export function DashboardLoading() {
  return (
    <div className="space-y-6">
      {/* KPI Cards Skeleton */}
      <div className="grid gap-4 md:grid-cols-3">
        <SkeletonCard />
        <SkeletonCard />
        <SkeletonCard />
      </div>

      {/* Recent Activities Skeleton */}
      <SkeletonActivities />

      {/* Charts Skeleton */}
      <div className="space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <SkeletonChart />
          <SkeletonChart />
        </div>
        <div className="grid grid-cols-1">
          <SkeletonChart height={350} />
        </div>
      </div>

      {/* Appointments Table Skeleton */}
      <SkeletonTable />
    </div>
  )
}
