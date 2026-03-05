'use server'

import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { Subject } from '@/payload-types'

export async function getSubjects(): Promise<Subject | null> {
  const payload = await getPayload({ config: configPromise })

  const res = await payload.find({
    collection: 'subjects',
    depth: 2,
  })

  return res.docs[0] ?? null
}
