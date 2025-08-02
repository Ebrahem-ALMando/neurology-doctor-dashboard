"use client"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Paperclip, Send, Loader2, X } from "lucide-react"
import { DropZone } from "./DropZone"
import { LocalFilePreview } from "./LocalFilePreview"

interface InputSectionProps {
  input: string;
  files: File[];
  isLoading: boolean;
  eventLoading: boolean;
  uploading: boolean;
  onInputChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onSend: () => void;
  onFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onRemoveFile: (idx: number) => void;
  onFilesDrop: (files: File[]) => void;
  validateFileSize: (file: File) => boolean;
  validateFileType: (file: File) => boolean;
  isEditing?: boolean;
  onCancelEdit?: () => void;
  disabled?: boolean;
  isViewOnly?: boolean;
}

export function InputSection({
  input,
  files,
  isLoading,
  eventLoading,
  uploading,
  onInputChange,
  onSend,
  onFileChange,
  onRemoveFile,
  onFilesDrop,
  validateFileSize,
  validateFileType,
  isEditing = false,
  onCancelEdit,
  disabled,
  isViewOnly
}: InputSectionProps) {
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      onSend()
    }
  }

  const handleFileButtonClick = () => {
    fileInputRef.current?.click()
  }

  return (
    <div className="p-6 border-t bg-white dark:bg-gray-900">
      <DropZone
        onFilesDrop={onFilesDrop}
        validateFileSize={validateFileSize}
        validateFileType={validateFileType}
        maxSizeMB={20}
      >
        {/* معاينة الملفات المحلية */}
        <LocalFilePreview 
          files={files}
          onRemoveFile={onRemoveFile}
        />
        
        {/* قسم الإدخال */}
        <div className="flex items-end gap-3">
          <Button 
            variant="outline" 
            size="icon" 
            onClick={handleFileButtonClick}
            className="shrink-0"
            disabled={isLoading || uploading || isEditing || eventLoading || disabled}
          >
            <Paperclip className="h-5 w-5" />
          </Button>
          <input 
            type="file" 
            multiple 
            hidden 
            ref={fileInputRef} 
            onChange={onFileChange}
            accept="image/*,.pdf,.doc,.docx,.txt,.xls,.xlsx"
            disabled={disabled}
          />
          <Textarea
            className="flex-1 min-h-[40px] max-h-[120px] resize-none"
            placeholder={isEditing ? "عدل رسالتك هنا..." : disabled&&!isViewOnly ? "لا يمكن الكتابة - الاستشارة مغلقة" : isViewOnly ? "لا يمكن الكتابة - قيد المشاهدة " :  "اكتب رسالتك هنا..."}
            value={input}
            onChange={onInputChange}
            onKeyDown={handleKeyDown}
            disabled={isLoading || uploading || eventLoading || disabled}
            rows={1}
            style={{
              resize: 'none',
              overflow: 'hidden'
            }}
            onInput={(e) => {
              const target = e.target as HTMLTextAreaElement
              target.style.height = 'auto'
              target.style.height = Math.min(target.scrollHeight, 120) + 'px'
            }}
          />
          <div className="flex gap-2 shrink-0">
            {isEditing && onCancelEdit && (
              <Button 
                variant="outline" 
                onClick={onCancelEdit}
                disabled={isLoading || uploading || eventLoading || disabled}
                className="text-gray-600 hover:text-gray-800"
              >
                <X className="h-4 w-4" />
              </Button>
            )}
            <Button 
              onClick={onSend} 
              disabled={isLoading || uploading || eventLoading || (!input.trim() || (files.length === 0 &&!input.trim())) || disabled} 
              className="bg-blue-500 text-white hover:bg-blue-600"
            >
              {isLoading || uploading || eventLoading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Send className="h-4 w-4" />
              )}
            </Button>
          </div>
        </div>
      </DropZone>
      
      {/* معلومات الملفات المسموحة */}
      <div className="mt-2 text-xs text-gray-500 dark:text-gray-400">
        الملفات المسموحة: الصور، PDF، Word، Excel، نص (الحد الأقصى 20 ميجابايت)
      </div>
    </div>
  )
} 