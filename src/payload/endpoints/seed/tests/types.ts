export type PracticeQuestionOptionSeed = {
  text: string
  isCorrect: boolean
}

export type PracticeQuestionSeed = {
  type: 'single' | 'multiple' | 'numeric' | 'formula'
  difficulty?: 'easy' | 'medium' | 'hard'
  order?: number
  points?: number
  timeLimit?: number
  tags?: string[]

  // для сборки richText
  questionTitle?: string
  questionText: string
  questionFormula?: string

  options?: PracticeQuestionOptionSeed[]

  correctNumericAnswer?: string

  hintText?: string
  hintFormula?: string

  explanationText?: string
  explanationFormulas?: string[]
}
