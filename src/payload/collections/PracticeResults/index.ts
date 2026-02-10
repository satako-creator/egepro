import type { CollectionConfig } from 'payload'

export const PracticeResults: CollectionConfig = {
  slug: 'practice-results',
  admin: {
    useAsTitle: 'id',
    defaultColumns: ['user', 'lesson', 'totalScore', 'accuracy', 'completedAt'],
  },
  access: {
    read: ({ req: { user } }) => !!user,
    create: ({ req: { user } }) => !!user,
    update: ({ req: { user } }) => !!user,
    delete: ({ req: { user } }) => !!user,
  },
  fields: [
    {
      name: 'user',
      type: 'relationship',
      relationTo: 'users',
      required: true,
    },
    {
      name: 'lesson',
      type: 'relationship',
      relationTo: 'lessons',
      required: true,
    },

    {
      name: 'session',
      type: 'relationship',
      relationTo: 'practice-sessions',
      label: 'Сессия',
      admin: {
        position: 'sidebar',
      },
    },

    // Подробные ответы можно больше не дублировать:
    // aggregated only, подробности читаем из PracticeSessions.completedQuestions

    {
      name: 'totalScore',
      type: 'number',
      label: 'Суммарный счёт',
    },
    {
      name: 'accuracy',
      type: 'number', // 0–100
      label: 'Точность, %',
    },
    {
      name: 'completedAt',
      type: 'date',
      label: 'Дата завершения',
    },
    {
      name: 'timeSpent',
      type: 'number', // секунды или мс — главное договориться
      label: 'Общее время',
    },

    {
      name: 'xpBefore',
      type: 'number',
      label: 'XP до сессии',
    },
    {
      name: 'xpAfter',
      type: 'number',
      label: 'XP после сессии',
    },
    {
      name: 'levelAfter',
      type: 'number',
      label: 'Уровень после сессии',
    },

    {
      name: 'recommendedTopics',
      label: 'Рекомендуемые темы для повторения',
      type: 'array',
      fields: [
        {
          name: 'topic',
          type: 'text', // можно позже заменить на relationship к topics
          label: 'Тема',
        },
        {
          name: 'priority',
          label: 'Приоритет',
          type: 'select',
          options: [
            { label: 'Высокий', value: 'high' },
            { label: 'Средний', value: 'medium' },
            { label: 'Низкий', value: 'low' },
          ],
        },
      ],
    },
  ],
}
