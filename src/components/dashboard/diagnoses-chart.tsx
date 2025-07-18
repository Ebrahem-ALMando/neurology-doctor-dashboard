"use client"

import { useState } from "react"
import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis, CartesianGrid } from "recharts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ActivitySquare } from "lucide-react"

const data = [
  {
    month: "يناير",
    diagnoses: 40,
  },
  {
    month: "فبراير",
    diagnoses: 35,
  },
  {
    month: "مارس",
    diagnoses: 50,
  },
  {
    month: "أبريل",
    diagnoses: 32,
  },
  {
    month: "مايو",
    diagnoses: 45,
  },
  {
    month: "يونيو",
    diagnoses: 62,
  },
]

export function DiagnosesChart() {
  const [timeRange, setTimeRange] = useState("month")

  return (
    <Card className="overflow-hidden w-full">
      <CardHeader className="flex flex-row items-center justify-between pb-2 border-b">
        <div className="flex items-center gap-2">
          <div className="rounded-full bg-violet-100 dark:bg-violet-900/30 p-1.5 text-violet-600 dark:text-violet-400">
            <ActivitySquare className="h-4 w-4" />
          </div>
          <div>
            <CardTitle className="text-lg font-medium">التشخيصات الأكثر شيوعاً</CardTitle>
            <CardDescription>عدد التشخيصات الشهرية</CardDescription>
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
            <LineChart data={data} margin={{ top: 5, right: 10, left: 10, bottom: 5 }}>
              <defs>
                <linearGradient id="diagnosesGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
              <XAxis dataKey="month" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
              <YAxis
                stroke="#888888"
                fontSize={12}
                tickLine={false}
                axisLine={false}
                tickFormatter={(value) => `${value}`}
              />
              <Tooltip
                contentStyle={{
                  borderRadius: "8px",
                  border: "1px solid #e2e8f0",
                  boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
                  textAlign: "right",
                  direction: "rtl",
                }}
              />
              <Line
                type="monotone"
                dataKey="diagnoses"
                stroke="#8b5cf6"
                strokeWidth={3}
                dot={{ r: 4, strokeWidth: 2, fill: "white" }}
                activeDot={{ r: 6, fill: "#8b5cf6" }}
                fillOpacity={1}
                fill="url(#diagnosesGradient)"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}
