import { useMutation, useQueryClient } from "@tanstack/react-query";
import { InferRequestType, InferResponseType } from "hono";
import { client } from "@/lib/rpc";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

type ResponseType = InferResponseType<
  (typeof client.api.auth.admin.create)["$post"]
>;

type RequestType = InferRequestType<
  (typeof client.api.auth.admin.create)["$post"]
>;

export const useCreateAdmin = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async ({ json }) => {
      const res = await client.api.auth.admin.create["$post"]({ json });
      if (!res.ok) {
        throw new Error("Failed to create admin");
      }
      return res.json();
    },
    onSuccess: () => {
      toast.success("Admin created successfully");
      queryClient.invalidateQueries({ queryKey: ["admins"] });
      router.push("/admin/users");
    },
    onError: (error) => {
      toast.error(`Error creating admin: ${error.message}`);
    },
  });
  return mutation;
};
