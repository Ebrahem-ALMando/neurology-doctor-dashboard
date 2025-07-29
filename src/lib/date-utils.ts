import { format, formatDistanceToNow } from "date-fns"
import { ar } from "date-fns/locale"

export function formatDateRange(from?: Date, to?: Date): string {
  if (!from && !to) {
    return "اختر التاريخ"
  }
  
  if (from && to) {
    return `${format(from, "dd/MM/yyyy", { locale: ar })} - ${format(to, "dd/MM/yyyy", { locale: ar })}`
  }
  
  if (from) {
    return `من ${format(from, "dd/MM/yyyy", { locale: ar })}`
  }
  
  if (to) {
    return `إلى ${format(to, "dd/MM/yyyy", { locale: ar })}`
  }
  
  return "اختر التاريخ"
}

export function getRelativeTime(dateString: string): string {
  const date = new Date(dateString)
  return formatDistanceToNow(date, { addSuffix: true, locale: ar })
}

export function toHijriDate(dateString: string): string {
  const date = new Date(dateString)
  // تحويل بسيط للتاريخ الهجري (يمكن استخدام مكتبة متخصصة مثل moment-hijri)
  const hijriYear = date.getFullYear() - 579
  const hijriMonth = date.getMonth() + 1
  const hijriDay = date.getDate()
  
  return `${hijriDay}/${hijriMonth}/${hijriYear} هـ`
} 