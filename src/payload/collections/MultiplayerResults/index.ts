import { CollectionConfig } from 'payload'

export const MultiplayerResults: CollectionConfig = {
  slug: 'multiplayer-results',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['event', 'user', 'round', 'position', 'score'],
    listSearchableFields: [],
  },
  access: {
    read: () => true,
    create: () => true,
    update: ({ req: { user } }) => !!user,
    delete: ({ req: { user } }) => !!user,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      admin: {
        hidden: true,
      },
    },
    {
      name: 'event',
      type: 'relationship',
      relationTo: 'multiplayer-events',
      required: true,
      label: 'Турнир',
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'user',
      type: 'relationship',
      relationTo: 'users',
      required: true,
      label: 'Участник',
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'round',
      type: 'number',
      required: true,
      label: 'Номер раунда',
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'position',
      type: 'number',
      label: 'Место в раунде',
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'score',
      type: 'number',
      defaultValue: 0,
      label: 'Очки',
    },
    {
      name: 'timeSpentMs',
      type: 'number',
      defaultValue: 0,
      label: 'Время на ответы (мс)',
    },
    {
      name: 'correctAnswers',
      type: 'number',
      defaultValue: 0,
      label: 'Правильных ответов',
    },
    {
      name: 'totalQuestions',
      type: 'number',
      defaultValue: 0,
      label: 'Всего вопросов',
    },
    {
      name: 'accuracy',
      type: 'number',
      label: 'Точность (%)',
      admin: {
        readOnly: true,
      },
    },
    {
      name: 'boostsEarned',
      type: 'number',
      defaultValue: 0,
      label: 'Получено бустов',
    },
    {
      name: 'boostsUsed',
      type: 'array',
      label: 'Использованные бусты',
      fields: [
        {
          name: 'boostCode',
          type: 'text',
          required: true,
          label: 'Код буста',
        },
        {
          name: 'roundUsed',
          type: 'number',
          required: true,
          label: 'Раунд использования',
        },
        {
          name: 'timestamp',
          type: 'date',
          required: true,
          label: 'Время использования',
        },
      ],
    },
    {
      name: 'answers',
      type: 'array',
      label: 'Ответы',
      fields: [
        {
          name: 'questionId',
          type: 'text',
          required: true,
          label: 'ID вопроса',
        },
        {
          name: 'answer',
          type: 'text',
          label: 'Ответ пользователя',
        },
        {
          name: 'isCorrect',
          type: 'checkbox',
          label: 'Правильно',
        },
        {
          name: 'timeSpentMs',
          type: 'number',
          label: 'Время на ответ (мс)',
        },
        {
          name: 'boostApplied',
          type: 'checkbox',
          defaultValue: false,
          label: 'Применён буст',
        },
      ],
    },
    {
      name: 'isCompleted',
      type: 'checkbox',
      defaultValue: false,
      label: 'Завершено',
    },
    {
      name: 'completedAt',
      type: 'date',
      label: 'Время завершения',
    },
  ],
  hooks: {
    beforeChange: [
      ({ data }) => {
        // Автоматически считаем точность
        if (data.correctAnswers !== undefined && data.totalQuestions > 0) {
          return {
            ...data,
            accuracy: Math.round((data.correctAnswers / data.totalQuestions) * 100),
          }
        }
        return data
      },
    ],
  },
}
