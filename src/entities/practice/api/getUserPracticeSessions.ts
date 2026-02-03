'use server'

import { getPayload } from 'payload'
import configPromise from '@payload-config'
import type { PracticeSession } from '@/payload-types'

export async function getUserPracticeSessions(userId: number) {
  const payload = await getPayload({ config: configPromise })

  const res = await payload.find({
    collection: 'practice-sessions',
    where: {
      user: { equals: userId },
    },
    sort: '-completedAt', // последние сначала
    depth: 1, // подтянем lesson
    limit: 50, // на первое время достаточно
  })

  return res.docs as PracticeSession[]
}
