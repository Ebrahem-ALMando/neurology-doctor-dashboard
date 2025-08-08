"use client"

import { useToast } from "@/components/ui/use-toast"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useCustomToastWithIcons } from "@/hooks/use-custom-toast-with-icons";

export default function TestToastPage() {
  const { toast } = useToast()
  const { showError, showSaveSuccess, showDeleteSuccess, showUpdateSuccess } =
    useCustomToastWithIcons();
  const handleSuccessToast = () => {
    toast({
      title: "نجاح!",
      description: "هذا توست نجاح يعمل بشكل صحيح.",
      variant: "default",
    })
  }

  const handleErrorToast = () => {
    toast({
      title: "خطأ!",
      description: "هذا توست خطأ يعمل بشكل صحيح.",
      variant: "destructive",
    })
  }

  const handleInfoToast = () => {
    showError({
      title: "فشلت العملية",
      description: "حدث خطأ اثناء تنفيذ العملية",
    });
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-2xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle>اختبار التوست</CardTitle>
            <CardDescription>
              اضغط على الأزرار أدناه لاختبار التوستات
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button onClick={handleSuccessToast} className="w-full bg-green-600 hover:bg-green-700">
              توست نجاح
            </Button>
            <Button onClick={handleErrorToast} className="w-full bg-red-600 hover:bg-red-700">
              توست خطأ
            </Button>
            <Button onClick={handleInfoToast} className="w-full bg-blue-600 hover:bg-blue-700">
              توست معلومات
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
} 