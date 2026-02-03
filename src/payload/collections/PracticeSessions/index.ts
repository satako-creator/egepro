import type { CollectionConfig } from 'payload'

export const PracticeSessions: CollectionConfig = {
  slug: 'practice-sessions',
  admin: {
    useAsTitle: 'id',
    defaultColumns: ['user', 'lesson', 'isCompleted', 'totalScore'],
  },
  access: {
    read: ({ req: { user } }) => !!user, // если нужно ограничить
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
      name: 'completedQuestions',
      type: 'array',
      label: 'Отвеченные вопросы',
      fields: [
        {
          name: 'questionId',
          type: 'number', // ID PracticeQuestion
          required: true,
        },
        {
          name: 'isCorrect',
          type: 'checkbox',
          required: true,
        },
        {
          name: 'points',
          type: 'number',
        },
        {
          name: 'userAnswer',
          type: 'text', // можно хранить сериализованный ответ
        },
        {
          name: 'timeSpent',
          type: 'number', // мс на вопрос
        },
      ],
    },

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
      name: 'startedAt',
      type: 'date',
      label: 'Начало сессии',
    },
    {
      name: 'completedAt',
      type: 'date',
      label: 'Окончание сессии',
    },
    {
      name: 'isCompleted',
      type: 'checkbox',
      defaultValue: false,
      label: 'Завершена',
    },

    {
      name: 'result',
      type: 'relationship',
      relationTo: 'practice-results',
      label: 'Итоговый результат',
      admin: {
        position: 'sidebar',
      },
    },

    {
      name: 'timeSpentTotal',
      type: 'number', // сек или мс — главное быть консистентным
      label: 'Общее время',
    },
  ],
}
