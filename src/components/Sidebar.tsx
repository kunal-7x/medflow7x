import { useState } from "react";
import { NavLink } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  Activity,
  Bed,
  Calendar,
  Clock,
  FileText,
  Heart,
  Home,
  Pill,
  Settings,
  Shield,
  TrendingUp,
  User,
  Users,
  Wallet,
  Bell,
  LogOut,
  Menu,
  X,
  Zap
} from "lucide-react";

const navigationItems = [
  { title: "Dashboard", url: "/", icon: Home },
  { title: "Patients", url: "/patients", icon: User },
  { title: "Beds", url: "/beds", icon: Bed },
  { title: "Appointments", url: "/appointments", icon: Calendar },
  { title: "Admissions", url: "/admissions", icon: Clock },
  { title: "Orders", url: "/orders", icon: FileText },
  { title: "Nursing", url: "/nursing", icon: Heart },
  { title: "Medications", url: "/medications", icon: Pill },
  { title: "Billing", url: "/billing", icon: Wallet },
  { title: "Staff", url: "/staff", icon: Users },
  { title: "Analytics", url: "/analytics", icon: TrendingUp },
  { title: "Compliance", url: "/compliance", icon: Shield },
  { title: "Notifications", url: "/notifications", icon: Bell },
];

interface SidebarProps {
  userRole?: string;
}

export function Sidebar({ userRole = "Doctor" }: SidebarProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <aside
      className={cn(
        "bg-sidebar border-r border-border/30 transition-all duration-300 ease-in-out flex flex-col",
        isCollapsed ? "w-[68px]" : "w-60"
      )}
    >
      {/* Header */}
      <div className="p-4 border-b border-border/30">
        <div className="flex items-center justify-between">
          {!isCollapsed && (
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center shadow-glow">
                <Zap className="w-4 h-4 text-primary-foreground" />
              </div>
              <div>
                <h1 className="font-bold text-base text-gradient-gold">
                  MedFlow
                </h1>
                <p className="text-[10px] text-muted-foreground font-medium tracking-wider uppercase">{userRole}</p>
              </div>
            </div>
          )}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="h-8 w-8 text-muted-foreground hover:text-foreground"
          >
            {isCollapsed ? <Menu className="w-4 h-4" /> : <X className="w-4 h-4" />}
          </Button>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-3 space-y-0.5 overflow-y-auto">
        {navigationItems.map((item) => (
          <NavLink
            key={item.title}
            to={item.url}
            className={({ isActive }) =>
              cn(
                "flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 group relative",
                isActive
                  ? "bg-primary/10 text-primary border border-primary/20"
                  : "text-muted-foreground hover:text-foreground hover:bg-secondary"
              )
            }
          >
            {({ isActive }) => (
              <>
                {isActive && (
                  <div className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-5 bg-primary rounded-r" />
                )}
                <item.icon className={cn(
                  "w-[18px] h-[18px] transition-colors duration-200 flex-shrink-0",
                  isActive ? "text-primary" : "text-muted-foreground group-hover:text-foreground"
                )} />
                {!isCollapsed && (
                  <span className="truncate">{item.title}</span>
                )}
              </>
            )}
          </NavLink>
        ))}
      </nav>

      {/* Footer */}
      <div className="p-3 border-t border-border/30 space-y-0.5">
        <NavLink
          to="/settings"
          className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-secondary transition-all duration-200"
        >
          <Settings className="w-[18px] h-[18px] flex-shrink-0" />
          {!isCollapsed && <span>Settings</span>}
        </NavLink>
        
        <Button
          variant="ghost"
          className="w-full justify-start gap-3 text-muted-foreground hover:text-foreground h-9 px-3"
          onClick={() => console.log("Logout clicked")}
        >
          <LogOut className="w-[18px] h-[18px] flex-shrink-0" />
          {!isCollapsed && <span className="text-sm">Logout</span>}
        </Button>
      </div>
    </aside>
  );
}
