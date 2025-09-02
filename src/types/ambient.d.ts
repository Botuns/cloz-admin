declare module "react-easy-crop" {
  import React from "react";
  export type Area = { x: number; y: number; width: number; height: number };
  export type Point = { x: number; y: number };
  export interface CropperProps {
    image: string;
    crop: Point;
    zoom: number;
    aspect?: number;
    cropShape?: "rect" | "round";
    showGrid?: boolean;
    onCropChange: (location: Point) => void;
    onZoomChange: (zoom: number) => void;
    onCropComplete?: (croppedArea: Area, croppedAreaPixels: Area) => void;
    classes?: Partial<Record<string, string>>;
  }
  const Cropper: React.FC<CropperProps>;
  export default Cropper;
}

declare module "@vercel/blob/client" {
  type OnBeforeGenerateToken = () => Promise<{
    allowedContentTypes?: string[];
    maximumSizeInBytes?: number;
    tokenPayload?: string;
  }>;
  export function handleUpload(
    request: Request,
    config: {
      access?: "public" | "private";
      onBeforeGenerateToken?: OnBeforeGenerateToken;
      onUploadCompleted?: (args: {
        blob: { url: string; pathname?: string };
      }) => Promise<void> | void;
    }
  ): Promise<Response>;
}
