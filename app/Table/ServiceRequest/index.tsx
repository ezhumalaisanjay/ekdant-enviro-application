import { Button } from "@/components/ui/button";
import { DataTable } from "./data-table"
import { ArrowUpDown, Copy, Pencil, Trash2, X } from "lucide-react";
import { MoreHorizontal } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import MappedServiceRequestForm from "../../Form/ServiceRequest/mappedServiceRequest";
import { Drawer, DrawerClose, DrawerContent, DrawerDescription, DrawerHeader, DrawerTitle, DrawerTrigger } from "@/components/ui/drawer";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import React, { useEffect, useState } from "react";
import { useToast } from "@/hooks/use-toast";
import * as XLSX from "xlsx";
import jsPDF from "jspdf";
import "jspdf-autotable";
import Papa from "papaparse";
import { ColumnDef } from '@tanstack/react-table';
import { autoTable } from "jspdf-autotable";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";

declare module "jspdf" {
  interface jsPDF {
    autoTable: autoTable; 
  }
}

interface ServiceRequestTableProps {
  onTrigger: () => void; // Function signature for the delete function
}

interface Data {
  Sample_Reference: string;
  visit_type: string;
  companyName: string;
  contactNumber: string;
  email: string;
  address: string;
  serviceType: string;
  parameters: string;
  preferredDate: string;
  allottedTo: string;
  date: string;
  remarks: string;
  drawnBy: string;
  pickUp: string;
  priority: string;
  pickupDate: string;
  Price: string;
  GST : string;
  Amount: string;
  contactName: string;
  ticket_status: string;
  category: string;
}

const ServiceRequestTable: React.FC<ServiceRequestTableProps> = ({onTrigger}) => {
  const [datas, setDatas] = useState<Data[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const getRecords = async (category: string) => {
      try {
        const response = await fetch("https://0znzn1z8z4.execute-api.ap-south-1.amazonaws.com/Dev/EES_Get_all_record", {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ category }),
        });
    
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
    
        const result = await response.json();
        console.log(JSON.parse(result.body)); // Return response directly

        const responseData = JSON.parse(result.body);
        setDatas(responseData);
        console.log(responseData);

      } catch (error: unknown) {
        if (error instanceof Error) {
          console.error("Error fetching records:", error.message);
          return { error: error.message };
        } else {
          console.error("Unknown error:", error);
          return { error: "An unknown error occurred" };
        }
      } finally {
        setIsLoading(false);
      }
    } 
    getRecords("Ticket") 
  }, [onTrigger])

  const { toast } = useToast();

  const exportToPDF = () => {
    const doc = new jsPDF();
    const tableData = datas.map((data) => [
      data.Sample_Reference,
      data.ticket_status,
      data.companyName,
      data.serviceType,
      data.date,
      data.allottedTo,
      data.drawnBy,
      data.Price,
      data.Amount,
      data.visit_type,
      data.contactNumber,
      data.email,
      data.address,
      data.parameters,
      data.preferredDate,
      data.remarks,
      data.pickUp,
      data.priority,
      data.pickupDate,
      data.GST,
      data.contactName,
      data.category,
    ]);

    doc.autoTable({
      head: [
        [
          "SRN",
          "Ticket Status",
          "Customer Name",
          "Service Type",
          "Date",
          "Allotted To",
          "Drawn By",
          "Price",
          "Total Amount By GSD%"
        ],
      ],
      body: tableData,
    });
    doc.save("data.pdf");
  };

  const exportToExcel = () => {
    const ws = XLSX.utils.json_to_sheet(datas);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Data");
    XLSX.writeFile(wb, "data.xlsx");
  };

  const exportToCSV = () => {
    const csvData = datas.map((row) => ({
      Sample_Reference : row.Sample_Reference,
      ticket_status :row.ticket_status,
      companyName : row.companyName,
      serviceType : row.serviceType,
      date : row.date,
      allottedTo : row.allottedTo,
      drawnBy : row.drawnBy,
      Price : row.Price,
      Amount : row.Amount,
      visit_type : row.visit_type,
      contactNumber : row.contactNumber,
      email : row.email,
      address : row.address,
      parameters : row.parameters,
      preferredDate : row.preferredDate,
      remarks : row.remarks,
      pickUp : row.pickUp,
      priority : row.priority,
      pickupDate : row.pickupDate,
      GST : row.GST,
      contactName : row.contactName,
      category : row.category,
    }));

    const csv = Papa.unparse(csvData);
    const blob = new Blob([csv], { type: "text/csv" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "data.csv";
    link.click();
  };

  const columns: ColumnDef<Data>[] = [
    {
      id: "select",
      header: ({ table }) => (
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() || 
            (table.getIsSomePageRowsSelected() && "indeterminate")
          }
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
        />
      ),
      cell: ({row}) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
          />
      ),
      enableSorting: false,
      enableHiding: false,
    }, {
      accessorKey: "Sample_Reference",
      header: "SRN",
    },
    {
      accessorKey: "companyName",
      header: ({column}) => (
        <Button
          variant="ghost"
          className="p-0 m-0"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Customer Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
    },
    {
      accessorKey: "address",
      header: "Customer Address",
    },
    {
      accessorKey: "serviceType",
      header: ({ column }) => (
        <Button
          className="p-0 m-0"
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Service Type
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
    },
    {
      accessorKey: "date",
      header: ({ column }) => (
        <Button
          className="p-0 m-0"
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Date
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
      cell: ({ row }) => {
        const selectedDate = row.getValue("date");
        if (typeof selectedDate === "string") {
          return <div className="text-nowrap">{selectedDate}</div>;
        }
        return <div className="text-nowrap">Invalid date</div>; 
      }
    },
    {
      accessorKey: "allottedTo",
      header: ({ column }) => (
        <Button
          className="p-0 m-0"
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Allotted To
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
    },
    {
      accessorKey: "drawnBy",
      header: "Drawn By",
    },
    {
      accessorKey: "email",
      header: "Email",
    },
    {
      accessorKey: "preferredDate",
      header: "Preferred Date",
    },
    {
      accessorKey: "contactNumber",
      header: "Contact No.",
    },
    {
      accessorKey: "parameters",
      header: "Parameters",
    },
    {
      accessorKey: "pickUp",
      header: "Pickup",
    }, {
      accessorKey: "pickUpDate",
      header: "Pickup Date",
    },
    {
      accessorKey: "address",
      header: "Pickup Address",
    },
    {
      accessorKey: "address",
      header: "Drop-off Address",
    },
    {
      accessorKey: "Price",
      header: "Price",
    }, {
      accessorKey: "Amount",
      header: "Amount",
      cell: ({ row }) => {
        const amount = parseFloat(row.getValue("Amount"))

        const formatted = new Intl.NumberFormat("en-US", {
          style: "currency",
          currency: "USD",
        }).format(amount)

        return <div>{formatted}</div>
      }
    },
    {
      accessorKey: "ticket_status",
      header: "Ticket Status",
      cell: (({row}) => {
        const status = row.getValue("ticket_status")
        if(status == "New") {
          return <div className="flex justify-center"> <Badge className="bg-green-500 hover:bg-green-400">New</Badge></div>
        }
        else if(status == "In_Transit") {
          return <div className="flex justify-center"> <Badge className="bg-orange-500 text-nowrap text-center hover:bg-orange-400">In Transit</Badge></div>
        }
        else if(status == "Sample_Received") {
          return <div className="flex justify-center"> <Badge className="bg-blue-500 text-nowrap hover:bg-blue-400">Sample Received</Badge></div>
        } 
        else if(status == "Delivered_to_Lab") {
          return <div className="flex justify-center"> <Badge className="bg-yellow-500 hover:bg-yellow-400 text-nowrap">Delivered to Lab</Badge></div>
        }
        else if(status == "Testing_in_Progress") {
          return <div className="flex justify-center"> <Badge className="bg-red-500 text-nowrap hover:bg-red-400">Testing in Progress</Badge></div> 
        }
        else {
          return <div className="flex justify-center"> <Badge className="bg-green-700 text-nowrap hover:bg-green-600">Report Generated</Badge> </div>
        }
      })
    },
    {
      accessorKey: "GST",
      header: "GST",
    }, {
      accessorKey: "contactName",
      header: "Contact Name",
    },
    {
      id: "modify",
      cell: ({ row }) => {
        const rowData = row.original;
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
                onClick={() => navigator.clipboard.writeText(rowData.Sample_Reference)}
                className="hover:cursor-pointer"
              >
                <Copy /> Copy
              </DropdownMenuItem>
              <div className="ml-2">
                <Drawer>
                  <DrawerTrigger>
                    <div className="flex gap-2">
                      <Pencil className="size-4" />{" "}
                      <div className="text-sm"> View </div>
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
                      <DrawerClose>
                          <X />
                      </DrawerClose>
                    </DrawerHeader>
                    <MappedServiceRequestForm rowData={rowData} />
                  </DrawerContent>
                </Drawer>
              </div>
              <div>
                <AlertDialog>
                  <AlertDialogTrigger>
                    <div className="flex gap-2 ml-2">
                      <Trash2 className="size-4" />
                      <div className="text-sm"> Delete</div>
                    </div>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>
                        {" "}
                        Are you absolutely sure?{" "}
                      </AlertDialogTitle>
                      <AlertDialogDescription>
                        This action cannot be undone. This will permanently
                        delete your data from the servers.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction
                        onClick={() => {
                          const newArray = datas.filter(
                            (data) => data.Sample_Reference !== rowData.Sample_Reference
                          );
                          console.log("This is new Array", newArray);
                          setDatas(newArray);
                          toast({
                            title: "Data",
                            description: "Data has been deleted Successfully",
                          });
                        }}
                      >
                        Delete
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];

  return (
    <>
      <DataTable
        columns={columns}
        data={datas}
        isLoading={isLoading}
        exportExcel={exportToExcel}
        exportPDF={exportToPDF}
        exportCSV={exportToCSV}
      />
    </>
  );
};

export default ServiceRequestTable;
