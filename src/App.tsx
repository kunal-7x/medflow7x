import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HospitalDataProvider } from "@/contexts/HospitalDataContext";
import NotFound from "./pages/NotFound";
import { Dashboard } from "./components/Dashboard";
import { PatientManagement } from "./components/PatientManagement";
import { BedManagement } from "./components/BedManagement";
import { Appointments } from "./components/Appointments";
import { Admissions } from "./components/Admissions";
import { Orders } from "./components/Orders";
import { NursingStation } from "./components/NursingStation";
import { Medications } from "./components/Medications";
import { Billing } from "./components/Billing";
import { StaffScheduling } from "./components/StaffScheduling";
import { Analytics } from "./components/Analytics";
import { Compliance } from "./components/Compliance";
import { Notifications } from "./components/Notifications";
import { Settings } from "./components/Settings";
import { Sidebar } from "./components/Sidebar";
import { SoundToggle } from "./components/SoundToggle";

const queryClient = new QueryClient();

const Layout = ({ children }: { children: React.ReactNode }) => (
  <div className="min-h-screen bg-background flex w-full">
    <Sidebar />
    <main className="flex-1 min-w-0 flex flex-col">
      {/* Minimal header with sound toggle */}
      <header className="h-12 flex items-center justify-end px-4 gap-2">
        <SoundToggle />
      </header>
      <div className="flex-1 overflow-auto p-6 pt-0">
        <div className="animate-fade-in">
          {children}
        </div>
      </div>
    </main>
  </div>
);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <HospitalDataProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Layout><Dashboard /></Layout>} />
            <Route path="/patients" element={<Layout><PatientManagement /></Layout>} />
            <Route path="/beds" element={<Layout><BedManagement /></Layout>} />
            <Route path="/appointments" element={<Layout><Appointments /></Layout>} />
            <Route path="/admissions" element={<Layout><Admissions /></Layout>} />
            <Route path="/orders" element={<Layout><Orders /></Layout>} />
            <Route path="/nursing" element={<Layout><NursingStation /></Layout>} />
            <Route path="/medications" element={<Layout><Medications /></Layout>} />
            <Route path="/billing" element={<Layout><Billing /></Layout>} />
            <Route path="/staff" element={<Layout><StaffScheduling /></Layout>} />
            <Route path="/analytics" element={<Layout><Analytics /></Layout>} />
            <Route path="/compliance" element={<Layout><Compliance /></Layout>} />
            <Route path="/notifications" element={<Layout><Notifications /></Layout>} />
            <Route path="/settings" element={<Layout><Settings /></Layout>} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </HospitalDataProvider>
  </QueryClientProvider>
);

export default App;
