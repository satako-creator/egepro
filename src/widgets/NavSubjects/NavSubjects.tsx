'use client'

import * as React from 'react'
import { ChevronRight, GraduationCap, Folder, BookOpen } from 'lucide-react'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/shared/ui/collapsible'
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuBadge,
} from '@/shared/ui/sidebar'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/shared/ui/tooltip'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Badge } from '@/shared/ui/badge'

type NavItem = {
  id: string | number
  title: string
  url?: string
  items?: NavItem[]
  icon?: React.ElementType
}

export function NavSubjects({ subjects }: { subjects: any[] }) {
  const treeData: NavItem[] = subjects.map((s) => ({
    id: s.id,
    title: s.name,
    icon: GraduationCap,
    items: s.topics?.map((t: any) => ({
      id: t.id,
      title: t.name,
      icon: Folder,
      items: t.lessons?.map((l: any) => ({
        id: l.id,
        title: l.title,
        url: `/subjects/${s.slug}/lessons/${l.slug}`,
        icon: BookOpen,
      })),
    })),
  }))

  return (
    <TooltipProvider>
      <SidebarMenu>
        {treeData.map((item) => (
          <Tree key={item.id} item={item} />
        ))}
      </SidebarMenu>
    </TooltipProvider>
  )
}

function Tree({ item }: { item: NavItem }) {
  const pathname = usePathname()
  const Icon = item.icon
  const hasItems = item.items && item.items.length > 0
  const isActive = item.url ? pathname.includes(item.url) : false

  // 📚 Лист дерева (Урок)
  if (!hasItems) {
    return (
      <SidebarMenuItem>
        <Tooltip>
          <TooltipTrigger asChild>
            <SidebarMenuButton
              asChild
              isActive={isActive}
              className={`h-auto py-2.5 px-4 transition-colors ${
                isActive
                  ? 'bg-primary/10 text-primary font-semibold' // Стили для активного состояния
                  : 'text-muted-foreground hover:text-foreground' // Стили для обычного
              }`}
            >
              <Link href={item.url || '#'} className="flex items-start gap-2">
                {Icon && (
                  <Icon className={`shrink-0 mt-0.5 ${isActive ? 'text-primary' : ''}`} size={18} />
                )}
                <span className="flex-1 line-clamp-2 text-base leading-relaxed">{item.title}</span>
              </Link>
            </SidebarMenuButton>
          </TooltipTrigger>
          <TooltipContent side="right" align="center" className="max-w-75">
            {item.title}
          </TooltipContent>
        </Tooltip>
      </SidebarMenuItem>
    )
  }

  // 📁 Узел дерева (Предмет или Тема)
  return (
    <SidebarMenuItem>
      <Collapsible
        className="group/collapsible [&[data-state=open]>button>svg:first-child]:rotate-90"
        defaultOpen={true}
      >
        <CollapsibleTrigger asChild>
          <SidebarMenuButton className="py-2.5 pr-2" asChild>
            <div className="flex w-full items-center gap-2 overflow-hidden">
              <ChevronRight className="transition-transform shrink-0" size={16} />
              {Icon && <Icon className="shrink-0" size={18} />}

              <span className="flex-1 min-w-0 truncate font-medium text-base">{item.title}</span>

              {item.items && <Badge>{item.items.length}</Badge>}
            </div>
          </SidebarMenuButton>
        </CollapsibleTrigger>

        <CollapsibleContent>
          <SidebarMenuSub className="mr-0 pr-0 ml-4 border-l pl-4">
            {item.items?.map((subItem) => (
              <Tree key={subItem.id} item={subItem} />
            ))}
          </SidebarMenuSub>
        </CollapsibleContent>
      </Collapsible>
    </SidebarMenuItem>
  )
}
