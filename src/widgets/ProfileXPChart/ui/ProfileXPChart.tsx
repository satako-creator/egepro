// src/widgets/ProfileXPChart/ui/ProfileXPChart.tsx
'use client'

type Point = {
  label: string
  xp: number
}

export function ProfileXPChart({ points }: { points: Point[] }) {
  if (!points.length) {
    return <p className="text-sm text-muted-foreground">Недостаточно данных для графика.</p>
  }

  const maxXP = Math.max(...points.map((p) => p.xp)) || 1

  return (
    <div className="flex h-40 items-end gap-2">
      {points.map((p, idx) => {
        const height = (p.xp / maxXP) * 100
        return (
          <div key={idx} className="flex flex-1 flex-col h-full items-center gap-1">
            <div className="relative flex h-full w-full items-end justify-center">
              <div className="w-12 rounded bg-success" style={{ height: `${height}%` }} />
            </div>
            <span className="truncate text-[10px] text-muted-foreground">{p.label}</span>
          </div>
        )
      })}
    </div>
  )
}
