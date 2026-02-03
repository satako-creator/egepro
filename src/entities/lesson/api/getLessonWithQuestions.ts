// src/entities/lesson/api/getLessonWithQuestions.ts
'use server'

import { getPayload } from 'payload'
import configPromise from '@payload-config'
import type { Subject } from '@/entities/subject/domain/types'
import type { Lesson, PracticeQuestion } from '@/payload-types'

export async function getLessonWithQuestions(
  subject: Subject,
  slug: string,
): Promise<{ lesson: Lesson; questions: PracticeQuestion[] } | null> {
  const payload = await getPayload({ config: configPromise })

  const lessonRes = await payload.find({
    collection: 'lessons',
    where: {
      and: [{ subject: { equals: subject } }, { slug: { equals: slug } }],
    },
    limit: 1,
    depth: 0,
  })

  const lesson = lessonRes.docs[0] as Lesson | undefined
  if (!lesson) return null

  const questionsRes = await payload.find({
    collection: 'practice-questions',
    where: {
      lesson: { equals: lesson.id },
      isEnabled: { equals: true },
    },
    sort: 'order',
    depth: 0,
  })

  return {
    lesson,
    questions: questionsRes.docs as PracticeQuestion[],
  }
}
