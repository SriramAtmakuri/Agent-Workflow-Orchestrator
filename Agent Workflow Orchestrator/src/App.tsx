import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { WorkflowProvider } from "@/contexts/WorkflowContext";
import { Layout } from "@/components/Layout";
import { Dashboard } from "@/pages/Dashboard";
import { WorkflowEditor } from "@/pages/WorkflowEditor";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <WorkflowProvider>
          <Layout>
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/workflows/:id" element={<WorkflowEditor />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Layout>
        </WorkflowProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
