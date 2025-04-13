import { useAuth } from "@/hooks/use-auth";
import SidebarNavigation from "@/components/dashboard/sidebar-navigation";
import { DashboardContent } from "@/components/dashboard/dashboard-content";

export default function DashboardPage() {
  const { user } = useAuth();

  return (
    <div className="min-h-screen flex bg-background text-foreground">
      <SidebarNavigation />

      <div className="flex-1 p-6 lg:p-8 overflow-auto">
        <div className="max-w-7xl mx-auto">
          <DashboardContent />
        </div>
      </div>
    </div>
  );
}
