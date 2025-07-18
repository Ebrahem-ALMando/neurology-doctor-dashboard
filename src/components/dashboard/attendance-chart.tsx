"use client"

import { useState } from "react"
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { PieChartIcon } from "lucide-react"

const data = [
  { name: "حضور", value: 85 },
  { name: "غياب", value: 15 },
]

const COLORS = ["#8b5cf6", "#e2e8f0"]

export function AttendanceChart() {
  const [timeRange, setTimeRange] = useState("month")

  return (
    <Card className="overflow-hidden w-full">
      <CardHeader className="flex flex-row items-center justify-between pb-2 border-b">
        <div className="flex items-center gap-2">
          <div className="rounded-full bg-violet-100 dark:bg-violet-900/30 p-1.5 text-violet-600 dark:text-violet-400">
            <PieChartIcon className="h-4 w-4" />
          </div>
          <div>
            <CardTitle className="text-lg font-medium">نسبة الحضور</CardTitle>
            <CardDescription>نسبة حضور المرضى للمواعيد</CardDescription>
          </div>
        </div>
        <Select defaultValue={timeRange} onValueChange={setTimeRange}>
          <SelectTrigger className="w-[120px]">
            <SelectValue placeholder="الفترة" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="week">أسبوع</SelectItem>
            <SelectItem value="month">شهر</SelectItem>
            <SelectItem value="year">سنة</SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent className="pt-6 pb-2">
        <div className="w-full h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={100}
                innerRadius={60}
                fill="#8884d8"
                dataKey="value"
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                paddingAngle={2}
              >
                {data.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                    stroke={index === 0 ? "#7c3aed" : "#cbd5e1"}
                    strokeWidth={2}
                  />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  borderRadius: "8px",
                  border: "1px solid #e2e8f0",
                  boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
                  textAlign: "right",
                  direction: "rtl",
                }}
              />
              <Legend
                layout="horizontal"
                verticalAlign="bottom"
                align="center"
                formatter={(value) => <span style={{ color: "#64748b", fontSize: "0.875rem" }}>{value}</span>}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}
