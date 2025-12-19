import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProtectedRoute from "./components/common/ProtectedRoute";
import Home from "./pages/Home";
import About from "./pages/About";
import Projects from "./pages/Projects";
import Leaderboard from "./pages/Leaderboard";
import Certificates from "./pages/Certificates";
import Roadmap from "./pages/Roadmap";
import Contact from "./pages/Contact";
import Academics from "./pages/Academics";
import Profile from "./pages/Profile";
import ProposeProject from "./pages/ProposeProject";
import MyProposals from "./pages/MyProposals";
import ReviewProposals from "./pages/ReviewProposals";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          
          {/* Protected Routes */}
          <Route path="/projects" element={<ProtectedRoute><Projects /></ProtectedRoute>} />
          <Route path="/leaderboard" element={<ProtectedRoute><Leaderboard /></ProtectedRoute>} />
          <Route path="/certificates" element={<ProtectedRoute><Certificates /></ProtectedRoute>} />
          <Route path="/roadmap" element={<ProtectedRoute><Roadmap /></ProtectedRoute>} />
          <Route path="/academics" element={<ProtectedRoute><Academics /></ProtectedRoute>} />
          <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
          <Route path="/propose-project" element={<ProtectedRoute><ProposeProject /></ProtectedRoute>} />
          <Route path="/my-proposals" element={<ProtectedRoute><MyProposals /></ProtectedRoute>} />
          <Route path="/review-proposals" element={<ProtectedRoute><ReviewProposals /></ProtectedRoute>} />
          
          {/* Catch-all */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;