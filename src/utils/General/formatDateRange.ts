import { format } from "date-fns"
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

export function getRelativeTime(hijriDate: string): string {
  // This is a simplified dummy calculation for "days ago" based on the dummy Hijri date.
  // In a real app, this would involve proper date comparisons.
  const todayHijri = "1446/12/3 هـ" // Assuming this is "today" for dummy data
  if (hijriDate === todayHijri) {
    return "اليوم"
  }

  const dateParts = hijriDate.split(" ")[0].split("/").map(Number)
  const todayParts = todayHijri.split(" ")[0].split("/").map(Number)

  // Simple difference based on day part for dummy data
  const dayDiff = todayParts[2] - dateParts[2]
  if (dayDiff > 0) {
    return `منذ ${dayDiff} يوم`
  }
  // Fallback for older dates not covered by simple day diff
  return `منذ ${hijriOffsetDays + Math.abs(dayDiff)} يوم`
}

export function formatDateRange(startDate?: Date, endDate?: Date): string {
  if (!startDate && !endDate) {
    return "كل التواريخ"
  }
  if (startDate && !endDate) {
    return `منذ ${format(startDate, "yyyy-MM-dd", { locale: arSA })}`
  }
  if (!startDate && endDate) {
    return `حتى ${format(endDate, "yyyy-MM-dd", { locale: arSA })}`
  }
  return `${format(startDate!, "yyyy-MM-dd", { locale: arSA })} - ${format(endDate!, "yyyy-MM-dd", { locale: arSA })}`
}
