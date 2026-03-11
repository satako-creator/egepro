import type { Payload } from 'payload'
import lessonsData from '../../data/lessons/lessons-math.json'
import { getLessonTheory } from '../../theory'

type LessonSeedItem = {
  title: string
  slug: string
  subjectSlug: string
  topicSlug: string
  grade: '7' | '8' | '9' | '10' | '11'
  order?: number
  summary?: string
  tags?: string[]
  difficulty?: 'easy' | 'medium' | 'hard'
  estimatedTime?: number
  isEnabled?: boolean
}

export const seedLessonsMath = async (payload: Payload): Promise<void> => {
  console.log('🌱 Seeding lessons (math + russian)...')

  for (const rawLesson of lessonsData as LessonSeedItem[]) {
    const subjectRes = await payload.find({
      collection: 'subjects',
      where: { slug: { equals: rawLesson.subjectSlug } },
      limit: 1,
    })
    const subject = subjectRes.docs[0]
    if (!subject?.id) {
      console.warn(
        `⚠️ Subject not found for lesson "${rawLesson.title}" (subjectSlug: ${rawLesson.subjectSlug})`,
      )
      continue
    }

    const topicRes = await payload.find({
      collection: 'topics',
      where: { slug: { equals: rawLesson.topicSlug } },
      limit: 1,
    })
    const topic = topicRes.docs[0]
    if (!topic?.id) {
      console.warn(
        `⚠️ Topic not found for lesson "${rawLesson.title}" (topicSlug: ${rawLesson.topicSlug})`,
      )
      continue
    }

    const theory = getLessonTheory(rawLesson.slug)

    const data = {
      title: rawLesson.title,
      slug: rawLesson.slug,
      subject: subject.id,
      topic: topic.id,
      grade: rawLesson.grade,
      order: rawLesson.order ?? 0,
      summary: rawLesson.summary,
      theory,
      tags: rawLesson.tags?.map((tag) => ({ tag })) ?? [],
      difficulty: rawLesson.difficulty ?? 'medium',
      estimatedTime: rawLesson.estimatedTime ?? null,
      isEnabled: rawLesson.isEnabled ?? true,
    }

    const existing = await payload.find({
      collection: 'lessons',
      where: { slug: { equals: rawLesson.slug } },
      limit: 1,
    })

    if (existing.docs.length > 0) {
      await payload.update({
        collection: 'lessons',
        id: existing.docs[0].id,
        data,
      })
      console.log(`✅ Урок обновлён: ${rawLesson.title}`)
    } else {
      await payload.create({
        collection: 'lessons',
        data,
      })
      console.log(`✅ Урок создан: ${rawLesson.title}`)
    }
  }

  console.log('✅ Lessons (math + russian) seeding done')
}
