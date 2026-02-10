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
      className={[className, 'my-8 not-prose flex flex-col items-center'].filter(Boolean).join(' ')}
    >
      <div className="overflow-x-auto w-full text-center py-4 bg-muted/20 rounded-lg">
        <BlockMath math={formula} />
      </div>
      {caption && <span className="mt-2 text-sm text-muted-foreground italic">{caption}</span>}
    </div>
  )
}
