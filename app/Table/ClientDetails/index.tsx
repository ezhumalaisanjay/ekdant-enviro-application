import { Button } from "@/components/ui/button";
import { DataTable } from "./data-table"
import { Copy, Trash2} from "lucide-react";
import { MoreHorizontal } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
//import { Drawer, DrawerClose, DrawerContent, DrawerDescription, DrawerHeader, DrawerTitle, DrawerTrigger } from "@/components/ui/drawer";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { useEffect, useState } from "react";
import { useToast } from "@/hooks/use-toast";
import * as XLSX from "xlsx";
import jsPDF from "jspdf";
import "jspdf-autotable";
import Papa from "papaparse";
import { ColumnDef } from '@tanstack/react-table';
import { autoTable } from "jspdf-autotable";
import { Checkbox } from "@/components/ui/checkbox";

declare module "jspdf" {
  interface jsPDF {
    autoTable: autoTable; 
  }
}

interface Data {
  CustomerID: string,
  company_name: string,
  Address: string,
  Email: string,
  Phone: string
}


const ClientDetailsTable = () => {
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
        console.log("Client Details Form Data", responseData);

      } catch (error: unknown) {
        if (error instanceof Error) {
          console.error("Error fetching records:", error.message);
          return { error: error.message };
        } else {
          console.error("Unknown error:", error);
          return { error: "An unknown error occurred" };
        }
      } finally {
        setIsLoading(false)
      }
    } 
    getRecords("Customer") 
  }, [])

  const { toast } = useToast();

  const exportToPDF = () => {
    const doc = new jsPDF();
    const tableData = datas.map((data) => [
      data.CustomerID,
      data.company_name,
      data.Address,
      data.Email,
      data.Phone,
    ]);

    doc.autoTable({
      head: [
        [
          "Customer ID",
          "Company Name",
          "Customer Address",
          "Email",
          "Contact",
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
      customerId : row.CustomerID,
      companyName : row.company_name,
      customerAddress : row.Address,
      customerEmail : row.Email,
      customerContact : row.Phone,
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
      accessorKey: "CustomerID",
      header: "Customer ID",
    },
    {
      accessorKey: "company_name",
      header: "Company Name",
    },
    {
      accessorKey: "Address",
      header: "Customer Address",
    },
    {
      accessorKey: "Email",
      header: "Customer Email",
    },
    {
      accessorKey: "Phone",
      header: "Contact No.",
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
                onClick={() => navigator.clipboard.writeText(rowData.CustomerID)}
                className="hover:cursor-pointer"
              >
                <Copy /> Copy
              </DropdownMenuItem>
              <div className="ml-2">
                {/*
                <Drawer>
                  <DrawerTrigger>
                    <div className="flex gap-2">
                      <Pencil className="size-4" />{" "}
                      <div className="text-sm"> Edit</div>
                    </div>
                  </DrawerTrigger>
                  <DrawerContent>
                    <DrawerHeader className="flex justify-between">
                      <div>
                        <DrawerTitle>Client Details Form</DrawerTitle>
                        <DrawerDescription className="">
                          Make changes here.
                        </DrawerDescription>
                      </div>
                      <DrawerClose>
                        <Button variant={"outline"}>
                          <X />
                        </Button>
                      </DrawerClose>
                    </DrawerHeader>

                  </DrawerContent>
                </Drawer> */ }
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
                            (data) => data.CustomerID !== rowData.CustomerID
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

export default ClientDetailsTable;
