import type { ButtonHTMLAttributes, InputHTMLAttributes, SelectHTMLAttributes, ReactNode } from "react";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "outline" | "ghost";
  size?: "md" | "lg";
  loading?: boolean;
};

export function Button({
  variant = "primary",
  size = "md",
  loading,
  className = "",
  children,
  disabled,
  ...rest
}: ButtonProps) {
  const base =
    "inline-flex items-center justify-center gap-2 rounded-md font-medium transition-colors duration-150 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background";
  const sizes = size === "lg" ? "h-11 px-5 text-sm" : "h-10 px-4 text-sm";
  const variants = {
    primary: "bg-primary text-primary-foreground hover:opacity-90",
    outline: "border border-border bg-background text-foreground hover:bg-surface",
    ghost: "text-foreground hover:bg-surface",
  }[variant];

  return (
    <button className={`${base} ${sizes} ${variants} ${className}`} disabled={disabled || loading} {...rest}>
      {loading ? <Spinner /> : null}
      {children}
    </button>
  );
}

export function Spinner({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg className={`animate-spin ${className}`} viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeOpacity="0.25" strokeWidth="3" />
      <path d="M22 12a10 10 0 0 1-10 10" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
    </svg>
  );
}

type InputProps = InputHTMLAttributes<HTMLInputElement> & { error?: string; label?: string };
export function Input({ label, error, className = "", id, ...rest }: InputProps) {
  const inputId = id || rest.name;
  return (
    <div className="flex flex-col gap-1.5">
      {label ? (
        <label htmlFor={inputId} className="text-xs font-medium text-muted-foreground">
          {label}
        </label>
      ) : null}
      <input
        id={inputId}
        className={`h-10 rounded-md border ${error ? "border-danger" : "border-border"} bg-background px-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-0 transition-colors duration-150 ${className}`}
        {...rest}
      />
      {error ? <span className="text-xs text-danger">{error}</span> : null}
    </div>
  );
}

type SelectProps = SelectHTMLAttributes<HTMLSelectElement> & { label?: string };
export function Select({ label, className = "", id, children, ...rest }: SelectProps) {
  const selectId = id || rest.name;
  return (
    <div className="flex flex-col gap-1.5">
      {label ? (
        <label htmlFor={selectId} className="text-xs font-medium text-muted-foreground">
          {label}
        </label>
      ) : null}
      <select
        id={selectId}
        className={`h-10 rounded-md border border-border bg-background px-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-colors duration-150 ${className}`}
        {...rest}
      >
        {children}
      </select>
    </div>
  );
}

export function Card({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`rounded-lg border border-border bg-card p-5 ${className}`}>{children}</div>;
}

export function Divider() {
  return <div className="h-px w-full bg-border" />;
}
