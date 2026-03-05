import React from 'react'
import 'katex/dist/katex.min.css'
import { BlockMath } from 'react-katex'

import { EquationBlock as EquationBlockProps } from '@/payload-types'

type Props = EquationBlockProps & {
  className?: string
}

export const EquationBlock: React.FC<Props> = ({ className, formula, caption }) => {
  if (!formula) return null

  return (
    <div
      className={[className, 'not-prose flex flex-col items-center my-4'].filter(Boolean).join(' ')}
    >
      <div className="overflow-x-auto w-full text-center bg-card rounded-lg px-2 py-1">
        <BlockMath math={formula} />
      </div>
      {caption && <span className="mt-1 text-sm text-muted-foreground italic">{caption}</span>}
    </div>
  )
}
