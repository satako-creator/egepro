// src/app/(frontend)/subjects/[subject]/lessons/[lessonSlug]/practice/page.tsx
import { notFound } from 'next/navigation'
import type { Subject } from '@/entities/subject/domain/types'
import { getLessonWithQuestions } from '@/entities/lesson/api/getLessonWithQuestions'
import { PracticePanel } from '@/widgets/PracticePanel'
// пока работаем без auth → userId захардкожим или уберём

type PageProps = {
  params: Promise<{ subject: Subject; lessonSlug: string }>
}

export default async function PracticePage({ params }: PageProps) {
  const { subject, lessonSlug } = await params

  const data = await getLessonWithQuestions(subject, lessonSlug)
  if (!data) notFound()

  const { lesson, questions } = data

  // временно без реального пользователя
  const userId = 1

  return (
    <div className="min-h-screen bg-muted/30">
      <div className="container py-8 space-y-4">
        <h1 className="text-3xl font-bold text-foreground">Практика: {lesson.title}</h1>

        <PracticePanel lesson={lesson} questions={questions} userId={userId} />
      </div>
    </div>
  )
}
