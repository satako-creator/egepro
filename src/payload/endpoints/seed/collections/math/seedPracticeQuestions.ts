import type { Payload } from 'payload'
import { createParagraph, createRichText, createEquationBlockNode } from '../../helpers/helpers'
import { getAllTests } from '../../tests'
import type { PracticeQuestionOptionSeed } from '../../tests/types'

export const seedPracticeQuestions = async (payload: Payload): Promise<void> => {
  console.log('🌱 Seeding practice questions (all math lessons)...')

  const lessonsWithTests = getAllTests()

  for (const { lessonSlug, tests } of lessonsWithTests) {
    if (!tests.length) continue

    const lessonRes = await payload.find({
      collection: 'lessons',
      where: { slug: { equals: lessonSlug } },
      limit: 1,
    })

    const lesson = lessonRes.docs[0]
    if (!lesson?.id) {
      console.warn(`⚠️ Lesson not found (lessonSlug: ${lessonSlug})`)
      continue
    }

    for (const test of tests) {
      const questionNodes = []

      if (test.questionTitle) {
        questionNodes.push(createParagraph(test.questionTitle))
      }
      questionNodes.push(createParagraph(test.questionText))

      if (test.questionFormula) {
        questionNodes.push(createEquationBlockNode(test.questionFormula, undefined))
      }

      const question = createRichText(questionNodes)

      let options: any[] | undefined
      if (test.options && test.options.length > 0) {
        options = test.options.map((opt: PracticeQuestionOptionSeed) => ({
          text: createRichText([createParagraph(opt.text)]),
          isCorrect: opt.isCorrect,
        }))
      }

      const hintNodes = []
      if (test.hintText) {
        hintNodes.push(createParagraph(test.hintText))
      }
      if (test.hintFormula) {
        hintNodes.push(createEquationBlockNode(test.hintFormula, undefined))
      }
      const hint =
        hintNodes.length > 0
          ? createRichText(hintNodes)
          : createRichText([createParagraph('Подсказка будет добавлена позже.')])

      const explanationNodes = []
      if (test.explanationText) {
        explanationNodes.push(createParagraph(test.explanationText))
      }
      if (test.explanationFormulas) {
        for (const f of test.explanationFormulas) {
          explanationNodes.push(createEquationBlockNode(f, undefined))
        }
      }
      const explanation =
        explanationNodes.length > 0
          ? createRichText(explanationNodes)
          : createRichText([createParagraph('Объяснение будет добавлено позже.')])

      const data: any = {
        lesson: lesson.id,
        type: test.type,
        question,
        questionPreview: test.questionTitle ?? test.questionText.slice(0, 80),
        explanation,
        hint,
        difficulty: test.difficulty ?? 'medium',
        order: test.order ?? 0,
        points: test.points ?? 1,
        timeLimit: test.timeLimit ?? 0,
        tags: (test.tags ?? []).map((tag: string) => ({ tag })),
        isEnabled: true,
      }

      if (options) {
        data.options = options
      }
      if (test.correctNumericAnswer) {
        data.correctNumericAnswer = test.correctNumericAnswer
      }

      const existing = await payload.find({
        collection: 'practice-questions',
        where: {
          and: [
            { lesson: { equals: lesson.id } },
            { order: { equals: test.order ?? 0 } },
            { type: { equals: test.type } },
          ],
        },
        limit: 1,
      })

      if (existing.docs.length > 0) {
        await payload.update({
          collection: 'practice-questions',
          id: existing.docs[0].id,
          data,
        })
        console.log(
          `✅ Вопрос обновлён (lesson: ${lessonSlug}, order: ${test.order}, type: ${test.type})`,
        )
      } else {
        await payload.create({
          collection: 'practice-questions',
          data,
        })
        console.log(
          `✅ Вопрос создан (lesson: ${lessonSlug}, order: ${test.order}, type: ${test.type})`,
        )
      }
    }
  }

  console.log('✅ Practice questions seeding done')
}
