import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import { ArrowUpDown, Copy, Download, File, FileText, Pencil, Sheet, Trash2 } from "lucide-react";
import { MoreHorizontal } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import MappedServiceRequestForm from "../Form/mappedServiceRequest";
import { Drawer, DrawerContent, DrawerDescription, DrawerHeader, DrawerTrigger } from "@/components/ui/drawer";

const datas = [
  {
    srn: "W001-01",
    fullName: "Yokesh B",
    address: "XYZ Street",
    serviceType: "Water Analysis",
    date: "21-01-2025",
    allottedTo: "Elumalai",
    drawnBy: "EES"
  }, {
    srn: "W001-02",
    fullName: "Ezhumalai",
    address: "ZYX Street",
    serviceType: "Sand Analysis",
    date: "22-01-2025",
    allottedTo: "Elumalai",
    drawnBy: "EES"
  }, {
    srn: "W001-03",
    fullName: "Kishore",
    address: "ABC Street",
    serviceType: "Dust Analysis",
    date: "20-01-2025",
    allottedTo: "Manimaran",
    drawnBy: "EES"
  }, {
    srn: "W001-04",
    fullName: "Yokesh B",
    address: "XYZ Street",
    serviceType: "Water Analysis",
    date: "21-01-2025",
    allottedTo: "Elumalai",
    drawnBy: "EES"
  }, {
    srn: "W001-05",
    fullName: "Ezhumalai",
    address: "ZYX Street",
    serviceType: "Sand Analysis",
    date: "22-01-2025",
    allottedTo: "Elumalai",
    drawnBy: "EES"
  }, {
    srn: "W001-06",
    fullName: "Kishore",
    address: "ABC Street",
    serviceType: "Dust Analysis",
    date: "20-01-2025",
    allottedTo: "Manimaran",
    drawnBy: "EES"
  }, {
    srn: "W001-07",
    fullName: "Yokesh B",
    address: "XYZ Street",
    serviceType: "Water Analysis",
    date: "21-01-2025",
    allottedTo: "Elumalai",
    drawnBy: "EES"
  }, {
    srn: "W001-08",
    fullName: "Ezhumalai",
    address: "ZYX Street",
    serviceType: "Sand Analysis",
    date: "22-01-2025",
    allottedTo: "Elumalai",
    drawnBy: "EES"
  }, {
    srn: "W001-09",
    fullName: "Kishore",
    address: "ABC Street",
    serviceType: "Dust Analysis",
    date: "20-01-2025",
    allottedTo: "Manimaran",
    drawnBy: "EES"
  }, {
    srn: "W001-10",
    fullName: "Yokesh B",
    address: "XYZ Street",
    serviceType: "Water Analysis",
    date: "21-01-2025",
    allottedTo: "Elumalai",
    drawnBy: "EES"
  }, {
    srn: "W001-11",
    fullName: "Ezhumalai",
    address: "ZYX Street",
    serviceType: "Sand Analysis",
    date: "22-01-2025",
    allottedTo: "Elumalai",
    drawnBy: "EES"
  }, {
    srn: "W001-12",
    fullName: "Kishore",
    address: "ABC Street",
    serviceType: "Dust Analysis",
    date: "20-01-2025",
    allottedTo: "Manimaran",
    drawnBy: "EES"
  }, 
]

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
  },  {
    accessorKey: "drawnBy",
    header: "Drawn By"
  }, {
    id: "modify",
    cell: ({ row }) => {
      const payment = row.original
      console.log(row);
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
              onClick={() => navigator.clipboard.writeText(payment.srn)}
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
                <DrawerHeader className="font-semibold">Service Request Form</DrawerHeader>
                  <DrawerDescription className="ml-4">
                    Make changes here.
                  </DrawerDescription>
                  <MappedServiceRequestForm />
                </DrawerContent>
              </Drawer>
            </div>
            <DropdownMenuItem
            onClick={() => datas.filter((data) => {
              if(data.srn !== payment.srn) {
                console.log(datas);
              }})}
            ><Trash2 /> Delete</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  }, {
    id: "actions",
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


function Table() {

  return(
    <>
      <DataTable columns={columns} data={datas} />
    </>
  )
}

export default Table