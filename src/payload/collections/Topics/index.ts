import { CollectionConfig, slugField } from 'payload'

export const Topics: CollectionConfig<'topics'> = {
  slug: 'topics',
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
    },
  ],
}
