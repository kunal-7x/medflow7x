import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "@/contexts/AuthContext";
import { HospitalDataProvider } from "@/contexts/HospitalDataContext";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import Landing from "./pages/Landing";
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
import { Loader2 } from "lucide-react";

const queryClient = new QueryClient();

const Layout = ({ children }: { children: React.ReactNode }) => (
  <div className="min-h-screen bg-background flex w-full">
    <Sidebar />
    <main className="flex-1 min-w-0 flex flex-col">
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

function ProtectedRoute({ children, allowedRoles }: { children: React.ReactNode; allowedRoles?: string[] }) {
  const { user, role, loading, isVisitor } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!user && !isVisitor) return <Navigate to="/login" replace />;
  
  if (!isVisitor && allowedRoles && role && !allowedRoles.includes(role)) {
    return <Navigate to="/" replace />;
  }

  return <Layout>{children}</Layout>;
}

function AppRoutes() {
  const { user, loading, isVisitor } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <Routes>
      <Route path="/login" element={(user || isVisitor) ? <Navigate to="/" replace /> : <Login />} />
      <Route path="/" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
      <Route path="/patients" element={<ProtectedRoute allowedRoles={['admin','doctor','nurse']}><PatientManagement /></ProtectedRoute>} />
      <Route path="/beds" element={<ProtectedRoute><BedManagement /></ProtectedRoute>} />
      <Route path="/appointments" element={<ProtectedRoute allowedRoles={['admin','doctor','receptionist']}><Appointments /></ProtectedRoute>} />
      <Route path="/admissions" element={<ProtectedRoute allowedRoles={['admin','receptionist']}><Admissions /></ProtectedRoute>} />
      <Route path="/orders" element={<ProtectedRoute allowedRoles={['admin','doctor']}><Orders /></ProtectedRoute>} />
      <Route path="/nursing" element={<ProtectedRoute allowedRoles={['admin','doctor','nurse']}><NursingStation /></ProtectedRoute>} />
      <Route path="/medications" element={<ProtectedRoute allowedRoles={['admin','doctor','nurse']}><Medications /></ProtectedRoute>} />
      <Route path="/billing" element={<ProtectedRoute allowedRoles={['admin','receptionist']}><Billing /></ProtectedRoute>} />
      <Route path="/staff" element={<ProtectedRoute allowedRoles={['admin']}><StaffScheduling /></ProtectedRoute>} />
      <Route path="/analytics" element={<ProtectedRoute allowedRoles={['admin','doctor']}><Analytics /></ProtectedRoute>} />
      <Route path="/compliance" element={<ProtectedRoute allowedRoles={['admin']}><Compliance /></ProtectedRoute>} />
      <Route path="/notifications" element={<ProtectedRoute><Notifications /></ProtectedRoute>} />
      <Route path="/settings" element={<ProtectedRoute allowedRoles={['admin']}><Settings /></ProtectedRoute>} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <HospitalDataProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <AppRoutes />
          </BrowserRouter>
        </TooltipProvider>
      </HospitalDataProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
