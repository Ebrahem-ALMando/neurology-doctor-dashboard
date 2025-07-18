"use client"

import type React from "react"

import { useState } from "react"
import { Plus, Calendar, Clock, User, FileText,X } from "lucide-react"
import { Button } from "@/components/ui/button"

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface AddAppointmentModalProps {
  trigger?: React.ReactNode
}

export function AddAppointmentModal({ trigger }: AddAppointmentModalProps) {
  const [open, setOpen] = useState(false)
  const [formData, setFormData] = useState({
    patientName: "",
    date: "",
    time: "",
    visitType: "",
    notes: "",
    phone: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission here
    console.log("New appointment:", formData)
    setOpen(false)
    // Reset form
    setFormData({
      patientName: "",
      date: "",
      time: "",
      visitType: "",
      notes: "",
      phone: "",
    })
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger || (
          <Button className="gap-2 bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700">
            <Plus className="h-4 w-4" />
            موعد جديد
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-y-auto">


        <DialogClose asChild>
        <button
          className="absolute left-4 top-4 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-white z-10"
          aria-label="إغلاق"
        >
          <X className="h-5 w-5" />
        </button>
      </DialogClose>

        <DialogHeader>
          <DialogTitle className="relative flex items-center gap-2 text-xl pe-10">
      <div className="rounded-lg bg-gradient-to-br from-violet-500 to-purple-600 p-2 text-white">
        <Calendar className="h-5 w-5" />
      </div>
      إضافة موعد جديد
    </DialogTitle>

          <DialogDescription
           className="flex items-center gap-2"
          >قم بملء البيانات التالية لإضافة موعد جديد للمريض</DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid gap-4">
            {/* Patient Name */}
            <div className="space-y-2">
              <Label htmlFor="patientName" className="flex items-center gap-2">
                <User className="h-4 w-4 text-violet-600" />
                اسم المريض
              </Label>
              <Input
                id="patientName"
                placeholder="أدخل اسم المريض"
                value={formData.patientName}
                onChange={(e) => handleInputChange("patientName", e.target.value)}
                className="focus-visible:ring-violet-500"
                required
              />
            </div>

            {/* Phone */}
            <div className="space-y-2">
              <Label htmlFor="phone" className="flex items-center gap-2">
                <FileText className="h-4 w-4 text-violet-600" />
                رقم الهاتف
              </Label>
              <Input
                id="phone"
                placeholder="أدخل رقم الهاتف"
                value={formData.phone}
                onChange={(e) => handleInputChange("phone", e.target.value)}
                className="focus-visible:ring-violet-500"
              />
            </div>

            {/* Date and Time */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="date" className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-violet-600" />
                  التاريخ
                </Label>
                <Input
                  id="date"
                  type="date"
                  value={formData.date}
                  onChange={(e) => handleInputChange("date", e.target.value)}
                  className="focus-visible:ring-violet-500"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="time" className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-violet-600" />
                  الوقت
                </Label>
                <Input
                  id="time"
                  type="time"
                  value={formData.time}
                  onChange={(e) => handleInputChange("time", e.target.value)}
                  className="focus-visible:ring-violet-500"
                  required
                />
              </div>
            </div>

            {/* Visit Type */}
            <div className="space-y-2">
              <Label htmlFor="visitType" className="flex items-center gap-2">
                <FileText className="h-4 w-4 text-violet-600" />
                نوع الزيارة
              </Label>
              <Select value={formData.visitType} onValueChange={(value) => handleInputChange("visitType", value)}>
                <SelectTrigger className="focus:ring-violet-500">
                  <SelectValue placeholder="اختر نوع الزيارة" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="consultation">استشارة</SelectItem>
                  <SelectItem value="checkup">فحص دوري</SelectItem>
                  <SelectItem value="followup">متابعة</SelectItem>
                  <SelectItem value="emergency">طوارئ</SelectItem>
                  <SelectItem value="initial">فحص أولي</SelectItem>
                  <SelectItem value="results">مراجعة نتائج</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Notes */}
            <div className="space-y-2">
              <Label htmlFor="notes" className="flex items-center gap-2">
                <FileText className="h-4 w-4 text-violet-600" />
                ملاحظات إضافية
              </Label>
              <Textarea
                id="notes"
                placeholder="أدخل أي ملاحظات إضافية..."
                value={formData.notes}
                onChange={(e) => handleInputChange("notes", e.target.value)}
                className="focus-visible:ring-violet-500 min-h-[80px]"
                rows={3}
              />
            </div>
          </div>

          <DialogFooter className="gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
              className="border-gray-300 hover:bg-gray-50 dark:border-gray-600 dark:hover:bg-gray-800"
            >
              إلغاء
            </Button>
            <Button
              type="submit"
              className="bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700"
            >
              حفظ الموعد
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
