"use client"

import { createContext, useContext, ReactNode } from "react"
import { useAuth } from "@/hooks/useAuth"

interface AuthContextType {
  user: any
  token: string | null
  isAuthenticated: boolean
  isLoading: boolean
  login: (data: any) => Promise<{ success: boolean; message: string }>
  verifyOtp: (data: any) => Promise<{ success: boolean; message: string; user?: any }>
  logout: () => Promise<void>
  checkAuth: () => boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

interface AuthProviderProps {
  children: ReactNode
}

export function AuthProvider({ children }: AuthProviderProps) {
  const auth = useAuth()

  return (
    <AuthContext.Provider value={auth}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuthContext() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuthContext must be used within an AuthProvider")
  }
  return context
} 