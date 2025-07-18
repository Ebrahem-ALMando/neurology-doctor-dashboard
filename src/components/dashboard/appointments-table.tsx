"use client"

import { Eye, Edit, Trash2, Calendar, CalendarClock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"

interface Appointment {
  id: string
  patientName: string
  date: string
  time: string
  status: "confirmed" | "pending" | "cancelled"
  type: string
}

const appointments: Appointment[] = [
  {
    id: "1",
    patientName: "أحمد محمد",
    date: "٢٩ مايو ٢٠٢٥",
    time: "٩:٠٠ ص",
    status: "confirmed",
    type: "فحص دوري",
  },
  {
    id: "2",
    patientName: "سارة خالد",
    date: "٢٩ مايو ٢٠٢٥",
    time: "١:٣٠ م",
    status: "confirmed",
    type: "استشارة",
  },
  {
    id: "3",
    patientName: "محمد علي",
    date: "٢٩ مايو ٢٠٢٥",
    time: "٣:٤٥ م",
    status: "confirmed",
    type: "متابعة",
  },
]

export function AppointmentsTable() {
  return (
    <Card className="overflow-hidden w-full">
      <CardHeader className="flex flex-row items-center justify-between border-b">
        <CardTitle className="text-lg font-medium flex items-center gap-2">
          <CalendarClock className="h-5 w-5 text-violet-600" />
          المواعيد القادمة
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <div className="table-container">
          <Table className="w-full">
            <TableHeader className="bg-muted/50">
              <TableRow>
                <TableHead className="text-center w-[25%] min-w-[120px]">اسم المريض</TableHead>
                <TableHead className="text-center w-[20%] min-w-[100px]">التاريخ</TableHead>
                <TableHead className="text-center w-[15%] min-w-[80px]">الوقت</TableHead>
                <TableHead className="text-center w-[20%] min-w-[100px] hidden sm:table-cell">نوع الزيارة</TableHead>
                <TableHead className="text-center w-[15%] min-w-[80px]">الحالة</TableHead>
                <TableHead className="text-center w-[20%] min-w-[100px]">الإجراءات</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {appointments.map((appointment) => (
                <TableRow key={appointment.id} className="hover:bg-muted/30 transition-colors">
                  <TableCell className="font-medium text-center text-sm p-2">{appointment.patientName}</TableCell>
                  <TableCell className="text-center text-xs p-2">{appointment.date}</TableCell>
                  <TableCell className="text-center text-xs p-2">{appointment.time}</TableCell>
                  <TableCell className="text-center text-xs p-2 hidden sm:table-cell">{appointment.type}</TableCell>
                  <TableCell className="text-center p-2">
                    <Badge
                      variant="outline"
                      className={`text-xs px-1 py-0.5 ${
                        appointment.status === "confirmed"
                          ? "border-emerald-500 bg-emerald-50 text-emerald-700 dark:bg-emerald-950/20 dark:text-emerald-400"
                          : appointment.status === "pending"
                            ? "border-amber-500 bg-amber-50 text-amber-700 dark:bg-amber-950/20 dark:text-amber-400"
                            : "border-rose-500 bg-rose-50 text-rose-700 dark:bg-rose-950/20 dark:text-rose-400"
                      }`}
                    >
                      {appointment.status === "confirmed"
                        ? "مؤكد"
                        : appointment.status === "pending"
                          ? "انتظار"
                          : "ملغي"}
                    </Badge>
                  </TableCell>
                  <TableCell className="p-2">
                    <div className="flex items-center justify-center gap-1">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="rounded-full h-6 w-6 text-sky-600 hover:text-sky-700 hover:bg-sky-100 dark:hover:bg-sky-900/20"
                      >
                        <Eye className="h-3 w-3" />
                        <span className="sr-only">عرض</span>
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="rounded-full h-6 w-6 text-amber-600 hover:text-amber-700 hover:bg-amber-100 dark:hover:bg-amber-900/20"
                      >
                        <Edit className="h-3 w-3" />
                        <span className="sr-only">تعديل</span>
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="rounded-full h-6 w-6 text-rose-600 hover:text-rose-700 hover:bg-rose-100 dark:hover:bg-rose-900/20"
                      >
                        <Trash2 className="h-3 w-3" />
                        <span className="sr-only">حذف</span>
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between p-4 border-t bg-muted/20">
        <Button variant="outline" size="sm" className="gap-2 text-xs md:text-sm">
          <Calendar className="h-4 w-4" />
          <span className="hidden sm:inline">عرض كل المواعيد</span>
          <span className="sm:hidden">المواعيد</span>
        </Button>
      </CardFooter>
    </Card>
  )
}
