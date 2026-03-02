import { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { playSound } from "@/hooks/useSoundSystem";
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
  PanelLeftClose,
  PanelLeftOpen,
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
  const location = useLocation();

  const handleToggle = () => {
    playSound('toggle');
    setIsCollapsed(!isCollapsed);
  };

  const handleNavClick = () => {
    playSound('navigate');
  };

  return (
    <aside
      className={cn(
        "apple-glass m-2 rounded-2xl transition-all duration-400 ease-[cubic-bezier(0.4,0,0.2,1)] flex flex-col overflow-hidden",
        isCollapsed ? "w-[68px]" : "w-60"
      )}
      style={{ height: 'calc(100vh - 16px)' }}
    >
      {/* Header */}
      <div className="p-4 border-b border-border/20">
        <div className="flex items-center justify-between">
          {!isCollapsed && (
            <div className="flex items-center gap-2.5 animate-fade-in">
              <div className="w-8 h-8 bg-gradient-primary rounded-xl flex items-center justify-center shadow-glow">
                <Zap className="w-4 h-4 text-primary-foreground" />
              </div>
              <div>
                <h1 className="font-bold text-sm text-gradient-gold">MedFlow</h1>
                <p className="text-[10px] text-muted-foreground font-medium tracking-wider uppercase">{userRole}</p>
              </div>
            </div>
          )}
          {isCollapsed && (
            <div className="w-8 h-8 bg-gradient-primary rounded-xl flex items-center justify-center shadow-glow mx-auto">
              <Zap className="w-4 h-4 text-primary-foreground" />
            </div>
          )}
        </div>
      </div>

      {/* Toggle button */}
      <div className="px-3 py-2">
        <Button
          variant="ghost"
          size="sm"
          onClick={handleToggle}
          className={cn(
            "w-full h-8 text-muted-foreground hover:text-foreground hover:bg-secondary/50 rounded-xl transition-all duration-200",
            isCollapsed ? "justify-center px-0" : "justify-start px-3"
          )}
        >
          {isCollapsed ? <PanelLeftOpen className="w-4 h-4" /> : (
            <>
              <PanelLeftClose className="w-4 h-4 mr-2" />
              <span className="text-xs">Collapse</span>
            </>
          )}
        </Button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 pb-2 space-y-0.5 overflow-y-auto">
        {navigationItems.map((item) => {
          const isActive = location.pathname === item.url;
          return (
            <NavLink
              key={item.title}
              to={item.url}
              onClick={handleNavClick}
              className={cn(
                "flex items-center gap-3 px-3 py-2 rounded-xl text-sm font-medium transition-all duration-200 group relative",
                isActive
                  ? "bg-primary/10 text-primary"
                  : "text-muted-foreground hover:text-foreground hover:bg-secondary/40"
              )}
            >
              {isActive && (
                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-5 bg-primary rounded-r-full" />
              )}
              <item.icon className={cn(
                "w-[18px] h-[18px] transition-all duration-200 flex-shrink-0",
                isActive ? "text-primary" : "text-muted-foreground group-hover:text-foreground"
              )} />
              {!isCollapsed && (
                <span className="truncate">{item.title}</span>
              )}
              {isActive && !isCollapsed && (
                <div className="ml-auto w-1.5 h-1.5 rounded-full bg-primary" />
              )}
            </NavLink>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="px-3 py-3 border-t border-border/20 space-y-0.5">
        <NavLink
          to="/settings"
          onClick={handleNavClick}
          className={cn(
            "flex items-center gap-3 px-3 py-2 rounded-xl text-sm font-medium transition-all duration-200",
            location.pathname === '/settings'
              ? "bg-primary/10 text-primary"
              : "text-muted-foreground hover:text-foreground hover:bg-secondary/40"
          )}
        >
          <Settings className="w-[18px] h-[18px] flex-shrink-0" />
          {!isCollapsed && <span>Settings</span>}
        </NavLink>
        
        <Button
          variant="ghost"
          className={cn(
            "w-full gap-3 text-muted-foreground hover:text-foreground h-9 rounded-xl hover:bg-secondary/40",
            isCollapsed ? "justify-center px-0" : "justify-start px-3"
          )}
          onClick={() => {
            playSound('click');
            console.log("Logout clicked");
          }}
        >
          <LogOut className="w-[18px] h-[18px] flex-shrink-0" />
          {!isCollapsed && <span className="text-sm">Logout</span>}
        </Button>
      </div>
    </aside>
  );
}
