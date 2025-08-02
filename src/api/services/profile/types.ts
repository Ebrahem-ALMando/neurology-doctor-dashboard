// Profile Types
export interface User {
  id: number;
  name: string;
  email: string | null;
  phone: string;
  role: 'admin' | 'doctor' | 'receptionist' | 'patient';
  avatar: string | null;
  avatar_url: string | null;
  gender: 'male' | 'female' | 'other' | null;
  birthdate: string | null;
  blood_type: string | null;
  allergy: string | null;
  chronic_diseases: string | null;
  is_active: boolean;
  device_token: string;
  device_type: 'android' | 'ios' | 'web';
  created_at: string;
  updated_at: string;
}

export interface ProfileResponse {
  user: User;
  token: string;
}

export interface UpdateProfileData {
  name?: string;
  role?: 'admin' | 'doctor' | 'receptionist' | 'patient';
  gender?: 'male' | 'female' | 'other';
  birthdate?: string;
  blood_type?: string;
  allergy?: string;
  chronic_diseases?: string;
  is_active?: boolean;
  device_token?: string;
  device_type?: 'android' | 'ios' | 'web';
}

export interface UpdateProfileResponse {
  id: number;
  name: string;
  email: string | null;
  phone: string;
  role: 'admin' | 'doctor' | 'receptionist' | 'patient';
  avatar: string | null;
  avatar_url: string | null;
  gender: 'male' | 'female' | 'other' | null;
  birthdate: string | null;
  blood_type: string | null;
  allergy: string | null;
  chronic_diseases: string | null;
  is_active: boolean;
  device_token: string;
  device_type: 'android' | 'ios' | 'web';
  created_at: string;
  updated_at: string;
}

export interface AvatarUpdateData {
  avatar_name: string;
}

export interface AvatarUpdateResponse {
  avatar_name: string;
  folder: string;
  avatar_url: string;
  user: User;
}

export interface AvatarDeleteData {
  avatar_name: string;
}

export interface AvatarDeleteResponse {
  id: number;
  name: string;
  email: string | null;
  phone: string;
  role: 'admin' | 'doctor' | 'receptionist' | 'patient';
  avatar: string | null;
  avatar_url: string | null;
  gender: 'male' | 'female' | 'other' | null;
  birthdate: string | null;
  blood_type: string | null;
  allergy: string | null;
  chronic_diseases: string | null;
  is_active: boolean;
  device_token: string;
  device_type: 'android' | 'ios' | 'web';
  created_at: string;
  updated_at: string;
} 