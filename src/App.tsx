import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Layout } from "@/components/Layout/Layout";
import { queryClient } from "@/state/queryClient";

// Import Views
import { Dashboard } from "@/views/Dashboard";
import { Customers } from "@/views/Customers";
import { Orders } from "@/views/Orders";
import { Settings } from "@/views/Settings";
import NotFound from "./pages/NotFound";

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/customers" element={<Customers />} />
            <Route path="/items" element={<div className="p-6"><h1 className="text-2xl font-bold">Items & Stock</h1><p className="text-muted-foreground">Coming soon...</p></div>} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/deliveries" element={<div className="p-6"><h1 className="text-2xl font-bold">Deliveries</h1><p className="text-muted-foreground">Coming soon...</p></div>} />
            <Route path="/invoices" element={<div className="p-6"><h1 className="text-2xl font-bold">Invoices</h1><p className="text-muted-foreground">Coming soon...</p></div>} />
            <Route path="/payments" element={<div className="p-6"><h1 className="text-2xl font-bold">Payments</h1><p className="text-muted-foreground">Coming soon...</p></div>} />
            <Route path="/reports" element={<div className="p-6"><h1 className="text-2xl font-bold">Reports</h1><p className="text-muted-foreground">Coming soon...</p></div>} />
            <Route path="/settings" element={<Settings />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
