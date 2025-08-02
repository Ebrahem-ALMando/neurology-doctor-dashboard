import useSWR from "swr"
import { getProfile, updateProfile, updateAvatar, deleteAvatar } from "@/api/services/profile"
import type { UpdateProfileData, AvatarUpdateData, AvatarDeleteData } from "@/api/services/profile"

export function useProfile() {
  const { data, error, isLoading, mutate } = useSWR("profile", getProfile, {
    revalidateOnFocus: false,
    // revalidateOnReconnect: true,
    // dedupingInterval: 60000, // 1 minute
  })

  const profile = data?.data
  const isError = !!error

  const updateUserProfile = async (profileData: UpdateProfileData) => {
    try {
      const response = await updateProfile(profileData)
      await mutate()
      return response
    } catch (error) {
      console.log(error)
    }
  }

  const updateUserAvatar = async (avatarData: AvatarUpdateData) => {
    try {
      const response = await updateAvatar(avatarData)
      await mutate()
      return response
    } catch (error) {
      console.log(error)
    }
  }

  const deleteUserAvatar = async (avatarData: AvatarDeleteData) => {
    try {
      const response = await deleteAvatar(avatarData)
      await mutate()
      return response
    } catch (error) {
      console.log(error)
    }
  }

  return {
    profile,
    isLoading,
    isError,
    error,
    mutate,
    updateUserProfile,
    updateUserAvatar,
    deleteUserAvatar,
  }
} 