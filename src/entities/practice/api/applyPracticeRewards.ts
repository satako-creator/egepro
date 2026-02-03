'use server'

import { getPayload } from 'payload'
import configPromise from '@payload-config'
import type { PracticeSession, User } from '@/payload-types'

type ApplyRewardsResult = {
  xpGain: number
  xpBefore: number
  xpAfter: number
  levelBefore: number
  levelAfter: number
  streakBefore: number
  streakAfter: number
}

export async function applyPracticeRewards(
  sessionId: number | string,
): Promise<ApplyRewardsResult | null> {
  const payload = await getPayload({ config: configPromise })

  const session = await payload.findByID({
    collection: 'practice-sessions',
    id: sessionId,
    depth: 1,
  })

  if (!session || !session.user || typeof session.user !== 'object') {
    return null
  }

  // Если уже есть result — считаем, что награда применена
  if (session.result && (session.result as any).xpGain != null) {
    const r = session.result as any
    return {
      xpGain: r.xpGain ?? 0,
      xpBefore: r.xpBefore ?? 0,
      xpAfter: r.xpAfter ?? 0,
      levelBefore: r.levelBefore ?? 1,
      levelAfter: r.levelAfter ?? 1,
      streakBefore: r.streakBefore ?? 0,
      streakAfter: r.streakAfter ?? 0,
    }
  }

  const user = session.user as User

  const totalScore = session.totalScore ?? 0
  const accuracy = session.accuracy ?? 0

  // 1) XP за сессию
  let xpGain = totalScore

  if (accuracy >= 80) {
    xpGain = Math.round(xpGain * 1.2)
  }

  const xpBefore = user.xp ?? 0
  const xpAfter = xpBefore + xpGain

  const levelBefore = user.level ?? 1
  const levelAfter = calculateLevelFromXp(xpAfter)

  // 2) Streak
  const today = new Date()
  today.setHours(0, 0, 0, 0)

  const lastActivityDate = user.lastActivityDate ? new Date(user.lastActivityDate) : null
  if (lastActivityDate) lastActivityDate.setHours(0, 0, 0, 0)

  const streakBefore = user.streakDays ?? 0
  let streakAfter = streakBefore

  if (!lastActivityDate) {
    streakAfter = 1
  } else {
    const diffDays = (today.getTime() - lastActivityDate.getTime()) / (1000 * 60 * 60 * 24)

    if (diffDays === 0) {
      // тот же день — streak не меняем
      streakAfter = streakBefore
    } else if (diffDays === 1) {
      // вчера была активность
      streakAfter = streakBefore + 1
    } else if (diffDays > 1) {
      // пропуск
      streakAfter = 1
    }
  }

  // 3) Обновляем пользователя
  await payload.update({
    collection: 'users',
    id: user.id,
    data: {
      xp: xpAfter,
      level: levelAfter,
      streakDays: streakAfter,
      lastActivityDate: today.toISOString(),
    },
  })

  const rewards: ApplyRewardsResult = {
    xpGain,
    xpBefore,
    xpAfter,
    levelBefore,
    levelAfter,
    streakBefore,
    streakAfter,
  }

  return rewards
}

function calculateLevelFromXp(xp: number): number {
  // level = floor(sqrt(xp / 10))
  if (xp <= 0) return 1
  const level = Math.floor(Math.sqrt(xp / 10))
  return Math.max(level, 1)
}
