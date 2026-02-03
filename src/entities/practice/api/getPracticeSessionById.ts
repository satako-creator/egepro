'use server'

import { getPayload } from 'payload'
import configPromise from '@payload-config'
import type { PracticeSession } from '@/payload-types'

export async function getPracticeSessionById(id: number | string) {
  const payload = await getPayload({ config: configPromise })

  const session = await payload.findByID({
    collection: 'practice-sessions',
    id,
    depth: 1,
  })

  return session as PracticeSession
}
