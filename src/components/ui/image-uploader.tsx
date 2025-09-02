"use client";

import * as React from "react";
import { Button } from "./button";
import { uploadAsset } from "@/lib/blob-upload";
import { Loader2, Upload, ImageIcon } from "lucide-react";

type Props = {
  label: string;
  value?: string;
  onChange: (url: string) => void;
  accept?: string;
  cropLinkHref?: string; // Optional link to cropper page
};

export function ImageUploader({
  label,
  value,
  onChange,
  accept = "image/*",
  cropLinkHref,
}: Props) {
  const inputRef = React.useRef<HTMLInputElement>(null);
  const [isUploading, setUploading] = React.useState(false);

  const onPick = () => inputRef.current?.click();

  const onFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    try {
      const result = await uploadAsset(file, `${label}-${Date.now()}`);
      onChange(result.url);
    } catch (e: any) {
      console.error(e);
      alert(e?.message || "Upload failed");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center gap-3">
        <input
          ref={inputRef}
          type="file"
          className="hidden"
          accept={accept}
          onChange={onFile}
        />
        <Button
          type="button"
          variant="secondary"
          onClick={onPick}
          className="shadow-none"
        >
          {isUploading ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <Upload className="mr-2 h-4 w-4" />
          )}{" "}
          Upload {label}
        </Button>
        {cropLinkHref ? (
          <a
            href={cropLinkHref}
            className="text-xs underline text-muted-foreground"
          >
            Open Cropper
          </a>
        ) : null}
      </div>
      <div className="h-24 w-full rounded border border-dashed grid place-content-center overflow-hidden">
        {value ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={value}
            alt={`${label} preview`}
            className="object-contain h-24 w-full"
          />
        ) : (
          <div className="flex items-center gap-2 text-muted-foreground text-sm">
            <ImageIcon className="h-4 w-4" /> No {label} selected
          </div>
        )}
      </div>
    </div>
  );
}
