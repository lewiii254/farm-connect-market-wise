
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/components/auth/AuthProvider";
import Index from "./pages/Index";
import Markets from "./pages/Markets";
import Buyers from "./pages/Buyers";
import Dashboard from "./pages/Dashboard";
import Community from "./pages/Community";
import FinancialServices from "./pages/FinancialServices";
import YouthMentorship from "./pages/YouthMentorship";
import AgriEducation from "./pages/AgriEducation";
import Auth from "./pages/Auth";
import SupplyChain from "./pages/SupplyChain";
import PitchDeck from "./pages/PitchDeck";
import Marketplace from "./pages/Marketplace";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      refetchOnWindowFocus: false,
    },
  },
});

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/markets" element={<Markets />} />
              <Route path="/marketplace" element={<Marketplace />} />
              <Route path="/buyers" element={<Buyers />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/community" element={<Community />} />
              <Route path="/financial-services" element={<FinancialServices />} />
              <Route path="/youth-mentorship" element={<YouthMentorship />} />
              <Route path="/education" element={<AgriEducation />} />
              <Route path="/auth" element={<Auth />} />
              <Route path="/supply-chain" element={<SupplyChain />} />
              <Route path="/pitch" element={<PitchDeck />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
};

export default App;
