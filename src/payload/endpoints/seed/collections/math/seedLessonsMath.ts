import type { Payload } from 'payload'
import lessonsData from '../../data/lessons/lessons-math.json'
import {
  createHeading,
  createParagraph,
  createList,
  createRichText,
  createEquationBlockNode,
} from '../../helpers/helpers'

type LessonSeedItem = {
  title: string
  slug: string
  subjectSlug: string
  topicSlug: string
  grade: '7' | '8' | '9' | '10' | '11'
  order?: number
  summary?: string
  tags?: string[]
  difficulty?: 'easy' | 'medium' | 'hard'
  estimatedTime?: number
  isEnabled?: boolean
}

export const seedLessonsMath = async (payload: Payload): Promise<void> => {
  console.log('🌱 Seeding lessons (math + russian)...')

  for (const rawLesson of lessonsData as LessonSeedItem[]) {
    const subjectRes = await payload.find({
      collection: 'subjects',
      where: { slug: { equals: rawLesson.subjectSlug } },
      limit: 1,
    })
    const subject = subjectRes.docs[0]
    if (!subject?.id) {
      console.warn(
        `⚠️ Subject not found for lesson "${rawLesson.title}" (subjectSlug: ${rawLesson.subjectSlug})`,
      )
      continue
    }

    const topicRes = await payload.find({
      collection: 'topics',
      where: { slug: { equals: rawLesson.topicSlug } },
      limit: 1,
    })
    const topic = topicRes.docs[0]
    if (!topic?.id) {
      console.warn(
        `⚠️ Topic not found for lesson "${rawLesson.title}" (topicSlug: ${rawLesson.topicSlug})`,
      )
      continue
    }

    const theory = buildTheory(rawLesson)

    const data = {
      title: rawLesson.title,
      slug: rawLesson.slug,
      subject: subject.id,
      topic: topic.id,
      grade: rawLesson.grade,
      order: rawLesson.order ?? 0,
      summary: rawLesson.summary,
      theory,
      tags: rawLesson.tags?.map((tag) => ({ tag })) ?? [],
      difficulty: rawLesson.difficulty ?? 'medium',
      estimatedTime: rawLesson.estimatedTime ?? null,
      isEnabled: rawLesson.isEnabled ?? true,
    }

    const existing = await payload.find({
      collection: 'lessons',
      where: { slug: { equals: rawLesson.slug } },
      limit: 1,
    })

    if (existing.docs.length > 0) {
      await payload.update({
        collection: 'lessons',
        id: existing.docs[0].id,
        data,
      })
      console.log(`✅ Урок обновлён: ${rawLesson.title}`)
    } else {
      await payload.create({
        collection: 'lessons',
        data,
      })
      console.log(`✅ Урок создан: ${rawLesson.title}`)
    }
  }

  console.log('✅ Lessons (math + russian) seeding done')
}

const buildTheory = (lesson: LessonSeedItem) => {
  switch (lesson.slug) {
    case 'algebra-short-multiplication':
      return createRichText([
        createHeading('h2', 'Формулы сокращенного умножения'),
        createParagraph('Это базовые формулы, которые позволяют быстро преобразовывать выражения.'),
        createEquationBlockNode('(a + b)^2 = a^2 + 2ab + b^2', 'Квадрат суммы'),
        createEquationBlockNode('(a - b)^2 = a^2 - 2ab + b^2', 'Квадрат разности'),
        createEquationBlockNode('a^2 - b^2 = (a - b)(a + b)', 'Разность квадратов'),
      ])

    case 'quadratic-equations-discriminant':
      return createRichText([
        createHeading('h2', 'Квадратные уравнения'),
        createParagraph('Общее квадратное уравнение имеет вид ax^2 + bx + c = 0, a ≠ 0.'),
        createEquationBlockNode('D = b^2 - 4ac', 'Дискриминант квадратного уравнения'),
        createEquationBlockNode(
          'x_{1,2} = \\frac{-b \\pm \\sqrt{D}}{2a}',
          'Формула корней квадратного уравнения',
        ),
      ])

    case 'basic-trigonometric-identities':
      return createRichText([
        createHeading('h2', 'Основные тригонометрические тождества'),
        createEquationBlockNode(
          '\\sin^2 x + \\cos^2 x = 1',
          'Основное тригонометрическое тождество',
        ),
        createEquationBlockNode('\\tan x = \\frac{\\sin x}{\\cos x}', 'Определение тангенса'),
      ])

    case 'logarithms-definition-properties':
      return createRichText([
        createHeading('h2', 'Логарифмы'),
        createEquationBlockNode('\\log_a b = c \\iff a^c = b', 'Определение логарифма'),
        createEquationBlockNode('\\log_a (xy) = \\log_a x + \\log_a y', 'Логарифм произведения'),
      ])

    default:
      return createRichText([
        createHeading('h2', lesson.title),
        createParagraph('Теория для этого урока будет добавлена позже.'),
      ])
  }
}
