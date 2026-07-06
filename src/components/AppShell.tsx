import { Link, useRouterState, useNavigate, Outlet } from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";
import { ZolaLogo, ZolaMark } from "./ZolaLogo";
import { useAuth } from "@/lib/auth";

type NavItem = { to: string; label: string; icon: ReactNode };

const HomeIcon = <IconWrap><path d="M3 11 12 4l9 7v9a1 1 0 0 1-1 1h-5v-6h-6v6H4a1 1 0 0 1-1-1z" /></IconWrap>;
const SendIcon = <IconWrap><path d="M4 20 20 4M20 4v10M20 4H10" /></IconWrap>;
const ReceiveIcon = <IconWrap><path d="M20 4 4 20M4 20V10M4 20h10" /></IconWrap>;
const ListIcon = <IconWrap><path d="M4 6h16M4 12h16M4 18h16" /></IconWrap>;
const CogIcon = <IconWrap><circle cx="12" cy="12" r="3" /><path d="M12 2v3M12 19v3M4.2 4.2l2.1 2.1M17.7 17.7l2.1 2.1M2 12h3M19 12h3M4.2 19.8l2.1-2.1M17.7 6.3l2.1-2.1" /></IconWrap>;

function IconWrap({ children }: { children: ReactNode }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
      {children}
    </svg>
  );
}

const NAV: NavItem[] = [
  { to: "/home", label: "Home", icon: HomeIcon },
  { to: "/send", label: "Send", icon: SendIcon },
  { to: "/receive", label: "Receive", icon: ReceiveIcon },
  { to: "/transactions", label: "Transactions", icon: ListIcon },
  { to: "/settings", label: "Settings", icon: CogIcon },
];

const MOBILE_NAV = NAV.slice(0, 4);

export function AppShell() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const { user, ready, signOut } = useAuth();
  const nav = useNavigate();

  useEffect(() => {
    if (ready && !user) nav({ to: "/auth" });
  }, [ready, user, nav]);

  if (!ready || !user) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-3 text-muted-foreground">
        <ZolaMark className="h-8 w-8 animate-pulse text-foreground" />
        <span className="text-sm">Loading…</span>
      </div>
    );
  }


  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Desktop sidebar */}
      <aside className="fixed inset-y-0 left-0 z-20 hidden w-60 flex-col border-r border-border bg-background md:flex">
        <div className="flex h-16 items-center px-5">
          <ZolaLogo />
        </div>
        <nav className="flex flex-1 flex-col gap-0.5 px-3">
          {NAV.map((item) => {
            const active = pathname === item.to || pathname.startsWith(item.to + "/");
            return (
              <Link
                key={item.to}
                to={item.to}
                className={`flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors duration-150 ${active ? "bg-surface text-foreground" : "text-muted-foreground hover:bg-surface hover:text-foreground"}`}
              >
                {item.icon}
                {item.label}
              </Link>
            );
          })}
        </nav>
        <div className="border-t border-border p-4">
          <div className="mb-2 text-xs font-medium text-foreground truncate">{user.name}</div>
          <div className="mb-3 text-xs text-muted-foreground truncate">{user.email}</div>
          <button
            onClick={() => {
              signOut();
              nav({ to: "/auth" });
            }}
            className="text-xs text-muted-foreground hover:text-foreground"
          >
            Sign out
          </button>
        </div>
      </aside>

      {/* Main */}
      <main className="md:pl-60">
        <div className="mx-auto max-w-5xl px-5 py-8 pb-24 md:py-10 md:pb-10">
          <Outlet />
        </div>
      </main>

      {/* Mobile bottom nav */}
      <nav className="fixed inset-x-0 bottom-0 z-20 border-t border-border bg-background md:hidden">
        <div className="grid grid-cols-4">
          {MOBILE_NAV.map((item) => {
            const active = pathname === item.to || pathname.startsWith(item.to + "/");
            return (
              <Link
                key={item.to}
                to={item.to}
                className={`flex flex-col items-center gap-1 py-2.5 text-[11px] font-medium ${active ? "text-foreground" : "text-muted-foreground"}`}
              >
                {item.icon}
                {item.label}
              </Link>
            );
          })}
        </div>
      </nav>
    </div>
  );
}
