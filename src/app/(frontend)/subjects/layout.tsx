import { getSubjectTree } from '@/entities/subject/api/getSubjectTree'
import { SidebarInset, SidebarProvider, SidebarTrigger } from '@/shared/ui/sidebar'
import { AppSidebar } from '@/widgets/AppSidebar/AppSidebar'
import { UserProgressBadge } from '@/widgets/UserProgressBadge/ui/UserProgressBadge'

export default async function SubjectsLayout({ children }: { children: React.ReactNode }) {
  const subjectTree = await getSubjectTree()

  return (
    <SidebarProvider
      style={
        {
          '--sidebar-width': '350px',
          '--sidebar-width-icon': '3.5rem',
        } as React.CSSProperties
      }
    >
      <AppSidebar subjects={subjectTree} />
      <SidebarInset>
        {/* Внутренняя шапка для приложения (AppHeader) */}
        <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4 sticky top-0 bg-background z-10">
          <SidebarTrigger />
          {/* <Separator orientation="vertical" className="mr-2 h-4" /> */}
          {/* <Breadcrumbs />  */}
          <div className="ml-auto flex items-center gap-4">
            <UserProgressBadge />
          </div>
        </header>

        <main className="flex-1 p-6 overflow-y-auto">{children}</main>
      </SidebarInset>
    </SidebarProvider>
  )
}
