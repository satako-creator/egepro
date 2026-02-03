// src/widgets/PracticePanel/ui/Sidebar.tsx
import { PracticeQuestion } from '@/payload-types'
import { extractPlainTextFromLexical } from '../_domain/richText'
// import { ProgressBar } from './ProgressBar'
// import { truncateRichText } from '@/shared/lib/rich-text-utils'

interface Option {
  id: string
  text: any // RichText
  isCorrect?: boolean | null
}

interface PracticeSidebarProps {
  questions: PracticeQuestion[]
  currentQuestionIndex: number
  progress: number
  answeredQuestions: Set<number>
  onSelectQuestion: (index: number) => void
}

export const PracticeSidebar = ({
  questions,
  currentQuestionIndex,
  progress,
  answeredQuestions,
  onSelectQuestion,
}: PracticeSidebarProps) => {
  return (
    <div className="bg-card rounded-lg p-4 h-full sticky top-4">
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-foreground mb-2">Прогресс</h3>
        {/* <ProgressBar value={progress} className="h-2" /> */}
        <span className="text-sm text-muted-foreground mt-1 block">
          {Math.round(progress)}% завершено
        </span>
      </div>

      <div className="space-y-2 max-h-[calc(100vh-200px)] overflow-y-auto">
        {questions.map((question, index) => {
          const isSelected = index === currentQuestionIndex
          const status = getQuestionStatus(question, index, currentQuestionIndex, answeredQuestions)

          return (
            <button
              key={question.id}
              onClick={() => onSelectQuestion(index)}
              className={`w-full text-left p-3 rounded-lg border transition-colors ${
                isSelected
                  ? 'bg-primary/10 border-primary text-primary'
                  : 'border-border hover:bg-muted/50'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="font-medium">Вопрос {index + 1}</span>
                <span
                  className={`text-xs px-2 py-1 rounded-full ${
                    status === 'answered'
                      ? 'bg-success/30 text-success-foreground'
                      : status === 'correct'
                        ? 'bg-success/30 text-success-foreground'
                        : status === 'incorrect'
                          ? 'bg-destructive/30 text-destructive-foreground'
                          : status === 'current'
                            ? 'bg-primary/30 text-primary-foreground'
                            : 'bg-muted/50 text-muted-foreground'
                  }`}
                >
                  {status === 'answered'
                    ? 'Отвечен'
                    : status === 'correct'
                      ? '✓'
                      : status === 'incorrect'
                        ? '✗'
                        : status === 'current'
                          ? 'Текущий'
                          : 'Не отвечен'}
                </span>
              </div>

              <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                {question.question
                  ? extractPlainTextFromLexical(question.question).substring(0, 60) + '...'
                  : 'Вопрос загружается...'}
              </p>
            </button>
          )
        })}
      </div>
    </div>
  )
}

const getQuestionStatus = (
  question: PracticeQuestion,
  index: number,
  currentQuestionIndex: number,
  answeredQuestions: Set<number>,
): 'answered' | 'correct' | 'incorrect' | 'current' | 'not_answered' => {
  if (index === currentQuestionIndex) {
    return 'current'
  }
  if (index < currentQuestionIndex) {
    return 'answered'
  }
  if (answeredQuestions.has(index)) {
    return 'answered'
  }
  return 'not_answered'
}
