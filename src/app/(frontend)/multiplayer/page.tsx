// src/app/(frontend)/multiplayer/page.tsx // список ивентов по предмету
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { MultiplayerEvent } from '@/payload-types'
import { format } from 'date-fns'
import { ru } from 'date-fns/locale'

export default async function MultiplayerPage() {
  const payload = await getPayload({ config: configPromise })

  const { docs: events } = await payload.find({
    collection: 'multiplayer-events',
    where: {
      isEnabled: { equals: true },
      status: { in: ['scheduled', 'active'] },
    },
    sort: 'scheduledTime',
    depth: 1,
  })

  return (
    <div className="container py-12">
      <h1 className="text-4xl font-bold mb-8 text-foreground">Математические турниры</h1>

      <div className="space-y-6">
        {events.map((event) => (
          <TournamentCard key={event.id} event={event} />
        ))}
      </div>
    </div>
  )
}

function TournamentCard({ event }: { event: MultiplayerEvent }) {
  const statusVariants = {
    scheduled: {
      bg: 'bg-warning/30',
      text: 'text-warning-foreground',
      border: 'border-warning',
    },
    active: {
      bg: 'bg-success/30',
      text: 'text-success-foreground',
      border: 'border-success',
    },
    completed: {
      bg: 'bg-muted/50',
      text: 'text-muted-foreground',
      border: 'border-border',
    },
    cancelled: {
      bg: 'bg-destructive/30',
      text: 'text-destructive-foreground',
      border: 'border-destructive',
    },
  }

  const statusLabels = {
    scheduled: 'Запланирован',
    active: 'Активен',
    completed: 'Завершён',
    cancelled: 'Отменён',
  }

  const variant = statusVariants[event.status]

  return (
    <div className={`bg-card rounded-lg shadow-md p-6 border-l-4 ${variant.border}`}>
      <div className="flex justify-between items-start">
        <div>
          <h2 className="text-xl font-semibold mb-2 text-foreground">{event.title}</h2>
          <p className="text-muted-foreground mb-2">{event.description}</p>

          <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
            <span>
              {format(new Date(event.scheduledTime), 'dd MMMM yyyy HH:mm', { locale: ru })}
            </span>
            <span>•</span>
            <span>{event.rounds} раундов</span>
            <span>•</span>
            <span>{event.questionsPerRound} вопросов/раунд</span>
          </div>
        </div>

        <span
          className={`px-3 py-1 rounded-full text-xs font-medium ${variant.bg} ${variant.text}`}
        >
          {statusLabels[event.status]}
        </span>
      </div>

      <div className="mt-4">
        <a
          href={`/multiplayer/${event.id}`}
          className="inline-flex items-center px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
        >
          Подробнее
        </a>
      </div>
    </div>
  )
}
