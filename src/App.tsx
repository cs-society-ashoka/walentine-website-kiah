import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { HashRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import RetroChao from "./templates/RetroChao";
import Mixtape from "./templates/Mixtape";
import DesktopSimulator from "./templates/DesktopSimulator";
import LoveReceipt from "./templates/LoveReceipt";
import RPGQuest from "./templates/RPGQuest";
import SealedLetter from "./templates/SealedLetter";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <HashRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/mixtape" element={<Mixtape />} />
          <Route path="/retro-chaos" element={<RetroChao />} />
          <Route path="/desktop" element={<DesktopSimulator />} />
          <Route path="/receipt" element={<LoveReceipt />} />
          <Route path="/rpg" element={<RPGQuest />} />
          <Route path="/letter" element={<SealedLetter />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </HashRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
