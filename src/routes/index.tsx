import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";
import { useAuth } from "@/lib/auth";
import { ZolaMark } from "@/components/ZolaLogo";

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
    <div className="flex min-h-screen flex-col items-center justify-center gap-3 text-muted-foreground">
      <ZolaMark className="h-8 w-8 animate-pulse text-foreground" />
      <span className="text-sm">Loading…</span>
    </div>
  );
}

