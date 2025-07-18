"use client"

import { useState } from "react"
import { Eye, Edit, Bell, Filter, ChevronLeft, ChevronRight, Calendar, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { AddAppointmentModal } from "./add-appointment-modal"

const appointments = [
  {
    id: "1",
    patientName: "أحمد محمد",
    date: "1446/12/2 هـ",
    time: "09:00",
    visitType: "فحص دوري",
    status: "confirmed",
  },
  {
    id: "2",
    patientName: "سارة خالد",
    date: "1446/12/2 هـ",
    time: "10:30",
    visitType: "متابعة",
    status: "confirmed",
  },
  {
    id: "3",
    patientName: "محمد علي",
    date: "1446/12/2 هـ",
    time: "14:45",
    visitType: "استشارة",
    status: "confirmed",
  },
  {
    id: "4",
    patientName: "فاطمة أحمد",
    date: "1446/12/3 هـ",
    time: "11:15",
    visitType: "فحص أولي",
    status: "pending",
  },
  {
    id: "5",
    patientName: "خالد عبدالله",
    date: "1446/12/3 هـ",
    time: "13:00",
    visitType: "مراجعة نتائج",
    status: "cancelled",
  },
  {
    id: "6",
    patientName: "نورة سعيد",
    date: "1446/12/4 هـ",
    time: "09:30",
    visitType: "استشارة",
    status: "confirmed",
  },
  {
    id: "7",
    patientName: "عبدالرحمن محمد",
    date: "1446/12/4 هـ",
    time: "12:00",
    visitType: "فحص دوري",
    status: "pending",
  },
]

export function AppointmentsTable() {
  const [currentPage, setCurrentPage] = useState(1)
  const [searchTerm, setSearchTerm] = useState("")
  const itemsPerPage = 7

  const filteredAppointments = appointments.filter(
    (appointment) => appointment.patientName.includes(searchTerm) || appointment.visitType.includes(searchTerm),
  )

  const totalPages = Math.ceil(filteredAppointments.length / itemsPerPage)
  const currentAppointments = filteredAppointments.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "confirmed":
        return (
          <Badge className="bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800">
            مؤكد
          </Badge>
        )
      case "pending":
        return (
          <Badge className="bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400 border border-amber-200 dark:border-amber-800">
            قيد الانتظار
          </Badge>
        )
      case "cancelled":
        return (
          <Badge className="bg-rose-100 text-rose-700 dark:bg-rose-900/30 dark:text-rose-400 border border-rose-200 dark:border-rose-800">
            ملغي
          </Badge>
        )
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  return (
    <Card className="overflow-hidden border-0 shadow-md">
      <CardHeader className="flex flex-row items-center justify-between border-b bg-gradient-to-r from-violet-50 to-purple-50 dark:from-violet-950/20 dark:to-purple-950/20">
        <div className="flex items-center gap-3 min-w-0 flex-1">
          <div className="rounded-xl bg-violet-100 dark:bg-violet-900/30 p-2 text-violet-600 dark:text-violet-400 flex-shrink-0">
            <Calendar className="h-5 w-5" />
          </div>
          <CardTitle className="text-lg font-semibold">قائمة المواعيد</CardTitle>
        </div>
        <div className="flex items-center gap-2">
          <div className="relative w-full max-w-sm hidden md:block">
            <Input
              type="search"
              placeholder="بحث..."
              className="pr-8 w-[200px] rounded-full bg-muted/50 focus-visible:ring-violet-500 text-sm"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Filter className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          </div>
          <AddAppointmentModal
            trigger={
              <Button variant="default" size="sm" className="gap-2 bg-violet-600 hover:bg-violet-700">
                <Plus className="h-4 w-4" />
                موعد جديد
              </Button>
            }
          />
        </div>
      </CardHeader>

      <CardContent className="p-0">
        <div className="table-container">
          <Table>
            <TableHeader className="bg-muted/50">
              <TableRow>
                <TableHead className="text-center">اسم المريض</TableHead>
                <TableHead className="text-center">التاريخ</TableHead>
                <TableHead className="text-center">الوقت</TableHead>
                <TableHead className="text-center">سبب الزيارة</TableHead>
                <TableHead className="text-center">الحالة</TableHead>
                <TableHead className="text-center">الإجراءات</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {currentAppointments.map((appointment) => (
                <TableRow key={appointment.id} className="hover:bg-muted/30 transition-colors">
                  <TableCell className="font-medium text-center">{appointment.patientName}</TableCell>
                  <TableCell className="text-center text-sm">{appointment.date}</TableCell>
                  <TableCell className="text-center text-sm">{appointment.time}</TableCell>
                  <TableCell className="text-center text-sm">{appointment.visitType}</TableCell>
                  <TableCell className="text-center">{getStatusBadge(appointment.status)}</TableCell>
                  <TableCell className="text-center">
                    <div className="flex items-center justify-center gap-1">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-amber-600 hover:text-amber-700 hover:bg-amber-100 dark:hover:bg-amber-900/20 rounded-full"
                        title="إشعار"
                      >
                        <Bell className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-blue-600 hover:text-blue-700 hover:bg-blue-100 dark:hover:bg-blue-900/20 rounded-full"
                        title="تعديل"
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-green-600 hover:text-green-700 hover:bg-green-100 dark:hover:bg-green-900/20 rounded-full"
                        title="عرض"
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between p-4 border-t">
          <div className="text-sm text-muted-foreground">
            عرض {currentAppointments.length} من أصل {filteredAppointments.length} موعد
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
            >
              <ChevronRight className="h-4 w-4 ml-1" />
              السابق
            </Button>
            {Array.from({ length: Math.min(totalPages, 3) }).map((_, i) => {
              const pageNumber = i + 1
              return (
                <Button
                  key={i}
                  variant={currentPage === pageNumber ? "default" : "outline"}
                  size="sm"
                  onClick={() => setCurrentPage(pageNumber)}
                  className={currentPage === pageNumber ? "bg-violet-600 hover:bg-violet-700" : ""}
                >
                  {pageNumber}
                </Button>
              )
            })}
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
              disabled={currentPage === totalPages}
            >
              التالي
              <ChevronLeft className="h-4 w-4 mr-1" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
