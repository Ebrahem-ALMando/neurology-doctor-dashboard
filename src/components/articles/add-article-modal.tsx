"use client"

import type React from "react"
import {useState, useEffect, useRef} from "react"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import {Button} from "@/components/ui/button"
import {Input} from "@/components/ui/input"
import {Label} from "@/components/ui/label"
import {Textarea} from "@/components/ui/textarea"
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select"
import {Plus, FileText, Calendar, User, ImageIcon, Tag, AlignJustify, UploadCloud, X, Trash2} from "lucide-react"
import {articleStatuses, type Article} from "@/data/articles"
import { useAllArticleCategories } from "@/hooks/useArticleCategories"
import { useAllDoctors } from "@/hooks/useUsers"
import { CategoryManagementModal } from "./category-management-modal"
import dynamic from "next/dynamic"
import "react-quill/dist/quill.snow.css"
import {cn} from "@/lib/utils"
import * as ReactDOM from "react-dom"
import uploadImage from "@/api/services/general/uploadImage";
import { deleteArticleImage } from "@/api/services/articlesimage/deleteArticleImage";


const ReactQuill = dynamic(() => import("react-quill"), {ssr: false})


// نوع البيانات المرسلة لـ onSave:
interface UploadedImageData { is_cover: boolean; image_name?: string; image_url?: string }
// نوع خاص للواجهة
interface ArticleFormData {
  title: string;
  short_description: string;
  content: string;
  category_id: number | "";
  doctor_id: number | "";
  is_published: boolean;
  published_at: string;
}

// نوع البيانات المرسلة لـ onSave مع الصور
interface ArticleFormDataWithImages extends ArticleFormData {
  uploadedImages: UploadedImageData[];
  newImages?: any[];
  deletedImages?: any[];
  changedCoverImages?: any[];
}

interface AddArticleModalProps {
    trigger?: React.ReactNode
    article?: Article | null
    onSave: (articleData: ArticleFormDataWithImages) => void
    open?: boolean
    onOpenChange?: (open: boolean) => void
    mode?: 'add' | 'edit' | 'view'
}

const modules: { [key: string]: any } = {
    toolbar: [
        [{font: ["cairo", "serif", "sans", "monospace"]}],
        [{header: "1"}, {header: "2"}],
        [{list: "ordered"}, {list: "bullet"}],
        ["bold", "italic", "underline", "strike"],
        ["blockquote", "code-block"],
        ["link", "image"],
        [{align: []}],
        ["clean"],
    ],
}

export function AddArticleModal({trigger, article, onSave, open: controlledOpen, onOpenChange, mode = 'add'}: AddArticleModalProps) {
    const [internalOpen, setInternalOpen] = useState(false)
    const open = controlledOpen !== undefined ? controlledOpen : internalOpen
    const setOpen = onOpenChange || setInternalOpen
    
        // جلب التصنيفات والأطباء
    const { categories, isLoading: categoriesLoading, mutate: mutateCategories } = useAllArticleCategories()
    const { doctors, isLoading: doctorsLoading, mutate: mutateDoctors } = useAllDoctors()
    
    // حالة موديل إدارة التصنيفات
    const [categoryModalOpen, setCategoryModalOpen] = useState(false)

    const [content, setContent] = useState<string>(article ? (article as any).content ?? "" : "")
    console.log(article)
    // نوع uploadedImages:
    const [uploadedImages, setUploadedImages] = useState<{ file?: File; preview: string; is_cover: boolean; image_name?: string; image_url?: string; id?: number }[]>([])
    const [isDragging, setIsDragging] = useState(false)
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [formData, setFormData] = useState<ArticleFormData>({
  title: "",
  short_description: "",
  content: "",
  category_id: "",
  doctor_id: "",
  is_published: false,
  published_at: new Date().toISOString().split("T")[0],
});

    const oldImagesRef = useRef<{ id?: number; is_cover: boolean }[]>([]);


    const isEditing = mode === 'edit';
    const isViewing = mode === 'view';

    useEffect(() => {
        // This is a common workaround for react-quill with React 18 and Next.js.
        // It ensures that ReactDOM.default.findDOMNode is available, which react-quill relies on.
        // @ts-ignore
        if (!ReactDOM.default) {
            // @ts-ignore
            ReactDOM.default = ReactDOM
        }
        // @ts-ignore
        if (!ReactDOM.default.findDOMNode) {
            // @ts-ignore
            ReactDOM.default.findDOMNode = (node) => {
                // In React 18, findDOMNode is deprecated. For react-quill,
                // often just providing a function that returns the node itself
                // or its underlying DOM node is sufficient to prevent the error.
                if (node && typeof node.getDOMNode === "function") {
                    return node.getDOMNode()
                }
                return node
            }
        }
    }, [])

    useEffect(() => {
        if (article) {
            setFormData({
              title: article.title ?? "",
              short_description: article.short_description ?? "",
              content: article.content ?? "",
              category_id: article.category?.id ?? "",
              doctor_id: article.doctor?.id ?? "",
              is_published: article.is_published ?? false,
              published_at: article.published_at ? article.published_at.split("T")[0] : new Date().toISOString().split("T")[0],
            });
            setContent(article.content ?? "");
            const imgs = article.images
              ? article.images.map((img: any) => ({
                  preview: img.image_url,
                  is_cover: img.is_cover,
                  image_name: img.image_name,
                  image_url: img.image_url,
                  id: img.id,
                }))
              : [];
            setUploadedImages(imgs);
            oldImagesRef.current = imgs.map(img => ({ id: img.id, is_cover: img.is_cover }));
        } else {
            setFormData({
                title: "",
                short_description: "",
                content: "",
                category_id: "",
                doctor_id: "",
                is_published: false,
                published_at: new Date().toISOString().split("T")[0],
            });
            setContent("");
            setUploadedImages([]);
            oldImagesRef.current = [];
        }
    }, [article, mode, open]);

    const handleInputChange = (field: keyof ArticleFormData, value: any) => {
  setFormData((prev) => ({ ...prev, [field]: value }));
};

    // handleFileChange: رفع الصور مباشرة
    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const files = Array.from(e.target.files);
            setIsSubmitting(true);
            try {
                const uploadRes = await uploadImage(files, "articles");
                if (!uploadRes.error && uploadRes.data && uploadRes.data.uploaded) {
                    const newImages = uploadRes.data.uploaded.map((img: any, idx: number) => ({
                        file: files[idx],
                        preview: URL.createObjectURL(files[idx]),
                        is_cover: uploadedImages.length === 0 && idx === 0,
                        image_name: img.image_name,
                        image_url: img.image_url,
                    }));
                    setUploadedImages((prev) => [...prev, ...newImages]);
                }
            } finally {
                setIsSubmitting(false);
            }
        }
    }

    // handleDrop: نفس منطق handleFileChange
    const handleDrop = async (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setIsDragging(false);
        if (e.dataTransfer.files) {
            const files = Array.from(e.dataTransfer.files);
            setIsSubmitting(true);
            try {
                const uploadRes = await uploadImage(files, "articles");
                if (!uploadRes.error && uploadRes.data && uploadRes.data.uploaded) {
                    const newImages = uploadRes.data.uploaded.map((img: any, idx: number) => ({
                        file: files[idx],
                        preview: URL.createObjectURL(files[idx]),
                        is_cover: uploadedImages.length === 0 && idx === 0,
                        image_name: img.image_name,
                        image_url: img.image_url,
                    }));
                    setUploadedImages((prev) => [...prev, ...newImages]);
                }
            } finally {
                setIsSubmitting(false);
            }
        }
    }

    // handleRemoveImage: حذف من السيرفر إذا كانت مرفوعة
    const handleRemoveImage = async (index: number) => {
        const img = uploadedImages[index];
        // إذا كانت image_name رقمية (id)، نفذ الحذف من السيرفر
        if (img.image_name && !isNaN(Number(img.id))) {
            setIsSubmitting(true);
            try {
                await deleteArticleImage(Number(img.id));
            } finally {
                setIsSubmitting(false);
            }
        }
        setUploadedImages((prev) => prev.filter((_, i) => i !== index));
    }

    const handleSetCover = (index: number) => {
        setUploadedImages((prev) => prev.map((img, i) => ({ ...img, is_cover: i === index })))
    }

    // handleSubmit: أرسل فقط بيانات الصور المرفوعة
    // اختيار تصنيف من الموديل
    const handleCategorySelect = (categoryId: number) => {
        handleInputChange("category_id", categoryId);
        setCategoryModalOpen(false);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            // الصور الجديدة فقط
            const newImages = uploadedImages.filter(img => img.file);
            // الصور القديمة فقط
            const oldImages = uploadedImages.filter(img => !img.file && img.id);
            // الصور التي تم حذفها
            const deletedImages = oldImagesRef.current.filter(
              oldImg => !uploadedImages.some(img => img.id === oldImg.id)
            );
            // الصور القديمة التي تغير is_cover لها
            const changedCoverImages = oldImages.filter(img => {
              const old = oldImagesRef.current.find(o => o.id === img.id);
              return old && old.is_cover !== img.is_cover;
            });
            await onSave({
              ...formData,
              content,
              uploadedImages: uploadedImages.map(({ is_cover, image_name, image_url, file, id }) => ({ is_cover, image_name, image_url, file, id })),
              newImages,
              deletedImages,
              changedCoverImages,
            } as ArticleFormDataWithImages);
            setOpen(false);
            if (!isEditing) {
              setFormData({
                title: "",
                short_description: "",
                content: "",
                category_id: "",
                doctor_id: "",
                is_published: false,
                published_at: new Date().toISOString().split("T")[0],
              });
              setUploadedImages([]);
              setContent("");
              oldImagesRef.current = [];
            }

        } finally {
            setIsSubmitting(false);
        }
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            {/* احذف DialogTrigger وزر الإضافة هنا */}
            <DialogContent className="xl:max-w-[50%] max-h-[80vh] p-5 overflow-y-auto">
                <DialogHeader>
                    <DialogTitle className="relative flex items-center gap-2 text-xl pe-10">
                        <div className="rounded-lg bg-gradient-to-br from-violet-500 to-purple-600 p-2 text-white">
                            <FileText className="h-5 w-5"/>
                        </div>
                        {isEditing ? "تعديل المقال" : mode === 'view' ? "عرض المقال" : "إضافة مقال جديد"}
                    </DialogTitle>
                    <DialogDescription className="flex items-center gap-2">
                        قم بملء البيانات التالية {isEditing ? "لتعديل المقال" : mode === 'view' ? "لعرض تفاصيل المقال" : "لإضافة مقال جديد"}
                    </DialogDescription>
                </DialogHeader>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid gap-4">
                        {/* Title */}
                        <div className="space-y-2">
                            <Label htmlFor="title" className="flex items-center gap-2">
                                <FileText className="h-4 w-4 text-violet-600"/>
                                عنوان المقال
                            </Label>
                            <Input
                                id="title"
                                placeholder="أدخل عنوان المقال"
                                value={formData.title}
                                onChange={(e) => handleInputChange("title", e.target.value)}
                                className="focus-visible:ring-violet-500"
                                required
                                disabled={isViewing}
                            />
                        </div>

                        {/* Category */}
                        <div className="space-y-2">
                            <Label htmlFor="category" className="flex items-center gap-2">
                                <Tag className="h-4 w-4 text-violet-600"/>
                                التصنيف
                            </Label>
                            <div className="space-y-2">
                                <div className="flex gap-2">
                                    <Select 
                                        value={formData.category_id ? String(formData.category_id) : ""}
                                        onValueChange={(value) => handleInputChange("category_id", Number(value))}
                                        disabled={isViewing || categoriesLoading}
                                    >
                                        <SelectTrigger className="focus:ring-violet-500 flex-1">
                                            <SelectValue placeholder={categoriesLoading ? "جاري التحميل..." : "اختر التصنيف"}/>
                                        </SelectTrigger>
                                        <SelectContent>
                                            {(categories as any[]).map((category: any) => (
                                                <SelectItem key={category.id} value={String(category.id)}>
                                                    {category.name}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    
                                    {!isViewing && (
                                        <Button
                                            type="button"
                                            variant="outline"
                                            size="sm"
                                            onClick={() => setCategoryModalOpen(true)}
                                            className="border-dashed border-gray-300 hover:border-violet-500 hover:bg-violet-50"
                                        >
                                            <Plus className="h-4 w-4" />
                                        </Button>
                                    )}
                                </div>
                                
                                {formData.category_id && (
                                    <div className="text-xs text-gray-600 dark:text-gray-400">
                                        التصنيف المحدد: {(categories as any[]).find((c: any) => c.id === formData.category_id)?.name}
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Short Description */}
                        <div className="space-y-2">
                            <Label htmlFor="short_description" className="flex items-center gap-2">
                                <AlignJustify className="h-4 w-4 text-violet-600"/>
                                الوصف المختصر
                            </Label>
                            <Textarea
                                id="short_description"
                                placeholder="أدخل وصفًا مختصرًا للمقال..."
                                value={formData.short_description}
                                onChange={(e) => handleInputChange("short_description", e.target.value)}
                                className="focus-visible:ring-violet-500 min-h-[80px]"
                                rows={3}
                                required
                                disabled={isViewing}
                            />
                        </div>

                        {/* Doctor (Author) */}
                        <div className="space-y-2">
                            <Label htmlFor="author" className="flex items-center gap-2">
                                <User className="h-4 w-4 text-violet-600"/>
                                المؤلف (الطبيب)
                            </Label>
                            <Select
                                value={formData.doctor_id ? String(formData.doctor_id) : ""}
                                onValueChange={(value) => handleInputChange("doctor_id", Number(value))}
                                disabled={isViewing || doctorsLoading}>
                                <SelectTrigger className="focus:ring-violet-500">
                                    <SelectValue placeholder={doctorsLoading ? "جاري التحميل..." : "اختر المؤلف (الطبيب)"}/>
                                </SelectTrigger>
                                <SelectContent>
                                    {doctors.map((doctor) => (
                                        <SelectItem key={doctor.id} value={String(doctor.id)}>
                                            {doctor.name}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            
                            {formData.doctor_id && (
                                <div className="text-xs text-gray-600 dark:text-gray-400">
                                    الطبيب المحدد: {doctors.find((d) => d.id === formData.doctor_id)?.name}
                                </div>
                            )}
                        </div>

                        {/* Content (Rich Text Editor) */}
                        <div className="space-y-2">
                            <Label htmlFor="content" className="flex items-center gap-2">
                                <FileText className="h-4 w-4 text-violet-600"/>
                                محتوى المقال
                            </Label>
                            <ReactQuill
                                theme="snow"
                                value={content}
                                onChange={setContent}
                                className="min-h-[200px] [&_.ql-editor]:min-h-[150px]"
                                modules={modules}
                                readOnly={isViewing}
                            />
                            <div className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                                يمكنك إضافة صور داخل المحتوى باستخدام أيقونة الصورة في شريط الأدوات أعلاه.
                            </div>
                        </div>

                        {/* Status */}
                        <div className="space-y-2">
                            <Label htmlFor="status" className="flex items-center gap-2">
                                <Tag className="h-4 w-4 text-violet-600"/>
                                الحالة
                            </Label>
                            <Select
                                value={formData.is_published ? "published" : "draft"}
                                onValueChange={(value) => handleInputChange("is_published", value === "published")}
                                disabled={isViewing}>
                                <SelectTrigger className="focus:ring-violet-500">
                                    <SelectValue placeholder="اختر الحالة"/>
                                </SelectTrigger>
                                <SelectContent>
                                    {articleStatuses.map((status) => (
                                        <SelectItem key={status} value={status}>
                                            {status === "published" ? "منشور" : status === "draft" ? "مسودة" : "مميز"}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>

                        {/* Published Date */}
                        <div className="space-y-2">
                            <Label htmlFor="published_at" className="flex items-center gap-2">
                                <Calendar className="h-4 w-4 text-violet-600"/>
                                تاريخ النشر
                            </Label>
                            <Input
                                id="published_at"
                                type="date"
                                value={formData.published_at}
                                onChange={(e) => handleInputChange("published_at", e.target.value)}
                                className="focus-visible:ring-violet-500"
                                disabled={isViewing}
                            />

                        </div>

                        {/* Article Images (Drag & Drop) */}
                        <div className="space-y-2">
                            <Label htmlFor="article-images" className="flex items-center gap-2">
                                <ImageIcon className="h-4 w-4 text-violet-600"/>
                                صور المقال (سحب وإفلات)
                            </Label>
                            <div
                                className={cn(
                                    "flex flex-col items-center justify-center rounded-md border-2 border-dashed p-6 text-center transition-colors cursor-pointer",
                                    isDragging
                                        ? "border-violet-500 bg-violet-50 dark:bg-violet-950"
                                        : "border-gray-300 bg-gray-50 dark:border-gray-700 dark:bg-gray-900",
                                )}
                                onDragOver={(e) => {
                                    e.preventDefault()
                                    setIsDragging(true)
                                }}
                                onDragLeave={() => setIsDragging(false)}
                                onDrop={handleDrop}
                                onClick={() => document.getElementById("file-upload-article-images")?.click()}
                                // لا تمرر disabled هنا
                            >
                                <UploadCloud className="h-8 w-8 text-gray-400"/>
                                <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                                    اسحب وأفلت الصور هنا، أو
                                    <span className="text-violet-600 hover:underline">&nbsp;تصفح</span>
                                </p>
                                <Input
                                    id="file-upload-article-images"
                                    type="file"
                                    multiple
                                    className="sr-only"
                                    onChange={handleFileChange}
                                    accept="image/*"
                                    disabled={isViewing}
                                />
                            </div>
                            {uploadedImages.length > 0 && (
                                <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
                                    {uploadedImages.map((image, index) => (
                                        <div key={index} className="relative group">
                                            <img
                                                src={image.preview || "/placeholder.svg"}
                                                alt={`Preview ${index}`}
                                                className="h-24 w-full rounded-md object-cover"
                                            />
                                            {/* زر تعيين كغلاف */}
                                            <button
                                                type="button"
                                                className={`absolute top-2 left-2 z-10 px-2 py-1 text-xs rounded-full border ${image.is_cover ? 'bg-violet-600 text-white border-violet-700' : 'bg-white text-gray-700 border-gray-300'} transition-colors`}
                                                onClick={() => handleSetCover(index)}
                                                disabled={isViewing}
                                            >
                                                {image.is_cover ? 'غلاف' : 'تعيين كغلاف'}
                                            </button>
                                            <Button
                                                type="button"
                                                variant="destructive"
                                                size="icon"
                                                className="absolute -top-2 -right-2 h-6 w-6 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                                                onClick={() => handleRemoveImage(index)}
                                                disabled={isSubmitting || isViewing}
                                            >
                                                {isSubmitting ? <span className="loader inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span> : <X className="h-4 w-4"/>}
                                                <span className="sr-only">إزالة الصورة</span>
                                            </Button>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>

                    <DialogFooter className="gap-2">
                        <Button
                            type="button"
                            variant="outline"
                            onClick={() => setOpen(false)}
                            className="border-gray-300 hover:bg-gray-50 dark:border-gray-600 dark:hover:bg-gray-800"
                            disabled={isSubmitting || isViewing}
                        >
                            إلغاء
                        </Button>
                        {!isViewing && (
                            <Button
                                type="submit"
                                className="bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700"
                                disabled={isSubmitting}
                            >
                                {isSubmitting ? <span className="loader inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span> : (isEditing ? "حفظ التغييرات" : "إضافة المقال")}
                            </Button>
                        )}
                    </DialogFooter>
                </form>
            </DialogContent>
            
            {/* موديل إدارة التصنيفات */}
            <CategoryManagementModal
                open={categoryModalOpen}
                onOpenChange={setCategoryModalOpen}
                onCategorySelect={handleCategorySelect}
                selectedCategoryId={formData.category_id as number}
            />
        </Dialog>
    )
}
