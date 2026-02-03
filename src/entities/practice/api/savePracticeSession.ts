'use server'

import { getPayload } from 'payload'
import configPromise from '@payload-config'

type CompletedQuestionInput = {
  questionId: number
  isCorrect: boolean
  points?: number | null
  feedback?: string | null
  userAnswer?: string | null
}

type SavePracticeSessionInput = {
  userId: number
  lessonId: number
  currentQuestionIndex: number
  selectedAnswers: Record<number, string[]>
  completedQuestions: CompletedQuestionInput[]
  startedAt: string
  completedAt: string
  timeSpent: number // мс или сек — выбери одно
}

export async function savePracticeSession(input: SavePracticeSessionInput) {
  const payload = await getPayload({ config: configPromise })

  const totalScore = input.completedQuestions.reduce((sum, q) => sum + (q.points ?? 0), 0)

  const answeredCount = input.completedQuestions.length
  const correctCount = input.completedQuestions.filter((q) => q.isCorrect).length
  const accuracy = answeredCount > 0 ? (correctCount / answeredCount) * 100 : 0

  const session = await payload.create({
    collection: 'practice-sessions',
    data: {
      user: input.userId,
      lesson: input.lessonId,
      completedQuestions: input.completedQuestions.map((q) => ({
        questionId: q.questionId,
        isCorrect: q.isCorrect,
        points: q.points ?? null,
        userAnswer: q.userAnswer ?? null,
      })),
      totalScore,
      accuracy,
      startedAt: input.startedAt,
      completedAt: input.completedAt,
      isCompleted: true,
      timeSpentTotal: input.timeSpent,
    },
  })

  return session
}
