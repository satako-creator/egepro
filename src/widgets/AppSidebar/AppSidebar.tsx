import { Lesson, Subject, Topic } from '@/payload-types'
import { Logo } from '@/shared/ui/Logo/Logo'
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenuButton,
} from '@/shared/ui/sidebar'
import { NavSubjects } from '@/widgets/NavSubjects/NavSubjects'
import Link from 'next/link'

interface AppSidebarProps extends React.ComponentProps<typeof Sidebar> {
  subjects: (Subject & {
    topics: (Topic & { lessons: Lesson[] })[]
  })[]
}

export function AppSidebar({ subjects, ...props }: AppSidebarProps) {
  return (
    <Sidebar
      collapsible="icon"
      {...props}
      variant="sidebar"
      className="group transition-all duration-300 ease-in-out"
      style={
        {
          ...props.style,
          transition:
            'width 300ms cubic-bezier(0.4, 0, 0.2, 1), min-width 300ms cubic-bezier(0.4, 0, 0.2, 1)',
        } as React.CSSProperties
      }
    >
      <SidebarHeader className="h-[--header-height] py-2 px-4">
        {/* Контейнер для логотипа с адаптивным поведением */}
        <div className="flex items-center justify-center ">
          <Link href={'/'} className="flex items-center justify-start w-full">
            {/* Полная версия логотипа — видна только в развёрнутом состоянии */}
            <Logo className="group-data-[collapsible=icon]:hidden w-24 h-12 transition-all duration-300 ease-in-out opacity-100 group-data-[collapsible=icon]:opacity-0" />
            <Logo
              collapsed
              className="hidden group-data-[collapsible=icon]:flex w-8 h-8 transition-all duration-300 ease-in-out opacity-0 group-data-[collapsible=icon]:opacity-100"
            />
          </Link>
        </div>
      </SidebarHeader>

      <SidebarContent className="px-2">
        <NavSubjects subjects={subjects} />
      </SidebarContent>

      <SidebarFooter>{/* Здесь может быть NavUser (профиль пользователя) */}</SidebarFooter>
    </Sidebar>
  )
}
