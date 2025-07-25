"use client"

import { useToast } from "@/components/ui/use-toast"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function DebugToastPage() {
  const { toast } = useToast()

  const handleTestToast = () => {
    console.log("=== TOAST DEBUG ===")
    console.log("1. Button clicked")
    
    try {
      toast({
        title: "اختبار التوست",
        description: "هذا اختبار للتوست مع console logs",
        variant: "default",
      })
      console.log("2. Toast function called successfully")
    } catch (error) {
      console.error("3. Error calling toast:", error)
    }
  }

  const handleErrorToast = () => {
    console.log("=== ERROR TOAST DEBUG ===")
    toast({
      title: "خطأ في الاختبار",
      description: "هذا توست خطأ للاختبار",
      variant: "destructive",
    })
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-2xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle>اختبار التوست مع التصحيح</CardTitle>
            <CardDescription>
              اضغط على الأزرار وافتح Console (F12) لرؤية الرسائل
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button onClick={handleTestToast} className="w-full bg-green-600 hover:bg-green-700">
              اختبار التوست العادي
            </Button>
            <Button onClick={handleErrorToast} className="w-full bg-red-600 hover:bg-red-700">
              اختبار توست الخطأ
            </Button>
            <div className="mt-4 p-4 bg-yellow-100 rounded">
              <h3 className="font-bold">تعليمات الاختبار:</h3>
              <ol className="list-decimal list-inside mt-2 space-y-1">
                <li>اضغط F12 لفتح Developer Tools</li>
                <li>اذهب إلى تبويب Console</li>
                <li>اضغط على أي زر أعلاه</li>
                <li>راقب الرسائل في Console</li>
                <li>تحقق من ظهور التوست في أعلى يمين الصفحة</li>
              </ol>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
} 