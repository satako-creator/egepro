import type { Payload } from 'payload'
import topicsData from '../data/topics/topics.math.json'

type TopicSeedItem = {
  name: string
  slug: string
  subjectSlug: string
  order?: number
}

export const seedTopics = async (payload: Payload): Promise<void> => {
  console.log('🌱 Seeding topics...')

  for (const topic of topicsData as TopicSeedItem[]) {
    const subjectRes = await payload.find({
      collection: 'subjects',
      where: { slug: { equals: topic.subjectSlug } },
      limit: 1,
    })

    const subject = subjectRes.docs[0]
    if (!subject?.id) {
      console.warn(
        `⚠️ Subject not found for topic "${topic.name}" (subjectSlug: ${topic.subjectSlug})`,
      )
      continue
    }

    const existing = await payload.find({
      collection: 'topics',
      where: { slug: { equals: topic.slug } },
      limit: 1,
    })

    const data = {
      name: topic.name,
      slug: topic.slug,
      subject: subject.id,
      order: topic.order ?? 0,
    }

    if (existing.docs.length > 0) {
      await payload.update({
        collection: 'topics',
        id: existing.docs[0].id,
        data,
      })
      console.log(`✅ Тема обновлена: ${topic.name}`)
    } else {
      await payload.create({
        collection: 'topics',
        data,
      })
      console.log(`✅ Тема создана: ${topic.name}`)
    }
  }

  console.log('✅ Topics seeding done')
}
