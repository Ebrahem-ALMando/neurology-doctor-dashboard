"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Download, FileText, Image as ImageIcon, File, X, Loader2 } from "lucide-react"
import { useState } from "react"

interface AttachmentPreviewModalProps {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  attachment: any;
  onDownloadAttachment: (attachment: any) => void;
}

export function AttachmentPreviewModal({ open, onOpenChange, attachment,  onDownloadAttachment}: AttachmentPreviewModalProps) {
  if (!attachment) return null

  const isImage = attachment.file_type?.startsWith('image/') || attachment.file_type === 'image'
  const isPDF = attachment.file_type === 'application/pdf' || attachment.file_type === 'pdf'
  const [isDownload,setIsDownload] = useState(false)


  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            {isImage ? (
              <ImageIcon className="h-5 w-5 text-blue-500" />
            ) : isPDF ? (
              <FileText className="h-5 w-5 text-red-500" />
            ) : (
              <File className="h-5 w-5 text-gray-500" />
            )}
            معاينة المرفق: {attachment.original_name}
          </DialogTitle>
        </DialogHeader>
        
        <div className="flex-1 overflow-auto">
          {isImage ? (
            <div className="flex justify-center p-4">
              <img 
                src={attachment.file_url} 
                alt={attachment.original_name}
                className="max-w-full max-h-[60vh] object-contain rounded-lg shadow-lg"
              />
            </div>
          ) : isPDF ? (
            <div className="flex justify-center p-4">
              <iframe 
                src={attachment.file_url} 
                className="w-full h-[60vh] border rounded-lg"
                title={attachment.original_name}
              />
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-[60vh] text-center p-8">
              <File className="h-16 w-16 text-gray-400 mb-4" />
              <h3 className="text-lg font-semibold mb-2">{attachment.original_name}</h3>
              <p className="text-gray-500 mb-4">لا يمكن معاينة هذا النوع من الملفات</p>
              <div className="flex gap-2">
                <Button onClick={ async () => {
                  setIsDownload(true)
                  await onDownloadAttachment(attachment)
                  setIsDownload(false)
                }} className="bg-blue-500 hover:bg-blue-600">
                  <Download className="h-4 w-4 mr-2" />
                  {isDownload ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : "تحميل الملف"}
                </Button>
                <Button variant="outline" onClick={() => window.open(attachment.file_url, '_blank')}>
                  فتح في نافذة جديدة
                </Button>
              </div>
            </div>
          )}
        </div>
        
        <div className="flex justify-between items-center p-4 border-t">
          <div className="text-sm text-gray-500">
            نوع الملف: {attachment.file_type || 'غير محدد'}
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={ async () => {
                  setIsDownload(true)
                  await onDownloadAttachment(attachment)
                  setIsDownload(false)
                }}>
              <Download className="h-4 w-4 mr-2" />
              {isDownload ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : "تحميل"}
            </Button>
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              <X className="h-4 w-4 mr-2" />
              إغلاق
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
} 