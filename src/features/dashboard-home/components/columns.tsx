import { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";
// import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
// import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";

// Replace this with your actual type if defined elsewhere
export type RecentOrder = {
  id: string;
  createdAt: string;
  product: {
    name: string;
  };
  customer: {
    name: string | null;
    email: string;
  } | null;
  price: string;
  quantity: number;
  total: string;
};

export const recentOrdersColumns: ColumnDef<RecentOrder>[] = [
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
        className="translate-y-[2px]"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
        className="translate-y-[2px]"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "customer",
    header: "Customer",
    cell: ({ row }) => {
      const customer = row.original.customer;
      return (
        <div className="flex flex-col">
          <span className="font-medium">{customer?.name || "Unknown"}</span>
          <span className="text-xs text-muted-foreground">{customer?.email}</span>
        </div>
      );
    },
  },
  {
    accessorKey: "product.name",
    header: "Product",
    cell: ({ row }) => (
      <span className="font-medium">{row.original.product.name}</span>
    ),
  },
  {
    accessorKey: "quantity",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        className="hover:bg-transparent"
      >
        Qty
        <ArrowUpDown className="ml-2 h-3.5 w-3.5 text-muted-foreground/70" />
      </Button>
    ),
    cell: ({ row }) => <span>{row.original.quantity}</span>,
  },
  {
    accessorKey: "price",
    header: "Unit Price",
    cell: ({ row }) => <span>₦{row.original.price}</span>,
  },
  {
    accessorKey: "total",
    header: "Total",
    cell: ({ row }) => <span className="font-medium">₦{row.original.total}</span>,
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        className="hover:bg-transparent"
      >
        Date
        <ArrowUpDown className="ml-2 h-3.5 w-3.5 text-muted-foreground/70" />
      </Button>
    ),
    cell: ({ row }) => {
      const date = new Date(row.original.createdAt);
      return <span>{format(date, "dd MMM yyyy, h:mm a")}</span>;
    },
  },
  {
    id: "actions",
    header: () => <div className="text-right">Actions</div>,
    cell: ({ row }) => {
      const id = row.original.id;
      return (
        <div className="flex justify-end">
          <Button variant="ghost" size="icon" className="h-8 w-8 p-0">
            <MoreHorizontal className="h-4 w-4" />
            <span className="sr-only">Open menu for order {id}</span>
          </Button>
        </div>
      );
    },
  },
];
