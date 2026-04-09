import { NavLink, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useTheme } from "@/contexts/ThemeContext";
import {
  LayoutDashboard, Code2, Building2, StickyNote,
  BarChart3, Target, Timer, Sun, Moon, LogOut, Menu, X, Flame, BookOpen } from
"lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useState } from "react";

const navItems = [
{ to: "/dashboard", icon: LayoutDashboard, label: "Dashboard" },
{ to: "/dsa-tracker", icon: Code2, label: "DSA Tracker" },
{ to: "/core-subjects", icon: BookOpen, label: "Core Subjects" },
{ to: "/company-prep", icon: Building2, label: "Company Prep" },
{ to: "/notes", icon: StickyNote, label: "Notes" },
{ to: "/analytics", icon: BarChart3, label: "Analytics" },
{ to: "/planner", icon: Target, label: "Study Planner" },
{ to: "/mock-timer", icon: Timer, label: "Mock Timer" }];


export default function AppSidebar() {
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      {/* Mobile toggle */}
      <button
        onClick={() => setMobileOpen(!mobileOpen)}
        className="fixed top-4 left-4 z-50 md:hidden rounded-lg bg-sidebar p-2 text-sidebar-foreground">
        
        {mobileOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      {/* Overlay */}
      {mobileOpen &&
      <div
        className="fixed inset-0 z-40 bg-background/60 backdrop-blur-sm md:hidden"
        onClick={() => setMobileOpen(false)} />

      }

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed left-0 top-0 z-40 h-screen w-64 flex flex-col bg-sidebar text-sidebar-foreground border-r border-sidebar-border transition-transform duration-300",
          mobileOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        )}>
        
        {/* Logo */}
        <div className="flex items-center gap-2 px-6 py-5 border-b border-sidebar-border">
          <div className="gradient-primary rounded-lg p-2">
            <Flame className="h-5 w-5 text-white" />
          </div>
          <span className="font-display text-lg font-bold tracking-tight">PrepTrack</span>
        </div>

        {/* Nav */}
        <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
          {navItems.map((item) =>
          <NavLink
            key={item.to}
            to={item.to}
            onClick={() => setMobileOpen(false)}
            className={({ isActive }) =>
            cn(
              "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors",
              isActive ?
              "bg-sidebar-accent text-sidebar-primary" :
              "text-sidebar-foreground/70 hover:bg-sidebar-accent/50 hover:text-sidebar-foreground"
            )
            }>
            
              <item.icon size={18} />
              {item.label}
            </NavLink>
          )}
        </nav>

        {/* Footer */}
        <div className="border-t border-sidebar-border p-4 space-y-3">
          <div className="flex items-center gap-3">
            <div className="gradient-primary rounded-full h-8 w-8 flex items-center justify-center text-white text-sm font-bold">
              {user?.name?.[0]?.toUpperCase() || "U"}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate">{user?.name || "User"}</p>
              <p className="text-xs text-sidebar-foreground/50 truncate">{user?.email}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleTheme}
              className="flex-1 text-sidebar-foreground/70 hover:text-sidebar-foreground hover:bg-sidebar-accent">
              
              {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
              <span className="ml-1 text-xs">{theme === "dark" ? "Light" : "Dark"}</span>
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={logout}
              className="flex-1 text-sidebar-foreground/70 hover:text-destructive hover:bg-sidebar-accent">
              
              <LogOut size={16} />
              <span className="ml-1 text-xs">Logout</span>
            </Button>
          </div>
        </div>
      </aside>
    </>);

}