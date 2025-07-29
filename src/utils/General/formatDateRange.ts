import { format, formatDistanceToNow } from "date-fns"
import { arSA } from "date-fns/locale"

// Dummy Hijri date conversion (for demonstration, a real implementation would use a proper Hijri calendar library)
const hijriOffsetDays = 53 // Example offset for 1446/12/3 H to match current Gregorian date roughly

export function toHijriDate(gregorianDate: string): string {
  // This is a simplified dummy conversion. In a real app, use a robust Hijri calendar library.
  // For demonstration, we'll just map some dates to the dummy Hijri dates.
  const dateMap: { [key: string]: string } = {
    "2025-06-09": "1446/12/3 هـ", // Example mapping
    "2025-06-08": "1446/12/2 هـ",
    "2025-06-07": "1446/12/1 هـ",
    "2025-05-28": "1446/11/29 هـ",
    "2025-05-27": "1446/11/28 هـ",
    "2025-05-26": "1446/11/27 هـ",
    "2025-05-01": "1446/10/24 هـ",
    "2025-04-20": "1446/10/12 هـ",
    "2025-04-15": "1446/10/7 هـ",
  }
  return dateMap[gregorianDate] || "تاريخ غير معروف"
}

export function getHijriToday(): string {
  const today = new Date()
  const year = today.getFullYear()
  const month = today.getMonth() + 1
  const day = today.getDate()
  
  // تحويل بسيط للتاريخ الهجري (يمكن استخدام مكتبة متخصصة مثل moment-hijri)
  const hijriYear = year - 579
  const hijriMonth = month
  const hijriDay = day
  
  return `${hijriDay}/${hijriMonth}/${hijriYear} هـ`
}

export function getRelativeTime(dateString: string): string {
  try {
    // التحقق من أن dateString موجود وصحيح
    if (!dateString || dateString.trim() === '') {
      return "تاريخ غير محدد"
    }
    
    const date = new Date(dateString)
    
    // التحقق من أن التاريخ صحيح
    if (isNaN(date.getTime())) {
      return "تاريخ غير صحيح"
    }
    
    return formatDistanceToNow(date, { addSuffix: true, locale: arSA })
  } catch (error) {
    console.error("Error formatting relative time:", error)
    return "تاريخ غير محدد"
  }
}

export function formatDateRange(startDate?: Date, endDate?: Date): string {
  if (!startDate && !endDate) {
    return "اختر التاريخ"
  }
  
  if (startDate && endDate) {
    return `${format(startDate, "dd/MM/yyyy", { locale: arSA })} - ${format(endDate, "dd/MM/yyyy", { locale: arSA })}`
  }
  
  if (startDate) {
    return `من ${format(startDate, "dd/MM/yyyy", { locale: arSA })}`
  }
  
  if (endDate) {
    return `إلى ${format(endDate, "dd/MM/yyyy", { locale: arSA })}`
  }
  
  return "اختر التاريخ"
}
