import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import NotFound from "@/pages/not-found";
import AuthPage from "@/pages/auth-page";
import HomePage from "@/pages/home-page";
import DashboardPage from "@/pages/dashboard-page";
import PortfolioPage from "@/pages/portfolio-page";
import MarketPage from "@/pages/market-page";
import PlanningPage from "@/pages/planning-page";
import AnalysisPage from "@/pages/analysis-page";
import AIAdvisorPage from "@/pages/ai-advisor-page";
import AboutPage from "@/pages/about-page";
import { ProtectedRoute } from "./lib/protected-route";
import { AuthProvider } from "./hooks/use-auth";

function Router() {
  return (
    <Switch>
      <Route path="/auth" component={AuthPage} />
      <ProtectedRoute path="/" component={HomePage} />
      <ProtectedRoute path="/dashboard" component={DashboardPage} />
      <ProtectedRoute path="/portfolio" component={PortfolioPage} />
      <ProtectedRoute path="/market" component={MarketPage} />
      <ProtectedRoute path="/planning" component={PlanningPage} />
      <ProtectedRoute path="/analysis" component={AnalysisPage} />
      <ProtectedRoute path="/advisor" component={AIAdvisorPage} />
      <ProtectedRoute path="/about" component={AboutPage} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <Router />
        <Toaster />
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
