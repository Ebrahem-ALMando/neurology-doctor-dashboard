"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Brain, Phone, Loader2 } from "lucide-react"
import { useAuth } from "@/hooks/useAuth"
import { useCustomToastWithIcons } from "@/hooks/use-custom-toast-with-icons"
import { getDeviceToken, getDeviceType } from "@/utils/device-token"
import { useUsers } from "@/hooks/useUsers"
import { getUsers } from "@/api/services/users"


interface SignInFormProps {
  onSubmit: (phoneNumber: string,userRole:string) => void
  isLoading: boolean
}

const countryCodes = [
  { code: "+963", country: "سورية", flag: "🇸🇾" },
  { code: "+966", country: "السعودية", flag: "🇸🇦" },
  { code: "+971", country: "الإمارات", flag: "🇦🇪" },
  { code: "+965", country: "الكويت", flag: "🇰🇼" },
  { code: "+973", country: "البحرين", flag: "🇧🇭" },
  { code: "+974", country: "قطر", flag: "🇶🇦" },
  { code: "+968", country: "عمان", flag: "🇴🇲" },
  { code: "+962", country: "الأردن", flag: "🇯🇴" },
  { code: "+961", country: "لبنان", flag: "🇱🇧" },
  { code: "+20", country: "مصر", flag: "🇪🇬" },
]

export function SignInForm({ onSubmit }: SignInFormProps) {
  const [countryCode, setCountryCode] = useState("+963")
  const [phoneNumber, setPhoneNumber] = useState("")
  const [isLoadingInner, setIsLoading] = useState(false)
  const { showLoginSuccess, showLoginError, showNetworkError } = useCustomToastWithIcons()
  const { login,isLoading } = useAuth()

  const validatePhoneNumber = (phone: string) => {
    // التحقق من أن رقم الهاتف يحتوي على أرقام فقط وطوله مناسب
    const phoneRegex = /^[0-9]{8,10}$/
    return phoneRegex.test(phone)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)


    if (!phoneNumber.trim()) {
      showLoginError("يرجى إدخال رقم الهاتف")
      setIsLoading(false)
      return
    }

    if (!validatePhoneNumber(phoneNumber)) {
      showLoginError("رقم الهاتف غير صحيح")
      setIsLoading(false)
      return
    }

 
    const fullPhoneNumber = `${countryCode}${phoneNumber}`

    try {
      let userRole = "admin"
      
      const user =await getUsers({ phone: fullPhoneNumber })
    
      if(user.data[0]){
        userRole = user.data[0]?.role as string
      }

      const result = await login({
        phone: fullPhoneNumber,
        role: userRole as "admin" | "doctor" | "receptionist" | "patient" ,
        device_token: getDeviceToken(),
        device_type: getDeviceType()
      })

      if (result.success) {
        showLoginSuccess()
        // OTP sent successfully, navigate to verify page
        onSubmit(fullPhoneNumber,userRole)
      } else {
        showLoginError(result.message)
      }
      setIsLoading(false)
    } catch (error) {
      console.log(error)
      showNetworkError()
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card className="border-0 shadow-2xl bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl">
      <CardHeader className="text-center pb-6">
        {/* Logo */}
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-violet-500 to-purple-600 shadow-lg">
          <Brain className="h-8 w-8 text-white" />
        </div>

        <CardTitle className="text-2xl font-bold text-gray-900 dark:text-gray-100">
          مرحبًا بك في عيادة طب الأعصاب
        </CardTitle>
        <CardDescription className="text-gray-600 dark:text-gray-400 mt-2 leading-relaxed">
          نحن نقدم أفضل الخدمات الطبية المتخصصة في طب الأعصاب
        </CardDescription>

        {/* Contact Info */}
        <div className="mt-4 flex items-center justify-center gap-2 text-sm text-violet-600 dark:text-violet-400">
          <Phone className="h-4 w-4" />
          <span>للاستفسارات: 920001234</span>
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="phone" className="text-right block">
              رقم الهاتف
            </Label>
            <div className="flex gap-2" dir="ltr">
              <Select value={countryCode} onValueChange={setCountryCode}>
                <SelectTrigger className="w-36">
                  <SelectValue>
                    <div className="flex items-center gap-2">
                      <span>{countryCodes.find((c) => c.code === countryCode)?.flag}</span>
                      <span>{countryCode}</span>
                    </div>
                  </SelectValue>
                </SelectTrigger>
                <SelectContent>
                  {countryCodes.map((country) => (
                    <SelectItem key={country.code} value={country.code}>
                      <div className="flex items-center gap-2 text-right">
                        <span>{country.flag}</span>
                        <span>{country.country}</span>
                        <span className="text-muted-foreground">{country.code}</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Input
                id="phone"
                type="tel"
                placeholder="501234567"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value.replace(/\D/g, ""))}
                className="flex-1 text-left"
                maxLength={10}
                disabled={isLoading}
              />
            </div>
          </div>

          <Button
            type="submit"
            className="w-full bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700 text-white font-medium py-3 rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={isLoading || isLoadingInner}
          >
            {isLoading || isLoadingInner ? (
              <>
                <Loader2 className="ml-2 h-4 w-4 animate-spin" />
                جاري الإرسال...
              </>
            ) : (
              "تسجيل الدخول"
            )}
          </Button>
        </form>

        {/* Additional Info */}
        <div className="text-center text-xs text-gray-500 dark:text-gray-400 border-t pt-4">
          <p>سيتم إرسال رمز التحقق عبر رسالة نصية</p>
          <p className="mt-1">قد تطبق رسوم الرسائل النصية حسب مزود الخدمة</p>
        </div>
      </CardContent>
    </Card>
  )
}
