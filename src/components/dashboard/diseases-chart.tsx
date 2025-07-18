"use client"

import { useState } from "react"
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { BarChart3, TrendingUp } from "lucide-react"

const data = [
  { name: "ارتفاع ضغط الدم", value: 40, color: "#8b5cf6" },
  { name: "السكري", value: 30, color: "#06b6d4" },
  { name: "النوبات القلبية", value: 20, color: "#f59e0b" },
  { name: "الذبحة الصدرية", value: 15, color: "#ef4444" },
  { name: "التهاب المفاصل", value: 10, color: "#10b981" },
]

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white dark:bg-gray-800 p-3 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 text-right">
        <p className="text-sm font-medium text-gray-900 dark:text-gray-100">{label}</p>
        <p className="text-sm text-violet-600 dark:text-violet-400">{`عدد الحالات: ${payload[0].value}`}</p>
      </div>
    )
  }
  return null
}

export function DiseasesChart() {
  const [timeRange, setTimeRange] = useState("month")

  return (
    <Card className="overflow-hidden border-0 shadow-md w-full">
      <CardHeader className="flex flex-row items-center justify-between pb-4 border-b bg-gradient-to-r from-violet-50 to-purple-50 dark:from-violet-950/20 dark:to-purple-950/20">
        <div className="flex items-center gap-3 min-w-0 flex-1">
          <div className="rounded-xl bg-violet-100 dark:bg-violet-900/30 p-2 text-violet-600 dark:text-violet-400 flex-shrink-0">
            <BarChart3 className="h-5 w-5" />
          </div>
          <div className="min-w-0 flex-1">
            <CardTitle className="text-lg font-semibold flex items-center gap-2 truncate">
              إحصائيات المرضى
              <TrendingUp className="h-4 w-4 text-emerald-500 flex-shrink-0" />
            </CardTitle>
            <CardDescription className="text-sm truncate">الأمراض الشائعة بين المرضى</CardDescription>
          </div>
        </div>
        <Select defaultValue={timeRange} onValueChange={setTimeRange}>
          <SelectTrigger className="w-[120px] border-violet-200 focus:ring-violet-500 flex-shrink-0">
            <SelectValue placeholder="الفترة" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="week">أسبوع</SelectItem>
            <SelectItem value="month">شهر</SelectItem>
            <SelectItem value="year">سنة</SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>

      <CardContent className="p-6 overflow-hidden">
        <div className="h-[450px] w-full" dir="rtl">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={data}
              layout="vertical"
              margin={{ top: 20, right: 10, left: 80, bottom: 20 }}
              barCategoryGap="20%"
            >
              <defs>
                {data.map((item, index) => (
                  <linearGradient key={index} id={`gradient-${index}`} x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor={item.color} stopOpacity={0.8} />
                    <stop offset="100%" stopColor={item.color} stopOpacity={0.4} />
                  </linearGradient>
                ))}
              </defs>

              <CartesianGrid strokeDasharray="3 3" horizontal={false} vertical={true} stroke="#e2e8f0" opacity={0.5} />

              <XAxis
                type="number"
                stroke="#6b7280"
                fontSize={12}
                tickLine={false}
                axisLine={false}
                domain={[0, "dataMax + 5"]}
                orientation="bottom"
              />
              <YAxis
                dataKey="name"
                type="category"
                width={70}
                tick={{
                  fontSize: 11,
                  fill: "#374151",
                  textAnchor: "start",
                  direction: "rtl",
                }}
                tickLine={false}
                axisLine={false}
                interval={0}
                orientation="left"
              />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="value" fill="#8b5cf6" radius={[0, 6, 6, 0]} barSize={35} animationDuration={1200} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* الملخص */}
        <div className="mt-6 pt-4 border-t overflow-hidden">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-2 md:gap-4">
            {data.map((item, index) => (
              <div key={index} className="text-center p-2 rounded-lg bg-gray-50 dark:bg-gray-800/50 min-w-0">
                <div className="text-xs text-muted-foreground truncate" title={item.name}>
                  {item.name}
                </div>
                <div className="text-sm font-semibold" style={{ color: item.color }}>
                  {item.value}
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
