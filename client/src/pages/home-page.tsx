import { useEffect } from "react";
import { useLocation } from "wouter";

export default function HomePage() {
  const [location, setLocation] = useLocation();

  // Redirect to dashboard page
  useEffect(() => {
    setLocation("/dashboard");
  }, [setLocation]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full"></div>
    </div>
  );
}
