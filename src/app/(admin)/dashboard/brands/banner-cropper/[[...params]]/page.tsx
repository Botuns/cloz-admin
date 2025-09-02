"use client";

import { useCallback, useRef, useState } from "react";
import Cropper, { type Area } from "react-easy-crop";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { getCroppedImg } from "@/lib/image-crop";
import { toast } from "sonner";

export default function BannerCropperPage() {
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<any>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const onCropComplete = useCallback((_croppedArea: Area, pixels: Area) => {
    setCroppedAreaPixels(pixels);
  }, []);

  const onSelectImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    setImageSrc(url);
  };

  const onUpload = async () => {
    if (!imageSrc || !croppedAreaPixels) return;
    try {
      const blob = await getCroppedImg(imageSrc, croppedAreaPixels, 1920, 480); // 4:1 wide banner
      const file = new File([blob], `banner-${Date.now()}.webp`, {
        type: "image/webp",
      });

      const res = await fetch("/api/upload", {
        method: "POST",
        headers: { "x-vercel-filename": file.name },
        body: file,
      });
      if (!res.ok) throw new Error("Upload failed");
      const data = await res.json();
      navigator.clipboard.writeText(data.url).catch(() => void 0);
      toast.success("Banner uploaded. URL copied to clipboard.");
    } catch (e: any) {
      toast.error(e?.message || "Failed to crop or upload image");
    }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">Crop Banner</h1>
      <Card className="shadow-none">
        <CardHeader>
          <div className="flex gap-2">
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={onSelectImage}
              className="hidden"
            />
            <Button onClick={() => fileInputRef.current?.click()}>
              Select Image
            </Button>
            <Button onClick={onUpload} disabled={!imageSrc}>
              Upload
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="relative w-full aspect-[4/1] bg-muted rounded-md overflow-hidden">
            {imageSrc ? (
              <Cropper
                image={imageSrc}
                crop={crop}
                zoom={zoom}
                aspect={4 / 1}
                onCropChange={setCrop}
                onZoomChange={setZoom}
                onCropComplete={onCropComplete}
                cropShape="rect"
                showGrid
              />
            ) : (
              <div className="w-full h-full grid place-content-center text-sm text-muted-foreground">
                Choose an image to crop to 4:1 banner
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
