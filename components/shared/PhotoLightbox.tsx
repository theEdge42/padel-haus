"use client";

import { useLayoutEffect, useRef } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";

export type LightboxPhoto = { src: string; width: number; height: number; alt: string };

const SWIPE_DISTANCE = 50;
const CONTROL =
  "flex size-12 cursor-pointer items-center justify-center rounded-full border border-crem/30 bg-noapte/70 text-crem transition-colors hover:bg-mov focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber";

/** Full-screen photo viewer. Mount it only while open. A native modal dialog handles the focus trap and Escape. */
export function PhotoLightbox({
  photos,
  index,
  onChange,
  onClose,
}: {
  photos: LightboxPhoto[];
  index: number;
  onChange?: (index: number) => void;
  onClose: () => void;
}) {
  const t = useTranslations("home.lightbox");
  const dialogRef = useRef<HTMLDialogElement>(null);
  const touchStart = useRef<{ x: number; y: number } | null>(null);
  const photo = photos[index];
  const many = photos.length > 1;

  useLayoutEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    const root = document.documentElement;
    const previousOverflow = root.style.overflow;
    dialog.showModal();
    root.style.overflow = "hidden";
    return () => {
      dialog.close();
      root.style.overflow = previousOverflow;
    };
  }, []);

  const step = (by: number) => {
    if (many) onChange?.((index + by + photos.length) % photos.length);
  };

  return (
    <dialog
      ref={dialogRef}
      aria-label={photo.alt}
      // `close` fires asynchronously, so ignore it if Strict Mode has already reopened the dialog
      onClose={(event) => !event.currentTarget.open && onClose()}
      onKeyDown={(event) => {
        if (event.key === "ArrowLeft") step(-1);
        if (event.key === "ArrowRight") step(1);
      }}
      className="fixed inset-0 m-0 h-dvh max-h-none w-full max-w-none overflow-hidden bg-noapte p-0 text-crem backdrop:bg-noapte"
    >
      <div
        data-stage
        className="absolute inset-x-3 top-[calc(72px+env(safe-area-inset-top,0px))] bottom-[calc(80px+env(safe-area-inset-bottom,0px))] flex items-center justify-center [container-type:size] sm:inset-x-20 sm:top-4 sm:bottom-16"
        onClick={(event) => event.target === event.currentTarget && onClose()}
        onTouchStart={(event) => {
          // One finger only, and not while pinch-zoomed: then a drag pans the photo
          const zoomed = (window.visualViewport?.scale ?? 1) > 1.01;
          touchStart.current =
            event.touches.length === 1 && !zoomed
              ? { x: event.touches[0].clientX, y: event.touches[0].clientY }
              : null;
        }}
        onTouchEnd={(event) => {
          const start = touchStart.current;
          touchStart.current = null;
          if (!start) return;
          const dx = event.changedTouches[0].clientX - start.x;
          const dy = event.changedTouches[0].clientY - start.y;
          if (Math.abs(dx) > SWIPE_DISTANCE && Math.abs(dx) > Math.abs(dy)) step(dx < 0 ? 1 : -1);
        }}
      >
        <Image
          key={photo.src}
          src={photo.src}
          alt={photo.alt}
          width={photo.width}
          height={photo.height}
          unoptimized
          loading="eager"
          draggable={false}
          className="h-auto max-w-none select-none"
          // As large as the screen allows, without cropping
          style={{ width: `min(100cqw, ${(photo.width / photo.height) * 100}cqh)` }}
        />
      </div>

      <button
        type="button"
        autoFocus
        onClick={onClose}
        aria-label={t("close")}
        className={cn(CONTROL, "absolute top-[calc(12px+env(safe-area-inset-top,0px))] right-3 sm:right-4")}
      >
        <X size={22} aria-hidden="true" />
      </button>

      {many && (
        <>
          <button
            type="button"
            onClick={() => step(-1)}
            aria-label={t("previous")}
            className={cn(CONTROL, "absolute bottom-[calc(16px+env(safe-area-inset-bottom,0px))] left-3 sm:top-1/2 sm:bottom-auto sm:left-4 sm:-translate-y-1/2")}
          >
            <ChevronLeft size={24} aria-hidden="true" />
          </button>
          <button
            type="button"
            onClick={() => step(1)}
            aria-label={t("next")}
            className={cn(CONTROL, "absolute right-3 bottom-[calc(16px+env(safe-area-inset-bottom,0px))] sm:top-1/2 sm:right-4 sm:bottom-auto sm:-translate-y-1/2")}
          >
            <ChevronRight size={24} aria-hidden="true" />
          </button>
          <p
            data-counter
            aria-live="polite"
            className="pointer-events-none absolute inset-x-20 bottom-[calc(28px+env(safe-area-inset-bottom,0px))] text-center text-sm text-lilac tabular-nums sm:bottom-5"
          >
            {index + 1} / {photos.length}
          </p>
        </>
      )}
    </dialog>
  );
}
