export interface OTPVerificationFormProps {
  phoneNumber: string
  onVerify: (otp: string) => Promise<boolean>
  onResendCode: () => Promise<boolean>
  isLoading: boolean
  userRole: "admin" | "doctor" | "receptionist" | "patient"
} 