import { Button } from "@/components/ui/button"
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { Bell, Search, SquarePlus, UserRoundPen } from "lucide-react"
import Image from "next/image"
import Logo from "../../imges/ekdant-logo.png"

function HeaderSection() {

  return(
    <>
      <div className="flex justify-between bg-rose-400 h-[60px] z-0 items-center fixed left-0 right-0 top-0">
        <div>
          <Image src={Logo} alt="Logo" className="ml-7" width={200} height={150} />
        </div>
        <div className="flex justify-end items-center">
          <Button variant="ghost"> <SquarePlus /></Button>
          <Button variant="ghost"> <Search /></Button>
          <Button variant="ghost"> <Bell /></Button>
          <Button variant="ghost" className="rounded-full p-3"> <UserRoundPen /></Button>
        </div>
      </div>
    </>
  )
}

export default HeaderSection