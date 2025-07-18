"use client"

import { useState } from "react"
import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors } from "@dnd-kit/core"
import { arrayMove, SortableContext, rectSortingStrategy, sortableKeyboardCoordinates } from "@dnd-kit/sortable"
import { ChartWidget } from "./chart-widget"

interface ChartsGridProps {
  visibility: {
    diagnosesChart: boolean
    attendanceChart: boolean
    diseasesChart: boolean
  }
}

export function ChartsGrid({ visibility }: ChartsGridProps) {
  const [chartOrder, setChartOrder] = useState(["diagnoses", "attendance", "diseases"])

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  )

  const handleDragEnd = (event: any) => {
    const { active, over } = event

    if (active.id !== over?.id) {
      setChartOrder((items) => {
        const oldIndex = items.indexOf(active.id)
        const newIndex = items.indexOf(over.id)
        return arrayMove(items, oldIndex, newIndex)
      })
    }
  }

  const visibleCharts = chartOrder.filter((chart) => {
    switch (chart) {
      case "diagnoses":
        return visibility.diagnosesChart
      case "attendance":
        return visibility.attendanceChart
      case "diseases":
        return visibility.diseasesChart
      default:
        return false
    }
  })

  if (visibleCharts.length === 0) return null

  return (
    <div className="w-full overflow-x-hidden">
      <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext items={visibleCharts} strategy={rectSortingStrategy}>
          <div className="space-y-6 w-full">
            {/* Top row - two charts side by side */}
            {visibleCharts.length >= 2 && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 w-full">
                <div className="w-full min-w-0">
                  <ChartWidget id={visibleCharts[0]} type={visibleCharts[0] as any} />
                </div>
                <div className="w-full min-w-0">
                  <ChartWidget id={visibleCharts[1]} type={visibleCharts[1] as any} />
                </div>
              </div>
            )}

            {/* Single chart on top if only one visible */}
            {visibleCharts.length === 1 && (
              <div className="w-full">
                <ChartWidget id={visibleCharts[0]} type={visibleCharts[0] as any} />
              </div>
            )}

            {/* Bottom row - full width chart */}
            {visibleCharts.length >= 3 && (
              <div className="w-full">
                <ChartWidget id={visibleCharts[2]} type={visibleCharts[2] as any} />
              </div>
            )}
          </div>
        </SortableContext>
      </DndContext>
    </div>
  )
}
