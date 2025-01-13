import { Button } from "@/components/ui/button"
import { Bell, Search, SquarePlus, UserRoundPen } from "lucide-react"

function HeaderSection() {

  return(
    <>
      <div className="flex justify-end">
        <Button variant="ghost"> <SquarePlus /></Button>
        <Button variant="ghost"> <Search /></Button>
        <Button variant="ghost"> <Bell /></Button>
        <Button variant="ghost" className="rounded-full p-3"> <UserRoundPen /></Button>
      </div>
    </>
  )
}

export default HeaderSection