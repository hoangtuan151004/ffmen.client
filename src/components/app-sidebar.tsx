"use client";

import * as React from "react";
import { NavMain } from "@/components/nav-main";
import { NavUser } from "@/components/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import { menuItems } from "../config/admin-menu";
import Link from "next/link";
import Image from "next/image";
import logo from "../assets/logo.jpg";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarContent>
        <Link href="/" className="flex items-center space-x-2">
          <Image src={logo} alt="Logo" width={50} height={50} />
        </Link>
        <NavMain items={menuItems} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser
          user={{
            name: "Admin",
            email: "admin@example.com",
            avatar: "/avatars/admin.jpg",
          }}
        />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
