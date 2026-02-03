import type { PracticeQuestion } from '@/payload-types'
import type { CompletedQuestion, PracticeSessionState } from '../_domain/types'
import { calculateScore } from '../lib/scoring'
import { buildUserAnswerText } from './buildUserAnswerText'

export function finalizeCurrentQuestionState(
  prev: PracticeSessionState,
  questions: PracticeQuestion[],
): PracticeSessionState {
  const currentQuestionIndex = prev.currentQuestionIndex
  const userAnswers = prev.selectedAnswers[currentQuestionIndex] || []

  if (userAnswers.length === 0 || prev.answeredQuestions.has(currentQuestionIndex)) {
    return prev
  }

  const updatedAnswered = new Set(prev.answeredQuestions)
  const updatedCorrect = new Set(prev.correctAnswers)
  const updatedCompleted: CompletedQuestion[] = [...prev.completedQuestions]

  updatedAnswered.add(currentQuestionIndex)

  const question = questions[currentQuestionIndex]
  const { isCorrect, points, feedback } = calculateScore(question, userAnswers)

  if (isCorrect) {
    updatedCorrect.add(currentQuestionIndex)
  }

  const userAnswerText = buildUserAnswerText(question, userAnswers)

  updatedCompleted.push({
    questionId: question.id,
    isCorrect,
    points,
    feedback,
    userAnswer: userAnswerText,
  })

  return {
    ...prev,
    answeredQuestions: updatedAnswered,
    correctAnswers: updatedCorrect,
    completedQuestions: updatedCompleted,
  }
}
