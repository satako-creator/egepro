import { notFound } from 'next/navigation'
import Link from 'next/link'
import { getUserPracticeSessions } from '@/entities/practice/api/getUserPracticeSessions'
import { getMeUser } from '@/shared/utilities/getMeUser'
import { Subject } from '@/entities/subject/domain/types'

type PageProps = {
  params: Promise<{}> // на всякий случай под новый Next-паттерн
}

export default async function PracticeHistoryPage({ params }: PageProps) {
  await params // чтобы не было варнинга о неиспользуемом

  const { user } = await getMeUser()

  if (!user) {
    notFound()
  }

  const sessions = await getUserPracticeSessions(user.id)

  return (
    <div className="min-h-screen bg-muted/30">
      <div className="container py-8 space-y-6">
        <header className="space-y-2">
          <h1 className="text-2xl font-bold">История практик</h1>
          <p className="text-sm text-muted-foreground">
            Здесь отображаются последние попытки по всем урокам.
          </p>
        </header>

        {sessions.length === 0 ? (
          <p className="text-sm text-muted-foreground">У вас пока нет завершённых практик.</p>
        ) : (
          <div className="overflow-x-auto rounded-lg border bg-card">
            <table className="min-w-full text-sm">
              <thead>
                <tr className="border-b bg-muted/50 text-xs uppercase text-muted-foreground">
                  <th className="px-4 py-2 text-left">Урок</th>
                  <th className="px-4 py-2 text-left">Предмет</th>
                  <th className="px-4 py-2 text-left">Дата</th>
                  <th className="px-4 py-2 text-left">Время</th>
                  <th className="px-4 py-2 text-left">Счёт</th>
                  <th className="px-4 py-2 text-left">Точность</th>
                  <th className="px-4 py-2 text-right">Действие</th>
                </tr>
              </thead>
              <tbody>
                {sessions.map((session) => {
                  const lesson =
                    session.lesson && typeof session.lesson === 'object' ? session.lesson : null

                  const subject = (lesson?.subject ?? 'math') as Subject

                  const completedAt = session.completedAt ? new Date(session.completedAt) : null

                  const timeSpentSec =
                    typeof session.timeSpentTotal === 'number'
                      ? Math.round(session.timeSpentTotal / 1000)
                      : null

                  return (
                    <tr key={session.id} className="border-b last:border-b-0 hover:bg-muted/40">
                      <td className="px-4 py-2">
                        <div className="font-medium">{lesson?.title ?? 'Урок'}</div>
                        <div className="text-xs text-muted-foreground">
                          {lesson?.grade ? `${lesson.grade} класс` : ''}
                        </div>
                      </td>
                      <td className="px-4 py-2">
                        <span className="text-xs uppercase text-muted-foreground">
                          {subject === 'math' ? 'Математика' : 'Физика'}
                        </span>
                      </td>
                      <td className="px-4 py-2">
                        {completedAt ? (
                          <span>
                            {completedAt.toLocaleDateString()} ·{' '}
                            {completedAt.toLocaleTimeString([], {
                              hour: '2-digit',
                              minute: '2-digit',
                            })}
                          </span>
                        ) : (
                          <span className="text-muted-foreground">—</span>
                        )}
                      </td>
                      <td className="px-4 py-2">
                        {timeSpentSec != null ? (
                          <span>{timeSpentSec} c</span>
                        ) : (
                          <span className="text-muted-foreground">—</span>
                        )}
                      </td>
                      <td className="px-4 py-2">{session.totalScore ?? 0}</td>
                      <td className="px-4 py-2">{Math.round(session.accuracy ?? 0)}%</td>
                      <td className="px-4 py-2 text-right">
                        {lesson ? (
                          <Link
                            href={`/subjects/${lesson.subject}/lessons/${lesson.slug}/practice/results/${session.id}`}
                            className="text-xs font-medium text-primary hover:underline"
                          >
                            Посмотреть разбор
                          </Link>
                        ) : (
                          <span className="text-xs text-muted-foreground">Нет данных</span>
                        )}
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}
