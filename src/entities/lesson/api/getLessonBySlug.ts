'use server'

import { getPayload } from 'payload'
import configPromise from '@payload-config'
import type { Subject } from '@/entities/subject/domain/types'

export async function getLessonBySlug(subject: Subject, slug: string) {
  const payload = await getPayload({ config: configPromise })

  const res = await payload.find({
    collection: 'lessons',
    where: {
      and: [{ subject: { equals: subject } }, { slug: { equals: slug } }],
    },
    limit: 1,
    depth: 1,
  })

  return res.docs[0] ?? null
}
