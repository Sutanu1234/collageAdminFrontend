"use client";

import { useState } from "react";
import { Home, Inbox, Calendar, Search, Settings, Menu, ChevronLeft } from "lucide-react";
import { cn } from "@/lib/utils"; // ShadCN utility function (optional)
import { Button } from "@/components/ui/button"; // ShadCN Button
import { Card } from "@/components/ui/card"; // ShadCN Card for styling

const menuItems = [
  { title: "Home", icon: Home, href: "/" },
  { title: "Inbox", icon: Inbox, href: "/inbox" },
  { title: "Calendar", icon: Calendar, href: "/calendar" },
  { title: "Search", icon: Search, href: "/search" },
  { title: "Settings", icon: Settings, href: "/settings" },
];

export function CustomSidebar() {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <Card
      className={cn(
        "h-screen bg-gray-900 text-white p-4 flex flex-col transition-all duration-300",
        isOpen ? "w-64" : "w-20"
      )}
    >
      {/* Sidebar Toggle Button */}
      <Button
        variant="ghost"
        className="mb-4 flex items-center justify-start"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <ChevronLeft className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </Button>

      {/* Sidebar Menu */}
      <nav className="flex flex-col space-y-2">
        {menuItems.map((item, index) => (
          <a
            key={index}
            href={item.href}
            className="flex items-center space-x-3 px-4 py-2 rounded-md hover:bg-gray-700 transition-all"
          >
            <item.icon className="w-5 h-5" />
            {isOpen && <span className="text-lg">{item.title}</span>}
          </a>
        ))}
      </nav>

      {/* Footer */}
      <div className="mt-auto p-4 text-sm text-gray-400">
        {isOpen && <p>© 2024 My App</p>}
      </div>
    </Card>
  );
}
