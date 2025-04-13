import { useEffect } from "react";
import { useLocation } from "wouter";
import { useAuth } from "@/hooks/use-auth";
import AuthForms from "@/components/auth/auth-forms";
import ThemeToggle from "@/components/ui/theme-toggle";

export default function AuthPage() {
  const { user, isLoading } = useAuth();
  const [location, setLocation] = useLocation();

  // Redirect to dashboard if already logged in
  useEffect(() => {
    if (user && !isLoading) {
      setLocation("/dashboard");
    }
  }, [user, isLoading, setLocation]);

  if (isLoading) {
    return (
      <div className="min-h-screen w-full flex items-center justify-center bg-background">
        <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      {/* Theme Toggle */}
      <div className="absolute top-4 right-4 z-10">
        <ThemeToggle />
      </div>

      {/* Header */}
      <header className="pt-6 pb-0 px-4 md:px-6 flex justify-center">
        <div className="flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10"></circle>
            <path d="M8 14s1.5 2 4 2 4-2 4-2"></path>
            <line x1="9" y1="9" x2="9.01" y2="9"></line>
            <line x1="15" y1="9" x2="15.01" y2="9"></line>
          </svg>
          <h1 className="ml-2 text-2xl font-bold">Finance <span className="text-primary">Advisor</span></h1>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex flex-grow">
        {/* Image Section (Hidden on Mobile) */}
        <div className="hidden lg:block lg:w-1/2 bg-gradient-to-br from-card via-background to-background relative overflow-hidden">
          <div className="absolute inset-0 bg-black bg-opacity-30 z-10"></div>
          
          {/* Financial Dashboard Image */}
          <img 
            src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80" 
            alt="Finance dashboard" 
            className="absolute inset-0 w-full h-full object-cover object-center"
          />
          
          {/* Overlay content */}
          <div className="absolute inset-0 flex flex-col justify-center items-center z-20 p-12 animate-fade-in">
            <h2 className="text-4xl font-bold text-white mb-6 text-center">AI-Powered Financial Management</h2>
            <p className="text-lg text-white/80 max-w-md text-center mb-8">
              Make informed investment decisions with real-time data and personalized AI guidance
            </p>
            <div className="flex flex-wrap justify-center gap-6 mb-12">
              <div className="bg-black/30 backdrop-blur-lg p-4 rounded-lg border border-white/10 w-48">
                <div className="flex items-center mb-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect>
                    <line x1="8" y1="21" x2="16" y2="21"></line>
                    <line x1="12" y1="17" x2="12" y2="21"></line>
                  </svg>
                  <h3 className="ml-2 text-white font-medium">Portfolio Tracking</h3>
                </div>
                <p className="text-white/70 text-sm">Real-time monitoring of your investments</p>
              </div>
              <div className="bg-black/30 backdrop-blur-lg p-4 rounded-lg border border-white/10 w-48">
                <div className="flex items-center mb-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-secondary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline>
                  </svg>
                  <h3 className="ml-2 text-white font-medium">Market Analysis</h3>
                </div>
                <p className="text-white/70 text-sm">In-depth stock and market research</p>
              </div>
              <div className="bg-black/30 backdrop-blur-lg p-4 rounded-lg border border-white/10 w-48">
                <div className="flex items-center mb-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-accent" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
                    <polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline>
                    <line x1="12" y1="22.08" x2="12" y2="12"></line>
                  </svg>
                  <h3 className="ml-2 text-white font-medium">AI Advisor</h3>
                </div>
                <p className="text-white/70 text-sm">Personalized financial guidance</p>
              </div>
              <div className="bg-black/30 backdrop-blur-lg p-4 rounded-lg border border-white/10 w-48">
                <div className="flex items-center mb-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-warning" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10"></circle>
                    <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"></polygon>
                  </svg>
                  <h3 className="ml-2 text-white font-medium">Goal Planning</h3>
                </div>
                <p className="text-white/70 text-sm">Define and track financial objectives</p>
              </div>
            </div>
          </div>
        </div>

        {/* Auth Forms Section */}
        <AuthForms />
      </main>

      {/* Footer */}
      <footer className="py-6 px-6 text-center text-sm text-muted-foreground">
        <div className="max-w-7xl mx-auto">
          <p>&copy; {new Date().getFullYear()} Finance Advisor. All rights reserved.</p>
          <div className="flex justify-center space-x-4 mt-2">
            <a href="#" className="hover:text-primary transition-colors">Terms</a>
            <a href="#" className="hover:text-primary transition-colors">Privacy</a>
            <a href="#" className="hover:text-primary transition-colors">Cookies</a>
            <a href="#" className="hover:text-primary transition-colors">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
