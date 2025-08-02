"use client"

import type React from "react"

import { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { format } from "date-fns"
import { useToast } from "@/components/ui/use-toast"
import { arSA } from "date-fns/locale"

interface AddConsultationModalProps {
  children: React.ReactNode
}

export function AddConsultationModal({ children }: AddConsultationModalProps) {
  const [open, setOpen] = useState(false)
  const [patientId, setPatientId] = useState("")
  const [doctorId, setDoctorId] = useState("")
  const [consultationType, setConsultationType] = useState("")
  const [topic, setTopic] = useState("")
  const [date, setDate] = useState<Date | undefined>(undefined)
  const { toast } = useToast()

  const handleSubmit = () => {
    if (!patientId || !doctorId || !consultationType || !topic || !date) {
      toast({
        title: "خطأ",
        description: "الرجاء تعبئة جميع الحقول المطلوبة.",
        variant: "destructive",
      })
      return
    }

    // In a real application, you would send this data to your backend
    console.log({
      patientId,
      doctorId,
      consultationType,
      topic,
      date: date.toISOString().split("T")[0],
    })

    toast({
      title: "نجاح",
      description: "تمت إضافة الاستشارة بنجاح.",
      variant: "default",
    })

    // Reset form and close modal
    setPatientId("")
    setDoctorId("")
    setConsultationType("")
    setTopic("")
    setDate(undefined)
    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>إضافة استشارة جديدة</DialogTitle>
          <DialogDescription>املأ التفاصيل لإضافة استشارة طبية جديدة.</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="patient" className="text-right">
              المريض
            </Label>
            <Input
              id="patient"
              value={patientId}
              onChange={(e) => setPatientId(e.target.value)}
              className="col-span-3"
              placeholder="اختر المريض"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="doctor" className="text-right">
              الطبيب
            </Label>
            <Input
              id="doctor"
              value={doctorId}
              onChange={(e) => setDoctorId(e.target.value)}
              className="col-span-3"
              placeholder="اختر الطبيب"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="type" className="text-right">
              نوع الاستشارة
            </Label>
            <Input
              id="type"
              value={consultationType}
              onChange={(e) => setConsultationType(e.target.value)}
              className="col-span-3"
              placeholder="اختر النوع"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="topic" className="text-right">
              الموضوع
            </Label>
            <Textarea
              id="topic"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              className="col-span-3"
              placeholder="اكتب موضوع الاستشارة هنا..."
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="date" className="text-right">
              التاريخ
            </Label>
            <Input
              id="date"
              value={date ? format(date, "PPP", { locale: arSA }) : ""}
              onChange={(e) => setDate(new Date(e.target.value))}
              className="col-span-3"
              placeholder="اختر تاريخًا"
            />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)}>
            إلغاء
          </Button>
          <Button onClick={handleSubmit}>إضافة</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
