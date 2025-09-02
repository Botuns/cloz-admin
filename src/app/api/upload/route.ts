import { handleUpload } from "@vercel/blob/client";

export const runtime = "edge";

// Accept image uploads from the client and store them in Vercel Blob.
export async function POST(request: Request) {
  return handleUpload(request, {
    access: "public",
    onBeforeGenerateToken: async () => {
      return {
        allowedContentTypes: [
          "image/jpeg",
          "image/png",
          "image/webp",
          "image/svg+xml",
        ],
        maximumSizeInBytes: 8 * 1024 * 1024, // 8MB
        tokenPayload: JSON.stringify({ purpose: "asset-upload" }),
      };
    },
    onUploadCompleted: async ({ blob }: { blob: { url: string } }) => {
      // Optional: you could persist references to DB here.
      console.log("Blob uploaded:", blob.url);
    },
  });
}
