import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthProvider } from "@/contexts/AuthContext";
import { ThemeProvider } from "@/contexts/ThemeContext";
import AppLayout from "@/components/AppLayout";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import DSATracker from "./pages/DSATracker";
import CoreSubjects from "./pages/CoreSubjects";
import CompanyPrep from "./pages/CompanyPrep";
import Notes from "./pages/Notes";
import Analytics from "./pages/Analytics";
import StudyPlanner from "./pages/StudyPlanner";
import MockTimer from "./pages/MockTimer";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route element={<AppLayout />}>
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/dsa-tracker" element={<DSATracker />} />
                <Route path="/core-subjects" element={<CoreSubjects />} />
                <Route path="/company-prep" element={<CompanyPrep />} />
                <Route path="/notes" element={<Notes />} />
                <Route path="/analytics" element={<Analytics />} />
                <Route path="/planner" element={<StudyPlanner />} />
                <Route path="/mock-timer" element={<MockTimer />} />
              </Route>
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </AuthProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;