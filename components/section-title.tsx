export function SectionTitle({ title, count }: { title: string; count?: number }) {
  return (
    <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-fog">
      {title}
      {!!count && (
        <span className="ml-3 inline-flex size-7 items-center justify-center rounded-full bg-violet/15 align-middle font-sans text-xs font-semibold tracking-normal text-violet-soft border border-violet/20">
          {count}
        </span>
      )}
    </h2>
  );
}
