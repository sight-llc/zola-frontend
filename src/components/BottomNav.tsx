import { Link, useRouterState } from "@tanstack/react-router";
import { type ReactNode } from "react";
import { Icons } from "./design-system/Icons";

type NavItem = {
  to: string;
  label: string;
  icon: ReactNode;
};

const NAV_ITEMS: NavItem[] = [
  { to: "/home", label: "Home", icon: <Icons.Home /> },
  { to: "/send", label: "Send", icon: <Icons.Send size={18} /> },
  { to: "/receive", label: "Receive", icon: <Icons.Receive size={18} /> },
  { to: "/transactions", label: "Activity", icon: <Icons.Clock /> },
];

export function BottomNav() {
  const pathname = useRouterState({
    select: (s) => s.location.pathname,
  });

  const isActive = (to: string) =>
    pathname === to || pathname.startsWith(to + "/");

  return (
    <nav className="fixed inset-x-0 bottom-0 z-[var(--z-nav)] pointer-events-none md:hidden safe-area-bottom">
      <div className="flex items-end justify-center gap-3 px-4 pb-4">
        {/* Main navigation pill */}
        <div className="pointer-events-auto flex items-center gap-1 rounded-full border border-[var(--border-subtle)] bg-[var(--bg-glass)] p-1.5 shadow-lg backdrop-blur-xl">
          {NAV_ITEMS.map((item) => {
            const active = isActive(item.to);

            return (
              <Link
                key={item.to}
                to={item.to}
                className={`flex h-14 min-w-14 flex-col items-center justify-center gap-0.5 rounded-full px-3 transition-all ${
                  active
                    ? "bg-[var(--bg-surface)] text-[var(--text-primary)] shadow-sm"
                    : "text-[var(--text-tertiary)] hover:text-[var(--text-secondary)]"
                }`}
              >
                <span
                  className={`transition-colors ${
                    active
                      ? "text-[var(--accent)]"
                      : "text-[var(--text-tertiary)]"
                  }`}
                >
                  {item.icon}
                </span>

                <span className="text-[10px] font-medium">
                  {item.label}
                </span>
              </Link>
            );
          })}
        </div>

        {/* Detached settings button */}
        <Link
          to="/settings"
          className={`pointer-events-auto flex h-15 w-15 mb-[5px] shrink-0 items-center justify-center rounded-full border border-[var(--border-subtle)] bg-[var(--bg-glass)] shadow-lg backdrop-blur-xl transition-all ${
            isActive("/settings")
              ? "text-[var(--accent)]"
              : "text-[var(--text-tertiary)] hover:text-[var(--text-secondary)]"
          }`}
        >
          <Icons.Settings size={20} />
        </Link>
      </div>
    </nav>
  );
}