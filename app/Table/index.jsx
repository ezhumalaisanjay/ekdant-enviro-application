import { Button } from "@/components/ui/button";
import { DataTable } from "@/app/Table/data-table";
import { ArrowUpDown, Copy, Download, File, FileText, Pencil, Sheet, Trash2, X } from "lucide-react";
import { MoreHorizontal } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import MappedServiceRequestForm from "../Form/mappedServiceRequest";
import { Drawer, DrawerClose, DrawerContent, DrawerDescription, DrawerHeader, DrawerTitle, DrawerTrigger } from "@/components/ui/drawer";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";





function Table() {
  
  const [datas, setDatas] = useState([
  {
    srn: "W001-01",
    fullName: "Yokesh B",
    address: "XYZ Street",
    serviceType: "Water: General Parameters",
    date: "21-01-2025",
    allottedTo: "Elumalai",
    drawnBy: "EES",
    email: "yokesh@sixtyonesteps.com",
    preferredDate: "23-01-2025",
    contact: "7990097262",
    parameters: "Appearance"
  }, {
    srn: "W001-02",
    fullName: "Ezhumalai",
    address: "ZYX Street",
    serviceType: "Sand Analysis",
    date: "22-01-2025",
    allottedTo: "Elumalai",
    drawnBy: "EES",
    email: "ezhumalai@sixtyonesteps.com",
    preferredDate: "25-01-2025",
    contact: "9087654322",
    parameters: "PH value"
  }, {
    srn: "W001-03",
    fullName: "Kishore",
    address: "ABC Street",
    serviceType: "Dust Analysis",
    date: "20-01-2025",
    allottedTo: "Manimaran",
    drawnBy: "EES",
    email: "kishore@sixtyonesteps.com",
    preferredDate: "28-01-2025",
    contact: "6098765432",
    parameters: "chemical"
  }, {
    srn: "W001-01",
    fullName: "Yokesh B",
    address: "XYZ Street",
    serviceType: "Water Analysis",
    date: "21-01-2025",
    allottedTo: "Elumalai",
    drawnBy: "EES",
    email: "yokesh@sixtyonesteps.com",
    preferredDate: "23-01-2025",
    contact: "7990097262",
    parameters: "odour"
  }, {
    srn: "W001-02",
    fullName: "Ezhumalai",
    address: "ZYX Street",
    serviceType: "Sand Analysis",
    date: "22-01-2025",
    allottedTo: "Elumalai",
    drawnBy: "EES",
    email: "ezhumalai@sixtyonesteps.com",
    preferredDate: "25-01-2025",
    contact: "9087654322",
    parameters: "PH value"
  }, {
    srn: "W001-03",
    fullName: "Kishore",
    address: "ABC Street",
    serviceType: "Dust Analysis",
    date: "20-01-2025",
    allottedTo: "Manimaran",
    drawnBy: "EES",
    email: "kishore@sixtyonesteps.com",
    preferredDate: "28-01-2025",
    contact: "6098765432",
    parameters: "chemical"
  }, {
    srn: "W001-01",
    fullName: "Yokesh B",
    address: "XYZ Street",
    serviceType: "Water Analysis",
    date: "21-01-2025",
    allottedTo: "Elumalai",
    drawnBy: "EES",
    email: "yokesh@sixtyonesteps.com",
    preferredDate: "23-01-2025",
    contact: "7990097262",
    parameters: "odour"
  }, {
    srn: "W001-02",
    fullName: "Ezhumalai",
    address: "ZYX Street",
    serviceType: "Sand Analysis",
    date: "22-01-2025",
    allottedTo: "Elumalai",
    drawnBy: "EES",
    email: "ezhumalai@sixtyonesteps.com",
    preferredDate: "25-01-2025",
    contact: "9087654322",
    parameters: "PH value"
  }, {
    srn: "W001-03",
    fullName: "Kishore",
    address: "ABC Street",
    serviceType: "Dust Analysis",
    date: "20-01-2025",
    allottedTo: "Manimaran",
    drawnBy: "EES",
    email: "kishore@sixtyonesteps.com",
    preferredDate: "28-01-2025",
    contact: "6098765432",
    parameters: "chemical"
  }, 
])
  const { toast } = useToast()

  const columns = [
  {
    accessorKey: "srn",
    header: "Sample Reference Number",
  }, {
    accessorKey: "fullName",
    header: ({column}) => 
    <Button 
    variant="ghost" 
    className="p-0 m-0"
    onClick={() => column.toggleSorting(column.getSorted) === "asc"}>
      Customer Name
      <ArrowUpDown className="ml-2 h-4 w-4" />
    </Button>,
  }, {
    accessorKey: "address",
    header:  "Customer Address",
  }, {
    accessorKey: "serviceType",
    header:  ({column}) => 
      <Button 
      className="p-0 m-0"
      variant="ghost" 
      onClick={() => column.toggleSorting(column.getSorted) === "asc"}>
        Service Type
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>,
  }, {
    accessorKey: "date",
    header:  ({column}) => 
      <Button 
      className="p-0 m-0"
      variant="ghost" 
      onClick={() => column.toggleSorting(column.getSorted) === "date"}>
        Date
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>,
  },  {
    accessorKey: "allottedTo",
    header:  ({column}) => 
      <Button 
      className="p-0 m-0"
      variant="ghost" 
      onClick={() => column.toggleSorting(column.getSorted) === "asc"}>
        Allotted To
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>,
  }, {
    accessorKey: "drawnBy",
    header: "Drawn By"
  }, {
    accessorKey: "email",
    header: "Email"
  }, {
    accessorKey: "preferredDate",
    header: "Preferred Date"
  },  {
    accessorKey: "contact",
    header: "Contact No."
  },  {
    accessorKey: "parameters",
    header: "Parameters"
  }, {
    id: "modify",
    cell: ({ row }) => {
      const rowData = row.original
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Modifications</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(rowData.srn)}
              className="hover:cursor-pointer"
            >
              <Copy /> Copy
            </DropdownMenuItem>
            <div className="ml-2">
              <Drawer>
                <DrawerTrigger>
                  <div className="flex gap-2">
                    <Pencil className="size-4"/> <div className="text-sm"> Edit</div>
                  </div>
                </DrawerTrigger>
                <DrawerContent>
                <DrawerHeader className="flex justify-between">
                  <div>
                    <DrawerTitle>Service Request Form</DrawerTitle>
                    <DrawerDescription className="">
                      Make changes here.
                    </DrawerDescription>
                  </div>
                  <DrawerClose><Button variant={"outline"}><X /></Button></DrawerClose>
                </DrawerHeader>
                  <MappedServiceRequestForm rowData={rowData}/>
                </DrawerContent>
              </Drawer>
            </div>
            <div>
              <AlertDialog>
                <AlertDialogTrigger>
                  <div className="flex gap-2 ml-2"><Trash2 className="size-4"/><div className="text-sm"> Delete</div></div>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle> Are you absolutely sure? </AlertDialogTitle>
                    <AlertDialogDescription>
                      This action cannot br undone. This will permanently delete your data from the servers.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction 
                    onClick={() => {
                    const newArray = datas.filter((data) => data.srn !== rowData.srn)
                    console.log("This is new Array", newArray)
                    setDatas(newArray);
                    toast({
                    title: "Data",
                    description: "Data has been deleted Successfully"
                    })
                    }}
                      >Delete</AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  }, {
    id: "export",
    cell: () => {
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <Download className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Download</DropdownMenuLabel>
            <DropdownMenuItem>
              <FileText /> PDF
            </DropdownMenuItem>
            <DropdownMenuItem><Sheet /> Excel</DropdownMenuItem>
            <DropdownMenuItem><File /> CSV</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
];

  return(
    <>
      <DataTable columns={columns} data={datas} />
    </>
  )
}

export default Table