"use client"

import { useState } from "react"
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { PieChartIcon, TrendingUp } from "lucide-react"

const data = [
  { name: "مؤكد", value: 4, color: "#10b981", lightColor: "#34d399", darkColor: "#059669" },
  { name: "قيد الانتظار", value: 2, color: "#f59e0b", lightColor: "#fbbf24", darkColor: "#d97706" },
  { name: "ملغي", value: 1, color: "#ef4444", lightColor: "#f87171", darkColor: "#dc2626" },
]

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload
    return (
      <div className="bg-white dark:bg-gray-800 p-3 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 text-right">
        <p className="text-sm font-medium text-gray-900 dark:text-gray-100">{data.name}</p>
        <p className="text-sm font-semibold" style={{ color: data.color }}>
          {`${data.value} مواعيد`}
        </p>
        <p className="text-xs text-gray-500 dark:text-gray-400">
          {`${((data.value / data.total) * 100).toFixed(1)}% من المجموع`}
        </p>
      </div>
    )
  }
  return null
}

export function AppointmentsChart() {
  const [timeRange, setTimeRange] = useState("week")

  // Calculate total for percentage
  const total = data.reduce((sum, item) => sum + item.value, 0)
  const dataWithTotal = data.map((item) => ({ ...item, total }))
  const COLORS = ["#10b981", "#f59e0b", "#ef4444"]
  return (
    <Card className="overflow-hidden border-0 shadow-lg dark:shadow-gray-900/20 bg-white dark:bg-gray-900 ">
      <CardHeader className="flex flex-col items-center justify-between pb-4 border-b border-gray-200 dark:border-gray-700 bg-gradient-to-r from-violet-50 to-purple-50 dark:from-violet-950/30 dark:to-purple-950/30">
        <div className="flex items-center gap-3 min-w-0 flex-1">
          <div className="rounded-xl bg-violet-100 dark:bg-violet-900/50 p-2.5 text-violet-600 dark:text-violet-400 flex-shrink-0 shadow-sm">
            <PieChartIcon className="h-5 w-5" />
          </div>
          <div className="min-w-0 flex-1">
            <CardTitle className="text-lg font-semibold flex items-center gap-2 truncate text-gray-900 dark:text-gray-100">
              توزيع المرضى
              <TrendingUp className="h-4 w-4 text-emerald-500 dark:text-emerald-400" />
            </CardTitle>
            <CardDescription className="text-sm truncate text-gray-600 dark:text-gray-400">
              حسب الحالة - المجموع: {total} مواعيد
            </CardDescription>
          </div>
        </div>
        <Select defaultValue={timeRange} onValueChange={setTimeRange}>
          <SelectTrigger className="w-[120px] border-violet-200 dark:border-violet-700 focus:ring-violet-500 flex-shrink-0 bg-white dark:bg-gray-800">
            <SelectValue placeholder="الفترة" />
          </SelectTrigger>
          <SelectContent className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
            <SelectItem value="week">أسبوع</SelectItem>
            <SelectItem value="month">شهر</SelectItem>
            <SelectItem value="year">سنة</SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>

      <CardContent className="p-6 bg-white dark:bg-gray-900">
      
        <div className="relative">
          <ResponsiveContainer width="100%" height={220}>
            <PieChart>
              <defs>
                {dataWithTotal.map((entry, index) => (
                  <linearGradient key={`gradient-${index}`} id={`gradient-${index}`} x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor={entry.lightColor} stopOpacity={0.9} />
                    <stop offset="50%" stopColor={entry.color} stopOpacity={0.8} />
                    <stop offset="100%" stopColor={entry.darkColor} stopOpacity={0.7} />
                  </linearGradient>
                ))}
              </defs>
<Pie
  data={dataWithTotal}
  cx="50%"
  cy="50%"
  fill="#ede9fe"
  outerRadius={100}
  innerRadius={60}
  dataKey="value"
  labelLine={false}
  paddingAngle={2}
 
>
  {dataWithTotal.map((entry, index) => (
    <Cell
      key={`cell-${index}`}
      fill={entry.color} 
      className="hover:opacity-80 transition-opacity duration-200"
    />
  ))}
</Pie>




              <Tooltip content={<CustomTooltip />} />
            </PieChart>
          </ResponsiveContainer>

          {/* Center text */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900 dark:text-gray-100">{total}</div>
              <div className="text-xs text-gray-500 dark:text-gray-400">إجمالي المواعيد</div>
            </div>
          </div>
        </div>

        {/* Enhanced Legend with statistics */}
        <div className="mt-6 space-y-3 border-t border-gray-200 dark:border-gray-700 pt-4">
          {dataWithTotal.map((item, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-2 rounded-lg bg-gray-50 dark:bg-gray-800/50 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              <div className="flex items-center gap-3">
                <div
                  className="w-4 h-4 rounded-full shadow-sm border-2 border-white dark:border-gray-700"
                  style={{
                    background: `linear-gradient(135deg, ${item.lightColor}, ${item.darkColor})`,
                  }}
                />
                <span className="text-sm font-medium text-gray-900 dark:text-gray-100">{item.name}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm font-semibold text-gray-900 dark:text-gray-100">{item.value}</span>
                <span className="text-xs text-gray-500 dark:text-gray-400 bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded-full">
                  {((item.value / total) * 100).toFixed(0)}%
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Quick stats */}
        <div className="mt-4 grid grid-cols-2 gap-3">
          <div className="text-center p-3 bg-emerald-50 dark:bg-emerald-950/30 rounded-lg border border-emerald-200 dark:border-emerald-800">
            <div className="text-lg font-bold text-emerald-700 dark:text-emerald-400">
              {((dataWithTotal[0].value / total) * 100).toFixed(0)}%
            </div>
            <div className="text-xs text-emerald-600 dark:text-emerald-500">معدل التأكيد</div>
          </div>
          <div className="text-center p-3 bg-violet-50 dark:bg-violet-950/30 rounded-lg border border-violet-200 dark:border-violet-800">
            <div className="text-lg font-bold text-violet-700 dark:text-violet-400">
              {dataWithTotal[0].value + dataWithTotal[1].value}
            </div>
            <div className="text-xs text-violet-600 dark:text-violet-500">مواعيد نشطة</div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
