import { Fragment, type ReactNode } from "react";
import { cn } from "@/lib/utils";

const PILL_STYLES = {
  amber: "bg-amber text-noapte hover:bg-brand-accent-hover",
  line: "border-2 border-crem bg-crem/[.08] text-crem hover:bg-crem/[.16]",
} as const;

export function pill(style: keyof typeof PILL_STYLES, className?: string) {
  return cn(
    "inline-flex h-14 cursor-pointer items-center justify-center gap-2 rounded-full px-7 text-center text-base leading-tight font-extrabold tracking-[.02em] transition-colors focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-amber",
    PILL_STYLES[style],
    className,
  );
}

/** Brand book §07: three equal dots, spaced by their diameter. `double` adds a second, crem row from sm up. */
export function Dots({ double = false, className }: { double?: boolean; className?: string }) {
  return (
    <div aria-hidden="true" className={cn("grid w-fit grid-cols-[repeat(3,10px)] gap-2.5", className)}>
      {["bg-amber", "bg-crem", "bg-led"].map((color) => (
        <span key={color} className={cn("size-2.5 rounded-full", color)} />
      ))}
      {double &&
        [0, 1, 2].map((i) => <span key={i} className="hidden size-2.5 rounded-full bg-crem sm:block" />)}
    </div>
  );
}

export function Eyebrow({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <p
      className={cn(
        "mb-4 flex items-center gap-2.5 text-xs font-extrabold tracking-[.18em] text-amber uppercase before:hidden before:size-1.5 before:rounded-full before:bg-current sm:before:block",
        className,
      )}
    >
      {children}
    </p>
  );
}

/**
 * Opening band of an inner page. It runs up behind the fixed navbar (the layout adds pt-24).
 * `aside` sits to the right of the title on desktop and under the text on phones.
 */
export function PageHero({ title, desc, aside }: { title: string; desc: string; aside?: ReactNode }) {
  return (
    <section className="-mt-24 bg-mov pt-32 pb-14 sm:pt-44 sm:pb-20 lg:pt-40">
      <div
        className={cn(
          "mx-auto grid max-w-6xl gap-8 px-5",
          aside && "lg:grid-cols-[minmax(0,1fr)_340px] lg:items-center lg:gap-12",
        )}
      >
        <div>
          <Dots className="mb-7" />
          <h1
            className={cn(
              "max-w-4xl text-[clamp(31px,9vw,56px)] leading-[.98] font-extrabold tracking-[-.035em] text-balance text-crem",
              aside ? "lg:text-[60px] xl:text-[76px]" : "lg:text-[80px]",
            )}
          >
            {/* Words like "Îmbunătățește-ți" must not break at their hyphen */}
            {title.split(" ").map((word, i) => (
              <Fragment key={i}>
                {i > 0 && " "}
                <span className="whitespace-nowrap">{word}</span>
              </Fragment>
            ))}
          </h1>
          <p className="mt-5 max-w-xl text-lg leading-relaxed text-lilac">{desc}</p>
        </div>
        {aside}
      </div>
    </section>
  );
}
