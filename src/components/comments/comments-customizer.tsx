"use client"

import { useState } from "react"
import { Settings } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"

export interface CommentsSectionVisibility {
  summaryCards: boolean
  commentsList: boolean
}

interface CommentsCustomizerProps {
  visibility: CommentsSectionVisibility
  onVisibilityChange: (visibility: CommentsSectionVisibility) => void
}

export function CommentsCustomizer({ visibility, onVisibilityChange }: CommentsCustomizerProps) {
  const [localVisibility, setLocalVisibility] = useState<CommentsSectionVisibility>(visibility)

  const handleChange = (key: keyof CommentsSectionVisibility) => {
    const newVisibility = {
      ...localVisibility,
      [key]: !localVisibility[key],
    }
    setLocalVisibility(newVisibility)
  }

  const handleSave = () => {
    onVisibilityChange(localVisibility)
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="gap-2 bg-transparent">
          <Settings className="h-4 w-4" />
          تخصيص الصفحة
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>تخصيص صفحة تعليقات المقالات</DialogTitle>
          <DialogDescription>قم بتخصيص العناصر التي تريد عرضها في صفحة تعليقات المقالات</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="flex items-center space-x-2 space-x-reverse">
            <Checkbox
              id="summaryCards"
              checked={localVisibility.summaryCards}
              onCheckedChange={() => handleChange("summaryCards")}
            />
            <Label htmlFor="summaryCards">بطاقات الملخص</Label>
          </div>
          <div className="flex items-center space-x-2 space-x-reverse">
            <Checkbox
              id="commentsList"
              checked={localVisibility.commentsList}
              onCheckedChange={() => handleChange("commentsList")}
            />
            <Label htmlFor="commentsList">قائمة التعليقات</Label>
          </div>
        </div>
        <DialogFooter>
          <Button type="submit" onClick={handleSave}>
            حفظ التغييرات
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
} 