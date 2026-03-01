import { useState } from "react";
import { Sidebar } from "@/components/Sidebar";
import { Dashboard } from "@/components/Dashboard";
import { BedManagement } from "@/components/BedManagement";
import { PatientManagement } from "@/components/PatientManagement";
import { Appointments } from "@/components/Appointments";
import { Admissions } from "@/components/Admissions";
import { Orders } from "@/components/Orders";
import { NursingStation } from "@/components/NursingStation";
import { Medications } from "@/components/Medications";
import { Billing } from "@/components/Billing";
import { StaffScheduling } from "@/components/StaffScheduling";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { User, ChevronDown, Bell, Search } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Index = () => {
  const [currentView, setCurrentView] = useState("dashboard");
  const [userRole, setUserRole] = useState("Doctor");

  const renderMainContent = () => {
    switch (currentView) {
      case "beds": return <BedManagement />;
      case "patients": return <PatientManagement />;
      case "appointments": return <Appointments />;
      case "admissions": return <Admissions />;
      case "orders": return <Orders />;
      case "nursing": return <NursingStation />;
      case "medications": return <Medications />;
      case "billing": return <Billing />;
      case "staff": return <StaffScheduling />;
      case "dashboard":
      default: return <Dashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-background flex w-full">
      <Sidebar userRole={userRole} />
      
      <main className="flex-1 flex flex-col min-w-0">
        {/* Top Navigation */}
        <header className="h-14 bg-card/50 backdrop-blur-xl border-b border-border/30 flex items-center justify-between px-6 sticky top-0 z-10">
          <div className="flex items-center gap-4">
            <h2 className="text-sm font-semibold text-foreground capitalize tracking-wide">
              {currentView === "dashboard" ? "Dashboard" : currentView.replace(/([A-Z])/g, ' $1')}
            </h2>
          </div>
          
          <div className="flex items-center gap-3">
            {/* Search */}
            <Button variant="ghost" size="icon" className="h-9 w-9 text-muted-foreground">
              <Search className="w-4 h-4" />
            </Button>

            {/* Notifications */}
            <Button variant="ghost" size="icon" className="h-9 w-9 text-muted-foreground relative">
              <Bell className="w-4 h-4" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-primary rounded-full" />
            </Button>

            {/* Role Selector */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="gap-2 text-muted-foreground h-9">
                  <Avatar className="w-7 h-7">
                    <AvatarFallback className="bg-primary/10 text-primary text-xs font-semibold">
                      {userRole[0]}
                    </AvatarFallback>
                  </Avatar>
                  <span className="text-xs font-medium hidden md:block">{userRole}</span>
                  <ChevronDown className="w-3 h-3" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-44">
                <DropdownMenuLabel className="text-xs">Switch Role</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {["Doctor", "Nurse", "Administrator", "Receptionist", "Lab Technician"].map(role => (
                  <DropdownMenuItem key={role} onClick={() => setUserRole(role)} className="text-xs">
                    {role}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>

        {/* Main Content */}
        <div className="flex-1 p-6 overflow-auto">
          <div className="animate-fade-in">
            {renderMainContent()}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;
