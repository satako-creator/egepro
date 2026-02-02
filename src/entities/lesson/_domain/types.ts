import type { Lesson as PayloadLesson, Media } from '@/payload-types'

export type Lesson = {
  id: number
  title: string
  slug: string
  grade: '7' | '8' | '9' | '10' | '11'
  topic: string
  order: number
  theory: any // RichText — обрабатываем через компоненты
  summary?: string | null
  coverImage?: number | Media | null
  tags?: Array<{ tag: string }>
  difficulty?: 'easy' | 'medium' | 'hard'
  estimatedTime?: number | null
  isEnabled?: boolean
  updatedAt: string
  createdAt: string
}

// Утилиты для работы с типом
export const isLessonEnabled = (lesson: Lesson): boolean => lesson.isEnabled !== false

export const getLessonGradeLabel = (grade: string): string => `${grade} класс`
