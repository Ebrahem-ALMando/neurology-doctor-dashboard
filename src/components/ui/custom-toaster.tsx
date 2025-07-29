"use client"

import { ToastProvider, ToastViewport, useToast, CustomToast } from "@/components/ui/custom-toast-with-icons"

function Toaster() {
  const { toasts } = useToast()

  return (
    <>
      {toasts.map(function ({ id, title, description, action, ...props }) {
        return (
          <CustomToast
            key={id}
            title={title}
            description={description as string}
            {...props}
          />
        )
      })}
      <ToastViewport />
    </>
  )
}

export function CustomToaster() {
  return (
    <ToastProvider>
      <Toaster />
    </ToastProvider>
  )
} 