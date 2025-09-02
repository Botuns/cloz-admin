import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function BrandsPage() {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Brands</h1>
        <Button asChild>
          <Link href="/dashboard/brands/create">Add New Brand</Link>
        </Button>
      </div>
      {/* TODO: Table of brands */}
      <div className="text-muted-foreground text-sm">
        Brand list will appear here.
      </div>
    </div>
  );
}
