// позже: import { exponentialTests } from './math/exponentialTests'

import { logarithmsTests } from './math/logarithmsTests'
import type { PracticeQuestionSeed } from './types'

type LessonSlug = string

const MATH_TESTS: Record<LessonSlug, PracticeQuestionSeed[]> = {
  'logarithms-definition-properties': logarithmsTests,
  // 'exponential-function-basics': exponentialTests,
}

export const getAllTests = (): {
  lessonSlug: string
  tests: PracticeQuestionSeed[]
}[] => {
  return Object.entries(MATH_TESTS).map(([lessonSlug, tests]) => ({
    lessonSlug,
    tests,
  }))
}
