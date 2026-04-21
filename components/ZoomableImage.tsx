"use client";

import Image from "next/image";
import { useCallback, useEffect, useId, useState } from "react";

type ZoomableImageBase = {
  src: string;
  alt: string;
  sizes?: string;
  priority?: boolean;
  className?: string;
};

type ZoomableImageFill = ZoomableImageBase & {
  fill: true;
  wrapperClassName: string;
};

type ZoomableImageIntrinsic = ZoomableImageBase & {
  width: number;
  height: number;
};

export type ZoomableImageProps = ZoomableImageFill | ZoomableImageIntrinsic;

export function ZoomableImage(props: ZoomableImageProps) {
  const [open, setOpen] = useState(false);
  const titleId = useId();

  const close = useCallback(() => setOpen(false), []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [open, close]);

  /** 모달은 레이아웃용 비율만 맞추고, `unoptimized`로 public 원본을 그대로 표시 */
  const modalW =
    "fill" in props && props.fill ? 3840 : (props as ZoomableImageIntrinsic).width;
  const modalH =
    "fill" in props && props.fill ? 2160 : (props as ZoomableImageIntrinsic).height;

  const thumbnail =
    "fill" in props && props.fill ? (
      <span className={`relative block w-full ${props.wrapperClassName}`}>
        <Image
          src={props.src}
          alt={props.alt}
          fill
          className={props.className}
          sizes={props.sizes}
          priority={props.priority}
          quality={92}
        />
      </span>
    ) : (
      "width" in props && (
        <Image
          src={props.src}
          alt={props.alt}
          width={props.width}
          height={props.height}
          className={props.className}
          sizes={props.sizes}
          priority={props.priority}
          quality={92}
        />
      )
    );

  return (
    <>
      <button
        type="button"
        className="block w-full cursor-zoom-in text-left outline-none transition hover:opacity-[0.97] focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-100 dark:focus-visible:ring-offset-slate-900 print:cursor-default print:border-none print:bg-transparent print:p-0 print:shadow-none dark:print:ring-offset-transparent"
        aria-label={`${props.alt} — 클릭하여 확대`}
        aria-haspopup="dialog"
        aria-expanded={open}
        aria-controls={open ? titleId : undefined}
        onClick={() => setOpen(true)}
      >
        {thumbnail}
      </button>

      {open ? (
        <div
          className="no-print fixed inset-0 z-[100] flex items-center justify-center bg-black/80 p-4 backdrop-blur-[2px]"
          role="dialog"
          aria-modal="true"
          aria-labelledby={titleId}
          onClick={close}
        >
          <button
            type="button"
            className="absolute right-3 top-3 z-[1] rounded-full bg-white/10 px-3 py-1.5 text-sm font-medium text-white backdrop-blur hover:bg-white/20"
            onClick={(e) => {
              e.stopPropagation();
              close();
            }}
          >
            닫기
          </button>
          <div
            className="relative flex max-h-[96vh] max-w-[min(100vw,2560px)] items-center justify-center p-1"
            onClick={(e) => e.stopPropagation()}
          >
            <p id={titleId} className="sr-only">
              확대 이미지: {props.alt}
            </p>
            <Image
              src={props.src}
              alt={props.alt}
              width={modalW}
              height={modalH}
              unoptimized
              className="h-auto max-h-[96vh] w-auto max-w-[min(100vw-2rem,2560px)] object-contain"
              sizes="100vw"
              priority
            />
          </div>
        </div>
      ) : null}
    </>
  );
}
