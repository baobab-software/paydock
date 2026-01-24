"use client"

import * as React from "react"
import { IconHelp, IconSearch, IconSettings } from "@tabler/icons-react"

import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

const NAV_SECONDARY_ICONS = {
  settings: IconSettings,
  help: IconHelp,
  search: IconSearch,
} satisfies Record<string, React.ComponentType>

export function NavSecondary({
  items,
  ...props
}: {
  items: {
    title: string
    url: string
    icon: keyof typeof NAV_SECONDARY_ICONS
  }[]
} & React.ComponentPropsWithoutRef<typeof SidebarGroup>) {
  const icons = NAV_SECONDARY_ICONS

  return (
    <SidebarGroup {...props}>
      <SidebarGroupContent>
        <SidebarMenu>
          {items.map((item) => (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton asChild>
                <a href={item.url}>
                  {(() => {
                    const Icon = icons[item.icon]
                    return Icon ? <Icon /> : null
                  })()}
                  <span>{item.title}</span>
                </a>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  )
}
