import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "./app-sidebar/AppSidebar"
import  ServiceRequest from "./Form/ServiceRequest"

export default function Layout() {
  return (
    <div className="flex">
      <SidebarProvider> 
        <AppSidebar /> 
        <main className="w-full"> 
          <SidebarTrigger />
          <div>
            <ServiceRequest />
          </div>  
        </main> 
        </SidebarProvider>
    </div>
  );
}

