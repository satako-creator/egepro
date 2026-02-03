'use server'

import { getPayload } from 'payload'
import configPromise from '@payload-config'
import type { PracticeQuestion, PracticeSession } from '@/payload-types'

export async function getQuestionsForSession(
  session: PracticeSession,
): Promise<PracticeQuestion[]> {
  const payload = await getPayload({ config: configPromise })

  const questionIds = (session.completedQuestions ?? [])
    .map((q) => q.questionId)
    .filter((id): id is number => typeof id === 'number')

  if (!questionIds.length) return []

  const res = await payload.find({
    collection: 'practice-questions',
    where: {
      id: { in: questionIds },
    },
    limit: questionIds.length,
    depth: 0,
  })

  return res.docs as PracticeQuestion[]
}
