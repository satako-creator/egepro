'use server'

import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { Subject } from '../domain/types'

export async function getSubjectTopics(subject: Subject) {
  const payload = await getPayload({ config: configPromise })
  const res = await payload.find({
    collection: 'topics',
    where: { subject: { equals: subject } },
    sort: 'order',
    depth: 0,
    // overrideAccess по умолчанию true (локально можно так оставить)
  })
  return res.docs
}
