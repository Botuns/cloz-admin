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
        let errorMessage = `Failed to create admin (HTTP ${res.status}${
          res.statusText ? ` ${res.statusText}` : ""
        })`;

        try {
          // Attempt to parse the error response body as JSON.
          // Hono ClientResponse's .json() method handles cloning, so it's safe to call
          // .text() later if this fails.
          const errorData = await res.json();

          if (typeof errorData === "string" && errorData) {
            errorMessage = errorData;
          } else if (errorData && typeof errorData === "object") {
            // Check for common error message properties like 'message' or 'error'
            const errorObj = errorData as {
              message?: unknown;
              error?: unknown;
            };
            if (typeof errorObj.message === "string" && errorObj.message) {
              errorMessage = errorObj.message;
            } else if (typeof errorObj.error === "string" && errorObj.error) {
              errorMessage = errorObj.error;
            }
            // If it's an object but doesn't have a clear message/error string,
            // the HTTP status-based errorMessage will be used.
          }
        } catch (jsonParseOrAccessError) {
          // Failed to parse as JSON, or errorData was not in expected format.
          // Log this error for debugging, as it might indicate an unexpected error response structure.
          console.error(
            "Could not parse error response as JSON, or access error properties:",
            jsonParseOrAccessError
          );
          try {
            // Attempt to read the error response as plain text.
            const textError = await res.text(); // Hono ClientResponse's .text() also handles cloning.
            if (textError) {
              errorMessage = textError;
            }
          } catch (textParseError) {
            // Failed to read response as text.
            console.error(
              "Failed to read error response as text:",
              textParseError
            );
            // errorMessage will remain the HTTP status-based one.
          }
        }
        throw new Error(errorMessage);
      }

      const data = await res.json(); // res.ok is true, parse the successful response.

      // Handle cases where the server returns a 2xx status but includes an application-level error in the body.
      // Assuming 'data' could be an object like { error: "some error", message?: "details" }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      if (data && typeof data === "object" && (data as any).error) {
        const appError = data as { error: unknown; message?: unknown };
        let appErrorMessage = "An error occurred while creating the admin.";

        if (typeof appError.message === "string" && appError.message) {
          appErrorMessage = appError.message;
        } else if (typeof appError.error === "string" && appError.error) {
          // Use error property if it's a string and message isn't.
          appErrorMessage = appError.error;
        }
        throw new Error(appErrorMessage);
      }
      return data as ResponseType; // Ensure the returned data matches ResponseType
    },
    onSuccess: () => {
      toast.success("Admin created successfully");
      queryClient.invalidateQueries({ queryKey: ["admins"] });
      router.push("/admin/users");
    },
    onError: (error) => {
      // The error.message here will be the errorMessage constructed in mutationFn
      toast.error(`Error creating admin: ${error.message}`);
    },
  });
  return mutation;
};
