// src/widgets/UserProgressBadge/ui/UserProgressBadge.tsx
'use client'

import { useEffect, useState } from 'react'
import { getCurrentUser } from '@/entities/user/api/getCurrentUser'
import type { User } from '@/payload-types'

export function UserProgressBadge() {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getCurrentUser()
      .then(setUser)
      .finally(() => setLoading(false))
  }, [])

  if (loading || !user) return null

  const xp = user.xp ?? 0
  const level = user.level ?? Math.floor(Math.sqrt(xp / 10))
  const streak = user.streakDays ?? 0

  // Простейший прогресс до следующего уровня
  const nextLevelXP = (level + 1) * (level + 1) * 10
  const prevLevelXP = level * level * 10
  const span = nextLevelXP - prevLevelXP || 1
  const progress = Math.min(100, Math.max(0, ((xp - prevLevelXP) / span) * 100))

  return (
    <div className="flex items-center gap-3 px-3 py-1.5 rounded-full bg-card text-card-foreground text-xs border border-border">
      <div className="flex flex-col leading-tight">
        <span className="font-semibold">Уровень {level}</span>
        <span className="text-muted-foreground">{xp} XP</span>
      </div>

      <div className="w-24 h-2 bg-secondary rounded-full overflow-hidden">
        <div
          className="h-full bg-success transition-[width] duration-300"
          style={{ width: `${progress}%` }}
        />
      </div>

      {streak > 0 && (
        <div className="flex items-center gap-1 text-warning">
          <span>🔥</span>
          <span>{streak} дн.</span>
        </div>
      )}
    </div>
  )
}
