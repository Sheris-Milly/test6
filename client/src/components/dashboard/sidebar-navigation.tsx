import { useState } from "react";
import { useLocation, Link } from "wouter";
import { useAuth } from "@/hooks/use-auth";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  LayoutDashboard,
  PieChart,
  BarChart3,
  CalendarClock,
  LineChart,
  Bot,
  HelpCircle,
  Menu,
  X,
  LogOut,
  User,
  Home,
  Moon,
  Sun
} from "lucide-react";

const navigationItems = [
  {
    icon: Home,
    label: "Home",
    href: "/",
  },
  {
    icon: LayoutDashboard,
    label: "Dashboard",
    href: "/dashboard",
  },
  {
    icon: PieChart,
    label: "Portfolio",
    href: "/portfolio",
  },
  {
    icon: BarChart3,
    label: "Market",
    href: "/market",
  },
  {
    icon: CalendarClock,
    label: "Planning",
    href: "/planning",
  },
  {
    icon: LineChart,
    label: "Analysis",
    href: "/analysis",
  },
  {
    icon: Bot,
    label: "AI Advisor",
    href: "/advisor",
  },
  {
    icon: HelpCircle,
    label: "About",
    href: "/about",
  },
];

export default function SidebarNavigation() {
  const [location] = useLocation();
  const { user, logoutMutation } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [theme, setTheme] = useState<"light" | "dark">("light");

  const handleLogout = () => {
    logoutMutation.mutate();
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <>
      {/* Mobile Menu Toggle */}
      <div className="fixed top-4 left-4 z-50 block lg:hidden">
        <Button
          variant="outline"
          size="icon"
          onClick={toggleMobileMenu}
          aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
        >
          {isMobileMenuOpen ? (
            <X className="h-5 w-5" />
          ) : (
            <Menu className="h-5 w-5" />
          )}
        </Button>
      </div>

      {/* Overlay for mobile */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-background/80 backdrop-blur-sm z-40 lg:hidden"
          onClick={toggleMobileMenu}
        ></div>
      )}

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-[260px] flex-col bg-card border-r shadow-sm transition-transform lg:translate-x-0 lg:static lg:z-0 ${
          isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex h-16 items-center gap-2 px-4 border-b">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary">
            <PieChart className="h-4 w-4 text-primary-foreground" />
          </div>
          <span className="text-lg font-semibold">Finance Advisor</span>
        </div>

        <div className="flex-1 overflow-auto py-4">
          <nav className="grid gap-1 px-2">
            {navigationItems.map((item) => {
              const isActive = location === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <Button
                    variant={isActive ? "secondary" : "ghost"}
                    className="w-full justify-start"
                  >
                    <item.icon className="mr-2 h-5 w-5" />
                    {item.label}
                  </Button>
                </Link>
              );
            })}
          </nav>
        </div>

        <div className="p-4 border-t">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Avatar>
                <AvatarImage src="" />
                <AvatarFallback className="bg-primary text-primary-foreground">
                  {user?.firstName?.[0] || user?.username?.[0] || "U"}
                </AvatarFallback>
              </Avatar>
              <div>
                <div className="font-medium truncate max-w-[120px]">
                  {user?.firstName || user?.username || "User"}
                </div>
                <div className="text-xs text-muted-foreground truncate max-w-[120px]">
                  {user?.email || ""}
                </div>
              </div>
            </div>
            <Button
              variant="outline"
              size="icon"
              onClick={toggleTheme}
              aria-label={`Switch to ${theme === "light" ? "dark" : "light"} theme`}
            >
              {theme === "light" ? (
                <Moon className="h-4 w-4" />
              ) : (
                <Sun className="h-4 w-4" />
              )}
            </Button>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <Button variant="outline" size="sm" className="w-full">
              <User className="h-4 w-4 mr-2" />
              Profile
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="w-full"
              onClick={handleLogout}
              disabled={logoutMutation.isPending}
            >
              {logoutMutation.isPending ? (
                <span className="animate-spin mr-2">⟳</span>
              ) : (
                <LogOut className="h-4 w-4 mr-2" />
              )}
              Logout
            </Button>
          </div>
        </div>
      </aside>
    </>
  );
}