export const QUESTION_TYPES = {
  SINGLE: 'single' as const,
  MULTIPLE: 'multiple' as const,
  NUMERIC: 'numeric' as const,
  FORMULA: 'formula' as const,
  ORDERING: 'ordering' as const,
}

export const QUESTION_TYPE_LABELS = {
  [QUESTION_TYPES.SINGLE]: 'Один ответ',
  [QUESTION_TYPES.MULTIPLE]: 'Несколько ответов',
  [QUESTION_TYPES.NUMERIC]: 'Числовой ответ',
  [QUESTION_TYPES.FORMULA]: 'Формула',
  [QUESTION_TYPES.ORDERING]: 'Упорядочить шаги',
}

export const DIFFICULTY_LEVELS = {
  EASY: 'easy' as const,
  MEDIUM: 'medium' as const,
  HARD: 'hard' as const,
}

export const DIFFICULTY_LABELS = {
  [DIFFICULTY_LEVELS.EASY]: 'Легко',
  [DIFFICULTY_LEVELS.MEDIUM]: 'Средне',
  [DIFFICULTY_LEVELS.HARD]: 'Сложно',
}

export const BOOST_TYPES = {
  PENALTY_REDUCTION: 'penalty_reduction' as const,
  TIME_BONUS: 'time_bonus' as const,
  SCORE_MULTIPLIER: 'score_multiplier' as const,
  HINT: 'hint' as const,
}
