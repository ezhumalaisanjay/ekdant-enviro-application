import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "./app-sidebar/AppSidebar"

export default function Layout() {
  return (
    <div className="flex min-h-screen">
      <SidebarProvider>
 
        <AppSidebar />
        <SidebarTrigger/>
      
     </SidebarProvider>
  
      <div className="flex-1 p-8"> {/* Main content area */}
        {/* Add your main content here */}
      </div>
    </div>
  );
}
