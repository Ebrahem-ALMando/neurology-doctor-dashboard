"use client"

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Eye, Trash2 } from "lucide-react"

interface Consultation {
  id: string
  patient: string
  type: string
  subject: string
  reply: string
  status: string
  date: string
}

interface ConsultationsTableViewProps {
  consultations: Consultation[]
  loading: boolean
  currentPage: number
  onPageChange: (page: number) => void
}

export function ConsultationsTableView({ consultations, loading }: ConsultationsTableViewProps) {
  return (
    <div className="rounded-xl border bg-card shadow-sm">
      <Table>
        <TableHeader>
          <TableRow className="bg-muted/50">
            <TableHead className="w-[150px] text-right">المريض</TableHead>
            <TableHead className="w-[120px] text-right">نوع الاستشارة</TableHead>
            <TableHead className="w-[200px] text-right">الموضوع</TableHead>
            <TableHead className="w-[200px] text-right">الرد</TableHead>
            <TableHead className="w-[100px] text-right">الحالة</TableHead>
            <TableHead className="w-[120px] text-right">التاريخ</TableHead>
            <TableHead className="w-[120px] text-right">الإجراءات</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {loading ? (
            <TableRow>
              <TableCell colSpan={7} className="text-center py-8">جاري التحميل...</TableCell>
            </TableRow>
          ) : consultations.length === 0 ? (
            <TableRow>
              <TableCell colSpan={7} className="text-center py-8">لا توجد استشارات</TableCell>
            </TableRow>
          ) : (
            consultations.map((c) => (
              <TableRow key={c.id}>
                <TableCell>{c.patient}</TableCell>
                <TableCell>{c.type}</TableCell>
                <TableCell>{c.subject}</TableCell>
                <TableCell>{c.reply}</TableCell>
                <TableCell>{c.status}</TableCell>
                <TableCell>{c.date}</TableCell>
                <TableCell>
                  <Button variant="ghost" size="icon"><Eye className="h-4 w-4" /></Button>
                  <Button variant="ghost" size="icon"><Trash2 className="h-4 w-4 text-rose-500" /></Button>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  )
} 