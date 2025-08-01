"use client"

import { useToast } from "@/components/ui/use-toast"
import {
  Toast,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
} from "@/components/ui/toast"

export function Toaster() {
  const { toasts } = useToast()
  
  console.log("Toaster rendering with toasts:", toasts) // للتأكد من أن التوستات موجودة

  return (
    <ToastProvider>
      {toasts.map(function ({ id, title, description, action, ...props }) {
        console.log("Rendering toast:", { id, title, description }) // للتأكد من كل توست
        return (
          <Toast key={id} {...props}>
            <div className="grid gap-1">
              {title && <ToastTitle>{title}</ToastTitle>}
              {description && (
                <ToastDescription>{description}</ToastDescription>
              )}
            </div>
            {action}
            <ToastClose />
          </Toast>
        )
      })}
      <ToastViewport />
    </ToastProvider>
  )
}
