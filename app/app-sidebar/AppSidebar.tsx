import { Calendar, Home, Inbox, Menu, Search, Settings } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import Image from "next/image";
import logo from '@/imges/ekdant-logo.png';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { DialogTitle } from "@radix-ui/react-dialog";

// Menu items.
const items = [
  {
    title: "Home",
    url: "#",
    icon: Home,
  },
  {
    title: "Inbox",
    url: "#",
    icon: Inbox,
  },
  {
    title: "Calendar",
    url: "#",
    icon: Calendar,
  },
  {
    title: "Search",
    url: "#",
    icon: Search,
  },
  {
    title: "Settings",
    url: "#",
    icon: Settings,
  },
];

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarContent className="bg-blue-400">
        {/* Logo Section */}
        <div className="flex items-center justify-center p-4">
          <Image src={logo} alt="Logo" width={200} height={150} />
        </div>

        <SidebarGroup>
          <SidebarGroupLabel>Application</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url} className="flex items-center font-semibold space-x-2">
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}

export function MobileSidebar() {

  return(
    <>
      <Sheet >
        <SheetTrigger asChild>
          <Button variant="ghost"> <Menu /> </Button>
        </SheetTrigger>
        <SheetContent side="left" className="bg-blue-400 w-52 p-0">
          <DialogTitle className="p-3 m-3">
            <Image src={logo} alt="Logo" width={200} height={150} />
          </DialogTitle>
          <SheetDescription className="ml-4">
            Applications
          </SheetDescription>
          <div>
            <ul className="m-2">
              {items.map((item) => (
                <li key={item.title}>
                  <Button variant="ghost" asChild  className="flex w-full justify-start">
                    <a href={item.url} className="flex items-center font-semibold space-x-2">
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </Button>
                </li>
                ))}
            </ul>
          </div>
        </SheetContent>
      </Sheet>
    </>
  )
}