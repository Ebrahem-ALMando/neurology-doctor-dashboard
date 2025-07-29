"use client"

import * as React from "react"
import * as ToastPrimitives from "@radix-ui/react-toast"
import { cva, type VariantProps } from "class-variance-authority"
import { X, CheckCircle, AlertCircle, Info, XCircle, Loader2 } from "lucide-react"
import { cn } from "@/lib/utils"

const ToastProvider = ToastPrimitives.Provider

const ToastViewport = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Viewport>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Viewport>
>(({ className, ...props }, ref) => (
  <ToastPrimitives.Viewport
    ref={ref}
    className={cn(
      "fixed top-4 right-4 z-[9999] flex max-h-screen w-full flex-col-reverse p-4 md:max-w-[420px]",
      className
    )}
    {...props}
  />
))
ToastViewport.displayName = ToastPrimitives.Viewport.displayName

const toastVariants = cva(
  "group pointer-events-auto relative flex w-full items-start space-x-4 overflow-hidden rounded-xl border-0 p-6 pr-12 shadow-2xl backdrop-blur-sm transition-all duration-300 data-[swipe=cancel]:translate-x-0 data-[swipe=end]:translate-x-[var(--radix-toast-swipe-end-x)] data-[swipe=move]:translate-x-[var(--radix-toast-swipe-move-x)] data-[swipe=move]:transition-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[swipe=end]:animate-out data-[state=closed]:fade-out-80 data-[state=closed]:slide-out-to-right-full data-[state=open]:slide-in-from-top-full data-[state=open]:sm:slide-in-from-bottom-full mb-4",
  {
          variants: {
        variant: {
          default: "bg-white/95 dark:bg-gray-900/95 border-2 border-gray-300/60 dark:border-gray-600/60 text-gray-900 dark:text-gray-100 shadow-[0_8px_32px_rgba(0,0,0,0.12)] dark:shadow-[0_8px_32px_rgba(0,0,0,0.4)]",
          success: "bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-950/95 dark:to-emerald-950/95 border-2 border-green-300/60 dark:border-green-700/60 border-l-4 border-l-green-500 text-green-800 dark:text-green-200 shadow-[0_8px_32px_rgba(34,197,94,0.15)] dark:shadow-[0_8px_32px_rgba(34,197,94,0.3)]",
          error: "bg-gradient-to-r from-red-50 to-rose-50 dark:from-red-950/95 dark:to-rose-950/95 border-2 border-red-300/60 dark:border-red-700/60 border-l-4 border-l-red-500 text-red-800 dark:text-red-200 shadow-[0_8px_32px_rgba(239,68,68,0.15)] dark:shadow-[0_8px_32px_rgba(239,68,68,0.3)]",
          warning: "bg-gradient-to-r from-yellow-50 to-amber-50 dark:from-yellow-950/95 dark:to-amber-950/95 border-2 border-yellow-300/60 dark:border-yellow-700/60 border-l-4 border-l-yellow-500 text-yellow-800 dark:text-yellow-200 shadow-[0_8px_32px_rgba(234,179,8,0.15)] dark:shadow-[0_8px_32px_rgba(234,179,8,0.3)]",
          info: "bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-950/95 dark:to-cyan-950/95 border-2 border-blue-300/60 dark:border-blue-700/60 border-l-4 border-l-blue-500 text-blue-800 dark:text-blue-200 shadow-[0_8px_32px_rgba(59,130,246,0.15)] dark:shadow-[0_8px_32px_rgba(59,130,246,0.3)]",
          loading: "bg-gradient-to-r from-violet-50 to-purple-50 dark:from-violet-950/95 dark:to-purple-950/95 border-2 border-violet-300/60 dark:border-violet-700/60 border-l-4 border-l-violet-500 text-violet-800 dark:text-violet-200 shadow-[0_8px_32px_rgba(139,92,246,0.15)] dark:shadow-[0_8px_32px_rgba(139,92,246,0.3)]",
        },
      },
    defaultVariants: {
      variant: "default",
    },
  }
)

const Toast = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Root>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Root> &
    VariantProps<typeof toastVariants>
>(({ className, variant, ...props }, ref) => {
  return (
    <ToastPrimitives.Root
      ref={ref}
      className={cn(toastVariants({ variant }), className)}
      duration={3000}
      {...props}
    />
  )
})
Toast.displayName = ToastPrimitives.Root.displayName

const ToastAction = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Action>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Action>
>(({ className, ...props }, ref) => (
  <ToastPrimitives.Action
    ref={ref}
    className={cn(
      "inline-flex h-8 shrink-0 items-center justify-center rounded-md border bg-transparent px-3 text-sm font-medium ring-offset-background transition-colors hover:bg-secondary focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
      className
    )}
    {...props}
  />
))
ToastAction.displayName = ToastPrimitives.Action.displayName

const ToastClose = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Close>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Close>
>(({ className, ...props }, ref) => (
  <ToastPrimitives.Close
    ref={ref}
    className={cn(
      "absolute right-3 top-3 rounded-full p-2 opacity-0 transition-all duration-200 hover:bg-black/10 focus:opacity-100 focus:outline-none focus:ring-2 group-hover:opacity-100 cursor-pointer hover:scale-110 shadow-lg",
      className
    )}
    toast-close=""
    {...props}
  >
    <X className="h-4 w-4" />
  </ToastPrimitives.Close>
))
ToastClose.displayName = ToastPrimitives.Close.displayName

const ToastTitle = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Title>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Title>
>(({ className, ...props }, ref) => (
  <ToastPrimitives.Title
    ref={ref}
    className={cn("text-base font-semibold mb-1", className)}
    {...props}
  />
))
ToastTitle.displayName = ToastPrimitives.Title.displayName

const ToastDescription = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Description>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Description>
>(({ className, ...props }, ref) => (
  <ToastPrimitives.Description
    ref={ref}
    className={cn("text-sm opacity-90 leading-relaxed", className)}
    {...props}
  />
))
ToastDescription.displayName = ToastPrimitives.Description.displayName

// مكون التوست المخصص مع الأيقونات
interface CustomToastProps {
  variant?: "default" | "success" | "error" | "warning" | "info" | "loading"
  title: string | React.ReactNode
  description?: string
  icon?: React.ReactNode
}

const CustomToast = React.forwardRef<
  React.ElementRef<typeof Toast>,
  CustomToastProps
>(({ variant = "default", title, description, icon, ...props }, ref) => {
  const getIcon = () => {
    if (icon) return icon
    
    switch (variant) {
      case "success":
        return (
          <div className="flex-shrink-0 w-12 h-12 rounded-full bg-green-100 dark:bg-green-900/40 flex items-center justify-center shadow-lg shadow-green-500/20 border-2 border-green-200 dark:border-green-800">
            <CheckCircle className="h-6 w-6 text-green-600 dark:text-green-400" />
          </div>
        )
      case "error":
        return (
          <div className="flex-shrink-0 w-12 h-12 rounded-full bg-red-100 dark:bg-red-900/40 flex items-center justify-center shadow-lg shadow-red-500/20 border-2 border-red-200 dark:border-red-800">
            <XCircle className="h-6 w-6 text-red-600 dark:text-red-400" />
          </div>
        )
      case "warning":
        return (
          <div className="flex-shrink-0 w-12 h-12 rounded-full bg-yellow-100 dark:bg-yellow-900/40 flex items-center justify-center shadow-lg shadow-yellow-500/20 border-2 border-yellow-200 dark:border-yellow-800">
            <AlertCircle className="h-6 w-6 text-yellow-600 dark:text-yellow-400" />
          </div>
        )
      case "info":
        return (
          <div className="flex-shrink-0 w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-900/40 flex items-center justify-center shadow-lg shadow-blue-500/20 border-2 border-blue-200 dark:border-blue-800">
            <Info className="h-6 w-6 text-blue-600 dark:text-blue-400" />
          </div>
        )
      case "loading":
        return (
          <div className="flex-shrink-0 w-12 h-12 rounded-full bg-violet-100 dark:bg-violet-900/40 flex items-center justify-center shadow-lg shadow-violet-500/20 border-2 border-violet-200 dark:border-violet-800">
            <Loader2 className="h-6 w-6 animate-spin text-violet-600 dark:text-violet-400" />
          </div>
        )
      default:
        return null
    }
  }

  return (
    <Toast ref={ref} variant={variant} {...props}>
      <div className="flex items-start space-x-4 space-x-reverse">
        {getIcon() && (
          <div className="flex-shrink-0">
            {getIcon()}
          </div>
        )}
        <div className="flex-1 min-w-0">
          <ToastTitle>{title}</ToastTitle>
          {description && (
            <ToastDescription>
              {description}
            </ToastDescription>
          )}
        </div>
      </div>
      <ToastClose />
    </Toast>
  )
})
CustomToast.displayName = "CustomToast"

type ToastProps = React.ComponentPropsWithoutRef<typeof Toast>

type ToastActionElement = React.ReactElement<typeof ToastAction>

// إنشاء toast function مخصص
const TOAST_LIMIT = 5
const TOAST_REMOVE_DELAY = 5000

type ToasterToast = ToastProps & {
  id: string
  title?: React.ReactNode
  description?: React.ReactNode
  action?: ToastActionElement
  variant?: "default" | "success" | "error" | "warning" | "info" | "loading"
}

const actionTypes = {
  ADD_TOAST: "ADD_TOAST",
  UPDATE_TOAST: "UPDATE_TOAST",
  DISMISS_TOAST: "DISMISS_TOAST",
  REMOVE_TOAST: "REMOVE_TOAST",
} as const

let count = 0

function genId() {
  count = (count + 1) % Number.MAX_SAFE_INTEGER
  return count.toString()
}

type ActionType = typeof actionTypes

type Action =
  | {
      type: ActionType["ADD_TOAST"]
      toast: ToasterToast
    }
  | {
      type: ActionType["UPDATE_TOAST"]
      toast: Partial<ToasterToast>
    }
  | {
      type: ActionType["DISMISS_TOAST"]
      toastId?: ToasterToast["id"]
    }
  | {
      type: ActionType["REMOVE_TOAST"]
      toastId?: ToasterToast["id"]
    }

interface State {
  toasts: ToasterToast[]
}

const toastTimeouts = new Map<string, ReturnType<typeof setTimeout>>()

const addToRemoveQueue = (toastId: string) => {
  if (toastTimeouts.has(toastId)) {
    return
  }

  const timeout = setTimeout(() => {
    toastTimeouts.delete(toastId)
    dispatch({
      type: "REMOVE_TOAST",
      toastId: toastId,
    })
  }, TOAST_REMOVE_DELAY)

  toastTimeouts.set(toastId, timeout)
}

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "ADD_TOAST":
      return {
        ...state,
        toasts: [action.toast, ...state.toasts].slice(0, TOAST_LIMIT),
      }

    case "UPDATE_TOAST":
      return {
        ...state,
        toasts: state.toasts.map((t) =>
          t.id === action.toast.id ? { ...t, ...action.toast } : t
        ),
      }

    case "DISMISS_TOAST": {
      const { toastId } = action

      if (toastId) {
        addToRemoveQueue(toastId)
      } else {
        state.toasts.forEach((toast) => {
          addToRemoveQueue(toast.id)
        })
      }

      return {
        ...state,
        toasts: state.toasts.map((t) =>
          t.id === toastId || toastId === undefined
            ? {
                ...t,
                open: false,
              }
            : t
        ),
      }
    }
    case "REMOVE_TOAST":
      if (action.toastId === undefined) {
        return {
          ...state,
          toasts: [],
        }
      }
      return {
        ...state,
        toasts: state.toasts.filter((t) => t.id !== action.toastId),
      }
  }
}

const listeners: Array<(state: State) => void> = []

let memoryState: State = { toasts: [] }

function dispatch(action: Action) {
  memoryState = reducer(memoryState, action)
  listeners.forEach((listener) => {
    listener(memoryState)
  })
}

type Toast = Omit<ToasterToast, "id">

function toast({ ...props }: Toast) {
  const id = genId()

  const update = (props: ToasterToast) =>
    dispatch({
      type: "UPDATE_TOAST",
      toast: { ...props, id },
    })
  const dismiss = () => dispatch({ type: "DISMISS_TOAST", toastId: id })

  dispatch({
    type: "ADD_TOAST",
    toast: {
      ...props,
      id,
      open: true,
      onOpenChange: (open) => {
        if (!open) dismiss()
      },
    },
  })

  return {
    id: id,
    dismiss,
    update,
  }
}

function useToast() {
  const [state, setState] = React.useState<State>(memoryState)

  React.useEffect(() => {
    listeners.push(setState)
    return () => {
      const index = listeners.indexOf(setState)
      if (index > -1) {
        listeners.splice(index, 1)
      }
    }
  }, [state])

  return {
    ...state,
    toast,
    dismiss: (toastId?: string) => dispatch({ type: "DISMISS_TOAST", toastId }),
  }
}

export {
  type ToastProps,
  type ToastActionElement,
  ToastProvider,
  ToastViewport,
  Toast,
  ToastTitle,
  ToastDescription,
  ToastClose,
  ToastAction,
  CustomToast,
  toast,
  useToast,
} 