"use client";

import { motion, useTransform, type MotionValue } from "framer-motion";
import { COURT, COURT_VIEW } from "@/lib/court";

const clamp = (v: number) => Math.min(1, Math.max(0, v));

function Lamp({ index, progress }: { index: number; progress: MotionValue<number> }) {
  const { x, y, width, height } = COURT.lamps[index];
  const on = useTransform(progress, (p) => clamp((p - 0.3 - index * 0.04) / 0.2));
  const bulb = useTransform(on, (v) => 0.12 + 0.88 * v);
  const halo = useTransform(on, (v) => 0.7 * v);

  return (
    <>
      <motion.rect x={x} y={y - height} width={width} height={height * 3} rx={height} fill="#FFE3BF" style={{ opacity: halo, filter: "blur(4px)" }} />
      <motion.rect x={x} y={y} width={width} height={height} rx={height / 2} fill="#FFF1DE" style={{ opacity: bulb }} />
    </>
  );
}

export default function CourtDrawing({ progress }: { progress: MotionValue<number> }) {
  return (
    <svg
      viewBox={`0 0 ${COURT_VIEW.width} ${COURT_VIEW.height}`}
      preserveAspectRatio="xMidYMax slice"
      className="block size-full overflow-visible"
      fill="none"
      aria-hidden="true"
    >
      {COURT.lamps.map((_, i) => (
        <Lamp key={i} index={i} progress={progress} />
      ))}
      <path d={COURT.floor} fill="#6A35C8" fillOpacity={0.5} />
      <path d={COURT.glass} className="fill-crem" fillOpacity={0.05} />
      <path d={COURT.mesh} className="stroke-label" strokeOpacity={0.4} strokeWidth={0.25} />
      <path d={COURT.seams} className="stroke-crem" strokeOpacity={0.22} strokeWidth={0.35} />
      <path d={COURT.rails} className="stroke-label" strokeOpacity={0.85} strokeWidth={0.8} strokeLinecap="round" />
      <path d={COURT.posts} className="stroke-label" strokeOpacity={0.95} strokeWidth={1.2} strokeLinecap="round" />
      {COURT.lines.map((d, i) => (
        <path
          key={d}
          d={d}
          pathLength={1}
          className="court-line stroke-crem"
          strokeOpacity={0.9}
          strokeWidth={1.3}
          strokeLinejoin="round"
          style={{ animationDelay: `${0.4 + i * 0.15}s` }}
        />
      ))}
      <path d={COURT.net} className="stroke-crem" strokeOpacity={0.3} strokeWidth={0.4} />
      <path d={COURT.netTape} className="stroke-crem" strokeWidth={1.4} strokeLinecap="round" />
    </svg>
  );
}
