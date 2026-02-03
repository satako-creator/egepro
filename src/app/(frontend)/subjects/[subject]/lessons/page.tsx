// src/app/(frontend)/subjects/[subject]/lessons/page.tsx
import Link from 'next/link'
import type { Subject } from '@/entities/subject/domain/types'
import { getSubjectLessons } from '@/entities/subject/api/getSubjectLessons'

type PageProps = {
  params: Promise<{ subject: Subject }>
}

export default async function SubjectLessonsPage({ params: paramsPromise }: PageProps) {
  const { subject } = await paramsPromise
  const lessons = await getSubjectLessons(subject)

  return (
    <section className="py-8">
      <div className="container space-y-6">
        <h1 className="text-2xl font-bold">
          Уроки по {subject === 'math' ? 'математике' : 'физике'}
        </h1>

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
      </div>
    </section>
  )
}
