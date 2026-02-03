import type { PracticeQuestion } from '@/payload-types'

export function getDifficultyBadge(difficulty: PracticeQuestion['difficulty']) {
  if (difficulty === 'easy') {
    return {
      label: 'Легко',
      className: 'bg-success/30 text-success-foreground',
    }
  }

  if (difficulty === 'medium') {
    return {
      label: 'Средне',
      className: 'bg-warning/30 text-warning-foreground',
    }
  }

  return {
    label: 'Сложно',
    className: 'bg-destructive/30 text-destructive-foreground',
  }
}
