import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import { ArrowUpDown } from "lucide-react";

const columns = [
  {
    accessorKey: "fName",
    header: ({column}) => 
    <Button 
    variant="ghost" 
    onClick={() => column.toggleSorting(column.getSorted) === "asc"}>
      First Name
      <ArrowUpDown className="ml-2 h-4 w-4" />
    </Button>,
  }, {
    accessorKey: "email",
    header:  ({column}) => 
      <Button 
      variant="ghost" 
      onClick={() => column.toggleSorting(column.getSorted) === "asc"}>
        Email
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>,
  }, {
    accessorKey: "contact",
    header:  ({column}) => 
      <Button 
      variant="ghost" 
      onClick={() => column.toggleSorting(column.getSorted) === "asc"}>
        Contact
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>,
  }, {
    accessorKey: "address",
    header:  ({column}) => 
      <Button 
      variant="ghost" 
      onClick={() => column.toggleSorting(column.getSorted) === "asc"}>
        Address
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>,
  }, {
    accessorKey: "serviceType",
    header:  ({column}) => 
      <Button 
      variant="ghost" 
      onClick={() => column.toggleSorting(column.getSorted) === "asc"}>
        Service Type
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>,
  }, {
    accessorKey: "preferredDate",
    header:  ({column}) => 
      <Button 
      variant="ghost" 
      onClick={() => column.toggleSorting(column.getSorted) === "asc"}>
        Preferred Date
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>,
  },  {
    accessorKey: "allotted",
    header:  ({column}) => 
      <Button 
      variant="ghost" 
      onClick={() => column.toggleSorting(column.getSorted) === "asc"}>
        Allotted to
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>,
  },  {
    accessorKey: "remarks",
    header:  ({column}) => 
      <Button 
      variant="ghost" 
      onClick={() => column.toggleSorting(column.getSorted) === "asc"}>
        Remarks
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>,
  }, 
];

const data = [{}]

function Table() {

  return(
    <>
      <DataTable columns={columns} data={data} />
    </>
  )
}

export default Table