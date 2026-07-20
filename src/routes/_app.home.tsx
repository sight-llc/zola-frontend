import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import {
  getBalance,
  getKycStatus,
  getTransactions,
  getVirtualAccount,
  formatNaira,
  type Transaction,
  type KycStatus,
  type VirtualAccount,
} from "@/lib/api";
import { useAuth } from "@/lib/auth";
import { useToast } from "@/lib/toast";
import { useNotifications } from "@/hooks/useNotifications";
import { useTheme } from "@/hooks/use-theme";
import { Icons } from "@/components/design-system/Icons";

export const Route = createFileRoute("/_app/home")({
  component: HomePage,
});

function greeting() {
  const h = new Date().getHours();
  if (h < 12) return "Good morning";
  if (h < 18) return "Good afternoon";
  return "Good evening";
}

function HomePage() {
  const { user } = useAuth();
  const { toast } = useToast();
  const { unreadNotifications } = useNotifications();
  const { theme, toggleTheme } = useTheme();
  const [balance, setBalance] = useState<number | null>(null);
  const [prevBalance, setPrevBalance] = useState<number | null>(null);
  const [account, setAccount] = useState<VirtualAccount | null>(null);
  const [txns, setTxns] = useState<Transaction[] | null>(null);
  const [kyc, setKyc] = useState<KycStatus | null>(null);
  const [balanceHidden, setBalanceHidden] = useState<boolean>(() => {
    if (typeof window === "undefined") return false;
    return localStorage.getItem("zola.balanceHidden") === "1";
  });
  const [balanceRevealed, setBalanceRevealed] = useState(!balanceHidden);

  useEffect(() => {
    getBalance()
      .then((b) => {
        setBalance(b.balance);
        setPrevBalance(b.balance);
      })
      .catch(() => {});
    getVirtualAccount()
      .then(setAccount)
      .catch(() => {});
    getTransactions()
      .then((t) => setTxns(t.slice(0, 5)))
      .catch(() => {});
    getKycStatus()
      .then(setKyc)
      .catch(() => {});
  }, []);

  useEffect(() => {
    const hasPayment = unreadNotifications.some((n) => n.event_type === "PAYMENT.RECEIVED");
    if (hasPayment) {
      getBalance().then((b) => setBalance(b.balance));
    }
  }, [unreadNotifications]);

  function toggleBalance() {
    setBalanceHidden((prev) => {
      const next = !prev;
      if (typeof window !== "undefined")
        localStorage.setItem("zola.balanceHidden", next ? "1" : "0");
      if (!next) {
        setBalanceRevealed(true);
        setTimeout(() => setBalanceRevealed(false), 2000);
      }
      return next;
    });
  }

  const today = new Date().toLocaleDateString("en-NG", {
    weekday: "long",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="flex flex-col gap-7 animate-stagger">
      {/* ─── Header ─── */}
      <header className="flex items-start justify-between">
        <div className="min-w-0 flex-1">
          <h1 className="text-2xl font-bold tracking-tight text-[var(--text-primary)]">
            {greeting()}, <span className="truncate inline-block max-w-[180px] align-bottom">{user?.name.split(" ")[0]}</span>
          </h1>
          <p className="mt-1 text-sm text-[var(--text-secondary)]">{today}</p>
        </div>
        <button
          onClick={toggleTheme}
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[var(--bg-surface)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-elevated)] transition-all active:scale-90 ml-3 border border-[var(--border-subtle)]"
          aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
        >
          {theme === "dark" ? <Icons.Sun size={17} /> : <Icons.Moon size={17} />}
        </button>
      </header>

      {/* ─── Balance Card ─── */}
      <div className="relative overflow-hidden rounded-2xl bg-[var(--gradient-card)] p-6 shadow-lg md:p-8">
        <div className="pointer-events-none absolute -inset-40 bg-gradient-radial from-[var(--text-primary)]/[0.03] to-transparent" />
        <div className="relative z-10">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-xs font-medium tracking-wider text-[var(--text-secondary)]/70 uppercase">
                Available balance
              </span>
              <button
                onClick={toggleBalance}
                aria-label={balanceHidden ? "Show balance" : "Hide balance"}
                className="rounded-lg p-1 text-[var(--text-tertiary)] hover:bg-[var(--bg-surface)]/30 hover:text-[var(--text-primary)] transition-all"
              >
                {balanceHidden ? <Icons.EyeOff size={14} /> : <Icons.Eye size={14} />}
              </button>
            </div>
            <span className="rounded-lg border border-[var(--border-default)] bg-[var(--bg-surface)]/20 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-widest text-[var(--text-secondary)]/60">
              Wallet
            </span>
          </div>

          <div className="mt-4">
            {balance == null ? (
              <div className="h-[2.5rem] w-48 rounded-lg bg-[var(--bg-surface)]/30 skeleton" />
            ) : balanceHidden ? (
              <div className="text-[2rem] leading-none font-bold tabular-nums tracking-tight text-[var(--text-tertiary)]">
                ₦ ••••••••
              </div>
            ) : (
              <div
                className="text-[2rem] leading-none font-bold tabular-nums tracking-tight text-[var(--text-primary)]"
                style={{
                  animation: balanceRevealed ? "balanceReveal 0.6s cubic-bezier(0.16, 1, 0.3, 1) both" : "none",
                }}
              >
                {formatNaira(balance)}
              </div>
            )}
          </div>

          {/* Virtual account details */}
          {account ? (
            <div className="mt-5 flex items-center gap-3 rounded-xl bg-[var(--bg-surface)]/20 px-4 py-3 text-sm">
              <div className="flex items-center gap-2.5 min-w-0">
                <Icons.Building size={14} className="text-[var(--text-tertiary)] shrink-0" />
                <span className="text-[var(--text-secondary)]/80 truncate">{account.bankName}</span>
              </div>
              <span className="text-[var(--text-tertiary)]/40 shrink-0">·</span>
              <span className="tabular-nums font-medium text-[var(--text-primary)]/90 truncate">{account.accountNumber}</span>
              <button
                onClick={() => {
                  navigator.clipboard.writeText(account.accountNumber);
                  toast("Account number copied");
                }}
                className="ml-auto rounded-lg border border-[var(--border-default)] bg-[var(--bg-surface)]/20 p-1.5 text-[var(--text-tertiary)] hover:bg-[var(--bg-surface)]/40 hover:text-[var(--text-primary)] transition-all shrink-0"
                aria-label="Copy account number"
              >
                <Icons.Copy size={13} />
              </button>
            </div>
          ) : null}
        </div>
      </div>

      {/* ─── Quick Actions ─── */}
      <div className="grid grid-cols-4 gap-3">
        <QuickAction
          to="/send"
          label="Send"
          icon={<Icons.ArrowUp size={18} />}
        />
        <QuickAction
          to="/receive"
          label="Top Up"
          icon={<Icons.ArrowDown size={18} />}
        />
        <QuickAction
          to="/transactions"
          label="History"
          icon={<Icons.Clock size={18} />}
        />
        <QuickAction
          label="Invite"
          icon={<Icons.Gift size={18} />}
          onClick={() => {
            navigator.clipboard.writeText("Join me on Zola");
            toast("Invite link copied");
          }}
        />
      </div>

      {/* ─── KYC Banner ─── */}
      {kyc && kyc.tier < 2 ? (
        <Link
          to="/kyc"
          className="group relative overflow-hidden rounded-xl border border-[var(--warning-bg)] bg-[var(--warning-bg)] px-5 py-4 transition-all hover:brightness-110 active:scale-[0.99]"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3 min-w-0">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[var(--warning)]/10">
                <Icons.Shield size={18} className="text-[var(--warning)]" />
              </div>
              <div className="min-w-0">
                <div className="text-sm font-semibold text-[var(--warning)]">Verify your identity</div>
                <div className="mt-0.5 text-xs text-[var(--warning)]/70 truncate">
                  Unlock higher daily limits
                </div>
              </div>
            </div>
            <Icons.ChevronRight size={16} className="text-[var(--warning)]/30 group-hover:text-[var(--warning)] transition-colors shrink-0 ml-2" />
          </div>
        </Link>
      ) : null}

      {/* ─── Quick Stats ─── */}
      <div className="grid grid-cols-2 gap-3">
        <div className="rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-elevated)] p-4 transition-all hover:border-[var(--border-default)]">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[var(--success-bg)]">
            <Icons.TrendingUp size={16} className="text-[var(--success)]" />
          </div>
          <div className="mt-3 text-lg font-bold tabular-nums text-[var(--text-primary)]">
            {txns ? txns.filter((t) => t.type === "credit").length : <span className="text-[var(--text-tertiary)]">—</span>}
          </div>
          <div className="mt-0.5 text-xs text-[var(--text-tertiary)]">Money in</div>
        </div>
        <div className="rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-elevated)] p-4 transition-all hover:border-[var(--border-default)]">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[var(--error-bg)]">
            <Icons.ArrowUp size={16} className="text-[var(--error)] rotate-45" />
          </div>
          <div className="mt-3 text-lg font-bold tabular-nums text-[var(--text-primary)]">
            {txns ? txns.filter((t) => t.type === "debit").length : <span className="text-[var(--text-tertiary)]">—</span>}
          </div>
          <div className="mt-0.5 text-xs text-[var(--text-tertiary)]">Money out</div>
        </div>
      </div>

      {/* ─── Recent Transactions ─── */}
      <section>
        <div className="mb-3 flex items-center justify-between">
          <h2 className="text-sm font-semibold text-[var(--text-primary)]">Recent activity</h2>
          <Link
            to="/transactions"
            className="text-xs font-medium text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
          >
            View all
          </Link>
        </div>

        <div className="flex flex-col gap-1">
          {txns == null ? (
            Array.from({ length: 5 }).map((_, i) => <SkeletonRow key={i} />)
          ) : txns.length === 0 ? (
            <div className="flex flex-col items-center gap-3 rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-elevated)] px-6 py-14 text-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[var(--bg-surface)]">
                <Icons.Clock size={20} className="text-[var(--text-tertiary)]" />
              </div>
              <div className="text-sm font-medium text-[var(--text-tertiary)]">No activity yet</div>
              <p className="text-xs text-[var(--text-tertiary)]/60 max-w-[220px]">
                Your transactions will appear here once you send or receive money.
              </p>
            </div>
          ) : (
            txns.map((t, i) => (
              <div key={t.id} className="animate-in" style={{ animationDelay: `${i * 30}ms` }}>
                <TxnRow t={t} />
              </div>
            ))
          )}
        </div>
      </section>
    </div>
  );
}

function QuickAction({
  to,
  label,
  icon,
  onClick,
}: {
  to?: string;
  label: string;
  icon: React.ReactNode;
  onClick?: () => void;
}) {
  const base =
    "flex flex-col items-center gap-2 rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-elevated)] py-4 text-center transition-all duration-[var(--duration-fast)] hover:border-[var(--border-default)] hover:shadow-md active:scale-[0.95]";
  const iconWrap =
    "flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--bg-surface)] text-[var(--text-primary)]";

  const content = (
    <>
      <span className={iconWrap}>{icon}</span>
      <span className="text-[11px] font-medium text-[var(--text-secondary)] leading-none">{label}</span>
    </>
  );

  if (onClick) {
    return (
      <button className={base} onClick={onClick}>
        {content}
      </button>
    );
  }

  return (
    <Link to={to!} className={base}>
      {content}
    </Link>
  );
}

export function TxnRow({ t }: { t: Transaction }) {
  const credit = t.type === "credit";
  return (
    <Link
      to="/transactions/$id"
      params={{ id: t.id }}
      className="group flex items-center gap-4 rounded-xl px-3 py-3 transition-all hover:bg-[var(--bg-surface)] -mx-1"
    >
      <div
        className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${
          credit
            ? "bg-[var(--success-bg)] text-[var(--success)]"
            : "bg-[var(--error-bg)] text-[var(--error)]"
        }`}
      >
        {credit ? (
          <Icons.ArrowDown size={16} />
        ) : (
          <Icons.ArrowUp size={16} className="rotate-45" />
        )}
      </div>
      <div className="min-w-0 flex-1">
        <div className="truncate text-sm font-medium text-[var(--text-primary)]">{t.counterparty}</div>
        <div className="truncate text-xs text-[var(--text-tertiary)] mt-0.5">{t.narration || "Transfer"}</div>
      </div>
      <div className="text-right shrink-0">
        <div
          className={`tabular-nums text-sm font-semibold ${
            credit ? "text-[var(--success)]" : "text-[var(--text-primary)]"
          }`}
        >
          {credit ? "+" : "−"} {formatNaira(t.amount, { withSymbol: false })}
        </div>
        <div className="text-[11px] text-[var(--text-tertiary)] mt-0.5">{relativeDate(t.date)}</div>
      </div>
    </Link>
  );
}

export function relativeDate(iso: string) {
  const d = new Date(iso);
  const diff = Date.now() - d.getTime();
  const h = Math.floor(diff / 3600000);
  if (h < 1) return "Just now";
  if (h < 24) return `${h}h ago`;
  const days = Math.floor(h / 24);
  if (days === 1) return "Yesterday";
  if (days < 7) return `${days}d ago`;
  return d.toLocaleDateString("en-NG", { month: "short", day: "numeric" });
}

function SkeletonRow() {
  return (
    <div className="flex items-center gap-4 rounded-xl px-3 py-3">
      <div className="h-10 w-10 rounded-xl skeleton" />
      <div className="flex-1 space-y-2">
        <div className="h-3 w-32 skeleton rounded-md" />
        <div className="h-2.5 w-48 skeleton rounded-md" />
      </div>
      <div className="h-4 w-16 skeleton rounded-md" />
    </div>
  );
}