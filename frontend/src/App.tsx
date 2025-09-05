// Import necessary components and libraries.
import { Toaster } from "@/components/ui/toaster"; // Component for displaying toasts.
import { Toaster as Sonner } from "@/components/ui/sonner"; // Another toast component.
import { TooltipProvider } from "@/components/ui/tooltip"; // Provider for tooltips.
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"; // For managing server state.
import { BrowserRouter, Routes, Route } from "react-router-dom"; // For routing.
import Index from "./pages/Index"; // Index page component.
import NotFound from "./pages/NotFound"; // Not Found page component.
import Auth from "./pages/Auth"; // Authentication page component.
import DocumentUpload from "./pages/DocumentUpload"; // Document upload page component.
import Header from "./components/Header"; // Header component.

// Create a new QueryClient instance.
const queryClient = new QueryClient();

// Main App component.
const App = () => (
  // QueryClientProvider provides the client to all child components.
  <QueryClientProvider client={queryClient}>
    {/* TooltipProvider enables tooltips within the application. */}
    <TooltipProvider>
      {/* Toaster components for displaying notifications. */}
      <Toaster />
      <Sonner />
      {/* BrowserRouter handles the routing. */}
      <BrowserRouter>
        {/* Header component is displayed on all pages. */}
        <Header />
        {/* Routes define the different pages of the application. */}
        <Routes>
          {/* Route for the home page. */}
          <Route path="/" element={<Index />} />
          {/* Route for the authentication page. */}
          <Route path="/auth" element={<Auth />} />
          {/* Route for the document upload page. */}
          <Route path="/upload" element={<DocumentUpload />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          {/* Catch-all route for any other paths, leading to a 404 page. */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

// Export the App component.
export default App;
