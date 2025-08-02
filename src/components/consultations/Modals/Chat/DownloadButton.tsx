"use client"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Download, Loader2, X } from "lucide-react"
import { cn } from "@/lib/utils"

interface DownloadButtonProps {
  onDownload: () => Promise<void>
  onCancel?: () => void
  className?: string
}

export function DownloadButton({ onDownload, onCancel, className }: DownloadButtonProps) {
  const [isDownloading, setIsDownloading] = useState(false)
  const [progress, setProgress] = useState(0)
  const progressIntervalRef = useRef<NodeJS.Timeout | null>(null)

  const handleDownload = async () => {
    if (isDownloading) return

    setIsDownloading(true)
    setProgress(0)

    try {
      // محاكاة التقدم
      progressIntervalRef.current = setInterval(() => {
        setProgress(prev => {
          if (prev >= 90) {
            if (progressIntervalRef.current) {
              clearInterval(progressIntervalRef.current)
            }
            return 90
          }
          return prev + 10
        })
      }, 200)

      await onDownload()
      
      // إكمال التحميل
      if (progressIntervalRef.current) {
        clearInterval(progressIntervalRef.current)
      }
      setProgress(100)
      setTimeout(() => {
        setIsDownloading(false)
        setProgress(0)
      }, 500)

    } catch (error: any) {
      console.error("Download failed:", error)
      if (progressIntervalRef.current) {
        clearInterval(progressIntervalRef.current)
      }
      setIsDownloading(false)
      setProgress(0)
    }
  }

  const handleCancel = () => {
    if (progressIntervalRef.current) {
      clearInterval(progressIntervalRef.current)
    }
    setIsDownloading(false)
    setProgress(0)
    onCancel?.()
  }

  return (
    <div className="relative item">
      <Button
        variant="ghost"
        size="icon"
        className={cn(
          "h-6 w-6 p-1 transition-all duration-200 relative",
          isDownloading 
            ? "hover:bg-red-100 dark:hover:bg-red-900 text-red-600" 
            : "hover:bg-green-100 dark:hover:bg-green-900 text-green-600",
          className
        )}
        onClick={isDownloading ? handleCancel : handleDownload}
        disabled={isDownloading}
      >
        {isDownloading ? (
          <div className="relative w-full h-full flex items-center justify-center ">
            {/* دائرة التقدم */}
            <svg className="h-6 w-6 transform -rotate-90 absolute inset-0" viewBox="0 0 24 24">
              <circle
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="2"
                fill="none"
                className="text-gray-300 dark:text-gray-600 opacity-30"
              />
              <circle
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="2"
                fill="none"
                strokeDasharray="62.83"
                strokeDashoffset={62.83 - (62.83 * progress) / 100}
                className="text-green-500 transition-all duration-200"
                strokeLinecap="round"
              />
            </svg>
            
            {/* أيقونة الإلغاء في المنتصف */}
            {progress > 0 && (
              <div className="absolute inset-0 flex items-center justify-center">
                {/* <X className="h-2.5 w-2.5 text-red-500 font-bold" /> */}
              </div>
            )}
            
            {/* أيقونة اللودر في الخلفية */}
            {progress === 0 && (
              <div className="absolute inset-0 flex items-center justify-center">
                <Loader2 className="h-3 w-3 animate-spin text-blue-500" />
              </div>
            )}
          </div>
        ) : (
          <Download className="h-3 w-3" />
        )}
      </Button>
      
      {/* مؤشر النسبة المئوية */}
      {isDownloading && progress > 0 && (
        <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-black text-white text-xs px-2 py-1 rounded whitespace-nowrap z-50">
          {progress}%
        </div>
      )}
      
      {/* Tooltip */}
        <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded whitespace-nowrap opacity-0 item-hover:opacity-100 transition-opacity duration-200 z-50 pointer-events-none">
        {isDownloading ? "إلغاء التحميل" : "تحميل الملف"}
      </div>
    </div>
  )
} 