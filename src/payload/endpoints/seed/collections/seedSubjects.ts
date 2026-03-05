import type { Payload } from 'payload'
import subjectsData from '../data/subjects.json'

export const seedSubjects = async (payload: Payload): Promise<void> => {
  console.log('🌱 Seeding subjects...')

  for (const data of subjectsData) {
    const existing = await payload.find({
      collection: 'subjects',
      where: { slug: { equals: data.slug } }, // лучше по slug, чем по name
      limit: 1,
    })

    if (existing.docs.length > 0) {
      const updated = await payload.update({
        collection: 'subjects',
        id: existing.docs[0].id,
        data: {
          ...data,
          // updatedAt payload сам проставит, поле системное
        },
      })

      console.log(`✅ Предмет обновлен: ${updated.name} (id: ${updated.id})`)
    } else {
      const created = await payload.create({
        collection: 'subjects',
        data,
      })

      console.log(`✅ Предмет создан: ${created.name} (id: ${created.id})`)
    }
  }

  console.log('✅ Subjects seeding done')
}
