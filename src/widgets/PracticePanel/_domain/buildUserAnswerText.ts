import type { PracticeQuestion } from '@/payload-types'
import { extractPlainTextFromLexical } from './richText'

export function buildUserAnswerText(question: PracticeQuestion, userAnswers: string[]): string {
  if (question.type === 'single' || question.type === 'multiple') {
    return (
      question.options
        ?.filter((opt) => opt.id && userAnswers.includes(opt.id))
        .map((opt) => extractPlainTextFromLexical(opt.text).slice(0, 60))
        .join(', ') ?? ''
    )
  }

  // numeric / formula
  return userAnswers[0] ?? ''
}
