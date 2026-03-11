import { notFound } from 'next/navigation'
import Link from 'next/link'
import RichText from '@/shared/ui/RichText'
import { getLessonBySlug } from '@/entities/lesson/api/getLessonBySlug'
import { getSubjectBySlug } from '@/entities/subject/api/getSubjectBySlug'

type PageProps = {
  params: Promise<{ subject: string; lessonSlug: string }>
}

export default async function LessonPage({ params }: PageProps) {
  const { subject: subjectSlug, lessonSlug } = await params

  const subject = await getSubjectBySlug(subjectSlug)

  if (!subject) {
    notFound()
  }

  const lesson = await getLessonBySlug(subject, lessonSlug)

  if (!lesson) {
    notFound()
  }

  return (
    <section className="py-8">
      <div className="container space-y-6">
        <header className="space-y-2">
          <p className="text-xs text-muted-foreground uppercase tracking-wide">{subject.name}</p>
          <h1 className="text-2xl font-bold">{lesson.title}</h1>
          <p className="text-sm text-muted-foreground">
            {lesson.grade} класс ·{' '}
            {typeof lesson.topic === 'object' ? lesson.topic.name : 'Без темы'}
          </p>
        </header>

        {/* Теория — richText с включённой prose */}
        <section>
          <RichText data={lesson.theory} enableProse className="max-w-3xl mx-auto" />
        </section>

        <section>
          <Link
            href={`/subjects/${subject.slug}/lessons/${lesson.slug}/practice`}
            className="inline-flex items-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
          >
            Перейти к практике
          </Link>
        </section>
      </div>
    </section>
  )
}
