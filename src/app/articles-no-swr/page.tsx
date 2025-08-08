"use client"

import { useToast } from "@/components/ui/use-toast"
import { Button } from "@/components/ui/button"

export default function ArticlesNoSWRPage() {
  const { toast } = useToast()

  const handleTestToast = () => {
    console.log("=== TOAST DEBUG IN NO-SWR ARTICLES PAGE ===")
    console.log("1. Button clicked in no-SWR articles page")
    
    try {
      toast({
        title: "اختبار التوست",
        description: "هذا اختبار للتوست بدون useSWR",
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
        <h1 className="text-3xl font-bold mb-6">صفحة المقالات بدون useSWR</h1>
        
        <div className="space-y-4">
          <Button 
            onClick={handleTestToast} 
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
          >
            اختبار التوست
          </Button>
          
          <div className="p-4 bg-yellow-100 rounded">
            <h2 className="font-bold mb-2">هذه الصفحة لا تستخدم useSWR:</h2>
            <p>إذا عمل التوست هنا، فالمشكلة في useSWR أو في المكونات المعقدة</p>
          </div>
        </div>
      </div>
    </div>
  )
} 