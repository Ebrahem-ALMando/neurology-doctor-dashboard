"use client"

import { useState, useEffect } from "react"
import { Loader2 } from "lucide-react"

interface TypingIndicatorProps {
  typingUsers: Set<number>
  currentUserId: number
  userNames?: Record<number, string>
}

export function TypingIndicator({ typingUsers, currentUserId, userNames }: TypingIndicatorProps) {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const otherTypingUsers = Array.from(typingUsers).filter(id => id !== currentUserId)
    const shouldBeVisible = otherTypingUsers.length > 0
    
    console.log('TypingIndicator - typingUsers:', Array.from(typingUsers), 'currentUserId:', currentUserId, 'shouldBeVisible:', shouldBeVisible)
    
    setIsVisible(shouldBeVisible)
  }, [typingUsers, currentUserId])

  if (!isVisible) return null

  const otherTypingUsers = Array.from(typingUsers).filter(id => id !== currentUserId)
  const typingCount = otherTypingUsers.length

  const getTypingText = () => {
    if (typingCount === 1) {
      const userId = otherTypingUsers[0]
      const userName = userNames?.[userId] || `المستخدم ${userId}`
      return `${userName} يكتب الآن...`
    } else if (typingCount > 1) {
      return `${typingCount} أشخاص يكتبون الآن...`
    }
    return "يكتب الآن..."
  }

  return (
    <div className="flex items-center gap-2 px-4 py-2 text-sm text-gray-500 dark:text-gray-400 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
      <div className="flex items-center gap-1">
        <Loader2 className="h-3 w-3 animate-spin text-blue-500" />
        <span>{getTypingText()}</span>
      </div>
      
      {/* نقاط متحركة */}
      <div className="flex items-center gap-1">
        <div className="w-1 h-1 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
        <div className="w-1 h-1 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
        <div className="w-1 h-1 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
      </div>
    </div>
  )
} 