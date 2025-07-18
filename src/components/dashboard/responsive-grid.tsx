"use client"

import type React from "react"

interface ResponsiveGridProps {
  children: React.ReactNode
  className?: string
}

export function ResponsiveGrid({ children, className = "" }: ResponsiveGridProps) {
  return <div className={`grid gap-4 md:gap-6 ${className}`}>{children}</div>
}
