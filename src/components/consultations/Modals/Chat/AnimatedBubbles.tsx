"use client"

import { useEffect, useState } from "react"
import {
  Heart,
  Stethoscope,
  Pill,
  Activity,
  Brain,
  Eye,
  Shield,
  Zap
} from "lucide-react"

interface Bubble {
  id: number
  x: number
  size: number
  icon: React.ReactNode
  duration: number
  delay: number
  opacity: number
}

export function AnimatedBubbles() {
  const [bubbles, setBubbles] = useState<Bubble[]>([])

  const medicalIcons = [
    <Heart key="heart" className="h-4 w-4 text-pink-400" />,
    <Stethoscope key="stethoscope" className="h-4 w-4 text-blue-400" />,
    <Pill key="pill" className="h-4 w-4 text-green-400" />,
    <Activity key="activity" className="h-4 w-4 text-purple-400" />,
    <Brain key="brain" className="h-4 w-4 text-indigo-400" />,
    <Eye key="eye" className="h-4 w-4 text-cyan-400" />,
    <Shield key="shield" className="h-4 w-4 text-emerald-400" />,
    <Zap key="zap" className="h-4 w-4 text-amber-400" />
  ]

  useEffect(() => {
    const initialBubbles: Bubble[] = Array.from({ length: 12 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      size: Math.random() * 30 + 30,
      icon: medicalIcons[Math.floor(Math.random() * medicalIcons.length)],
      duration: Math.random() * 10 + 8,       
      delay: Math.random() * 3,               
      opacity: Math.random() * 0.3 + 0.2
    }))
  
    setBubbles(initialBubbles)
  }, [])
  

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {bubbles.map(bubble => (
        <div
          key={bubble.id}
          className="absolute flex items-center justify-center animate-bubble"
          style={{
            left: `${bubble.x}%`,
            width: `${bubble.size}px`,
            height: `${bubble.size}px`,
            opacity: bubble.opacity,
            animationDuration: `${bubble.duration}s`,
            animationDelay: `${bubble.delay}s`
          }}
        >
          <div className="bg-white/20 dark:bg-gray-800/20 backdrop-blur-sm rounded-full p-2 border border-white/30 dark:border-gray-600/30 rotate-animation">
            {bubble.icon}
          </div>
        </div>
      ))}
    </div>
  )
}
