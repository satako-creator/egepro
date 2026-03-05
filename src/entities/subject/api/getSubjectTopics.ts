'use server'

import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { Subject } from '@/payload-types'

export async function getSubjectTopics(subject: Subject) {
  const payload = await getPayload({ config: configPromise })

  const res = await payload.find({
    collection: 'topics',
    where: { subject: { equals: subject.id } },
    sort: 'order',
    depth: 0,
  })
  return res.docs
}
