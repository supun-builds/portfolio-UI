export function SectionTitle({ title, count }: { title: string; count?: number }) {
  return (
    <h2 className="font-display text-[clamp(2.25rem,6.5vw,5.5rem)] leading-none font-bold tracking-[-0.03em]">
      {title}
      {!!count && (
        <span className="ml-3 inline-flex size-8 items-center justify-center rounded-full bg-violet/15 align-top font-sans text-sm font-semibold tracking-normal text-violet-soft border border-violet/20">
          {count}
        </span>
      )}
    </h2>
  );
}
