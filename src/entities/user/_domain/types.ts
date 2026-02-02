import type { User as PayloadUser, Media } from '@/payload-types'

export type User = {
  id: number
  name?: string | null
  email: string
  avatar?: number | Media | null
  xp: number
  level: number
  streakDays: number
  badges?: Array<{
    code: string
    earnedAt?: string | null
  }>
  totalTournaments: number
  tournamentWins: number
  totalBoosts: number
  settings?: {
    notifications?: boolean
    soundEnabled?: boolean
  }
}

export type UserProfile = Pick<
  User,
  'id' | 'name' | 'email' | 'avatar' | 'xp' | 'level' | 'streakDays'
>
