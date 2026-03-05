import React from 'react'
import { AeticsIcon } from './ui/Aetix'
import { cn } from '@/shared/utilities/ui'

interface Props {
  className?: string
  collapsed?: boolean
  loading?: 'lazy' | 'eager'
  priority?: 'auto' | 'high' | 'low'
}

export const Logo = ({
  collapsed,
  className,
  loading: loadingFromProps,
  priority: priorityFromProps,
}: Props) => {
  const loading = loadingFromProps || 'lazy'
  const priority = priorityFromProps || 'low'

  return (
    <AeticsIcon
      className={cn('transition-all duration-200', collapsed ? 'w-8 h-8' : 'w-20 h-10', className)}
    />
  )
}
