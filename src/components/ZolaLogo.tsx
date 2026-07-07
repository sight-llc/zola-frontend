export function ZolaMark({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="2.4"
      strokeLinecap="square"
    >
      <path d="M5 6 L19 6" />
      <path d="M19 6 L5 18" />
      <path d="M5 18 L19 18" />
    </svg>
  );
}

export function ZolaLogo({ className = "" }: { className?: string }) {
  return (
    <div className={`inline-flex items-center gap-2 ${className}`}>
      <ZolaMark />
      <span className="text-lg font-bold tracking-tight">Zola</span>
    </div>
  );
}
