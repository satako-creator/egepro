// src/app/profile/page.tsx
import { redirect } from 'next/navigation'
import { getProfileData } from '@/entities/profile/api/getProfileData'
import { UserProgressBadge } from '@/widgets/UserProgressBadge/ui/UserProgressBadge'
import { ProfileXPChart } from '@/widgets/ProfileXPChart/ui/ProfileXPChart'

export const metadata = {
  title: 'Профиль',
}

export default async function ProfilePage() {
  const data = await getProfileData()

  if (!data) {
    redirect('/login')
  }

  const { user, results } = data

  // Подготовим данные для графика XP
  const xpPoints = results
    .slice()
    .reverse()
    .map((r) => ({
      label: r.completedAt ? new Date(r.completedAt).toLocaleDateString() : '',
      xp: r.xpAfter ?? user.xp ?? 0,
    }))

  return (
    <main className="container py-6 space-y-6">
      <header className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Профиль</h1>
          <p className="text-sm text-muted-foreground">{user.name ?? user.email}</p>
        </div>

        {/* <UserProgressBadge /> */}
      </header>

      <section className="grid gap-6 md:grid-cols-[minmax(0,2fr)_minmax(0,3fr)]">
        <div className="space-y-3">
          <h2 className="text-sm font-semibold text-muted-foreground">Прогресс по XP</h2>
          <div className="rounded-lg border border-border bg-card p-4">
            <ProfileXPChart points={xpPoints} />
          </div>
        </div>

        <div className="space-y-3">
          <h2 className="text-sm font-semibold text-muted-foreground">Последние сессии</h2>
          <div className="overflow-x-auto rounded-lg border border-border bg-card">
            <table className="min-w-full text-sm">
              <thead className="bg-secondary">
                <tr>
                  <th className="px-3 py-2 text-left font-medium">Дата</th>
                  <th className="px-3 py-2 text-left font-medium">Время</th>
                  <th className="px-3 py-2 text-right font-medium">Score</th>
                  <th className="px-3 py-2 text-right font-medium">Accuracy</th>
                </tr>
              </thead>
              <tbody>
                {results.map((r) => {
                  const completed = r.completedAt ? new Date(r.completedAt) : null
                  const score = r.totalScore ?? 0
                  const accuracy = r.accuracy ?? 0

                  return (
                    <tr key={r.id} className="border-t border-border">
                      <td className="px-3 py-2">
                        {completed ? completed.toLocaleDateString() : '—'}
                      </td>
                      <td className="px-3 py-2">
                        {completed
                          ? completed.toLocaleTimeString([], {
                              hour: '2-digit',
                              minute: '2-digit',
                            })
                          : '—'}
                      </td>
                      <td className="px-3 py-2 text-right">{score}</td>
                      <td className="px-3 py-2 text-right">
                        {accuracy ? Math.round(accuracy) : 0}%
                      </td>
                    </tr>
                  )
                })}
                {results.length === 0 && (
                  <tr>
                    <td colSpan={4} className="px-3 py-4 text-center text-muted-foreground">
                      Пока нет пройденных сессий.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </main>
  )
}
