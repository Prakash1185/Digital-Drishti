"use client";

import * as React from "react";
import { usePathname } from "next/navigation";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarRail,
} from "@/components/ui/sidebar";

import {
  Eye,
  LayoutDashboard,
  Zap,
  BarChart3,
  Salad,
  History,
  Brain,
  CheckSquare,
  Timer,
  Target,
  Clock,
  Heart,
  BookOpen,
  Coffee,
  MessageCircle,
  Settings,
  User,
  Shield,
  Puzzle,
  Airplay,
} from "lucide-react";

const data = {
  user: {
    name: "Prakash",
    email: "prakash@digitaldrishti.com",
    avatar: "/avatars/prakash.jpg",
  },
  navMain: [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: LayoutDashboard,
      items: [
        {
          title: "Overview",
          url: "/dashboard",
          icon: BarChart3,
        },
      ],
    },
    {
      title: "Digital Mirror",
      url: "/digital-mirror",
      icon: Airplay,
      items: [
        {
          title: "Content Analytics",
          url: "/digital-mirror/analytics",
          icon: BarChart3,
        },
        {
          title: "Digital Nutrition",
          url: "/digital-mirror/nutrition",
          icon: Salad,
        },
        {
          title: "Block Sites",
          url: "/digital-mirror/block-site",
          icon: History,
        },
      ],
    },
    {
      title: "Productivity",
      url: "/productivity",
      icon: Target,
      items: [
        {
          title: "Task Manager",
          url: "/productivity/tasks",
          icon: CheckSquare,
        },
        {
          title: "Focus Timer",
          url: "/productivity/focus",
          icon: Timer,
        },
        {
          title: "Goals & Habits",
          url: "/productivity/goals",
          icon: Target,
        },
      ],
    },
    {
      title: "Mental Health",
      url: "/mental-health",
      icon: Heart,
      items: [
        {
          title: "Mood Tracker",
          url: "/mental-health/mood",
          icon: Heart,
        },
        {
          title: "Daily Journal",
          url: "/mental-health/journal",
          icon: BookOpen,
        },

        {
          title: "AI Wellness Chat",
          url: "/mental-health/chat",
          icon: MessageCircle,
        },
      ],
    },
    {
      title: "Settings",
      url: "/settings",
      icon: Settings,
      items: [
        {
          title: "Profile",
          url: "/settings/profile",
          icon: User,
        },
        {
          title: "Privacy & Data",
          url: "/settings/privacy",
          icon: Shield,
        },
        {
          title: "Extension",
          url: "/",
          icon: Puzzle,
        },
      ],
    },
  ],
};

import Link from "next/link";
import Image from "next/image";

export function AppSidebar({ ...props }) {
  const pathname = usePathname();

  return (
    <Sidebar {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              size="xl"
              asChild
              className="hover:!bg-transparent hover:!text-current"
            >
              <Link
                href="/dashboard"
                className="bg-primary/15 border border-primary/50"
              >
                <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
                  <Eye className="size-5" />
                  {/* <Image src={"/logo.png"} width={50} alt="logo" height={50}/> */}
                </div>
                <div className="flex flex-col gap-0.5 leading-none">
                  <span className="font-medium text-xl">Digital Drishti</span>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu>
            {data.navMain.map((item) => {
              const Icon = item.icon;
              return (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <h1 className="font-medium">{item.title}</h1>
                  </SidebarMenuButton>
                  {item.items?.length ? (
                    <SidebarMenuSub>
                      {item.items.map((subItem) => {
                        const SubIcon = subItem.icon;
                        const isActive = pathname === subItem.url;
                        return (
                          <SidebarMenuSubItem key={subItem.title}>
                            <SidebarMenuSubButton asChild isActive={isActive}>
                              <Link href={subItem.url} className="">
                                <SubIcon className="mr-2 h-3 w-3" />
                                {subItem.title}
                              </Link>
                            </SidebarMenuSubButton>
                          </SidebarMenuSubItem>
                        );
                      })}
                    </SidebarMenuSub>
                  ) : null}
                </SidebarMenuItem>
              );
            })}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}

// Export data for use in breadcrumbs
export { data };
