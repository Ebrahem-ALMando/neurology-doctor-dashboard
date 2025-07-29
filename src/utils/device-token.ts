// دالة للحصول على device_token الحقيقي
export const getDeviceToken = (): string => {
  // في التطبيق الحقيقي، يمكن الحصول على FCM token من Firebase
  // أو استخدام localStorage إذا كان محفوظاً مسبقاً
  
  // محاولة الحصول من localStorage أولاً
  const storedToken = localStorage.getItem('device_token')
  if (storedToken) {
    return storedToken
  }
  
  // إذا لم يكن موجوداً، إنشاء token مؤقت
  const tempToken = `web_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
  
  // حفظه في localStorage للاستخدام المستقبلي
  localStorage.setItem('device_token', tempToken)
  
  return tempToken
}

// دالة لتحديث device_token
export const updateDeviceToken = (newToken: string): void => {
  localStorage.setItem('device_token', newToken)
}

// دالة للحصول على device_type
export const getDeviceType = (): 'mobile' | 'web' => {
  // تحديد نوع الجهاز بناءً على user agent
  const userAgent = navigator.userAgent.toLowerCase()
  
  if (/android|iphone|ipad|ipod|blackberry|windows phone/.test(userAgent)) {
    return 'mobile'
  }
  
  return 'web'
} 