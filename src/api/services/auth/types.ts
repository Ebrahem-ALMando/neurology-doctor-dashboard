// أنواع البيانات الخاصة بالمصادقة

export interface LoginData {
  phone: string
  role: 'admin' | 'doctor' | 'receptionist' | 'patient'
  device_token: string
  device_type: 'mobile' | 'web'
}

export interface VerifyOtpData {
  phone: string
  role: 'admin' | 'doctor' | 'receptionist' | 'patient'
  otp: string
  device_token: string
  device_type: 'mobile' | 'web'
}

export interface User {
  id: number
  name: string
  email: string | null
  phone: string
  role: 'admin' | 'doctor' | 'receptionist' | 'patient'
  avatar: string | null
  gender: string | null
  birthdate: string | null
  is_active: boolean
  device_token: string
  device_type: 'mobile' | 'web'
  created_at: string
  updated_at: string
}

export interface LoginResponse {
  success: boolean
  message: string
  key: string
  data: {
    phone: string
    role: string
  }
}

export interface VerifyOtpResponse {
  status: number
  message: string
  data: {
    user: User
    token: string
  }
}

export interface LogoutResponse {
  status: number
  message: string
  data: null
}

export interface AuthState {
  user: User | null
  token: string | null
  isAuthenticated: boolean
  isLoading: boolean
} 