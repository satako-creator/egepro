'use client'

import { useRouter } from 'next/navigation'
import type { Lesson, PracticeQuestion } from '@/payload-types'
import { PracticeSidebar } from './Sidebar'
import { QuestionCard } from './QuestionCard'
import { savePracticeSession } from '@/entities/practice/api/savePracticeSession'
import { usePracticeFlow } from '../model/usePracticeSession'

interface PracticePanelProps {
  lesson: Lesson
  questions: PracticeQuestion[]
  userId: number
}

export const PracticePanel = ({ lesson, questions, userId }: PracticePanelProps) => {
  const router = useRouter()

  const { state, actions } = usePracticeFlow({ questions })

  const progress =
    questions.length > 0 ? (state.answeredQuestions.size / questions.length) * 100 : 0

  const handleComplete = async () => {
    const snapshot = actions.finalizeState()

    const sessionData = {
      userId,
      lessonId: lesson.id,
      currentQuestionIndex: snapshot.currentQuestionIndex,
      selectedAnswers: snapshot.selectedAnswers,
      completedQuestions: snapshot.completedQuestions,
      startedAt: snapshot.startedAt,
      completedAt: new Date().toISOString(),
      timeSpent: Date.now() - new Date(snapshot.startedAt).getTime(),
    }

    try {
      const session = await savePracticeSession(sessionData)

      router.push(
        `/subjects/${lesson.subject}/lessons/${lesson.slug}/practice/results/${session.id}`,
      )
    } catch (error) {
      console.error('Ошибка при сохранении результатов:', error)
    }
  }

  const currentQuestion = questions[state.currentIndex]

  return (
    <div className="flex flex-col gap-6 lg:flex-row">
      <div className="lg:w-1/4">
        <PracticeSidebar
          questions={questions}
          currentQuestionIndex={state.currentIndex}
          progress={progress}
          answeredQuestions={state.answeredQuestions}
          onSelectQuestion={actions.goToQuestion}
        />
      </div>

      <div className="lg:w-3/4">
        {currentQuestion && (
          <QuestionCard
            question={currentQuestion}
            selectedAnswers={state.selectedAnswers[state.currentIndex] || []}
            isExplanationVisible={state.isExplanationVisible}
            onAnswerSelect={actions.selectAnswer}
            onShowExplanation={actions.showExplanation}
            onNext={actions.next}
            onPrevious={actions.prev}
            onComplete={handleComplete}
            isLastQuestion={state.currentIndex === questions.length - 1}
            isFirstQuestion={state.currentIndex === 0}
            isCompleting={false} // если нужно — можно добавить отдельный useState
          />
        )}
      </div>
    </div>
  )
}
