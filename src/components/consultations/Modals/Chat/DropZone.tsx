"use client"

import { useState, useRef, DragEvent } from "react"
import { Upload, File, X } from "lucide-react"
import { Button } from "@/components/ui/button"

interface DropZoneProps {
  onFilesDrop: (files: File[]) => void;
  validateFileSize: (file: File) => boolean;
  validateFileType: (file: File) => boolean;
  maxSizeMB?: number;
  children?: React.ReactNode;
}

export function DropZone({ onFilesDrop, validateFileSize, validateFileType, maxSizeMB = 20, children }: DropZoneProps) {
  const [isDragOver, setIsDragOver] = useState(false)
  const [dragCounter, setDragCounter] = useState(0)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleDragEnter = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setDragCounter(prev => prev + 1)
    setIsDragOver(true)
  }

  const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setDragCounter(prev => prev - 1)
    if (dragCounter <= 1) {
      setIsDragOver(false)
    }
  }

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault()
  }

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setIsDragOver(false)
    setDragCounter(0)

    const files = Array.from(e.dataTransfer.files)
    const validFiles = files.filter(file => {
      if (!validateFileType(file)) {
        alert(`نوع الملف ${file.name} غير مدعوم`)
        return false
      }
      if (!validateFileSize(file)) {
        alert(`حجم الملف ${file.name} كبير جداً (الحد الأقصى ${maxSizeMB} ميجابايت)`)
        return false
      }
      return true
    })

    if (validFiles.length > 0) {
      onFilesDrop(validFiles)
    }
  }

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files)
      const validFiles = files.filter(file => {
        if (!validateFileType(file)) {
          alert(`نوع الملف ${file.name} غير مدعوم`)
          return false
        }
        if (!validateFileSize(file)) {
          alert(`حجم الملف ${file.name} كبير جداً (الحد الأقصى ${maxSizeMB} ميجابايت)`)
          return false
        }
        return true
      })

      if (validFiles.length > 0) {
        onFilesDrop(validFiles)
      }
    }
  }

  return (
    <div
      className={`relative transition-all duration-300 ${
        isDragOver 
          ? 'bg-blue-50 dark:bg-blue-900/20 border-blue-300 dark:border-blue-600 scale-105' 
          : 'bg-transparent border-transparent'
      }`}
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
    >
      {isDragOver && (
        <div className="absolute inset-0 bg-blue-50/80 dark:bg-blue-900/20 border-2 border-dashed border-blue-300 dark:border-blue-600 rounded-lg flex items-center justify-center z-10">
          <div className="text-center">
            <Upload className="h-12 w-12 text-blue-500 mx-auto mb-2 animate-bounce" />
            <p className="text-blue-600 dark:text-blue-400 font-medium">أفلت الملفات هنا</p>
            <p className="text-sm text-blue-500 dark:text-blue-300">الحد الأقصى {maxSizeMB} ميجابايت</p>
          </div>
        </div>
      )}
      
      <input
        type="file"
        multiple
        ref={fileInputRef}
        onChange={handleFileInput}
        className="hidden"
        accept="image/*,.pdf,.doc,.docx,.txt,.xls,.xlsx"
      />
      {children}
    </div>
  )
} 