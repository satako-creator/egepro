export type Subject = 'math' | 'physics'

export interface TopicSummary {
  id: number
  name: string
  slug: string
  order: number
}

export interface LessonSummary {
  id: number
  title: string
  slug: string
  grade: '7' | '8' | '9' | '10' | '11'
  difficulty?: 'easy' | 'medium' | 'hard' | null
  estimatedTime?: number | null
  topic: TopicSummary | number // в зависимости от depth
}
