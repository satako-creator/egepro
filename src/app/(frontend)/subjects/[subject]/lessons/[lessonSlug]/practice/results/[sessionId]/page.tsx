import { notFound } from 'next/navigation'
import type { Subject } from '@/entities/subject/domain/types'
import { getPracticeSessionById } from '@/entities/practice/api/getPracticeSessionById'
import Link from 'next/link'

type PageProps = {
  params: Promise<{
    subject: Subject
    lessonSlug: string
    sessionId: string
  }>
}

export default async function PracticeResultsPage({ params }: PageProps) {
  const { subject, lessonSlug, sessionId } = await params

  let session
  try {
    session = await getPracticeSessionById(sessionId)
  } catch {
    notFound()
  }

  if (!session) {
    notFound()
  }

  const totalScore = session.totalScore ?? 0
  const accuracy = session.accuracy ?? 0
  const timeSpent =
    typeof session.timeSpentTotal === 'number' ? Math.round(session.timeSpentTotal / 1000) : null

  const answered = session.completedQuestions?.length ?? 0
  console.log('session.completedQuestions ==> ', session.completedQuestions)

  const lessonTitle =
    typeof session.lesson === 'object' && session.lesson ? session.lesson.title : lessonSlug

  return (
    <div className="min-h-screen bg-muted/30">
      <div className="container py-8 space-y-6">
        <header className="space-y-2">
          <p className="text-xs text-muted-foreground uppercase tracking-wide">
            {subject === 'math' ? 'Математика' : 'Физика'}
          </p>
          <h1 className="text-2xl font-bold">Результаты практики</h1>
          <p className="text-sm text-muted-foreground">
            Урок: <span className="font-medium">{lessonTitle}</span>
          </p>
        </header>

        <section className="grid gap-4 md:grid-cols-3">
          <div className="rounded-lg border bg-card p-4">
            <div className="text-xs text-muted-foreground">Счёт</div>
            <div className="text-2xl font-bold">{totalScore}</div>
          </div>
          <div className="rounded-lg border bg-card p-4">
            <div className="text-xs text-muted-foreground">Точность</div>
            <div className="text-2xl font-bold">{Math.round(accuracy)}%</div>
          </div>
          <div className="rounded-lg border bg-card p-4">
            <div className="text-xs text-muted-foreground">Решено вопросов</div>
            <div className="text-2xl font-bold">{answered}</div>
            {timeSpent != null && (
              <div className="text-xs text-muted-foreground mt-1">Время: ~{timeSpent} сек</div>
            )}
          </div>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-semibold">Вопросы</h2>
          <div className="space-y-2">
            {(session.completedQuestions ?? []).map((q, index) => (
              <div
                key={q.id ?? `${q.questionId}-${index}`}
                className="flex items-center justify-between rounded-lg border bg-card px-4 py-3"
              >
                <div>
                  <div className="text-sm font-medium">Вопрос {index + 1}</div>
                  <div className="text-xs text-muted-foreground">
                    Ваш ответ: {q.userAnswer ?? '—'}
                  </div>
                </div>
                <span
                  className={`text-xs px-2 py-1 rounded-full ${
                    q.isCorrect
                      ? 'bg-success/30 text-success-foreground'
                      : 'bg-destructive/30 text-destructive-foreground'
                  }`}
                >
                  {q.isCorrect ? 'Верно' : 'Ошибка'}
                </span>
              </div>
            ))}
          </div>
        </section>

        <section className="flex gap-3">
          <Link
            href={`/subjects/${subject}/lessons/${lessonSlug}/practice`}
            className="inline-flex items-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
          >
            Пройти ещё раз
          </Link>
          <Link
            href={`/subjects/${subject}/lessons/${lessonSlug}`}
            className="inline-flex items-center rounded-md border px-4 py-2 text-sm font-medium hover:bg-muted"
          >
            Вернуться к теории
          </Link>
        </section>
      </div>
    </div>
  )
}
