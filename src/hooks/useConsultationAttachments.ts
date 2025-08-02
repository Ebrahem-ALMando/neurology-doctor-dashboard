import { useState } from "react"
import { deleteConsultationAttachment } from "@/api/services/consultationattachments"
import { uploadFiles } from "@/api/services/general"
import { fetchAPI } from "@/api/api"
import type { ConsultationAttachment } from "@/api/services/consultationattachments"
import type { UploadFilesResponse } from "@/api/services/general"
import { getTokenWithClient } from "@/utils/Token/getTokenWithClient"
import { downloadFile } from "@/api/services/general/downloadFile"

export function useConsultationAttachments() {
  const [uploading, setUploading] = useState(false)
  const [isStartDownloading, setIsStartDownloading] = useState(false)
  // دالة موحدة لرفع الملفات (واحد أو عدة)
  const uploadAttachments = async (
    files: File[], 
    onError: () => void
  ): Promise<ConsultationAttachment[]> => {
    setUploading(true)
    
    const response = await uploadFiles(files, "consultations/attachments")

    if (response.error) {
      onError()
      return []
    }

    const uploadedFiles = response.data?.uploaded || []
    
    if (uploadedFiles.length === 0) {
      onError()
      return []
    }

    const attachments: ConsultationAttachment[] = uploadedFiles.map(file => ({
      original_name: file.original_name,
      file_name: file.file_name,
      file_type: file.file_type,
      file_path: file.file_path,
      file_url: file.file_url
    }))

    setUploading(false)
    return attachments
  }

  // حذف مرفق
  const deleteAttachment = async (attachmentId: number, onError: () => void): Promise<boolean> => {
    const response = await deleteConsultationAttachment(attachmentId)

    if (response.error) {
      onError()
    }

    return true
  }

  // تحميل مرفق
  const downloadAttachment = async (fileUrl: string, onError: () => void , onSuccess: () => void) => {
    try {
      setIsStartDownloading(true)
      // استدعاء دالة تحميل الملف
      await downloadFile(fileUrl);
      setIsStartDownloading(false)
      onSuccess()
    } catch (error) {
      console.error("Error downloading attachment:", error);
      onError();
      setIsStartDownloading(false)
    } 
  };
  

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
    uploadAttachments,
    deleteAttachment,
    downloadAttachment,
    openAttachment,
    getFileType,
    validateFileSize,
    validateFileType,
    isStartDownloading,
    setIsStartDownloading
  }
} 