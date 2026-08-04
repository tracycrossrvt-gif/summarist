import Sidebar from "./Sidebar";
import Topbar from "./Topbar";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export default function DashboardLayout({
  children,
}: DashboardLayoutProps) {
  return (
    <div className="dashboard">
      <Sidebar />

      <div className="dashboard__main">
        <Topbar />

        <main className="dashboard__content">
          {children}
        </main>
      </div>
    </div>
  );
}