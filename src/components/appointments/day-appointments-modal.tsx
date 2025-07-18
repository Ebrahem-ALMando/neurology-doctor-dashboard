"use client"
import { Calendar, Clock, User, Phone, FileText, X, Edit, Bell, Eye } from "lucide-react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"

interface Appointment {
  date: number
  time: string
  patient: string
  status: "confirmed" | "pending" | "cancelled"
  phone?: string
  visitType?: string
  notes?: string
}

interface DayAppointmentsModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  selectedDay: number | null
  appointments: Appointment[]
  monthName: string
}

export function DayAppointmentsModal({
  open,
  onOpenChange,
  selectedDay,
  appointments,
  monthName,
}: DayAppointmentsModalProps) {
  const dayAppointments = appointments.filter((apt) => apt.date === selectedDay)

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

  const getStatusColor = (status: string) => {
    switch (status) {
      case "confirmed":
        return "border-l-emerald-500 bg-emerald-50 dark:bg-emerald-950/20"
      case "pending":
        return "border-l-amber-500 bg-amber-50 dark:bg-amber-950/20"
      case "cancelled":
        return "border-l-rose-500 bg-rose-50 dark:bg-rose-950/20"
      default:
        return "border-l-gray-500 bg-gray-50 dark:bg-gray-950/20"
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle className="flex items-center gap-3 text-xl">
              <div className="rounded-lg bg-gradient-to-br from-violet-500 to-purple-600 p-2 text-white">
                <Calendar className="h-5 w-5" />
              </div>
              مواعيد يوم {selectedDay} {monthName}
            </DialogTitle>
            <Button variant="ghost" size="icon" onClick={() => onOpenChange(false)} className="h-8 w-8 rounded-full">
              <X className="h-4 w-4" />
            </Button>
          </div>
          <DialogDescription className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-violet-600" />
            {dayAppointments.length > 0
              ? `${dayAppointments.length} موعد مجدول لهذا اليوم`
              : "لا توجد مواعيد مجدولة لهذا اليوم"}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 mt-6">
          {dayAppointments.length > 0 ? (
            <>
              {/* إحصائيات سريعة */}
              <div className="grid grid-cols-3 gap-3 mb-6">
                <div className="text-center p-3 bg-emerald-50 dark:bg-emerald-950/30 rounded-lg border border-emerald-200 dark:border-emerald-800">
                  <div className="text-lg font-bold text-emerald-700 dark:text-emerald-400">
                    {dayAppointments.filter((apt) => apt.status === "confirmed").length}
                  </div>
                  <div className="text-xs text-emerald-600 dark:text-emerald-500">مؤكد</div>
                </div>
                <div className="text-center p-3 bg-amber-50 dark:bg-amber-950/30 rounded-lg border border-amber-200 dark:border-amber-800">
                  <div className="text-lg font-bold text-amber-700 dark:text-amber-400">
                    {dayAppointments.filter((apt) => apt.status === "pending").length}
                  </div>
                  <div className="text-xs text-amber-600 dark:text-amber-500">انتظار</div>
                </div>
                <div className="text-center p-3 bg-rose-50 dark:bg-rose-950/30 rounded-lg border border-rose-200 dark:border-rose-800">
                  <div className="text-lg font-bold text-rose-700 dark:text-rose-400">
                    {dayAppointments.filter((apt) => apt.status === "cancelled").length}
                  </div>
                  <div className="text-xs text-rose-600 dark:text-rose-500">ملغي</div>
                </div>
              </div>

              <Separator />

              {/* قائمة المواعيد */}
              <div className="space-y-3">
                {dayAppointments
                  .sort((a, b) => a.time.localeCompare(b.time))
                  .map((appointment, index) => (
                    <Card
                      key={index}
                      className={`border-l-4 ${getStatusColor(appointment.status)} hover:shadow-md transition-all duration-200`}
                    >
                      <CardContent className="p-4">
                        <div className="flex items-start justify-between">
                          <div className="flex-1 space-y-2">
                            {/* معلومات المريض والوقت */}
                            <div className="flex items-center gap-4">
                              <div className="flex items-center gap-2">
                                <User className="h-4 w-4 text-violet-600" />
                                <span className="font-semibold text-gray-900 dark:text-gray-100">
                                  {appointment.patient}
                                </span>
                              </div>
                              <div className="flex items-center gap-2">
                                <Clock className="h-4 w-4 text-gray-500" />
                                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                  {appointment.time}
                                </span>
                              </div>
                            </div>

                            {/* نوع الزيارة */}
                            {appointment.visitType && (
                              <div className="flex items-center gap-2">
                                <FileText className="h-4 w-4 text-gray-500" />
                                <span className="text-sm text-gray-600 dark:text-gray-400">
                                  {appointment.visitType}
                                </span>
                              </div>
                            )}

                            {/* رقم الهاتف */}
                            {appointment.phone && (
                              <div className="flex items-center gap-2">
                                <Phone className="h-4 w-4 text-gray-500" />
                                <span className="text-sm text-gray-600 dark:text-gray-400">{appointment.phone}</span>
                              </div>
                            )}

                            {/* الملاحظات */}
                            {appointment.notes && (
                              <div className="mt-2 p-2 bg-gray-50 dark:bg-gray-800 rounded-md">
                                <p className="text-sm text-gray-600 dark:text-gray-400">{appointment.notes}</p>
                              </div>
                            )}
                          </div>

                          {/* الحالة والإجراءات */}
                          <div className="flex flex-col items-end gap-2">
                            {getStatusBadge(appointment.status)}
                            <div className="flex items-center gap-1">
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-7 w-7 text-amber-600 hover:text-amber-700 hover:bg-amber-100 dark:hover:bg-amber-900/20 rounded-full"
                                title="إشعار"
                              >
                                <Bell className="h-3 w-3" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-7 w-7 text-blue-600 hover:text-blue-700 hover:bg-blue-100 dark:hover:bg-blue-900/20 rounded-full"
                                title="تعديل"
                              >
                                <Edit className="h-3 w-3" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-7 w-7 text-green-600 hover:text-green-700 hover:bg-green-100 dark:hover:bg-green-900/20 rounded-full"
                                title="عرض"
                              >
                                <Eye className="h-3 w-3" />
                              </Button>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
              </div>
            </>
          ) : (
            /* رسالة عدم وجود مواعيد */
            <div className="text-center py-12">
              <div className="rounded-full bg-gray-100 dark:bg-gray-800 p-6 w-24 h-24 mx-auto mb-4 flex items-center justify-center">
                <Calendar className="h-12 w-12 text-gray-400" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">لا توجد مواعيد مجدولة</h3>
              <p className="text-gray-500 dark:text-gray-400 mb-4">
                لا توجد مواعيد مجدولة لهذا اليوم. يمكنك إضافة موعد جديد.
              </p>
              <Button className="bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700">
                إضافة موعد جديد
              </Button>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
