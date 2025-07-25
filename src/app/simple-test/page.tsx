"use client"

import { useToast } from "@/components/ui/use-toast"
import { Button } from "@/components/ui/button"

export default function SimpleTestPage() {
  const { toast } = useToast()

  const handleTest = () => {
    console.log("Simple test button clicked")
    toast({
      title: "اختبار بسيط",
      description: "هذا اختبار بسيط للتوست",
      variant: "default",
    })
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-md mx-auto">
        <h1 className="text-2xl font-bold mb-4">اختبار بسيط للتوست</h1>
        <Button onClick={handleTest} className="w-full">
          اختبار التوست
        </Button>
      </div>
    </div>
  )
} 