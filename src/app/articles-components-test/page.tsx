"use client"

import { useState } from "react"
import { useToast } from "@/components/ui/use-toast"
import { Button } from "@/components/ui/button"
import { Header } from "@/components/header"
import { Sidebar } from "@/components/sidebar"

export default function ArticlesComponentsTestPage() {
  const { toast } = useToast()
  const [step, setStep] = useState(1)

  const handleTestToast = () => {
    console.log("=== TOAST DEBUG IN COMPONENTS TEST PAGE ===")
    console.log("1. Button clicked in components test page")
    
    try {
      toast({
        title: "اختبار التوست",
        description: "هذا اختبار للتوست مع المكونات",
        variant: "default",
      })
      console.log("2. Toast function called successfully")
    } catch (error) {
      console.error("3. Error calling toast:", error)
    }
  }

  const handleNextStep = () => {
    setStep(step + 1)
    toast({
      title: `الخطوة ${step + 1}`,
      description: `انتقلت إلى الخطوة ${step + 1}`,
      variant: "default",
    })
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex min-h-screen flex-col w-full overflow-x-hidden">
        <Header />
        <div className="flex flex-1 w-full overflow-x-hidden">
          {/* Desktop Sidebar */}
          <div className="hidden md:block w-64 flex-shrink-0">
            <Sidebar className="h-full border-l" />
          </div>

          {/* Main Content */}
          <main className="flex-1 min-w-0 p-4 md:p-6 overflow-x-hidden">
            <div className="max-w-4xl mx-auto">
              <h1 className="text-3xl font-bold mb-6">اختبار مكونات صفحة المقالات</h1>
              
              <div className="space-y-4">
                <div className="p-4 bg-blue-100 rounded">
                  <h2 className="font-bold mb-2">الخطوة الحالية: {step}</h2>
                  <p>هذه الصفحة تحتوي على نفس المكونات المستخدمة في صفحة المقالات</p>
                </div>

                <Button 
                  onClick={handleTestToast} 
                  className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
                >
                  اختبار التوست
                </Button>

                <Button 
                  onClick={handleNextStep} 
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
                >
                  الخطوة التالية
                </Button>

                <div className="p-4 bg-yellow-100 rounded">
                  <h2 className="font-bold mb-2">تعليمات الاختبار:</h2>
                  <ol className="list-decimal list-inside space-y-1">
                    <li>اضغط F12 لفتح Developer Tools</li>
                    <li>اذهب إلى تبويب Console</li>
                    <li>اضغط على زر "اختبار التوست"</li>
                    <li>اضغط على زر "الخطوة التالية" لاختبار متعدد</li>
                    <li>راقب الرسائل في Console</li>
                    <li>تحقق من ظهور التوست في أعلى يمين الصفحة</li>
                  </ol>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  )
} 