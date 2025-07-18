"use client"

import { useState } from "react"
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"
import { Sidebar } from "./sidebar"

export function MobileSidebar() {
  const [open, setOpen] = useState(false)

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden" aria-label="فتح القائمة">
          <Menu className="h-5 w-5" />
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="p-0 w-64">
        <SheetHeader className="p-4 border-b bg-gradient-to-r from-violet-50 to-purple-50 dark:from-violet-950/20 dark:to-purple-950/20">
          <div className="flex items-center justify-between">
            <SheetTitle className="text-lg font-semibold text-violet-700 dark:text-violet-300">
              القائمة الرئيسية
            </SheetTitle>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setOpen(false)}
              className="h-8 w-8 rounded-full hover:bg-violet-100 dark:hover:bg-violet-900/30 relative z-50"
              aria-label="إغلاق القائمة"
            >
              <X className="h-4 w-4 text-violet-600 dark:text-violet-400" />
            </Button>
          </div>
        </SheetHeader>
        <div className="relative">
          <Sidebar className="h-full border-none" onItemClick={() => setOpen(false)} />
        </div>
      </SheetContent>
    </Sheet>
  )
}
