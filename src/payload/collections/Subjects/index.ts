import { slugField, type CollectionConfig } from 'payload'
import { slugify as translit } from 'transliteration'

export const Subjects: CollectionConfig = {
  slug: 'subjects',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'slug', 'updatedAt'],
    group: 'Теория',
  },
  labels: {
    singular: 'Предмет',
    plural: 'Предметы',
  },
  access: {
    read: () => true,
    create: ({ req: { user } }) => !!user,
    update: ({ req: { user } }) => !!user,
    delete: ({ req: { user } }) => !!user,
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
      label: 'Предмет',
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
  ],
}
