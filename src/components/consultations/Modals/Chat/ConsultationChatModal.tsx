"use client"

import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Loader2, MessageCircle, UserCheck, RefreshCw } from "lucide-react"
import { useConsultationMessages } from "@/hooks/useConsultationMessages"
import { useConsultationAttachments } from "@/hooks/useConsultationAttachments"
import { useConsultationTyping } from "@/hooks/useConsultationTyping"
import { AttachmentPreviewModal } from "./AttachmentPreviewModal"
import { ConsultationInfo } from "./ConsultationInfo"
import { MessageBubble } from "./MessageBubble"
import { InputSection } from "./InputSection"
import { AnimatedBubbles } from "./AnimatedBubbles"
import { UserAvatar } from "@/components/consultations/Modals/Chat/UserAvatar"
import type { ConsultationMessage, CreateConsultationMessageData } from "@/api/services/consultationsmessages/types"
import { useToast } from "@/hooks/use-toast"
import { useCustomToastWithIcons } from "@/hooks/use-custom-toast-with-icons"
import { ConsultationAttachment } from "@/api/services/consultations/types"
import { TypingIndicator } from "./TypingIndicator"
import { subscribeToConsultation } from "@/lib/echo"
import { getConsultationMessages } from "@/api/services/consultationsmessages/getConsultationMessages"
import { useConsultationStatus } from "@/hooks/useConsultationStatus"

interface ConsultationChatModalProps {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  consultationId: number | string;
  currentUserId: number;
  currentUserRole: string;
  consultation?: any; 
  logmutate: () => void;
  isViewOnly?: boolean;
}

export default function ConsultationChatModal(
  { open, onOpenChange, consultationId, currentUserId, consultation, currentUserRole, logmutate, isViewOnly = false }
  : ConsultationChatModalProps) {
  
  const [input, setInput] = useState("")
  const [files, setFiles] = useState<File[]>([])
  const [previewAttachment, setPreviewAttachment] = useState<any>(null)
  const [previewOpen, setPreviewOpen] = useState(false)
  const [editingMessage, setEditingMessage] = useState<{ id: number; text: string } | null>(null)
  const [incomingMessage, setIncomingMessage] = useState<ConsultationMessage | null>(null);

  // استخدام hooks
  const { messages, isLoading, sendMessage, removeMessage, mutate, eventLoading, markMessagesAsRead, updateMessage, refetch } = useConsultationMessages(consultationId)
  const { uploading, uploadAttachments, validateFileSize, downloadAttachment, validateFileType } = useConsultationAttachments()
  const { isTyping, typingUsers, isConnected, startTyping, stopTyping, updateTypingUsers, removeUserFromTyping } = useConsultationTyping(
    Number(consultationId), 
    currentUserId, 
    currentUserRole as "doctor" | "patient"
  )
  const { changeConsultationStatus } = useConsultationStatus()
  const { showError, showSuccess } = useCustomToastWithIcons()

  const consultationSubject = consultation?.subject || "استشارة طبية"

  // فحص حالة الاستشارة
  const isConsultationClosed = consultation?.status === 'closed' || consultation?.status === 'cancelled'
  const isReadOnly = isConsultationClosed || isViewOnly

  // دالة للتمرير إلى آخر رسالة
  const scrollToBottom = () => {
    
    const container = document.querySelector('.scrollable-chat');
    if (container) {
      container.scrollTo({
        top: container.scrollHeight,
        behavior: 'smooth'
      });
    }
  }


  // التمرير إلى آخر رسالة عند فتح المودال
  useEffect(() => {
    if (open) {
      refetch();
     if(messages.length > 0) {
      scrollToBottom()
     }
    }
  }, [open]);

  // التمرير إلى آخر رسالة عند وصول رسائل جديدة
  useEffect(() => {
    if (messages.length > 0) {
      setTimeout(() => {
        scrollToBottom();
      }, 100);
    }
  }, [messages]);
  
  
  // إضافة useEffect منفصل لمؤشر الكتابة
  useEffect(() => {
    if (!consultationId) return;
    
  
    const handleNewMessage = (message: ConsultationMessage) => {
      console.log("📨 Received message:", message);
      setIncomingMessage({ ...message });
    refetch()
      
    };
    
  
    const handleTyping = (data: any) => {
      console.log("⌨️ Typing event received:", data);
      updateTypingUsers(data);
      // refetch()
    };
  
    const subscription = subscribeToConsultation(
      Number(consultationId),
      handleNewMessage,
      handleTyping
    );
  
    console.log("✅ ConsultationChatModal - subscription (messages + typing) created");
    return () => {
      console.log("🔌 Cleanup consultation subscription");
      subscription?.unsubscribe?.();
    };
  }, [consultationId, updateTypingUsers]);


    

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value
    setInput(value)
    
    // منع إرسال مؤشر الكتابة إذا كانت الاستشارة مغلقة
    if (isReadOnly) return;
    
    // إرسال مؤشر الكتابة
    if (value.trim()) {
      startTyping()
    } else {
      stopTyping()
    }
  }

  const handleSend = async () => {
    if (!input.trim() && files.length === 0) return

    // منع الإرسال إذا كانت الاستشارة مغلقة
    if (isReadOnly) {
      showError({
        title: "لا يمكن الإرسال",
        description: "هذه الاستشارة مغلقة ولا يمكن إرسال رسائل جديدة"
      });
      return;
    }

    try {
      let attachments: ConsultationAttachment[] = []
      
      // رفع المرفقات إذا وجدت
      if (files.length > 0) {
        attachments = await uploadAttachments(files, () => {
          showError({
            title: "خطأ في رفع المرفقات",
            description: "فشل في رفع المرفقات"
          })
        })
      }

      // إيقاف مؤشر الكتابة
      stopTyping()

      // إرسال الرسالة
      await sendMessage({
        sender_id: currentUserId,
        sender_type: currentUserRole as "doctor" | "patient",
        message: input.trim(),
        attachments: attachments.length > 0 ? attachments : []
      }, () => {
        showError({
          title: "خطأ في الإرسال",
          description: "فشل في إرسال الرسالة"
        })
      })
      
   
      if(consultation?.status !== "answered"){
        changeConsultationStatus(Number(consultationId) , {
          status: "answered"
        },
        () => {
          logmutate()
        },
        false
        )
      }
      refetch()
      setInput("")
      setFiles([])
      setEditingMessage(null)
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    if (!incomingMessage) return;
  
    console.log("🚀 Triggered mutate after receiving message:", incomingMessage);
  
    const fetchAndMutate = async () => {
      await refetch();
  
      setTimeout(() => {
        const container = document.querySelector('.scrollable-chat');
        if (container) {
          container.scrollTo({
            top: container.scrollHeight,
            behavior: 'smooth'
          });
        }
      }, 200);
  
      setIncomingMessage(null);
    };
  
    fetchAndMutate();
  }, [incomingMessage]);
  
  
  
  const handleEditMessage = (messageId: number, currentText: string) => {
    setEditingMessage({ id: messageId, text: currentText })
    setInput(currentText)
  }

  const handleSaveEdit = async () => {
    if (editingMessage && input.trim()) {
      try {
        await updateMessage(editingMessage.id, { message: input.trim() }, () => {
          showError({
            title: "خطأ في التعديل",
            description: "فشل في تعديل الرسالة"
          })
        })
        setEditingMessage(null)
        setInput("")
      } catch (error) {
        console.log(error)
      }
    }
  }

  const handleCancelEdit = () => {
    setEditingMessage(null)
    setInput("")
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(e.target.files || [])
    const validFiles = selectedFiles.filter(file => {
      if (!validateFileSize(file)) {
        showError({
          title: "خطأ في حجم الملف",
          description: "حجم الملف يجب أن يكون أقل من 20 ميجابايت"
        })
        return false
      }
      if (!validateFileType(file)) {
        showError({
          title: "خطأ في نوع الملف",
          description: "نوع الملف غير مدعوم"
        })
        return false
      }
      return true
    })
    setFiles(prev => [...prev, ...validFiles])
  }

  const handleFilesDrop = (newFiles: File[]) => {
    const validFiles = newFiles.filter(file => {
      if (!validateFileSize(file)) {
        showError({
          title: "خطأ في حجم الملف",
          description: "حجم الملف يجب أن يكون أقل من 20 ميجابايت"
        })
        return false
      }
      if (!validateFileType(file)) {
        showError({
          title: "خطأ في نوع الملف",
          description: "نوع الملف غير مدعوم"
        })
        return false
      }
      return true
    })
    setFiles(prev => [...prev, ...validFiles])
  }

  const handleRemoveFile = (idx: number) => {
    setFiles(prev => prev.filter((_, i) => i !== idx))
  }

  const handlePreviewAttachment = (attachment: any) => {
    setPreviewAttachment(attachment)
    setPreviewOpen(true)
  }

  const handleDownloadAttachment = async (attachment: ConsultationAttachment) => {
     await downloadAttachment(attachment.file_url, () => {
      showError({
        title: "خطأ في تحميل المرفق",
        description: "فشل تحميل المرفق",
      })
     }, () => {
      showSuccess({
        title: "تحميل المرفق ",
        description: "تم تحميل المرفق بنجاح",
      })
     })
  }

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
        <DialogContent className="max-w-6xl p-0 overflow-y-auto h-[95vh] ">
          <DialogHeader className="p-4 border-b bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-gray-900 dark:to-gray-800">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-full">
                  <MessageCircle className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  
                  <DialogTitle className="text-xl font-bold flex items-center gap-2">
                    {isViewOnly ? "عرض محادثة الاستشارة" : "محادثة الاستشارة"}
                  {/* أيقونة التحديث */}
                  {!isViewOnly && (
                    <button
                   onClick={() => {
                     refetch();
                   
                   }}
                   disabled={isLoading}
                   className=" rounded-full hover:bg-blue-100 dark:hover:bg-blue-900 transition-colors"
                   title="تحديث الرسائل"
                 >
                   <RefreshCw className={`h-5 w-5 text-blue-600 dark:text-blue-400 ${eventLoading ? 'animate-spin' : ''}`} />
                 </button>
                  )}

                   </DialogTitle>
                  <DialogDescription className="text-sm text-gray-600 dark:text-gray-400">
                    التواصل بين الطبيب والمريض
                    {isConnected && (
                      <span className="ml-2 mr-2 text-green-500">● متصل</span>
                    )}
                    {isConsultationClosed && (
                      <span className="ml-2 mr-2 text-red-500">● {consultation?.status === 'closed' ? 'مغلقة' : 'ملغية'}</span>
                    )}
          
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

          <div className="h-[370px] overflow-y-auto bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-900 dark:to-gray-800 px-4 py-6 flex flex-col gap-4 relative scrollable-chat">
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
              <>
                {messages.map((msg: ConsultationMessage, idx: number) => {
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
                            <span className="ml-1 text-green-500">●</span>
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
                          onDeleteMessage={(messageId) => removeMessage(messageId, () => {
                            showError({
                              title: "خطأ في حذف الرسالة",
                              description: "فشل في حذف الرسالة"
                            })
                          })}
                          onEditMessage={handleEditMessage}
                          isViewOnly={isViewOnly}
                        />
                      </div>
                    </div>
                  )
                })}
                
                {/* مؤشر الكتابة */}
                {!isViewOnly && (
                  <TypingIndicator  
                    typingUsers={typingUsers}
                    currentUserId={currentUserId}
                    userNames={{
                      [consultation?.patient?.id]: consultation?.patient?.name,
                      [consultation?.doctor?.id]: `د.${consultation?.doctor?.name}`
                    }}
                  />
                )}
              </>
            )}
            </div>

                        {/* Input Section */}
            
              <InputSection
                input={input}
                files={files}
                isLoading={isLoading}
                eventLoading={eventLoading}
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
                disabled={isReadOnly}
                isViewOnly={isViewOnly}
              />
                
          </DialogContent>
        </Dialog>

        {/* Preview Modal */}
        <AttachmentPreviewModal
          open={previewOpen}
          onOpenChange={setPreviewOpen}
          attachment={previewAttachment}
          onDownloadAttachment={handleDownloadAttachment}
        />
      </>
    )
  }