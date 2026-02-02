import { CollectionConfig } from 'payload'

export const Boosts: CollectionConfig = {
  slug: 'boosts',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['code', 'name', 'effectType', 'intensity'],
  },
  access: {
    read: () => true,
    create: ({ req: { user } }) => !!user,
    update: ({ req: { user } }) => !!user,
    delete: ({ req: { user } }) => !!user,
  },
  fields: [
    {
      name: 'code',
      type: 'text',
      required: true,
      unique: true,
      label: 'Код буста',
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'name',
      type: 'text',
      required: true,
      label: 'Название',
    },
    {
      name: 'description',
      type: 'textarea',
      required: true,
      label: 'Описание',
    },
    {
      name: 'effectType',
      type: 'select',
      required: true,
      options: [
        { label: 'Снижение штрафа', value: 'penalty_reduction' },
        { label: 'Бонус времени', value: 'time_bonus' },
        { label: 'Множитель очков', value: 'score_multiplier' },
        { label: 'Подсказка', value: 'hint' },
      ],
      label: 'Тип эффекта',
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'intensity',
      type: 'number',
      required: true,
      defaultValue: 1,
      label: 'Интенсивность',
      admin: {
        position: 'sidebar',
        description: 'Для %: 0.25 = 25%, для секунд: 5 = +5 сек',
      },
    },
    {
      name: 'icon',
      type: 'upload',
      relationTo: 'media',
      label: 'Иконка',
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'color',
      type: 'text',
      defaultValue: '#3B82F6',
      label: 'Цвет (HEX)',
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'isEnabled',
      type: 'checkbox',
      defaultValue: true,
      label: 'Активен',
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'order',
      type: 'number',
      defaultValue: 0,
      label: 'Порядок',
      admin: {
        position: 'sidebar',
      },
    },
  ],
}
