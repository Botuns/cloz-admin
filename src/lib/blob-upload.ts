export type UploadResult = { url: string; pathname: string };

// Uploads a File or Blob to our /api/upload endpoint (Vercel Blob)
export async function uploadAsset(
  file: File,
  fileName?: string
): Promise<UploadResult> {
  const res = await fetch("/api/upload", {
    method: "POST",
    headers: {
      ...(fileName ? { "x-vercel-filename": fileName } : {}),
    },
    body: file,
  });
  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(text || `Failed to upload (${res.status})`);
  }
  return res.json();
}
