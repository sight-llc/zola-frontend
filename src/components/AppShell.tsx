import { Link, useRouterState, useNavigate, Outlet } from "@tanstack/react-router";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { ZolaLogo } from "./ZolaLogo";
import { Icons } from "./design-system/Icons";
import { useAuth } from "@/lib/auth";
import { useToast } from "@/lib/toast";
import { useNotifications } from "@/hooks/useNotifications";

type NavItem = { to: string; label: string; icon: ReactNode };

const NAV_ITEMS: NavItem[] = [
  { to: "/home", label: "Home", icon: <Icons.Home /> },
  { to: "/send", label: "Send", icon: <Icons.Send size={18} /> },
  { to: "/receive", label: "Receive", icon: <Icons.Receive size={18} /> },
  { to: "/transactions", label: "Activity", icon: <Icons.Clock /> },
  { to: "/settings", label: "Settings", icon: <Icons.Settings /> },
];

export function AppShell() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const { user, ready, signOut } = useAuth();
  const { toast } = useToast();
  const { unreadCount, unreadNotifications, markRead } = useNotifications();
  const seenIds = useRef<Set<string>>(new Set());
  const nav = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    if (ready && !user) nav({ to: "/auth" });
  }, [ready, user, nav]);

  useEffect(() => {
    const fresh = unreadNotifications.filter((n) => !seenIds.current.has(n.id));
    if (fresh.length === 0) return;

    fresh.forEach((n) => {
      seenIds.current.add(n.id);
      toast(n.description);
    });

    markRead(fresh.map((n) => n.id));
  }, [unreadNotifications]);

  if (!ready || !user) {
    return (
      <div className="flex min-h-dvh flex-col items-center justify-center gap-4 bg-[var(--bg-primary)]">
        <img
          src="screenicon.png"
          alt="Zola"
          className="h-12 w-12 rounded-2xl bg-[var(--accent)] object-contain"
        />
        <div className="h-2 w-24 rounded-full bg-[var(--border-default)]">
          <div className="h-full w-1/2 animate-pulse rounded-full bg-[var(--accent)]" />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-dvh bg-[var(--bg-primary)] text-[var(--text-primary)]">
      {/* ─── Desktop Sidebar ─── */}
      <aside className="fixed inset-y-0 left-0 z-[var(--z-nav)] hidden w-64 flex-col border-r border-[var(--border-subtle)] bg-[var(--bg-secondary)] md:flex">
        {/* Logo */}
        <div className="flex h-16 items-center gap-2.5 px-6">
          <ZolaLogo />
        </div>

        {/* Navigation */}
        <nav className="flex flex-1 flex-col gap-1 px-3 pt-2">
          {NAV_ITEMS.map((item) => {
            const active = pathname === item.to || pathname.startsWith(item.to + "/");
            return (
              <Link
                key={item.to}
                to={item.to}
                className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-[var(--duration-fast)] ${
                  active
                    ? "bg-[var(--bg-surface)] text-[var(--text-primary)]"
                    : "text-[var(--text-secondary)] hover:bg-[var(--bg-surface)] hover:text-[var(--text-primary)]"
                }`}
              >
                <span className={`${active ? "text-[var(--accent)]" : ""}`}>{item.icon}</span>
                {item.label}
                {item.label === "Transactions" && unreadCount > 0 ? (
                  <span className="ml-auto flex h-2 w-2 rounded-full bg-red-500" />
                ) : null}
              </Link>
            );
          })}
        </nav>

        {/* Desktop user footer */}
        <div className="border-t border-[var(--border-subtle)] p-4">
          <div className="flex items-center gap-3 rounded-xl bg-[var(--bg-surface)] px-3 py-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[var(--accent)] text-xs font-bold text-[var(--accent-foreground)]">
              {user.name
                .split(" ")
                .map((n: string) => n[0])
                .slice(0, 2)
                .join("")}
            </div>
            <div className="min-w-0 flex-1">
              <div className="truncate text-sm font-medium">{user.name}</div>
              <div className="truncate text-xs text-[var(--text-tertiary)]">{user.email}</div>
            </div>
            <button
              onClick={() => {
                signOut();
                nav({ to: "/auth" });
              }}
              className="rounded-lg p-1.5 text-[var(--text-tertiary)] hover:bg-[var(--bg-elevated)] hover:text-[var(--text-primary)]"
              aria-label="Sign out"
            >
              <Icons.LogOut size={16} />
            </button>
          </div>
        </div>
      </aside>

      {/* ─── Main Content ─── */}
      <main className="md:pl-64">
        <div className="mx-auto max-w-5xl px-4 py-6 pb-28 md:px-8 md:py-10 md:pb-10">
          <Outlet />
        </div>
      </main>

      {/* ─── Mobile Bottom Navigation ─── */}
      <nav className="fixed inset-x-0 bottom-0 z-[var(--z-nav)] border-t border-[var(--border-subtle)] bg-[var(--bg-glass)] backdrop-blur-xl md:hidden safe-area-bottom">
        <div className="grid grid-cols-5">
          {NAV_ITEMS.map((item) => {
            const active = pathname === item.to || pathname.startsWith(item.to + "/");
            return (
              <Link
                key={item.to}
                to={item.to}
                className="flex flex-col items-center gap-0.5 py-2 text-[10px] font-medium"
              >
                <span
                  className={`flex h-6 w-6 items-center justify-center rounded-lg transition-colors ${
                    active
                      ? "text-[var(--accent)]"
                      : "text-[var(--text-tertiary)]"
                  }`}
                >
                  {item.icon}
                </span>
                <span
                  className={`${
                    active ? "text-[var(--text-primary)]" : "text-[var(--text-tertiary)]"
                  }`}
                >
                  {item.label}
                </span>
              </Link>
            );
          })}
        </div>
      </nav>
    </div>
  );
}