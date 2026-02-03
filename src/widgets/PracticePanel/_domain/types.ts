export interface CompletedQuestion {
  questionId: number
  isCorrect: boolean
  points: number
  feedback?: string
  userAnswer?: string
}

export interface PracticeSessionState {
  currentQuestionIndex: number
  selectedAnswers: Record<number, string[]>
  isExplanationVisible: boolean
  answeredQuestions: Set<number>
  correctAnswers: Set<number>
  startedAt: string
  completedQuestions: CompletedQuestion[]
}

export interface UsePracticeSessionReturn {
  currentQuestionIndex: number
  selectedAnswers: Record<number, string[]>
  isExplanationVisible: boolean
  progress: number
  answeredQuestions: Set<number>
  isCompleting: boolean
  handleAnswerSelect: (optionId: string) => void
  handleShowExplanation: () => void
  handleNextQuestion: () => void
  handlePreviousQuestion: () => void
  handleComplete: () => void
}
