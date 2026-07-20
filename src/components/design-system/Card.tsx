import { type ReactNode } from "react";

interface CardProps {
  children: ReactNode;
  variant?: "elevated" | "outlined" | "glass" | "gradient";
  padding?: "none" | "sm" | "md" | "lg";
  className?: string;
  onClick?: () => void;
}

const variantStyles = {
  elevated: "surface-card",
  outlined: "border border-[var(--border-default)] rounded-xl bg-[var(--bg-secondary)]",
  glass: "surface-glass",
  gradient: "bg-[var(--gradient-card)] text-white rounded-xl",
};

const paddingStyles = {
  none: "",
  sm: "p-4",
  md: "p-5",
  lg: "p-6",
};

export function Card({
  children,
  variant = "elevated",
  padding = "md",
  className = "",
  onClick,
}: CardProps) {
  const Comp = onClick ? "button" : "div";
  return (
    <Comp
      className={[
        variantStyles[variant],
        paddingStyles[padding],
        onClick ? "cursor-pointer text-left w-full transition-all hover:scale-[1.01] active:scale-[0.99]" : "",
        "transition-all duration-[var(--duration-fast)]",
        className,
      ].join(" ")}
      onClick={onClick}
    >
      {children}
    </Comp>
  );
}