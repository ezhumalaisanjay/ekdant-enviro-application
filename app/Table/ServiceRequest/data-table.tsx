"use client"

import {
  ColumnDef,
  SortingState,
  flexRender,
  ColumnFiltersState,
  getFilteredRowModel,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  VisibilityState,
} from "@tanstack/react-table"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import React, { useState } from "react"
import PaginationSelection from "@/app/Table/ServiceRequest/PaginationSelection"
import { ChevronLeft, ChevronRight, Download, File, FileText, ListCollapseIcon, Sheet } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
  isLoading: boolean
  exportExcel?: () => void
  exportPDF?: () => void
  exportCSV?: () => void
}

export type PaginationState = {
  pageIndex: number
  pageSize: number
}

export function DataTable<TData, TValue>({
  columns,
  data,
  isLoading,
  exportExcel,
  exportPDF,
  exportCSV,
}: DataTableProps<TData, TValue>) {

  const [sorting, setSorting] = React.useState<SortingState>([])
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  )
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  })
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({
      Sample_Reference: true,
      ticket_status: true,
      fullName: true,
      address: false,
      serviceType: true,
      date: true,
      allottedTo: true,
      drawnBy: true,
      email: false,
      preferredDate: false,
      contactNumber: false,
      parameters: false,
      pickUp: false,
      pickUpDate: false,
      pickupAddress: false,
      dropoffAddress: false,
      Price: false,
      contactName: false,
      Amount: true,
      GST: false,
    })

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onPaginationChange: setPagination,
    getPaginationRowModel: getPaginationRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      pagination,
    },
  })

  return (
    <div>
      <div className="flex justify-between items-center p-2">
        <div className="flex w-full">
          <Input
            placeholder="Filter by Customer Name..."
            value={(table.getColumn("companyName")?.getFilterValue() as string) ?? ""}
            onChange={(event) =>
              table.getColumn("companyName")?.setFilterValue(event.target.value)
            }
            className="max-w-sm ml-2"
          />
        </div>
        <div className="flex">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <Download className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Download</DropdownMenuLabel>
              <DropdownMenuItem className="hover:cursor-pointer" onClick={exportPDF}>
                <FileText /> PDF
              </DropdownMenuItem>
              <DropdownMenuItem className="hover:cursor-pointer" onClick={exportExcel}>
                <Sheet /> Excel
              </DropdownMenuItem>
              <DropdownMenuItem className="hover:cursor-pointer" onClick={exportCSV}>
                <File /> CSV
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" 
              className="ml-auto">
                <ListCollapseIcon />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="h-[200px] overflow-y-scroll" align="end">
              {table
                .getAllColumns()
                .filter(
                  (column) => column.getCanHide()
                )
                .map((column) => {
                  return (
                    <DropdownMenuCheckboxItem
                      key={column.id}
                      className="capitalize"
                      checked={column.getIsVisible()}
                      onCheckedChange={(value) =>
                        column.toggleVisibility(!!value)
                      }
                    >
                      {column.id}
                    </DropdownMenuCheckboxItem>
                  )
                })}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      <div className="rounded-md border w-full">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  )
                )}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  Loading...
                </TableCell>
            </TableRow>
            ) :
            (table.getRowModel().rows?.length) ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-between space-x-2 py-4">
        <div>
          <div className="text-sm text-muted-foreground">
            Total Records: {table.getFilteredRowModel().rows.length}
          </div>
          <PaginationSelection 
          pagination={pagination} 
          setPagination={setPagination}/>
        </div>
        <div>
          <Button 
          size="sm"
          variant="ghost"
          className="cursor-default font-extralight"
          >
            Page {pagination.pageIndex + 1} of {table.getPageCount()}
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            <ChevronLeft />
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            <ChevronRight />
          </Button>
        </div>
      </div>
    </div>
  )
}
