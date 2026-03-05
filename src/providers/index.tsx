import React from 'react'

import { HeaderThemeProvider } from './HeaderTheme'
import { ThemeProvider } from './Theme'
import { TooltipProvider } from '@/shared/ui/tooltip'

export const Providers: React.FC<{
  children: React.ReactNode
}> = ({ children }) => {
  return (
    <ThemeProvider>
      <HeaderThemeProvider>
        <TooltipProvider>{children}</TooltipProvider>
      </HeaderThemeProvider>
    </ThemeProvider>
  )
}
