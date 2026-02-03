import { getSubjectLessons } from '@/entities/subject/api/getSubjectLessons'
import { getSubjectTopics } from '@/entities/subject/api/getSubjectTopics'
import { Subject } from '@/entities/subject/domain/types'
import Link from 'next/link'

type PageProps = {
  params: Promise<{ subject: Subject }>
}

export default async function SubjectDashboardPage({ params: paramsPromise }: PageProps) {
  const { subject } = await paramsPromise

  const [topics, lessons] = await Promise.all([
    getSubjectTopics(subject),
    getSubjectLessons(subject),
  ])

  return (
    <div className="py-8">
      <header className="container">
        <h1 className="text-2xl font-bold">{subject === 'math' ? 'Математика' : 'Физика'}</h1>
        <p className="text-sm text-muted-foreground">
          Выбери раздел и переходи к урокам и тренировкам.
        </p>
      </header>

      <section className="container">
        <h2 className="text-lg font-semibold mb-2">Разделы</h2>
        <div className="grid gap-3 md:grid-cols-2">
          {topics.map((topic: any) => (
            <div key={topic.id} className="rounded-lg border p-4 bg-card">
              <div className="font-medium">{topic.name}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="container">
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-lg font-semibold">Уроки</h2>
          <Link href={`/subjects/${subject}/lessons`} className="text-sm text-primary underline">
            Все уроки
          </Link>
        </div>

        <div className="space-y-2">
          {lessons.map((lesson: any) => (
            <Link
              key={lesson.id}
              href={`/subjects/${subject}/lessons/${lesson.slug}`}
              className="flex items-center justify-between rounded-lg border px-4 py-3 hover:bg-muted"
            >
              <div>
                <div className="font-medium">{lesson.title}</div>
                <div className="text-xs text-muted-foreground">
                  {lesson.grade} класс ·{' '}
                  {typeof lesson.topic === 'object' ? lesson.topic.name : 'Без темы'}
                </div>
              </div>
              {lesson.estimatedTime && (
                <span className="text-xs text-muted-foreground">~{lesson.estimatedTime} мин</span>
              )}
            </Link>
          ))}
        </div>
      </section>
    </div>
  )
}
