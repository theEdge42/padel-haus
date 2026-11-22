"use client";

import { useState } from "react";
import Image from "next/image";
import { PhotoLightbox, type LightboxPhoto } from "@/components/shared/PhotoLightbox";
import { cn } from "@/lib/utils";

/** A photo in the page that opens full screen when pressed. Size and shape come from `className`. */
export function ZoomablePhoto({ photo, className }: { photo: LightboxPhoto; className?: string }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        data-zoomable
        onClick={() => setOpen(true)}
        aria-haspopup="dialog"
        className={cn(
          "relative block w-full cursor-zoom-in overflow-hidden rounded-[20px] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-amber",
          className,
        )}
      >
        <Image src={photo.src} alt={photo.alt} fill unoptimized className="object-cover" />
      </button>
      {open && <PhotoLightbox photos={[photo]} index={0} onClose={() => setOpen(false)} />}
    </>
  );
}
