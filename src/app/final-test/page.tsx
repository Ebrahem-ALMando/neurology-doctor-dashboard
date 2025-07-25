"use client"

import { useToast } from "@/components/ui/use-toast"
import { Button } from "@/components/ui/button"
import { Header } from "@/components/header"
import { Sidebar } from "@/components/sidebar"

export default function FinalTestPage() {
  const { toast } = useToast()

  const handleTestToast = () => {
    console.log("=== FINAL TOAST TEST ===")
    console.log("1. Button clicked in final test page")
    
    try {
      toast({
        title: "🎉 تم حل المشكلة!",
        description: "التوست يعمل الآن بشكل مثالي بعد إزالة overflow-x-hidden",
        variant: "default",
      })
      console.log("2. Toast function called successfully")
    } catch (error) {
      console.error("3. Error calling toast:", error)
    }
  }

  const handleErrorToast = () => {
    toast({
      title: "خطأ في الاختبار",
      description: "هذا توست خطأ للاختبار النهائي",
      variant: "destructive",
    })
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex min-h-screen flex-col w-full">
        <Header />
        <div className="flex flex-1 w-full">
          {/* Desktop Sidebar */}
          <div className="hidden md:block w-64 flex-shrink-0">
            <Sidebar className="h-full border-l" />
          </div>

          {/* Main Content */}
          <main className="flex-1 min-w-0 p-4 md:p-6">
            <div className="max-w-4xl mx-auto">
              <h1 className="text-3xl font-bold mb-6">الاختبار النهائي للتوست</h1>
              
              <div className="space-y-4">
                <div className="p-4 bg-green-100 rounded">
                  <h2 className="font-bold mb-2">✅ تم حل المشكلة!</h2>
                  <p>المشكلة كانت في <code>overflow-x-hidden</code> الذي كان يخفي التوست</p>
                </div>

                <div className="flex gap-4">
                  <Button 
                    onClick={handleTestToast} 
                    className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
                  >
                    اختبار التوست النجاح
                  </Button>

                  <Button 
                    onClick={handleErrorToast} 
                    className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded"
                  >
                    اختبار التوست الخطأ
                  </Button>
                </div>

                <div className="p-4 bg-blue-100 rounded">
                  <h2 className="font-bold mb-2">التغييرات التي تمت:</h2>
                  <ul className="list-disc list-inside space-y-1">
                    <li>إزالة <code>overflow-x-hidden</code> من <code>layout.tsx</code></li>
                    <li>إزالة <code>overflow-x-hidden</code> من <code>articles/page.tsx</code></li>
                    <li>تحديث <code>ToastViewport</code> ليكون في المكان الصحيح</li>
                    <li>زيادة <code>z-index</code> للتوست إلى <code>z-[9999]</code></li>
                  </ul>
                </div>

                <div className="p-4 bg-yellow-100 rounded">
                  <h2 className="font-bold mb-2">الآن يمكنك:</h2>
                  <ul className="list-disc list-inside space-y-1">
                    <li>استخدام التوست في جميع الصفحات</li>
                    <li>رؤية التوست في أعلى يمين الصفحة</li>
                    <li>استخدام التوست مع جميع المكونات</li>
                    <li>استخدام التوست مع useSWR</li>
                  </ul>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  )
} 