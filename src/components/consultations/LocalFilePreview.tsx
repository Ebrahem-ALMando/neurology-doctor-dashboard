"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { X, Download, Eye, File, Image as ImageIcon, FileText } from "lucide-react"

interface LocalFilePreviewProps {
  files: File[];
  onRemoveFile: (index: number) => void;
}

export function LocalFilePreview({ files, onRemoveFile }: LocalFilePreviewProps) {
  const [previewFile, setPreviewFile] = useState<File | null>(null)
  const [previewOpen, setPreviewOpen] = useState(false)

  const getFileIcon = (file: File | null) => {
    if (!file) return <File className="h-4 w-4 text-gray-500" />
    
    if (file.type.startsWith('image/')) {
      return <ImageIcon className="h-4 w-4 text-blue-500" />
    } else if (file.type === 'application/pdf') {
      return <FileText className="h-4 w-4 text-red-500" />
    } else {
      return <File className="h-4 w-4 text-gray-500" />
    }
  }

  const getFileType = (file: File | null) => {
    if (!file) return 'ملف'
    
    if (file.type.startsWith('image/')) return 'صورة'
    if (file.type === 'application/pdf') return 'PDF'
    if (file.type.includes('word')) return 'Word'
    if (file.type.includes('excel') || file.type.includes('sheet')) return 'Excel'
    if (file.type === 'text/plain') return 'نص'
    return 'ملف'
  }

  const formatFileSize = (bytes: number) => {
    const mb = bytes / (1024 * 1024)
    return `${mb.toFixed(2)} ميجابايت`
  }

  const handlePreview = (file: File) => {
    setPreviewFile(file)
    setPreviewOpen(true)
  }

  const renderPreview = () => {
    if (!previewFile) return null

    if (previewFile.type.startsWith('image/')) {
      return (
        <div className="flex justify-center">
          <img 
            src={URL.createObjectURL(previewFile)} 
            alt={previewFile.name}
            className="max-w-full max-h-[60vh] object-contain rounded-lg shadow-lg"
          />
        </div>
      )
    }

    if (previewFile.type === 'application/pdf') {
      return (
        <div className="flex justify-center">
          <iframe 
            src={URL.createObjectURL(previewFile)} 
            className="w-full h-[60vh] border rounded-lg"
            title={previewFile.name}
          />
        </div>
      )
    }

    return (
      <div className="flex flex-col items-center justify-center h-[60vh] text-center">
        <File className="h-16 w-16 text-gray-400 mb-4" />
        <h3 className="text-lg font-semibold mb-2">{previewFile.name}</h3>
        <p className="text-gray-500 mb-4">لا يمكن معاينة هذا النوع من الملفات</p>
        <p className="text-sm text-gray-400">النوع: {getFileType(previewFile)}</p>
        <p className="text-sm text-gray-400">الحجم: {formatFileSize(previewFile.size)}</p>
      </div>
    )
  }

  if (files.length === 0) return null

  return (
    <>
      <div className="flex flex-wrap gap-2 mb-4 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
        {files.map((file, index) => (
          <div key={index} className="flex items-center gap-2 bg-white dark:bg-gray-700 rounded px-3 py-2 text-sm border shadow-sm">
            {getFileIcon(file)}
            <div className="flex flex-col">
              <span className="font-medium truncate max-w-[150px]">{file.name}</span>
              <span className="text-xs text-gray-500">{formatFileSize(file.size)}</span>
            </div>
            <div className="flex items-center gap-1">
              <Button 
                variant="ghost" 
                size="icon" 
                className="h-6 w-6 p-1 hover:bg-blue-100 dark:hover:bg-blue-900" 
                onClick={() => handlePreview(file)}
              >
                <Eye className="h-3 w-3" />
              </Button>
              <Button 
                variant="ghost" 
                size="icon" 
                className="h-6 w-6 p-1 text-red-500 hover:bg-red-100 dark:hover:bg-red-900" 
                onClick={() => onRemoveFile(index)}
              >
                <X className="h-3 w-3" />
              </Button>
            </div>
          </div>
        ))}
      </div>

      <Dialog open={previewOpen} onOpenChange={setPreviewOpen}>
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-hidden">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              {getFileIcon(previewFile)}
              معاينة الملف: {previewFile?.name}
            </DialogTitle>
          </DialogHeader>
          <div className="flex-1 overflow-auto">
            {renderPreview()}
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
} 