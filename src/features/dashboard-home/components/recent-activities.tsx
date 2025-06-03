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
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Activities</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="font-medium text-muted-foreground">
                  ORDER ID
                </TableHead>
                <TableHead className="font-medium text-muted-foreground">
                  CUSTOMER
                </TableHead>
                <TableHead className="font-medium text-muted-foreground">
                  DATE
                </TableHead>
                <TableHead className="font-medium text-muted-foreground">
                  STATUS
                </TableHead>
                <TableHead className="font-medium text-muted-foreground text-right">
                  AMOUNT
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {activities.map((activity) => (
                <TableRow key={activity.orderId}>
                  <TableCell className="font-medium">
                    {activity.orderId}
                  </TableCell>
                  <TableCell>{activity.customer}</TableCell>
                  <TableCell className="text-muted-foreground">
                    {activity.date}
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={getStatusVariant(activity.status)}
                      className={getStatusColor(activity.status)}
                    >
                      {activity.status.charAt(0).toUpperCase() +
                        activity.status.slice(1)}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right font-medium">
                    {activity.amount}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}
