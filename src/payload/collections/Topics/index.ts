import type { CollectionConfig } from 'payload'
import { slugField } from 'payload'
import { slugify as translit } from 'transliteration'

export const Topics: CollectionConfig<'topics'> = {
  slug: 'topics',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'subject', 'order'],
    group: 'Теория',
  },
  labels: {
    singular: 'Тема',
    plural: 'Темы',
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
      label: 'Тема',
    },
    slugField({
      name: 'slug',
      fieldToUse: 'name',
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
      name: 'subject',
      type: 'relationship',
      relationTo: 'subjects',
      required: true,
      label: 'Предмет',
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'order',
      type: 'number',
      label: 'Порядок отображения',
      defaultValue: 0,
      admin: {
        position: 'sidebar',
      },
    },
  ],
}
