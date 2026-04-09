"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { clsx } from "clsx";
import {
  CheckSquare,
  Calendar,
  LogOut,
  Waves,
  LayoutDashboard,
} from "lucide-react";
import { useAuthStore } from "@/store/auth.store";
import { useLogout } from "@/features/auth/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

const NAV_ITEMS = [
  {
    label: "Dashboard",
    href: "/todos",
    icon: LayoutDashboard,
  },
  {
    label: "Calendar",
    href: "/todos?view=calendar",
    icon: Calendar,
  },
];

export function Sidebar() {
  const pathname = usePathname();
  const { user } = useAuthStore();
  const logout = useLogout();

  const initials = user?.name
    ? user.name.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2)
    : "U";

  return (
    <aside className="flex flex-col h-full w-64 bg-white border-r border-slate-100 px-4 py-6">
      {/* Logo */}
      <div className="flex items-center gap-2 px-2 mb-8">
        <div className="w-8 h-8 rounded-xl bg-violet-600 flex items-center justify-center">
          <Waves className="w-4 h-4 text-white" />
        </div>
        <span className="font-bold text-slate-800 text-lg tracking-tight">
          NodeWave
        </span>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-1">
        {NAV_ITEMS.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href.split("?")[0];
          return (
            <Link
              key={item.href}
              href={item.href}
              className={clsx(
                "flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all",
                isActive
                  ? "bg-violet-50 text-violet-700"
                  : "text-slate-500 hover:text-slate-800 hover:bg-slate-50"
              )}
            >
              <Icon className="w-4 h-4" />
              {item.label}
            </Link>
          );
        })}
      </nav>

      <Separator className="my-4" />

      {/* User info */}
      <div className="flex items-center gap-3 px-2">
        <Avatar className="w-8 h-8">
          <AvatarFallback className="bg-violet-100 text-violet-700 text-xs font-semibold">
            {initials}
          </AvatarFallback>
        </Avatar>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-slate-800 truncate">
            {user?.name}
          </p>
          <p className="text-xs text-slate-400 truncate">{user?.email}</p>
        </div>
        <Button
          variant="ghost"
          size="icon"
          className="w-8 h-8 text-slate-400 hover:text-red-500"
          onClick={logout}
          title="Logout"
        >
          <LogOut className="w-4 h-4" />
        </Button>
      </div>
    </aside>
  );
}