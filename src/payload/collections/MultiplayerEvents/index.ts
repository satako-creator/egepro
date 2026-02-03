import type { CollectionConfig } from 'payload'

export const MultiplayerEvents: CollectionConfig = {
  slug: 'multiplayer-events',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'subject', 'scheduledTime', 'status', 'rounds'],
    listSearchableFields: ['title'],
  },
  access: {
    read: () => true,
    create: ({ req: { user } }) => !!user,
    update: ({ req: { user } }) => !!user,
    delete: ({ req: { user } }) => !!user,
  },
  fields: [
    // 1. Предмет, чтобы фильтровать турниры по /math, /physics и т.п.
    {
      name: 'subject',
      type: 'select',
      label: 'Предмет',
      required: true,
      defaultValue: 'math',
      options: [
        { label: 'Математика', value: 'math' },
        { label: 'Физика', value: 'physics' },
      ],
      admin: {
        position: 'sidebar',
      },
    },

    {
      name: 'title',
      type: 'text',
      required: true,
      label: 'Название турнира',
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      label: 'URL slug',
      admin: {
        position: 'sidebar',
      },
    },

    {
      name: 'description',
      type: 'textarea',
      label: 'Описание',
    },

    {
      name: 'scheduledTime',
      type: 'date',
      required: true,
      label: 'Время начала',
      admin: {
        position: 'sidebar',
        date: {
          pickerAppearance: 'dayAndTime',
        },
      },
    },

    {
      name: 'durationSeconds',
      type: 'number',
      defaultValue: 600,
      label: 'Длительность турнира (сек)',
      admin: {
        position: 'sidebar',
      },
    },

    {
      name: 'rounds',
      type: 'number',
      defaultValue: 10,
      required: true,
      label: 'Количество раундов',
      admin: {
        position: 'sidebar',
      },
    },

    {
      name: 'questionsPerRound',
      type: 'number',
      defaultValue: 3,
      required: true,
      label: 'Вопросов в раунде',
      admin: {
        position: 'sidebar',
      },
    },

    {
      name: 'lessons',
      type: 'relationship',
      relationTo: 'lessons',
      hasMany: true,
      required: true,
      label: 'Уроки / темы для вопросов',
      admin: {
        position: 'sidebar',
      },
    },

    {
      name: 'difficulty',
      type: 'select',
      defaultValue: 'medium',
      options: [
        { label: 'Любая', value: 'any' },
        { label: 'Легко', value: 'easy' },
        { label: 'Средне', value: 'medium' },
        { label: 'Сложно', value: 'hard' },
      ],
      label: 'Сложность вопросов',
      admin: {
        position: 'sidebar',
      },
    },

    {
      name: 'status',
      type: 'select',
      defaultValue: 'scheduled',
      required: true,
      options: [
        { label: 'Запланировано', value: 'scheduled' },
        { label: 'Активно', value: 'active' },
        { label: 'Завершено', value: 'completed' },
        { label: 'Отменено', value: 'cancelled' },
      ],
      label: 'Статус',
      admin: {
        position: 'sidebar',
      },
    },

    {
      name: 'maxParticipants',
      type: 'number',
      label: 'Максимум участников',
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'minParticipants',
      type: 'number',
      defaultValue: 2,
      label: 'Минимум участников',
      admin: {
        position: 'sidebar',
      },
    },

    {
      name: 'season',
      type: 'text',
      label: 'Сезон',
      admin: {
        position: 'sidebar',
        description: 'Например: "Осень 2024"',
      },
    },

    {
      name: 'coverImage',
      type: 'upload',
      relationTo: 'media',
      label: 'Обложка',
      admin: {
        position: 'sidebar',
      },
    },

    {
      name: 'isEnabled',
      type: 'checkbox',
      defaultValue: true,
      label: 'Опубликовано',
      admin: {
        position: 'sidebar',
      },
    },
  ],
}
