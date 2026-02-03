'use server'

import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { Subject } from '../domain/types'

export async function getSubjectLessons(subject: Subject) {
  const payload = await getPayload({ config: configPromise })
  const res = await payload.find({
    collection: 'lessons',
    where: { subject: { equals: subject } },
    sort: 'order',
    depth: 1,
  })
  return res.docs
}
