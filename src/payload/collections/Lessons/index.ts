import { slugField, type CollectionConfig } from 'payload'
import { slugify as translit } from 'transliteration'

export const Lessons: CollectionConfig = {
  slug: 'lessons',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'subject', 'grade', 'topic', 'order'],
    listSearchableFields: ['title', 'topic'],
  },
  access: {
    read: () => true,
    create: ({ req: { user } }) => !!user,
    update: ({ req: { user } }) => !!user,
    delete: ({ req: { user } }) => !!user,
  },
  fields: [
    // 1. Предмет (math / physics / ...)
    {
      name: 'subject',
      type: 'select',
      label: 'Предмет',
      required: true,
      defaultValue: 'math',
      options: [
        { label: 'Математика', value: 'math' },
        { label: 'Физика', value: 'physics' },
        // дальше можно добавлять или вынести в коллекцию и сделать связь
      ],
      admin: {
        position: 'sidebar',
      },
    },

    {
      name: 'title',
      type: 'text',
      required: true,
      label: 'Название урока',
    },

    slugField({
      name: 'slug',
      fieldToUse: 'title',
      useAsSlug: 'slug',
      required: true,
      position: 'sidebar',
      slugify: ({ valueToSlugify }) => {
        if (typeof valueToSlugify !== 'string') return undefined

        return translit(valueToSlugify)
          .toLowerCase()
          .replace(/\s+/g, '-')
          .replace(/[^\w-]+/g, '')
      },
    }),

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

    // 2. Тема как связь, а не строка
    {
      name: 'topic',
      type: 'relationship',
      relationTo: 'topics',
      required: true,
      label: 'Тема / раздел',
      admin: {
        position: 'sidebar',
      },
    },

    {
      name: 'order',
      type: 'number',
      required: true,
      defaultValue: 0,
      label: 'Порядок в списке',
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
