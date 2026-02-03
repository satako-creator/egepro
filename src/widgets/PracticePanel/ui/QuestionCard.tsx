import { PracticeQuestion } from '@/payload-types'
import RichText from '@/shared/ui/RichText'
import { AnswerOptions } from './AnswerOptions'
import { ExplanationPanel } from './ExplanationPanel'
import { getDifficultyBadge } from '../_domain/difficulty'

interface QuestionCardProps {
  question: PracticeQuestion
  selectedAnswers: string[]
  isExplanationVisible: boolean
  onAnswerSelect: (answerId: string) => void
  onShowExplanation: () => void
  onNext: () => void
  onPrevious: () => void
  onComplete: () => void
  isCompleting?: boolean
  isLastQuestion: boolean
  isFirstQuestion: boolean
}

export const QuestionCard = ({
  question,
  selectedAnswers,
  isExplanationVisible,
  onAnswerSelect,
  onShowExplanation,
  onNext,
  onPrevious,
  onComplete,
  isCompleting,
  isLastQuestion,
  isFirstQuestion,
}: QuestionCardProps) => {
  const isMultipleChoice = question.type === 'multiple'
  const isSingleChoice = question.type === 'single'
  const isNumeric = question.type === 'numeric'
  const isFormula = question.type === 'formula'

  const isCurrentQuestionAnswered = isAnswered(question, selectedAnswers)

  const diff = getDifficultyBadge(question.difficulty)

  const disableNext =
    !isCurrentQuestionAnswered || (isLastQuestion && isCurrentQuestionAnswered && isCompleting)

  return (
    <div className="bg-card rounded-lg p-6">
      <div className="mb-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-foreground">Вопрос {question.order || 1}</h2>
          <span className={`text-xs px-2 py-1 rounded-full ${diff.className}`}>
            {diff.label === 'Легко' ? 'Легко' : diff.label === 'medium' ? 'Средне' : 'Сложно'}
          </span>
        </div>

        <p className="text-xs text-muted-foreground mb-4">{getQuestionTypeLabel(question)}</p>

        <div className="mb-6">
          <RichText data={question.question} />
        </div>
      </div>

      {/* Опции ответа */}
      {(isSingleChoice || isMultipleChoice) && (
        <AnswerOptions
          options={question.options}
          selectedAnswers={selectedAnswers}
          isMultiple={isMultipleChoice}
          onAnswerSelect={onAnswerSelect}
        />
      )}

      {/* Числовой ответ */}
      {isNumeric && (
        <div className="mb-6">
          <input
            type="text"
            placeholder="Введите число"
            className="w-full p-3 border rounded-lg bg-background text-foreground"
            value={selectedAnswers[0] || ''}
            onChange={(e) => onAnswerSelect(e.target.value)}
          />
        </div>
      )}

      {/* Формула */}
      {isFormula && (
        <div className="mb-6">
          <input
            type="text"
            placeholder="Введите формулу"
            className="w-full p-3 border rounded-lg bg-background text-foreground"
            value={selectedAnswers[0] || ''}
            onChange={(e) => onAnswerSelect(e.target.value)}
          />
        </div>
      )}

      {/* Кнопки управления */}
      <div className="flex justify-between items-center pt-6 border-t border-border">
        <button
          onClick={onPrevious}
          disabled={isFirstQuestion}
          className="px-4 py-2 bg-secondary text-secondary-foreground rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Назад
        </button>

        <div className="flex gap-2">
          {!isExplanationVisible && (
            <button
              onClick={onShowExplanation}
              className="px-4 py-2 bg-muted text-muted-foreground rounded-lg"
            >
              Пояснение
            </button>
          )}

          <button
            onClick={isLastQuestion && isCurrentQuestionAnswered ? onComplete : onNext}
            disabled={disableNext}
            className={`${!disableNext ? '' : 'text-muted-foreground cursor-not-allowed'}`}
          >
            {isLastQuestion && isCurrentQuestionAnswered
              ? isCompleting
                ? 'Сохранение...'
                : 'Завершить'
              : 'Далее'}
          </button>
        </div>
      </div>

      {/* Пояснение */}
      {isExplanationVisible && <ExplanationPanel explanation={question.explanation} />}
    </div>
  )
}

const isAnswered = (question: PracticeQuestion, selectedAnswers: string[]): boolean => {
  if (question.type === 'single') {
    return selectedAnswers.length > 0
  }
  if (question.type === 'multiple') {
    return selectedAnswers.length > 0
  }
  if (question.type === 'numeric' || question.type === 'formula') {
    return selectedAnswers[0]?.length > 0
  }

  return false
}

const getQuestionTypeLabel = (question: PracticeQuestion) => {
  if (question.type === 'single') return 'Один правильный ответ'
  if (question.type === 'multiple') return 'Несколько правильных ответов'
  if (question.type === 'numeric') return 'Ответ — число'
  if (question.type === 'formula') return 'Ответ — формула'
  return ''
}
