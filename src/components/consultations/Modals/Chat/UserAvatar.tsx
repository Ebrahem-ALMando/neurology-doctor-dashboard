"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

interface UserAvatarProps {
  name: string;
  avatarUrl?: string | null;
  size?: "sm" | "md" | "lg";
  role?: "doctor" | "patient" | "admin";
}

export function UserAvatar({
  name,
  avatarUrl,
  size = "md",
  role,
}: UserAvatarProps) {
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((word) => word.charAt(0))
      .join("")
      .toUpperCase()
      .slice(0, 2)
  }

  const getSizeClasses = () => {
    switch (size) {
      case "sm":
        return "w-8 h-8 text-xs"
      case "lg":
        return "w-16 h-16 text-lg"
      default:
        return "w-10 h-10 text-sm"
    }
  }

  const getGradientColors = () => {
    switch (role) {
      case "doctor":
        return "from-blue-500 to-blue-600"
      case "patient":
        return "from-green-500 to-green-600"
      case "admin":
        return "from-purple-500 to-purple-600"
      default:
        return "from-gray-500 to-gray-600"
    }
  }

  const initials = getInitials(name || "??")
  const sizeClasses = getSizeClasses()

  return (
    <div className={`rounded-full shadow-md bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center ${sizeClasses}`}>
      <Avatar>
        <AvatarImage
          src={avatarUrl || ""}
          className={`rounded-full object-cover ${sizeClasses}`}
        />
        <AvatarFallback
          className={`w-full h-full rounded-full bg-gradient-to-br ${getGradientColors()} flex items-center justify-center text-white font-medium ${sizeClasses}`}
        >
          {initials}
        </AvatarFallback>
      </Avatar>
    </div>
  )
}
