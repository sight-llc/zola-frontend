import { forwardRef, type InputHTMLAttributes, type ReactNode } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  hint?: string;
  icon?: ReactNode;
  suffix?: ReactNode;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, hint, icon, suffix, className = "", id, ...rest }, ref) => {
    const inputId = id || rest.name;
    return (
      <div className="flex flex-col gap-1.5">
        {label ? (
          <label
            htmlFor={inputId}
            className="text-xs font-medium text-[var(--text-secondary)]"
          >
            {label}
          </label>
        ) : null}
        <div className="relative">
          {icon ? (
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-[var(--text-tertiary)]">
              {icon}
            </div>
          ) : null}
          <input
            ref={ref}
            id={inputId}
            className={[
              "h-11 w-full rounded-xl border bg-[var(--bg-secondary)] px-4 text-sm text-[var(--text-primary)]",
              "placeholder:text-[var(--text-tertiary)]",
              "transition-all duration-[var(--duration-fast)]",
              error
                ? "border-[var(--error)]"
                : "border-[var(--border-default)] hover:border-[var(--border-strong)]",
              "focus:border-[var(--border-focus)] focus:ring-2 focus:ring-[var(--border-focus)] focus:ring-offset-0",
              "disabled:opacity-40 disabled:pointer-events-none",
              icon ? "pl-10" : "",
              suffix ? "pr-12" : "",
              className,
            ].join(" ")}
            {...rest}
          />
          {suffix ? (
            <div className="absolute inset-y-0 right-0 flex items-center pr-3">
              {suffix}
            </div>
          ) : null}
        </div>
        {error ? (
          <span className="text-xs text-[var(--error)]">{error}</span>
        ) : hint ? (
          <span className="text-xs text-[var(--text-tertiary)]">{hint}</span>
        ) : null}
      </div>
    );
  },
);

Input.displayName = "Input";