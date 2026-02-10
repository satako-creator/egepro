// src/entities/profile/api/getProfileData.ts
import type { PracticeResult, User } from '@/payload-types'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { getMeUser } from '@/shared/utilities/getMeUser'

export type ProfileResultPoint = Pick<
  PracticeResult,
  'id' | 'xpAfter' | 'completedAt' | 'totalScore' | 'accuracy'
>

export type ProfileData = {
  user: User
  results: ProfileResultPoint[]
}

export async function getProfileData(): Promise<ProfileData | null> {
  try {
    const { user } = await getMeUser()
    const payload = await getPayload({ config: configPromise })

    const resultsRes = await payload.find({
      collection: 'practice-results',
      where: {
        user: { equals: user.id },
      },
      sort: '-completedAt',
      limit: 50,
    })

    return {
      user,
      results: resultsRes.docs as ProfileResultPoint[],
    }
  } catch {
    return null
  }
}
