"use client"

import { useState } from "react"
import { Plus, Filter, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { motion, AnimatePresence } from "framer-motion"
import { AddAppointmentModal } from "./add-appointment-modal"

export function AppointmentsActions() {
  const [filterOpen, setFilterOpen] = useState(false)

  return (
    <div className="fixed bottom-6 left-6 z-50 flex flex-col items-end gap-3">
      {/* Filter Panel */}
      <AnimatePresence>
        {filterOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            transition={{ duration: 0.2 }}
            className="mb-2"
          >
            <Card className="w-64 shadow-xl border-violet-200 dark:border-violet-700 bg-white dark:bg-gray-800">
              <CardContent className="p-4">
                <div className="flex justify-between items-center mb-3">
                  <h3 className="text-sm font-medium text-gray-900 dark:text-gray-100">تصفية المواعيد</h3>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-6 w-6 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
                    onClick={() => setFilterOpen(false)}
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      id="confirmed"
                      className="rounded text-violet-600 focus:ring-violet-500 dark:bg-gray-700 dark:border-gray-600"
                    />
                    <label htmlFor="confirmed" className="text-sm text-gray-700 dark:text-gray-300">
                      مؤكد
                    </label>
                  </div>
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      id="pending"
                      className="rounded text-violet-600 focus:ring-violet-500 dark:bg-gray-700 dark:border-gray-600"
                    />
                    <label htmlFor="pending" className="text-sm text-gray-700 dark:text-gray-300">
                      قيد الانتظار
                    </label>
                  </div>
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      id="cancelled"
                      className="rounded text-violet-600 focus:ring-violet-500 dark:bg-gray-700 dark:border-gray-600"
                    />
                    <label htmlFor="cancelled" className="text-sm text-gray-700 dark:text-gray-300">
                      ملغي
                    </label>
                  </div>
                  <Button size="sm" className="w-full mt-2 bg-violet-600 hover:bg-violet-700">
                    تطبيق
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Filter Button */}
      <Button
        size="icon"
        variant="outline"
        className="h-12 w-12 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 bg-white dark:bg-gray-800 border-violet-200 dark:border-violet-700 hover:border-violet-300 dark:hover:border-violet-600"
        onClick={() => setFilterOpen(!filterOpen)}
        title="تصفية المواعيد"
      >
        <Filter
          className={`h-5 w-5 transition-colors ${filterOpen ? "text-violet-600 dark:text-violet-400" : "text-gray-600 dark:text-gray-300"}`}
        />
      </Button>

      {/* Add Appointment Button */}
      <AddAppointmentModal
        trigger={
          <Button
            size="icon"
            className="h-14 w-14 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700 border-0"
            title="إضافة موعد جديد"
          >
            <Plus className="h-6 w-6" />
          </Button>
        }
      />
    </div>
  )
}
