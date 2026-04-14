'use server'

import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { Subject } from '@/payload-types'

export async function getSubjectById(id: string): Promise<Subject | null> {
  const payload = await getPayload({ config: configPromise })

  const res = await payload.find({
    collection: 'subjects',
    where: { id: { equals: id } },
    limit: 1,
  })

  return (res.docs[0] as Subject) ?? null
}
