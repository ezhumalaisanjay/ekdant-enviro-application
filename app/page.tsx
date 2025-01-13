import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "./app-sidebar/AppSidebar";


export default function Layout() {
  return (
    <div className="flex min-h-screen flex-col">
      {/* Top Header */}
      <header className="flex items-center justify-between bg-gray-800 text-white p-4 shadow-md">
        <h1 className="text-xl font-bold">Dashboard</h1>
        <div className="flex items-center space-x-4">
          {/* Profile Section */}
          <div className="flex items-center">
           
            <span className="ml-2 text-sm">John Doe</span>
          </div>
          <button className="bg-blue-600 hover:bg-blue-700 text-white py-1 px-3 rounded">
            Logout
          </button>
        </div>
      </header>

      {/* Main Content Area */}
      <div className="flex flex-1">
        <SidebarProvider>
          <AppSidebar />
          <SidebarTrigger />
        </SidebarProvider>

        <main className="flex-1 p-8">
          {/* Main content goes here */}
        </main>
      </div>
    </div>
  );
}
