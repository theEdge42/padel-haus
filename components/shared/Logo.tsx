import { cn } from "@/lib/utils";

const SCRIPT_FONT = "'Times New Roman MT', 'Times New Roman', Times, serif";

const SIZES = {
  sm: { script: "text-xl sm:text-2xl", bold: "text-lg sm:text-xl", gap: "gap-1.5" },
  md: { script: "text-4xl sm:text-5xl", bold: "text-4xl sm:text-5xl", gap: "gap-2" },
  lg: { script: "text-5xl sm:text-6xl lg:text-6xl", bold: "text-5xl sm:text-6xl lg:text-6xl", gap: "gap-2.5" },
} as const;

export function Logo({
  size = "lg",
  className,
}: {
  size?: keyof typeof SIZES;
  className?: string;
}) {
  const s = SIZES[size];
  return (
    <span className={cn("inline-flex items-baseline leading-none whitespace-nowrap", s.gap, className)}>
      <span style={{ fontFamily: SCRIPT_FONT }} className={cn("italic text-[#eeede9]", s.script)}>
        padel
      </span>
      <span className={cn("font-sans font-bold text-white tracking-[.04em]", s.bold)}>haus.</span>
    </span>
  );
}
