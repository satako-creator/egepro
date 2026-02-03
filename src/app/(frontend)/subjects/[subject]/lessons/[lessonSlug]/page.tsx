// src/app/(frontend)/subjects/[subject]/lessons/[lessonSlug]/page.tsx
import { notFound } from 'next/navigation'
import type { Subject } from '@/entities/subject/domain/types'
import { getLessonBySlug } from '@/entities/lesson/api/getLessonBySlug'
import Link from 'next/link'

type PageProps = {
  params: Promise<{ subject: Subject; lessonSlug: string }>
}

export default async function LessonPage({ params }: PageProps) {
  const { subject, lessonSlug } = await params
  const lesson = await getLessonBySlug(subject, lessonSlug)

  if (!lesson) {
    notFound()
  }

  return (
    <section className="py-8">
      <div className="container space-y-6">
        <header className="space-y-2">
          <p className="text-xs text-muted-foreground uppercase tracking-wide">
            {subject === 'math' ? 'Математика' : 'Физика'}
          </p>
          <h1 className="text-2xl font-bold">{lesson.title}</h1>
          <p className="text-sm text-muted-foreground">
            {lesson.grade} класс ·{' '}
            {typeof lesson.topic === 'object' ? lesson.topic.name : 'Без темы'}
          </p>
        </header>

        {/* Теория — отрисовка richText (у тебя наверняка уже есть компонент) */}
        <section>
          {/* <RichTextRenderer value={lesson.theory} /> */}
          <div className="text-sm text-muted-foreground">Здесь будет рендер richText теории.</div>
        </section>

        <section>
          <Link
            href={`/subjects/${subject}/lessons/${lesson.slug}/practice`}
            className="inline-flex items-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
          >
            Перейти к практике
          </Link>
        </section>
      </div>
    </section>
  )
}
