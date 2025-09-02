import CreateBrandForm from "@/features/brands/components/create-brand-form";

export default function CreateBrandPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">Add New Brand</h1>
      <CreateBrandForm />
    </div>
  );
}
