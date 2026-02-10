'use client'
import React from 'react'
import { useField } from '@payloadcms/ui'
import { BlockMath } from 'react-katex'
import 'katex/dist/katex.min.css'

export const EquationPreview: React.FC = () => {
  const { value } = useField<string>({ path: 'formula' })

  if (!value) return null

  return (
    <div className="mt-4 p-4 border rounded bg-slate-50 dark:bg-slate-900 overflow-x-auto">
      <p className="text-[10px] text-muted-foreground mb-2 uppercase font-bold tracking-widest">
        Предпросмотр (Live):
      </p>
      <div className="flex justify-center py-4">
        <BlockMath math={value} />
      </div>
    </div>
  )
}
