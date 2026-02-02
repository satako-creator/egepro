import { CollectionConfig } from 'payload'

export const Lessons: CollectionConfig = {
  slug: 'lessons',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'grade', 'topic', 'order'],
    listSearchableFields: ['title', 'topic'],
  },
  access: {
    read: () => true,
    create: ({ req: { user } }) => !!user,
    update: ({ req: { user } }) => !!user,
    delete: ({ req: { user } }) => !!user,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      label: 'Название урока',
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
      name: 'grade',
      type: 'select',
      required: true,
      label: 'Класс',
      options: [
        { label: '7 класс', value: '7' },
        { label: '8 класс', value: '8' },
        { label: '9 класс', value: '9' },
        { label: '10 класс', value: '10' },
        { label: '11 класс', value: '11' },
      ],
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'topic',
      type: 'text',
      required: true,
      label: 'Тема',
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'order',
      type: 'number',
      required: true,
      defaultValue: 0,
      label: 'Порядок',
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'theory',
      type: 'richText',
      required: true,
      label: 'Теория',
    },
    {
      name: 'summary',
      type: 'textarea',
      label: 'Краткое описание (для списка)',
      admin: {
        description: 'Показывается в списке уроков',
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
      name: 'tags',
      type: 'array',
      label: 'Теги',
      fields: [
        {
          name: 'tag',
          type: 'text',
          required: true,
        },
      ],
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'difficulty',
      type: 'select',
      defaultValue: 'medium',
      options: [
        { label: 'Легко', value: 'easy' },
        { label: 'Средне', value: 'medium' },
        { label: 'Сложно', value: 'hard' },
      ],
      label: 'Сложность',
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'estimatedTime',
      type: 'number',
      label: 'Примерное время изучения (мин)',
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
