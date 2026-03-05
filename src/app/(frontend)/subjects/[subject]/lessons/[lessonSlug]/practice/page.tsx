import { getLessonWithQuestions } from '@/entities/lesson/api/getLessonWithQuestions'
import { getSubjectBySlug } from '@/entities/subject/api/getSubjectBySlug'
import { PracticePanel } from '@/widgets/PracticePanel'
import { notFound } from 'next/navigation'
// пока работаем без auth → userId захардкожим или уберём

type PageProps = {
  params: Promise<{ subject: string; lessonSlug: string }>
}

export default async function PracticePage({ params }: PageProps) {
  const { subject: subjectSlug, lessonSlug } = await params

  const subject = await getSubjectBySlug(subjectSlug)

  if (!subject) {
    notFound()
  }

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
