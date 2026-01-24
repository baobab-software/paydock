import * as React from "react";
import { IconInnerShadowTop } from "@tabler/icons-react";

import { NavDocuments } from "@/components/nav-documents";
import { NavMain } from "@/components/nav-main";
import { NavSecondary } from "@/components/nav-secondary";
import { NavUser } from "@/components/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

const data = {
  navMain: [
    {
      title: "Dashboard",
      url: "#",
      icon: "dashboard",
    },
    {
      title: "Lifecycle",
      url: "#",
      icon: "lifecycle",
    },
    {
      title: "Analytics",
      url: "#",
      icon: "analytics",
    },
    {
      title: "Projects",
      url: "#",
      icon: "projects",
    },
    {
      title: "Team",
      url: "#",
      icon: "team",
    },
  ],
  navClouds: [
    {
      title: "Capture",
      icon: "capture",
      isActive: true,
      url: "#",
      items: [
        {
          title: "Active Proposals",
          url: "#",
        },
        {
          title: "Archived",
          url: "#",
        },
      ],
    },
    {
      title: "Proposal",
      icon: "proposal",
      url: "#",
      items: [
        {
          title: "Active Proposals",
          url: "#",
        },
        {
          title: "Archived",
          url: "#",
        },
      ],
    },
    {
      title: "Prompts",
      icon: "prompts",
      url: "#",
      items: [
        {
          title: "Active Proposals",
          url: "#",
        },
        {
          title: "Archived",
          url: "#",
        },
      ],
    },
  ],
  navSecondary: [
    {
      title: "Settings",
      url: "#",
      icon: "settings",
    },
    {
      title: "Get Help",
      url: "#",
      icon: "help",
    },
    {
      title: "Search",
      url: "#",
      icon: "search",
    },
  ],
  documents: [
    {
      name: "Data Library",
      url: "#",
      icon: "database",
    },
    {
      name: "Reports",
      url: "#",
      icon: "report",
    },
    {
      name: "Word Assistant",
      url: "#",
      icon: "word",
    },
  ],
};

export async function AppSidebar({
  ...props
}: React.ComponentProps<typeof Sidebar>) {
   "use server";
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:!p-1.5"
            >
              <a href="#">
                <IconInnerShadowTop className="!size-5" />
                <span className="text-base font-semibold">{session?.user.name}</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavDocuments items={data.documents} />
        <NavSecondary items={data.navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter>
        {session?.user && <NavUser user={session.user} />}
      </SidebarFooter>
    </Sidebar>
  );
}
