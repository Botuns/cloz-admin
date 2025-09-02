import { useMutation, useQueryClient } from "@tanstack/react-query";
import { InferRequestType, InferResponseType } from "hono";
import { client } from "@/lib/rpc";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

type ResponseType = InferResponseType<
  (typeof client.api.v1.brands.create)["$post"]
>;

type RequestType = InferRequestType<
  (typeof client.api.v1.brands.create)["$post"]
>;

export const useCreateBrand = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation<ResponseType, Error, RequestType>({
    mutationFn: async ({ json }) => {
      const res = await client.api.v1.brands.create["$post"]({ json });

      if (!res.ok) {
        let errorMessage = `Failed to create brand (HTTP ${res.status}$${
          res.statusText ? ` ${res.statusText}` : ""
        })`;
        try {
          const data = await res.json();
          if (typeof data === "string" && data) errorMessage = data;
          else if (data && typeof data === "object") {
            const { message, error } = data as {
              message?: unknown;
              error?: unknown;
            };
            if (typeof message === "string" && message) errorMessage = message;
            else if (typeof error === "string" && error) errorMessage = error;
          }
        } catch (e) {
          try {
            const txt = await res.text();
            if (txt) errorMessage = txt;
          } catch {}
        }
        throw new Error(errorMessage);
      }

      const data = await res.json();
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      if (data && typeof data === "object" && (data as any).error) {
        const { message, error } = data as {
          message?: unknown;
          error?: unknown;
        };
        let appMsg = "An error occurred while creating the brand.";
        if (typeof message === "string" && message) appMsg = message;
        else if (typeof error === "string" && error) appMsg = error;
        throw new Error(appMsg);
      }
      return data as ResponseType;
    },
    onSuccess: () => {
      toast.success("Brand created successfully");
      queryClient.invalidateQueries({ queryKey: ["brands"] });
      router.push("/dashboard/brands");
    },
    onError: (error) => {
      toast.error(`Error creating brand: ${error.message}`);
    },
  });
};
