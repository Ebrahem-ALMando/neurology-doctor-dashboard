import { useState } from "react"
import { apiHelpers } from "@/api/apiHelpers"
import type { APIResponse } from "@/api/api"

interface AttachmentData {
  file_name: string
  original_name: string
  file_path: string
  file_type: string
  file_url: string
}

interface UploadAttachmentResponse {
  status: number
  message: string
  data: AttachmentData
}

interface DeleteAttachmentResponse {
  status: number
  message: string
  data: null
}

export function useConsultationAttachments() {
  const [uploading, setUploading] = useState(false)

  // رفع مرفق جديد
  const uploadAttachment = async (consultationId: number, file: File): Promise<AttachmentData | null> => {
    setUploading(true)
    try {
      const formData = new FormData()
      formData.append('file', file)
      formData.append('consultation_id', consultationId.toString())

      const response = await apiHelpers.upload<UploadAttachmentResponse>(
        'consultation-attachments',
        formData,
        { showSuccess: true }
      )

      if (response.error) {
        throw new Error(response.message || 'فشل في رفع المرفق')
      }

      return response.data?.data || null
    } catch (error) {
      console.error('Error uploading attachment:', error)
      throw error
    } finally {
      setUploading(false)
    }
  }

  // حذف مرفق
  const deleteAttachment = async (attachmentId: number): Promise<boolean> => {
    try {
      const response = await apiHelpers.delete<DeleteAttachmentResponse>(
        `consultation-attachments/${attachmentId}`,
        { showSuccess: true }
      )

      if (response.error) {
        throw new Error(response.message || 'فشل في حذف المرفق')
      }

      return true
    } catch (error) {
      console.error('Error deleting attachment:', error)
      throw error
    }
  }

  // تحميل مرفق
  const downloadAttachment = (fileUrl: string, fileName: string) => {
    const link = document.createElement('a')
    link.href = fileUrl
    link.download = fileName
    link.target = '_blank'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  // فتح مرفق في نافذة جديدة
  const openAttachment = (fileUrl: string) => {
    window.open(fileUrl, '_blank')
  }

  // التحقق من نوع الملف
  const getFileType = (file: File): string => {
    if (file.type.startsWith('image/')) return 'image'
    if (file.type === 'application/pdf') return 'pdf'
    if (file.type.startsWith('video/')) return 'video'
    if (file.type.startsWith('audio/')) return 'audio'
    return 'document'
  }

  // التحقق من حجم الملف
  const validateFileSize = (file: File, maxSizeMB: number = 20): boolean => {
    const maxSizeBytes = maxSizeMB * 1024 * 1024
    return file.size <= maxSizeBytes
  }

  // التحقق من نوع الملف المسموح
  const validateFileType = (file: File): boolean => {
    const allowedTypes = [
      'image/jpeg',
      'image/png',
      'image/gif',
      'image/webp',
      'application/pdf',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'text/plain',
      'application/vnd.ms-excel',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    ]
    return allowedTypes.includes(file.type)
  }

  return {
    uploading,
    uploadAttachment,
    deleteAttachment,
    downloadAttachment,
    openAttachment,
    getFileType,
    validateFileSize,
    validateFileType,
  }
} 