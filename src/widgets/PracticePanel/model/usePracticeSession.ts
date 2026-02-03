// src/widgets/PracticePanel/model/usePracticeFlow.ts
'use client'

import { useState, useCallback } from 'react'
import type { PracticeQuestion } from '@/payload-types'
import type { CompletedQuestion, PracticeSessionState } from '../_domain/types'
import { finalizeCurrentQuestionState } from '../_domain/userAnswer'

type Params = {
  questions: PracticeQuestion[]
}

type UsePracticeFlowReturn = {
  state: {
    currentIndex: number
    selectedAnswers: Record<number, string[]>
    isExplanationVisible: boolean
    answeredQuestions: Set<number>
    correctAnswers: Set<number>
    completedQuestions: CompletedQuestion[]
    startedAt: string
  }
  actions: {
    selectAnswer: (optionId: string) => void
    next: () => void
    prev: () => void
    showExplanation: () => void
    goToQuestion: (index: number) => void
    finalizeState: () => PracticeSessionState
  }
}

export function usePracticeFlow({ questions }: Params): UsePracticeFlowReturn {
  const [state, setState] = useState<PracticeSessionState>({
    currentQuestionIndex: 0,
    selectedAnswers: {},
    isExplanationVisible: false,
    answeredQuestions: new Set(),
    correctAnswers: new Set(),
    startedAt: new Date().toISOString(),
    completedQuestions: [],
  })

  const handleAnswerSelect = useCallback(
    (optionId: string) => {
      setState((prev) => {
        const currentAnswers = prev.selectedAnswers[prev.currentQuestionIndex] || []
        const question = questions[prev.currentQuestionIndex]

        let newAnswers: string[]

        if (question.type === 'single') {
          newAnswers = [optionId]
        } else if (question.type === 'multiple') {
          newAnswers = currentAnswers.includes(optionId)
            ? currentAnswers.filter((id) => id !== optionId)
            : [...currentAnswers, optionId]
        } else {
          newAnswers = [optionId]
        }

        return {
          ...prev,
          selectedAnswers: {
            ...prev.selectedAnswers,
            [prev.currentQuestionIndex]: newAnswers,
          },
          isExplanationVisible: false,
        }
      })
    },
    [questions],
  )

  const handleNextQuestion = useCallback(() => {
    setState((prev) => {
      const finalized = finalizeCurrentQuestionState(prev, questions)

      const currentQuestionIndex = finalized.currentQuestionIndex

      return {
        ...finalized,
        currentQuestionIndex: Math.min(currentQuestionIndex + 1, questions.length - 1),
        isExplanationVisible: false,
      }
    })
  }, [questions])

  const handlePreviousQuestion = useCallback(() => {
    setState((prev) => ({
      ...prev,
      currentQuestionIndex: Math.max(prev.currentQuestionIndex - 1, 0),
      isExplanationVisible: false,
    }))
  }, [])

  const handleShowExplanation = useCallback(() => {
    setState((prev) => ({ ...prev, isExplanationVisible: true }))
  }, [])

  const goToQuestion = useCallback(
    (index: number) => {
      setState((prev) => ({
        ...prev,
        currentQuestionIndex: Math.min(Math.max(index, 0), questions.length - 1),
        isExplanationVisible: false,
      }))
    },
    [questions.length],
  )

  const finalizeState = useCallback((): PracticeSessionState => {
    const finalized = finalizeCurrentQuestionState(state, questions)
    return finalized
  }, [state, questions])

  return {
    state: {
      currentIndex: state.currentQuestionIndex,
      selectedAnswers: state.selectedAnswers,
      isExplanationVisible: state.isExplanationVisible,
      answeredQuestions: state.answeredQuestions,
      correctAnswers: state.correctAnswers,
      completedQuestions: state.completedQuestions,
      startedAt: state.startedAt,
    },
    actions: {
      selectAnswer: handleAnswerSelect,
      next: handleNextQuestion,
      prev: handlePreviousQuestion,
      showExplanation: handleShowExplanation,
      goToQuestion,
      finalizeState,
    },
  }
}
