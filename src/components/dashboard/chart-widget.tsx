"use client"

import { useSortable } from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"
import { GripVertical } from "lucide-react"
import { DiagnosesChart } from "./diagnoses-chart"
import { AttendanceChart } from "./attendance-chart"
import { DiseasesChart } from "./diseases-chart"

interface ChartWidgetProps {
  id: string
  type: "diagnoses" | "attendance" | "diseases"
  className?: string
}

export function ChartWidget({ id, type, className }: ChartWidgetProps) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  }

  const renderChart = () => {
    switch (type) {
      case "diagnoses":
        return <DiagnosesChart />
      case "attendance":
        return <AttendanceChart />
      case "diseases":
        return <DiseasesChart />
      default:
        return null
    }
  }

  return (
    <div ref={setNodeRef} style={style} className={`relative group ${className}`}>
      <div
        className="absolute left-2 top-2 z-10 opacity-0 group-hover:opacity-100 cursor-move bg-background/80 p-1 rounded-md border shadow-sm transition-opacity"
        {...attributes}
        {...listeners}
      >
        <GripVertical className="h-4 w-4 text-muted-foreground" />
      </div>
      {renderChart()}
    </div>
  )
}
