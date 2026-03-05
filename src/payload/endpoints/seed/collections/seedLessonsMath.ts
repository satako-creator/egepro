import type { Payload } from 'payload'
import lessonsData from '../data/lessons/lessons-math.json'
import {
  createHeading,
  createParagraph,
  createList,
  createRichText,
  createEquationBlockNode,
} from '../helpers/helpers'

type LessonMathSeedItem = {
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
  console.log('🌱 Seeding math lessons...')

  for (const rawLesson of lessonsData as LessonMathSeedItem[]) {
    // 1. Subject: math-profile
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

    // 2. Topic
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

    // 3. Теория с формулами по теме
    const theory = buildMathTheory(rawLesson)

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
      console.log(`✅ Урок (math) обновлён: ${rawLesson.title}`)
    } else {
      await payload.create({
        collection: 'lessons',
        data,
      })
      console.log(`✅ Урок (math) создан: ${rawLesson.title}`)
    }
  }

  console.log('✅ Math lessons seeding done')
}

const buildMathTheory = (lesson: LessonMathSeedItem) => {
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
        createParagraph(
          'Если D > 0, уравнение имеет два корня; если D = 0 — один корень; если D < 0 — действительных корней нет.',
        ),
      ])

    case 'linear-function-graph':
      return createRichText([
        createHeading('h2', 'Линейная функция'),
        createEquationBlockNode('y = kx + b', 'Общий вид линейной функции'),
        createParagraph(
          'Графиком линейной функции является прямая. Параметр k задаёт наклон, b — точку пересечения с осью Oy.',
        ),
      ])

    case 'basic-trigonometric-formulas':
      return createRichText([
        createHeading('h2', 'Основные тригонометрические тождества'),
        createEquationBlockNode(
          '\\sin^2 x + \\cos^2 x = 1',
          'Основное тригонометрическое тождество',
        ),
        createEquationBlockNode('\\tan x = \\frac{\\sin x}{\\cos x}', 'Определение тангенса'),
        createEquationBlockNode('\\cot x = \\frac{\\cos x}{\\sin x}', 'Определение котангенса'),
      ])

    case 'logarithms-basic-properties':
      return createRichText([
        createHeading('h2', 'Логарифмы'),
        createEquationBlockNode('\\log_a b = c \\iff a^c = b', 'Определение логарифма'),
        createEquationBlockNode('\\log_a (xy) = \\log_a x + \\log_a y', 'Логарифм произведения'),
        createEquationBlockNode(
          '\\log_a \\frac{x}{y} = \\log_a x - \\log_a y',
          'Логарифм частного',
        ),
        createEquationBlockNode('\\log_a x^k = k \\cdot \\log_a x', 'Логарифм степени'),
      ])

    case 'planimetry-areas':
      return createRichText([
        createHeading('h2', 'Площади фигур'),
        createEquationBlockNode(
          'S_{\\triangle} = \\frac{1}{2}ah',
          'Площадь треугольника через высоту',
        ),
        createEquationBlockNode(
          'S_{\\triangle} = \\frac{1}{2}ab\\sin \\gamma',
          'Площадь треугольника через сторону и угол',
        ),
        createEquationBlockNode('S_{\\text{прямоуг.}} = ab', 'Площадь прямоугольника'),
        createEquationBlockNode('S_{\\text{круга}} = \\pi R^2', 'Площадь круга'),
      ])

    default:
      return createRichText([
        createHeading('h2', lesson.title),
        createParagraph('Теория для этого урока будет добавлена позже.'),
      ])
  }
}
