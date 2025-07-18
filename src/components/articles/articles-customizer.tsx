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


export interface ArticlesSectionVisibility {
  summaryCards: boolean
  articlesList: boolean // Represents both grid and table view
}

interface ArticlesCustomizerProps {
  visibility: ArticlesSectionVisibility
  onVisibilityChange: (visibility: ArticlesSectionVisibility) => void
}

export function ArticlesCustomizer({ visibility, onVisibilityChange }: ArticlesCustomizerProps) {
  const [localVisibility, setLocalVisibility] = useState<ArticlesSectionVisibility>(visibility)

  const handleChange = (key: keyof ArticlesSectionVisibility) => {
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
          <DialogTitle>تخصيص صفحة المقالات</DialogTitle>
          <DialogDescription>قم بتخصيص العناصر التي تريد عرضها في صفحة المقالات</DialogDescription>
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
              id="articlesList"
              checked={localVisibility.articlesList}
              onCheckedChange={() => handleChange("articlesList")}
            />
            <Label htmlFor="articlesList">قائمة/شبكة المقالات</Label>
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
