"use client"

import { useState, useEffect } from "react"
import { Header } from "@/components/header"
import { Sidebar } from "@/components/sidebar"
import { AppointmentsManagement } from "@/components/appointments/appointments-management"

export default function AppointmentsPage() {


  return (
    <div className="overflow-x-hidden w-full">
      <div
        className={`flex min-h-screen flex-col w-full overflow-x-hidden transition-all duration-700 
           opacity-100 transform translate-y-0`}
        
      >
        <Header />
        <div className="flex flex-1 w-full overflow-x-hidden">
          {/* Desktop Sidebar */}
          <div className="hidden md:block w-64 flex-shrink-0">
            <Sidebar className="h-full border-l" />
          </div>

          {/* Main Content */}
          <main className="flex-1 min-w-0 p-4 md:p-6 overflow-x-hidden">
            <div className="w-full max-w-none">
              <AppointmentsManagement />
            </div>
          </main>
        </div>
      </div>
    </div>
  )
}
