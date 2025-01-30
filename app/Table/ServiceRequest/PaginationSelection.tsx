import { PaginationState } from "./data-table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dispatch, SetStateAction } from "react";

export default function PaginationSelection({
  pagination, setPagination,
}: {
  pagination: PaginationState;
  setPagination: Dispatch<SetStateAction<PaginationState>>;
}) {

  return (
    <div className="flex justify-start gap-2 items-center">
      <div className="text-nowrap text-sm font-extralight">Rows Per Page</div>
      <Select
      value={pagination.pageSize.toString()}
      onValueChange={(value) => {
        setPagination((prev) => ({...prev, pageSize: Number(value)}))
      }}
      >
        <SelectTrigger>
          <SelectValue placeholder={pagination.pageSize.toString()} />
        </SelectTrigger>
        <SelectContent>
          {[4, 6, 8, 10, 15, 20, 30].map((size) =>
            <SelectItem key={size} value={size.toString()}>
              {size}
            </SelectItem>
          )}
        </SelectContent>
      </Select>
    </div>
  )
}