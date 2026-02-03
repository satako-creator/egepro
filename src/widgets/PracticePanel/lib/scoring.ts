// src/widgets/PracticePanel/lib/scoring.ts
import { PracticeQuestion } from '@/payload-types'

export const calculateScore = (
  question: PracticeQuestion,
  userAnswers: string[],
): { isCorrect: boolean; points: number; feedback: string } => {
  const basePoints = question.points || 10

  switch (question.type) {
    case 'single':
    case 'multiple':
      const correctOptions = question.options?.filter((opt) => opt.isCorrect) || []
      const correctOptionIds = correctOptions.map((opt) => opt.id!)

      if (question.type === 'single') {
        const isSingleCorrect =
          userAnswers.length === 1 && correctOptionIds.includes(userAnswers[0])
        return {
          isCorrect: isSingleCorrect,
          points: isSingleCorrect ? basePoints : 0,
          feedback: isSingleCorrect ? 'Правильно!' : 'Попробуйте еще раз.',
        }
      } else {
        // Multiple choice - частичный балл за частичное совпадение
        const correctCount = userAnswers.filter((id) => correctOptionIds.includes(id)).length
        const incorrectCount = userAnswers.filter((id) => !correctOptionIds.includes(id)).length

        if (correctCount === correctOptionIds.length && incorrectCount === 0) {
          return {
            isCorrect: true,
            points: basePoints,
            feedback: 'Все верно!',
          }
        } else {
          const partialPoints = Math.max(
            0,
            (basePoints * (correctCount - incorrectCount)) / correctOptionIds.length,
          )
          return {
            isCorrect: false,
            points: Math.floor(partialPoints),
            feedback: `Частично правильно. Попробуйте еще раз.`,
          }
        }
      }

    case 'numeric':
    case 'formula':
      const correctAnswer = question.correctNumericAnswer
      const isNumericCorrect = userAnswers[0]?.toString() === correctAnswer
      return {
        isCorrect: isNumericCorrect,
        points: isNumericCorrect ? basePoints : 0,
        feedback: isNumericCorrect ? 'Правильно!' : 'Проверьте вычисления.',
      }

    default:
      return {
        isCorrect: false,
        points: 0,
        feedback: 'Тип вопроса не поддерживается.',
      }
  }
}
