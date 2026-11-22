const WAVE = "M0 110 C150 30 250 30 400 110 S650 190 800 110 S1050 30 1200 110";

/**
 * Brand book §07 wave, as the top edge of the footer on every page. Above the line it takes the colour the page
 * ends on: Noapte by default, Mov when the page's last section is marked `data-ends-mov`.
 */
export function FooterWave() {
  return (
    <div data-wave aria-hidden="true" className="relative -mb-px h-28 bg-noapte sm:h-44 [body:has([data-ends-mov])_&]:bg-mov">
      <svg className="absolute inset-0 size-full overflow-visible" viewBox="0 0 1200 220" preserveAspectRatio="none" fill="none">
        <path d={`${WAVE} V220 H0 Z`} className="fill-deep" />
        <path d={WAVE} className="stroke-led" strokeWidth={3} vectorEffect="non-scaling-stroke" />
        <path d={WAVE} transform="translate(0 28)" className="stroke-led" strokeOpacity={0.4} strokeWidth={1.2} vectorEffect="non-scaling-stroke" />
      </svg>
    </div>
  );
}
