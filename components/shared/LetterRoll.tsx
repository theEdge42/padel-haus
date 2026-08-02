export function LetterRoll({ children }: { children: string }) {
  const characters = Array.from(children);
  const startDelay = 220;
  const letterDuration = 580;
  const totalDuration = 1200;
  const stagger =
    characters.length > 1
      ? (totalDuration - startDelay - letterDuration) / (characters.length - 1)
      : 0;

  return (
    <span className="inline-flex h-5 overflow-hidden" aria-hidden="true">
      {characters.map((letter, index) => {
        const delay = `${startDelay + index * stagger}ms`;
        const character = letter === " " ? "\u00a0" : letter;

        return (
          <span key={`${letter}-${index}`} className="relative inline-block h-5 overflow-hidden">
            <span
              className="block transition-transform duration-[580ms] ease-[cubic-bezier(.22,1,.36,1)] group-hover:-translate-y-full"
              style={{ transitionDelay: delay }}
            >
              {character}
            </span>
            <span
              className="absolute inset-x-0 top-full block transition-transform duration-[580ms] ease-[cubic-bezier(.22,1,.36,1)] group-hover:-translate-y-full"
              style={{ transitionDelay: delay }}
            >
              {character}
            </span>
          </span>
        );
      })}
    </span>
  );
}
