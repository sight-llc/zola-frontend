import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";
import { useAuth } from "@/lib/auth";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  const { user, ready } = useAuth();
  const nav = useNavigate();
  useEffect(() => {
    if (!ready) return;
    nav({ to: user ? "/home" : "/auth", replace: true });
  }, [user, ready, nav]);
  return (
    <div className="flex min-h-dvh items-center justify-center bg-[var(--bg-primary)]">
      <div className="flex items-center gap-1.5">
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className="h-2 w-2 rounded-full bg-[var(--text-tertiary)]"
            style={{
              animation: `bounce 1s ease-in-out infinite`,
              animationDelay: `${i * 0.15}s`,
            }}
          />
        ))}
      </div>
    </div>
  );
}
