"use client"

import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Loader2, MessageCircle, UserCheck } from "lucide-react"
import { useConsultationMessages } from "@/hooks/useConsultationMessages"
import { useConsultationAttachments } from "@/hooks/useConsultationAttachments"
import { useConsultationTyping } from "@/hooks/useConsultationTyping"
import { AttachmentPreviewModal } from "./AttachmentPreviewModal"
import { ConsultationInfo } from "./ConsultationInfo"
import { MessageBubble } from "./MessageBubble"
import { InputSection } from "./InputSection"
import { AnimatedBubbles } from "./AnimatedBubbles"
import { UserAvatar } from "./UserAvatar"
import type { ConsultationMessage, CreateConsultationMessageData } from "@/api/services/consultationsmessages/types"
import { useToast } from "@/hooks/use-toast"

interface ConsultationChatModalProps {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  consultationId: number | string;
  currentUserId: number;
  consultation?: any; // معلومات الاستشارة
}

export default function ConsultationChatModal({ open, onOpenChange, consultationId, currentUserId, consultation }: ConsultationChatModalProps) {
  const { toast } = useToast()
  const [input, setInput] = useState("")
  const [files, setFiles] = useState<File[]>([])
  const [previewAttachment, setPreviewAttachment] = useState<any>(null)
  const [previewOpen, setPreviewOpen] = useState(false)
  const [editingMessage, setEditingMessage] = useState<{ id: number; text: string } | null>(null)

  const { messages, isLoading, sendMessage, removeMessage, downloadAttachment, typing, mutate } = useConsultationMessages(consultationId)
  const { uploading, uploadAttachment, deleteAttachment, downloadAttachment: downloadFile, validateFileSize, validateFileType } = useConsultationAttachments()
  const { isTyping, typingUsers, readStatus, startTyping, stopTyping, markMessagesAsRead } = useConsultationTyping(Number(consultationId), currentUserId, "doctor")

  // الحصول على أول رسالة لاستخراج الموضوع
  const firstMessage = messages[0]
  const consultationSubject = firstMessage?.subject || "لا يوجد موضوع"

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInput(e.target.value)
    if (e.target.value.trim()) {
      startTyping()
    } else {
      stopTyping()
    }
  }

  const handleSend = async () => {
    if (input.trim() || files.length) {
      try {
        stopTyping() // إيقاف مؤشر الكتابة
        
        // رفع المرفقات أولاً إذا وجدت
        const uploadedAttachments = []
        for (const file of files) {
          const attachment = await uploadAttachment(Number(consultationId), file)
          if (attachment) {
            uploadedAttachments.push(attachment)
          }
        }

        const messageData: CreateConsultationMessageData = {
          sender_id: currentUserId,
          sender_type: "doctor",
          message: input.trim(),
          attachments: uploadedAttachments.length > 0 ? uploadedAttachments : undefined,
        }
        
        await sendMessage(messageData)
        setInput("")
        setFiles([])
      } catch (error) {
        console.error('Error sending message:', error)
        alert('فشل في إرسال الرسالة')
      }
    }
  }

  const handleEditMessage = (messageId: number, currentText: string) => {
    setEditingMessage({ id: messageId, text: currentText })
    setInput(currentText)
  }

  const handleSaveEdit = async () => {
    if (editingMessage && input.trim()) {
      try {
        // هنا يتم استدعاء API لتعديل الرسالة
        // await updateConsultationMessage(editingMessage.id, input.trim())
        console.log(`تعديل الرسالة ${editingMessage.id} إلى: ${input.trim()}`)
        
        // إعادة تحميل البيانات
        // await mutate()
        
        setEditingMessage(null)
        setInput("")
        
        toast({
          title: "تم التعديل بنجاح",
          description: "تم تعديل الرسالة بنجاح",
        })
      } catch (error) {
        toast({
          title: "خطأ في التعديل",
          description: "فشل في تعديل الرسالة",
          variant: "destructive",
        })
      }
    }
  }

  const handleCancelEdit = () => {
    setEditingMessage(null)
    setInput("")
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files)
      const validFiles = newFiles.filter(file => {
        if (!validateFileType(file)) {
          alert(`نوع الملف ${file.name} غير مدعوم`)
          return false
        }
        if (!validateFileSize(file)) {
          alert(`حجم الملف ${file.name} كبير جداً (الحد الأقصى 20 ميجابايت)`)
          return false
        }
        return true
      })
      setFiles([...files, ...validFiles])
    }
  }

  const handleFilesDrop = (newFiles: File[]) => {
    setFiles([...files, ...newFiles])
  }

  const handleRemoveFile = (idx: number) => {
    setFiles(files.filter((_, i) => i !== idx))
  }

  const handlePreviewAttachment = (attachment: any) => {
    setPreviewAttachment(attachment)
    setPreviewOpen(true)
  }

  const handleDownloadAttachment = (attachment: any) => {
    downloadFile(attachment.file_url, attachment.original_name)
  }

  // تحديث حالة القراءة عند فتح المودال
  useEffect(() => {
    if (open && messages.length > 0) {
      const unreadMessageIds = messages
        .filter(msg => !msg.read_by_doctor && msg.sender?.id !== currentUserId)
        .map(msg => msg.id)
      
      if (unreadMessageIds.length > 0) {
        markMessagesAsRead(unreadMessageIds)
      }
    }
  }, [open, messages, currentUserId])

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="max-w-6xl p-0 overflow-y-auto h-[95vh]">
          <DialogHeader className="p-4 border-b bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-gray-900 dark:to-gray-800">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-full">
                  <MessageCircle className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <DialogTitle className="text-xl font-bold">محادثة الاستشارة</DialogTitle>
                  <DialogDescription className="text-sm text-gray-600 dark:text-gray-400">
                    التواصل بين الطبيب والمريض
                  </DialogDescription>
                </div>
               </div>
             </div>
            
            {/* معلومات الاستشارة */}
            {consultation && (
              <ConsultationInfo 
                consultation={consultation}
                subject={consultationSubject}
              />
            )}
           </DialogHeader>

          <div className="h-[370px] overflow-y-auto bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-900 dark:to-gray-800 px-4 py-6 flex flex-col gap-4 relative">
            {/* الفقاعات المتحركة */}
            <AnimatedBubbles />
            
            {isLoading ? (
              <div className="flex items-center justify-center h-full">
                <div className="text-center">
                  <Loader2 className="h-8 w-8 animate-spin mx-auto mb-2 text-blue-500" />
                  <p className="text-muted-foreground">جاري تحميل الرسائل...</p>
                </div>
              </div>
            ) : messages.length === 0 ? (
              <div className="flex items-center justify-center h-full">
                <div className="text-center">
                  <MessageCircle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-muted-foreground">لا توجد رسائل بعد.</p>
                  <p className="text-sm text-gray-500">ابدأ المحادثة بإرسال رسالة</p>
                </div>
              </div>
            ) : (
              messages.map((msg: ConsultationMessage, idx: number) => {
                const isMe = msg?.sender?.id === currentUserId
                return (
                  <div key={msg.id} className={`flex ${isMe ? "justify-start" : " justify-end"}`}>
                    <div className={`max-w-[75%] flex gap-3 ${isMe ? "" : "flex-row-reverse"}`}>
                      {/* Avatar */}
                      <div className="flex flex-col items-center min-w-[120px]">
                        <UserAvatar
                          name={msg.sender?.name || "غير محدد"}
                          avatarUrl={msg.sender?.avatar_url}
                          role={msg.sender?.role as "doctor" | "patient" | "admin"}
                        />
                        <span className="text-xs text-gray-500 dark:text-gray-400 mt-2 font-medium">
                          {msg.sender?.name}
                        </span>
                        <span className="text-xs text-gray-400">
                          {msg.sender_type === 'doctor' ? 'طبيب' : 'مريض'}
                        </span>
                      </div>

                      {/* Message Bubble */}
                      <MessageBubble
                        message={msg}
                        isMe={isMe}
                        onPreviewAttachment={handlePreviewAttachment}
                        onDownloadAttachment={handleDownloadAttachment}
                        onDeleteMessage={removeMessage}
                        onEditMessage={handleEditMessage}
                      />
                    </div>
                  </div>
                )
              })
            )}
            
            {/* Typing Indicator */}
            {isTyping && (
              <div className="flex items-center gap-2 text-xs text-gray-400 animate-pulse">
                <UserCheck className="h-4 w-4" />
                <span>يكتب الآن...</span>
              </div>
            )}
          </div>

          {/* Input Section */}
          <InputSection
            input={input}
            files={files}
            isLoading={isLoading}
            uploading={uploading}
            onInputChange={handleInputChange}
            onSend={editingMessage ? handleSaveEdit : handleSend}
            onFileChange={handleFileChange}
            onRemoveFile={handleRemoveFile}
            onFilesDrop={handleFilesDrop}
            validateFileSize={validateFileSize}
            validateFileType={validateFileType}
            isEditing={!!editingMessage}
            onCancelEdit={handleCancelEdit}
          />
        </DialogContent>
      </Dialog>

      {/* Attachment Preview Modal */}
      <AttachmentPreviewModal 
        open={previewOpen}
        onOpenChange={setPreviewOpen}
        attachment={previewAttachment}
      />
    </>
  )
} 