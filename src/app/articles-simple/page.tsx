"use client"

import { useToast } from "@/components/ui/use-toast"
import { Button } from "@/components/ui/button"

export default function ArticlesSimplePage() {
  const { toast } = useToast()

  const handleTestToast = () => {
    console.log("=== TOAST DEBUG IN SIMPLE ARTICLES PAGE ===")
    console.log("1. Button clicked in simple articles page")
    
    try {
      toast({
        title: "اختبار التوست",
        description: "هذا اختبار للتوست في صفحة مبسطة",
        variant: "default",
      })
      console.log("2. Toast function called successfully")
    } catch (error) {
      console.error("3. Error calling toast:", error)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">صفحة المقالات المبسطة</h1>
        
        <div className="space-y-4">
          <Button 
            onClick={handleTestToast} 
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
          >
            اختبار التوست
          </Button>
          
          <div className="p-4 bg-blue-100 rounded">
            <h2 className="font-bold mb-2">تعليمات الاختبار:</h2>
            <ol className="list-decimal list-inside space-y-1">
              <li>اضغط F12 لفتح Developer Tools</li>
              <li>اذهب إلى تبويب Console</li>
              <li>اضغط على زر "اختبار التوست" أعلاه</li>
              <li>راقب الرسائل في Console</li>
              <li>تحقق من ظهور التوست في أعلى يمين الصفحة</li>
            </ol>
          </div>
        </div>
      </div>
    </div>
  )
} 