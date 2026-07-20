export function ZolaMark({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <img
      src="/screenicon.png"
      alt="Zola"
      className={`${className} object-contain`}
    />
  );
}

export function ZolaLogo({ className = "" }: { className?: string }) {
  return (
    <div className={`inline-flex items-center gap-2 ${className}`}>
      <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-[var(--accent)]">
        <img src="/screenicon.png" alt="Zola" className="h-5 w-5 object-contain" />
      </div>
      <span className="text-base font-bold tracking-tight">Zola</span>
    </div>
  );
}
