import { Badge } from "@/components/ui/badge";
import { OrderStatus } from "@/generated/prisma";
import { cn } from "@/lib/utils";

interface StatusBadgeProps {
  status: OrderStatus;
  className?: string;
}

const statusConfig = {
  delivered: {
    label: "Delivered",
    className:
      "bg-green-100 text-green-800 hover:bg-green-100 border-green-200",
  },
  shipped: {
    label: "Shipped",
    className: "bg-blue-100 text-blue-800 hover:bg-blue-100 border-blue-200",
  },
  processing: {
    label: "Processing",
    className:
      "bg-orange-100 text-orange-800 hover:bg-orange-100 border-orange-200",
  },
  pending: {
    label: "Pending",
    className:
      "bg-yellow-100 text-yellow-800 hover:bg-yellow-100 border-yellow-200",
  },
  cancelled: {
    label: "Cancelled",
    className: "bg-red-100 text-red-800 hover:bg-red-100 border-red-200",
  },
  confirmed: {
    label: "Confirmed",
    className:
      "bg-purple-100 text-purple-800 hover:bg-purple-100 border-purple-200",
  },
  processed: {
    label: "Processed",
    className: "bg-teal-100 text-teal-800 hover:bg-teal-100 border-teal-200",
  },
  refunded: {
    label: "Returned",
    className: "bg-pink-100 text-pink-800 hover:bg-pink-100 border-pink-200",
  },
};

export function StatusBadge({ status, className }: StatusBadgeProps) {
  const config =
    statusConfig[status.toLowerCase() as keyof typeof statusConfig];

  return (
    <Badge variant="outline" className={cn(config.className, className)}>
      {config.label}
    </Badge>
  );
}
