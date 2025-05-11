"use client";

import { useEffect, useState } from "react";

import { NavMain } from "@/components/sidebar/nav-main";
import { NavUser } from "@/components/sidebar/nav-user";
// import { TeamSwitcher } from "@/components/sidebar/team-switcher"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";

import { getNavMenuByRole } from "./sidebar-data";

export function AppSidebar({ ...props }) {
  const [user, setUser] = useState(null);
  const [menuData, setMenuData] = useState({});

  useEffect(() => {
    try {
      const userData = localStorage.getItem("user");
      if (userData) {
        const parsedUser = JSON.parse(userData);
        setUser(parsedUser);
        setMenuData({ [parsedUser.role]: getNavMenuByRole(parsedUser.role) });
      }
    } catch (err) {
      console.error("Failed to load user data from localStorage", err);
    }
  }, []);

  if (!user) return null; // or show a loader or fallback UI

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        {/* <TeamSwitcher teams={data.teams} /> */}
      </SidebarHeader>
      <SidebarContent>
        <NavMain role={user.role} menuData={menuData} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
