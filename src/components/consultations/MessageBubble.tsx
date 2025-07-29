"use client"

import { Check, CheckCheck, Eye, Download, X, Image as ImageIcon, File, Trash2, MoreVertical, Edit } from "lucide-react"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { UserAvatar } from "./UserAvatar"
import type { ConsultationMessage } from "@/api/services/consultationsmessages/types"

interface MessageBubbleProps {
  message: ConsultationMessage;
  isMe: boolean;
  onPreviewAttachment: (attachment: any) => void;
  onDownloadAttachment: (attachment: any) => void;
  onDeleteMessage: (messageId: number) => void;
  onEditMessage?: (messageId: number, newText: string) => void;
}

export function MessageBubble({ 
  message, 
  isMe, 
  onPreviewAttachment, 
  onDownloadAttachment, 
  onDeleteMessage,
  onEditMessage
}: MessageBubbleProps) {
  const messageDate = new Date(message.created_at)
  const oneHourPassed = (Date.now() - messageDate.getTime()) > 3600 * 1000

  return (
    <div className={`relative rounded-2xl px-5 py-3 shadow-lg max-w-full group ${
      isMe
        ? "bg-gradient-to-r from-blue-100 to-blue-200 text-black dark:from-blue-900 dark:to-blue-800 dark:text-white"
        : "bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 border border-gray-200 dark:border-gray-700"
    }`}>

      {/* قائمة الخيارات (3 نقاط) */}
      {isMe && !oneHourPassed && (
        <div className="absolute top-2 left-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button 
                variant="ghost" 
                size="icon" 
                className="h-6 w-6 p-1 hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <MoreVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-32">
              <DropdownMenuItem 
                onClick={() => onEditMessage?.(message.id, message.message)}
                className="flex items-center gap-2 cursor-pointer"
              >
                <Edit className="h-4 w-4" />
                تعديل
              </DropdownMenuItem>
              <DropdownMenuItem 
                onClick={() => onDeleteMessage(message.id)}
                className="flex items-center gap-2 cursor-pointer text-red-600 hover:text-red-700"
              >
                <Trash2 className="h-4 w-4" />
                حذف
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      )}
      
      {/* نص الرسالة */}
      <div className="whitespace-pre-line break-words text-sm leading-relaxed">
        {message.message}
      </div>
      
      {/* المرفقات */}
      {message.attachments && message.attachments.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-3">
          {message.attachments.map((att: any) => (
            <div key={att.file_url} className="relative group border rounded-lg p-2 bg-gray-50 dark:bg-gray-800 flex items-center gap-2">
              <div className="flex items-center gap-2">
                {att.file_type?.startsWith('image/') ? (
                  <ImageIcon className="h-4 w-4 text-blue-500" />
                ) : (
                  <File className="h-4 w-4 text-gray-500" />
                )}
                <span className="text-xs font-medium">{att.original_name}</span>
              </div>
              <div className="flex items-center gap-1">
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="h-6 w-6 p-1 hover:bg-blue-100 dark:hover:bg-blue-900" 
                  onClick={() => onPreviewAttachment(att)}
                >
                  <Eye className="h-3 w-3" />
                </Button>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="h-6 w-6 p-1 hover:bg-green-100 dark:hover:bg-green-900" 
                  onClick={() => onDownloadAttachment(att)}
                >
                  <Download className="h-3 w-3" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
      
      {/* الوقت ومؤشر القراءة */}
      <div className="flex items-center gap-2 mt-2">
        <span className="text-xs opacity-70">
          {new Date(message.created_at).toLocaleTimeString("ar-EG", { 
            hour: "2-digit", 
            minute: "2-digit" 
          })}
        </span>
        {isMe && (
          <div className="flex items-center gap-1">
            {message.read_by_patient && message.read_by_doctor ? (
              <CheckCheck className="h-3 w-3 text-green-500" />
            ) : (
              <Check className="h-3 w-3 text-gray-400" />
            )}
          </div>
        )}
      </div>
    </div>
  )
}
