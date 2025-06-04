"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useGetRecentOrders } from "../api/use-get-recent-orders";
import { DataTable } from "@/components/data-table";
import { RecentOrder, recentOrdersColumns } from "./columns";

const activities = [
  {
    orderId: "#12345",
    customer: "Aisha Bello",
    date: "2024-07-26",
    status: "shipped",
    amount: "₦150",
  },
  {
    orderId: "#12346",
    customer: "Chukwudi Okoro",
    date: "2024-07-25",
    status: "delivered",
    amount: "₦200",
  },
  {
    orderId: "#12347",
    customer: "Fatima Hassan",
    date: "2024-07-24",
    status: "processing",
    amount: "₦100",
  },
  {
    orderId: "#12348",
    customer: "Emeka Nwosu",
    date: "2024-07-23",
    status: "shipped",
    amount: "₦180",
  },
  {
    orderId: "#12349",
    customer: "Ngozi Eze",
    date: "2024-07-22",
    status: "delivered",
    amount: "₦220",
  },
];

function getStatusVariant(status: string) {
  switch (status) {
    case "delivered":
      return "default";
    case "shipped":
      return "secondary";
    case "processing":
      return "outline";
    default:
      return "outline";
  }
}

function getStatusColor(status: string) {
  switch (status) {
    case "delivered":
      return "bg-green-100 text-green-800 hover:bg-green-100";
    case "shipped":
      return "bg-blue-100 text-blue-800 hover:bg-blue-100";
    case "processing":
      return "bg-orange-100 text-orange-800 hover:bg-orange-100";
    default:
      return "";
  }
}

export function RecentActivities() {
  const limit = 5;
  const { data, isLoading } = useGetRecentOrders({ limit });
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Activities</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <DataTable
            data={(data as unknown as RecentOrder[]) ?? []}
            columns={recentOrdersColumns}
            filters={{
              placeholder: "Search by customer name, order ID, or product name",
              value: "customer",
            }}
          />
        </div>
      </CardContent>
    </Card>
  );
}
