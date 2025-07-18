"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { LayoutDashboard, Calendar, FileText, Users, Sparkles, HeartPulse } from "lucide-react"
import Link from "next/link"

export function WelcomeScreen() {
  return (
    <div className="w-full max-w-6xl mx-auto py-8">
      {/* Header Card */}
      <Card className="border-0 shadow-xl overflow-hidden bg-gradient-to-br from-violet-50 to-purple-50 dark:from-violet-950/30 dark:to-purple-950/30 mb-8">
        <CardHeader className="pb-6 border-b">
          <div className="flex items-center gap-4">
            <div className="h-16 w-16 rounded-xl bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center text-white shadow-lg">
              <HeartPulse className="h-8 w-8" />
            </div>
            <div>
              <CardTitle className="text-3xl font-bold bg-gradient-to-r from-violet-600 to-purple-600 bg-clip-text text-transparent">
                مرحبًا بك في نظام SmartClinic
              </CardTitle>
              <CardDescription className="text-lg mt-2">
                نظام إدارة العيادات الطبية المتكامل - تخصص طب الأعصاب
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            <Link href="/dashboard" className="block group">
              <Card className="h-full border hover:border-violet-300 dark:hover:border-violet-700 transition-all hover:shadow-lg group-hover:scale-105 duration-300">
                <CardHeader className="pb-3">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-violet-100 dark:bg-violet-900/30 text-violet-600 dark:text-violet-400">
                      <LayoutDashboard className="h-5 w-5" />
                    </div>
                    <CardTitle className="text-lg">لوحة التحكم</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    عرض إحصائيات المرضى والمواعيد والرسوم البيانية للبيانات الطبية
                  </p>
                </CardContent>
              </Card>
            </Link>

            <Link href="/appointments" className="block group">
              <Card className="h-full border hover:border-violet-300 dark:hover:border-violet-700 transition-all hover:shadow-lg group-hover:scale-105 duration-300">
                <CardHeader className="pb-3">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400">
                      <Calendar className="h-5 w-5" />
                    </div>
                    <CardTitle className="text-lg">إدارة المواعيد</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    جدولة وإدارة مواعيد المرضى وعرض التقويم الشهري والأسبوعي
                  </p>
                </CardContent>
              </Card>
            </Link>

            <Link href="/medical-records" className="block group">
              <Card className="h-full border hover:border-violet-300 dark:hover:border-violet-700 transition-all hover:shadow-lg group-hover:scale-105 duration-300">
                <CardHeader className="pb-3">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400">
                      <FileText className="h-5 w-5" />
                    </div>
                    <CardTitle className="text-lg">السجلات الطبية</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    إدارة السجلات الطبية للمرضى وتاريخ الزيارات والتشخيصات
                  </p>
                </CardContent>
              </Card>
            </Link>

            <Link href="/patients" className="block group">
              <Card className="h-full border hover:border-violet-300 dark:hover:border-violet-700 transition-all hover:shadow-lg group-hover:scale-105 duration-300">
                <CardHeader className="pb-3">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400">
                      <Users className="h-5 w-5" />
                    </div>
                    <CardTitle className="text-lg">إدارة المرضى</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">إضافة وتعديل بيانات المرضى وعرض قائمة المرضى والبحث</p>
                </CardContent>
              </Card>
            </Link>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between border-t pt-6 bg-gradient-to-r from-violet-50/50 to-purple-50/50 dark:from-violet-950/10 dark:to-purple-950/10">
          <Button variant="outline" className="gap-2 bg-transparent">
            <Sparkles className="h-4 w-4" />
            إعدادات النظام
          </Button>
          <div className="text-sm text-muted-foreground">نظام SmartClinic v2.0 - مطور خصيصاً لعيادات طب الأعصاب</div>
        </CardFooter>
      </Card>

      {/* Quick Stats */}
      <div className="grid gap-4 md:grid-cols-3 mb-8">
        <Card className="bg-gradient-to-br from-violet-500 to-purple-600 text-white border-0">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-violet-100">إجمالي المرضى</p>
                <p className="text-3xl font-bold">1,247</p>
              </div>
              <Users className="h-12 w-12 text-violet-200" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-emerald-500 to-green-600 text-white border-0">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-emerald-100">المواعيد هذا الشهر</p>
                <p className="text-3xl font-bold">342</p>
              </div>
              <Calendar className="h-12 w-12 text-emerald-200" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-blue-500 to-cyan-600 text-white border-0">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-100">السجلات الطبية</p>
                <p className="text-3xl font-bold">2,156</p>
              </div>
              <FileText className="h-12 w-12 text-blue-200" />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
