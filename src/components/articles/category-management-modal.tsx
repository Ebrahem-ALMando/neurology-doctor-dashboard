"use client"

import { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Plus, Trash2, Tag, Search, Loader2 } from "lucide-react"
import { useAllArticleCategories } from "@/hooks/useArticleCategories"
import { addArticleCategory, deleteArticleCategory } from "@/api/services/articlecategory"
import { useToast } from "@/components/ui/use-toast"
import { DeleteConfirmationModal } from "./delete-confirmation-modal"

interface CategoryManagementModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onCategorySelect?: (categoryId: number) => void
  selectedCategoryId?: number
}

export function CategoryManagementModal({
  open,
  onOpenChange,
  onCategorySelect,
  selectedCategoryId
}: CategoryManagementModalProps) {
  const { categories, isLoading, mutate } = useAllArticleCategories()
  const { toast } = useToast()
  
  const [isAddingCategory, setIsAddingCategory] = useState(false)
  const [newCategoryName, setNewCategoryName] = useState("")
  const [showAddForm, setShowAddForm] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [deletingCategoryId, setDeletingCategoryId] = useState<number | null>(null)
  const [deleteModalOpen, setDeleteModalOpen] = useState(false)
  const [categoryToDelete, setCategoryToDelete] = useState<{ id: number; name: string } | null>(null)

  // تصفية التصنيفات حسب البحث
  const filteredCategories = (categories as any[]).filter((category: any) =>
    category.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  // إضافة تصنيف جديد
  const handleAddCategory = async () => {
    if (!newCategoryName.trim()) {
      toast({ title: "خطأ", description: "يرجى إدخال اسم التصنيف", variant: "destructive" })
      return
    }
    
    setIsAddingCategory(true)
    try {
      const res = await addArticleCategory({ name: newCategoryName.trim() })
      if (res.error) {
        toast({ title: "خطأ", description: res.message || "فشل إضافة التصنيف", variant: "destructive" })
        return
      }
      
      toast({ title: "نجاح", description: "تم إضافة التصنيف بنجاح", variant: "default" })
      setNewCategoryName("")
      setShowAddForm(false)
      mutate()
    } catch (err: any) {
      toast({ title: "خطأ", description: err?.message || "حدث خطأ أثناء إضافة التصنيف", variant: "destructive" })
    } finally {
      setIsAddingCategory(false)
    }
  }

  // فتح موديل تأكيد الحذف
  const handleDeleteClick = (categoryId: number, categoryName: string) => {
    setCategoryToDelete({ id: categoryId, name: categoryName })
    setDeleteModalOpen(true)
  }

  // حذف تصنيف
  const handleDeleteCategory = async () => {
    if (!categoryToDelete) return
    
    setDeletingCategoryId(categoryToDelete.id)
    setDeleteModalOpen(false)
    
    try {
      const res = await deleteArticleCategory(categoryToDelete.id)
      if (res.error) {
        toast({ title: "خطأ", description: res.message || "فشل حذف التصنيف", variant: "destructive" })
        return
      }
      
      toast({ title: "نجاح", description: "تم حذف التصنيف بنجاح", variant: "default" })
      mutate()
    } catch (err: any) {
      toast({ title: "خطأ", description: err?.message || "حدث خطأ أثناء حذف التصنيف", variant: "destructive" })
    } finally {
      setDeletingCategoryId(null)
      setCategoryToDelete(null)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px] max-h-[80vh] overflow-hidden">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-3 text-xl">
            <div className="rounded-lg bg-gradient-to-br from-violet-500 to-purple-600 p-2 text-white">
              <Tag className="h-5 w-5" />
            </div>
            إدارة تصنيفات المقالات
          </DialogTitle>
          <DialogDescription>
            يمكنك إضافة أو حذف أو اختيار تصنيفات المقالات
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          {/* شريط البحث */}
          <div className="relative">
            <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="البحث في التصنيفات..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pr-10"
            />
          </div>
   {/* نموذج إضافة تصنيف جديد */}
   {showAddForm ? (
            <div className="space-y-3 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
              <Label htmlFor="newCategory" className="text-sm font-medium">
                اسم التصنيف الجديد
              </Label>
              <div className="flex gap-2">
                <Input
                  id="newCategory"
                  placeholder="أدخل اسم التصنيف..."
                  value={newCategoryName}
                  onChange={(e) => setNewCategoryName(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleAddCategory()}
                  disabled={isAddingCategory}
                  className="flex-1"
                />
                <Button
                  onClick={handleAddCategory}
                  disabled={isAddingCategory || !newCategoryName.trim()}
                  className="bg-emerald-600 hover:bg-emerald-700"
                >
                  {isAddingCategory ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    "إضافة"
                  )}
                </Button>
                <Button
                  variant="outline"
                  onClick={() => {
                    setShowAddForm(false)
                    setNewCategoryName("")
                  }}
                  disabled={isAddingCategory}
                >
                  إلغاء
                </Button>
              </div>
            </div>
          ) : (
            <Button
              type="button"
              variant="outline"
              onClick={() => setShowAddForm(true)}
              className="w-full border-dashed border-gray-300 hover:border-violet-500 hover:bg-violet-50 dark:hover:bg-violet-900/10 transition-all duration-200"
            >
              <Plus className="h-4 w-4 ml-2" />
              إضافة تصنيف جديد
            </Button>
          )}
          {/* قائمة التصنيفات */}
          <div className="max-h-[300px] overflow-y-auto space-y-2">
            {isLoading ? (
              <div className="flex items-center justify-center py-8">
                <Loader2 className="h-6 w-6 animate-spin text-violet-600" />
                <span className="mr-2 text-gray-600">جاري تحميل التصنيفات...</span>
              </div>
            ) : filteredCategories.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                {searchTerm ? "لا توجد تصنيفات تطابق البحث" : "لا توجد تصنيفات"}
              </div>
            ) : (
              filteredCategories.map((category) => (
                <div
                  key={category.id}
                  className={`flex items-center justify-between p-3 rounded-lg border transition-all duration-200 hover:shadow-md group ${
                    selectedCategoryId === category.id
                      ? "border-violet-500 bg-violet-50 dark:bg-violet-900/20"
                      : "border-gray-200 dark:border-gray-700 hover:border-violet-300"
                  }`}
                >
                  <div className="flex items-center gap-3 flex-1">
                    <div className="w-3 h-3 rounded-full bg-gradient-to-r from-violet-500 to-purple-600" />
                    <span className="font-medium text-gray-900 dark:text-gray-100">
                      {category.name}
                    </span>
                    {selectedCategoryId === category.id && (
                      <span className="text-xs bg-violet-100 text-violet-700 dark:bg-violet-900/30 dark:text-violet-300 px-2 py-1 rounded-full">
                        محدد
                      </span>
                    )}
                  </div>
                  
                  <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    {onCategorySelect && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => onCategorySelect(category.id)}
                        className="text-violet-600 hover:bg-violet-100 dark:hover:bg-violet-900/20"
                      >
                        اختيار
                      </Button>
                    )}
                                         <Button
                       variant="ghost"
                       size="sm"
                       onClick={() => handleDeleteClick(category.id, category.name)}
                       disabled={deletingCategoryId === category.id}
                       className="text-rose-600 hover:bg-rose-100 dark:hover:bg-rose-900/20"
                     >
                      {deletingCategoryId === category.id ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : (
                        <Trash2 className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                </div>
              ))
            )}
          </div>

       
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            إغلاق
          </Button>
        </DialogFooter>
      </DialogContent>
      
      {/* موديل تأكيد الحذف */}
      <DeleteConfirmationModal
        open={deleteModalOpen}
        onOpenChange={setDeleteModalOpen}
        onConfirm={handleDeleteCategory}
        title="حذف التصنيف"
        description="هل أنت متأكد من حذف هذا التصنيف؟"
        itemName={categoryToDelete?.name}
        loading={deletingCategoryId === categoryToDelete?.id}
      />
    </Dialog>
  )
} 