# Device Token Management

## نظرة عامة

هذا الملف يحتوي على دوال لإدارة `device_token` و `device_type` في التطبيق.

## الدوال المتاحة

### `getDeviceToken()`
- **الوظيفة**: الحصول على device_token الحقيقي
- **المنطق**:
  1. يتحقق من localStorage أولاً
  2. إذا لم يكن موجوداً، ينشئ token مؤقت
  3. يحفظه في localStorage للاستخدام المستقبلي
- **الاستخدام**: `getDeviceToken()`

### `updateDeviceToken(newToken)`
- **الوظيفة**: تحديث device_token
- **المعاملات**: `newToken` (string) - الـ token الجديد
- **الاستخدام**: `updateDeviceToken("new_fcm_token")`

### `getDeviceType()`
- **الوظيفة**: تحديد نوع الجهاز
- **المنطق**: يفحص user agent لتحديد ما إذا كان mobile أم web
- **الاستخدام**: `getDeviceType()`

## التطوير المستقبلي

### للحصول على FCM Token حقيقي:

```typescript
// في التطبيق الحقيقي، يمكن استخدام Firebase
import { getMessaging, getToken } from 'firebase/messaging'

const getRealFCMToken = async () => {
  try {
    const messaging = getMessaging()
    const token = await getToken(messaging, {
      vapidKey: 'YOUR_VAPID_KEY'
    })
    return token
  } catch (error) {
    console.error('Error getting FCM token:', error)
    return getDeviceToken() // fallback
  }
}
```

### للتطبيق المحمول:

```typescript
// يمكن استخدام Capacitor أو React Native
import { PushNotifications } from '@capacitor/push-notifications'

const getMobileDeviceToken = async () => {
  try {
    const result = await PushNotifications.register()
    return result.value
  } catch (error) {
    console.error('Error getting mobile token:', error)
    return getDeviceToken() // fallback
  }
}
```

## الاستخدام الحالي

```typescript
import { getDeviceToken, getDeviceType } from '@/utils/device-token'

// في طلب تسجيل الدخول
const loginData = {
  phone: phoneNumber,
  role: 'admin',
  device_token: getDeviceToken(),
  device_type: getDeviceType()
}
```

## ملاحظات

- الـ token الحالي مؤقت ويتم إنشاؤه تلقائياً
- في الإنتاج، يجب استبداله بـ FCM token حقيقي
- يتم حفظ الـ token في localStorage للاستخدام المتكرر
- نوع الجهاز يتم تحديده تلقائياً بناءً على user agent 