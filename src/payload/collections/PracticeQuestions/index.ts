import type { CollectionConfig } from 'payload'
import { generateQuestionPreview } from './hooks/generateQuestionPreview'
import {
  AlignFeature,
  BlocksFeature,
  FixedToolbarFeature,
  HeadingFeature,
  HorizontalRuleFeature,
  IndentFeature,
  InlineToolbarFeature,
  lexicalEditor,
  LinkFeature,
  OrderedListFeature,
  UnorderedListFeature,
} from '@payloadcms/richtext-lexical'
import { EquationBlock } from '@/payload/blocks/Equation/config'
import { MediaBlock } from '@/payload/blocks/MediaBlock/config'
import { Code } from 'lucide-react'

export const PracticeQuestions: CollectionConfig = {
  slug: 'practice-questions',
  admin: {
    useAsTitle: 'questionPreview',
    defaultColumns: ['lesson', 'type', 'difficulty', 'order'],
    listSearchableFields: ['question'],
  },
  access: {
    read: () => true,
    create: ({ req: { user } }) => !!user,
    update: ({ req: { user } }) => !!user,
    delete: ({ req: { user } }) => !!user,
  },
  hooks: {
    beforeValidate: [generateQuestionPreview],
  },
  fields: [
    {
      name: 'lesson',
      type: 'relationship',
      relationTo: 'lessons',
      required: true,
      label: 'Урок',
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'type',
      type: 'select',
      required: true,
      defaultValue: 'single',
      options: [
        { label: 'Один ответ', value: 'single' },
        { label: 'Несколько ответов', value: 'multiple' },
        { label: 'Числовой ответ', value: 'numeric' },
        { label: 'Формула', value: 'formula' },
        // { label: 'Упорядочить шаги', value: 'ordering' },
      ],
      label: 'Тип вопроса',
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'question',
      type: 'richText',
      required: true,
      label: 'Вопрос',
    },
    {
      name: 'questionPreview',
      type: 'text',
      label: 'Краткий текст вопроса',
      admin: {
        hidden: true,
      },
    },

    {
      name: 'options',
      type: 'array',
      label: 'Варианты ответов',
      fields: [
        {
          name: 'text',
          type: 'richText',
          required: true,
          label: 'Текст варианта',
        },
        {
          name: 'isCorrect',
          type: 'checkbox',
          defaultValue: false,
          label: 'Правильный ответ',
        },
      ],
      admin: {
        condition: (_, { type }) => type === 'single' || type === 'multiple',
      },
    },

    {
      name: 'correctNumericAnswer',
      type: 'text',
      label: 'Правильный числовой ответ',
      admin: {
        condition: (_, { type }) => type === 'numeric' || type === 'formula',
        description: 'Для чисел используйте формат: 42 или 3.14',
      },
    },

    {
      name: 'steps',
      type: 'array',
      label: 'Шаги решения',
      fields: [
        {
          name: 'text',
          type: 'richText',
          required: true,
          label: 'Текст шага',
        },
        {
          name: 'order',
          type: 'number',
          required: true,
          label: 'Порядковый номер',
        },
      ],
      admin: {
        condition: (_, { type }) => type === 'ordering',
      },
    },

    {
      name: 'explanation',
      type: 'richText',
      editor: lexicalEditor({
        features: ({ rootFeatures }) => {
          return [
            ...rootFeatures,
            HeadingFeature({ enabledHeadingSizes: ['h1', 'h2', 'h3', 'h4'] }),
            BlocksFeature({ blocks: [EquationBlock, MediaBlock] }),
            FixedToolbarFeature(),
            InlineToolbarFeature(),
            HorizontalRuleFeature(),
            AlignFeature(),
            UnorderedListFeature(),
            OrderedListFeature(),
            LinkFeature(),
            IndentFeature(),
          ]
        },
      }),
      label: 'Пояснение / Разбор',
      admin: {
        description: 'Показывается после ответа',
      },
    },

    {
      name: 'hint',
      type: 'richText',
      editor: lexicalEditor({
        features: ({ rootFeatures }) => {
          return [
            ...rootFeatures,
            HeadingFeature({ enabledHeadingSizes: ['h1', 'h2', 'h3', 'h4'] }),
            BlocksFeature({ blocks: [EquationBlock, MediaBlock] }),
            FixedToolbarFeature(),
            InlineToolbarFeature(),
            HorizontalRuleFeature(),
            AlignFeature(),
            UnorderedListFeature(),
            OrderedListFeature(),
            LinkFeature(),
            IndentFeature(),
          ]
        },
      }),
      label: 'Подсказка',
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
      name: 'order',
      type: 'number',
      defaultValue: 0,
      label: 'Порядок в уроке',
      admin: {
        position: 'sidebar',
      },
    },

    {
      name: 'points',
      type: 'number',
      defaultValue: 10,
      label: 'Очки за правильный ответ',
      admin: {
        position: 'sidebar',
      },
    },

    {
      name: 'timeLimit',
      type: 'number',
      label: 'Лимит времени (сек)',
      admin: {
        position: 'sidebar',
        description: '0 = без ограничения',
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
