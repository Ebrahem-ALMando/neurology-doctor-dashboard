"use client"

import { useToast } from "@/components/ui/use-toast"
import { Button } from "@/components/ui/button"
import useSWR from "swr"

export default function SWRTestPage() {
  const { toast } = useToast()

  // محاكاة useSWR مثل useArticles
  const { data, error, isLoading } = useSWR(
    "test-key",
    () => new Promise(resolve => setTimeout(() => resolve({ test: "data" }), 1000)),
    { revalidateOnFocus: false }
  )

  const handleTestToast = () => {
    console.log("=== TOAST DEBUG IN SWR TEST PAGE ===")
    console.log("1. Button clicked in SWR test page")
    console.log("2. SWR data:", data)
    console.log("3. SWR loading:", isLoading)
    console.log("4. SWR error:", error)
    
    try {
      toast({
        title: "اختبار التوست مع SWR",
        description: "هذا اختبار للتوست مع useSWR",
        variant: "default",
      })
      console.log("5. Toast function called successfully")
    } catch (error) {
      console.error("6. Error calling toast:", error)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">اختبار useSWR مع useToast</h1>
        
        <div className="space-y-4">
          <div className="p-4 bg-blue-100 rounded">
            <h2 className="font-bold mb-2">حالة useSWR:</h2>
            <p>Loading: {isLoading ? "نعم" : "لا"}</p>
            <p>Error: {error ? "نعم" : "لا"}</p>
            <p>Data: {data ? "موجود" : "غير موجود"}</p>
          </div>

          <Button 
            onClick={handleTestToast} 
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
          >
            اختبار التوست مع SWR
          </Button>

          <div className="p-4 bg-yellow-100 rounded">
            <h2 className="font-bold mb-2">هذه الصفحة تستخدم useSWR:</h2>
            <p>إذا عمل التوست هنا، فالمشكلة ليست في useSWR</p>
            <p>إذا لم يعمل التوست هنا، فالمشكلة في تداخل useSWR مع useToast</p>
          </div>
        </div>
      </div>
    </div>
  )
} 