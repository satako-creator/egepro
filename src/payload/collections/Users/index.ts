import type { CollectionConfig } from 'payload'

import { authenticated } from '../../access/authenticated'

export const Users: CollectionConfig = {
  slug: 'users',
  access: {
    admin: ({ req: { user } }) => user?.role === 'admin',
    create: authenticated,
    delete: authenticated,
    read: authenticated,
    update: authenticated,
  },
  admin: {
    defaultColumns: ['name', 'email', 'level', 'xp'],
    useAsTitle: 'name',
  },
  auth: true,
  fields: [
    {
      name: 'name',
      type: 'text',
    },
    {
      name: 'role',
      type: 'select',
      required: true,
      defaultValue: 'student',
      options: [
        { label: 'Студент', value: 'student' },
        { label: 'Админ', value: 'admin' },
      ],
      access: {
        // Только админ редактирует роли
        update: ({ req: { user } }) => user?.role === 'admin',
      },
    },
    {
      name: 'avatar',
      type: 'upload',
      relationTo: 'media',
      label: 'Аватар',
    },
    // Геймификация
    {
      name: 'xp',
      type: 'number',
      defaultValue: 0,
      label: 'Опыт (XP)',
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'level',
      type: 'number',
      defaultValue: 1,
      label: 'Уровень',
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'streakDays',
      type: 'number',
      defaultValue: 0,
      label: 'Дней подряд',
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'lastActivityDate',
      type: 'date',
      label: 'Последняя активность',
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'badges',
      type: 'array',
      label: 'Бейджи',
      fields: [
        {
          name: 'code',
          type: 'text',
          required: true,
          label: 'Код бейджа',
        },
        {
          name: 'earnedAt',
          type: 'date',
          defaultValue: () => new Date().toISOString(),
          label: 'Получен',
        },
      ],
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'totalTournaments',
      type: 'number',
      defaultValue: 0,
      label: 'Турниров сыграно',
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'tournamentWins',
      type: 'number',
      defaultValue: 0,
      label: 'Побед в турнирах',
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'totalBoosts',
      type: 'number',
      defaultValue: 0,
      label: 'Всего бустов',
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'settings',
      type: 'group',
      label: 'Настройки',
      fields: [
        {
          name: 'notifications',
          type: 'checkbox',
          defaultValue: true,
          label: 'Уведомления о турнирах',
        },
        {
          name: 'soundEnabled',
          type: 'checkbox',
          defaultValue: true,
          label: 'Звук включён',
        },
      ],
    },
  ],
  timestamps: true,
}
