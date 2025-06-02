
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { AuthProvider } from "@/contexts/AuthContext";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Signaler from "./pages/Signaler";
import Carte from "./pages/Carte";
import APropos from "./pages/APropos";
import Paiement from "./pages/Paiement";
import Profil from "./pages/Profil";
import MesSignalements from "./pages/MesSignalements";
import Notifications from "./pages/Notifications";
import AdminDashboard from "./pages/admin/Dashboard";
import GestionSignalements from "./pages/admin/GestionSignalements";
import GestionUtilisateurs from "./pages/admin/GestionUtilisateurs";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <LanguageProvider>
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/admin/dashboard" element={<AdminDashboard />} />
              <Route path="/admin/signalements" element={<GestionSignalements />} />
              <Route path="/admin/utilisateurs" element={<GestionUtilisateurs />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/signaler" element={<Signaler />} />
              <Route path="/carte" element={<Carte />} />
              <Route path="/a-propos" element={<APropos />} />
              <Route path="/paiement" element={<Paiement />} />
              <Route path="/profil" element={<Profil />} />
              <Route path="/mes-signalements" element={<MesSignalements />} />
              <Route path="/notifications" element={<Notifications />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              {/*<Route path="*" element={<NotFound />} />*/}
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </AuthProvider>
    </LanguageProvider>
  </QueryClientProvider>
);

export default App;
