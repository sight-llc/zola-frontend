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
      .catch(() => { /* silent — fallback UI shows skeleton */ });
    getVirtualAccount()
      .then(setAccount)
      .catch(() => { /* silent */ });
    getTransactions()
      .then((t) => setTxns(t.slice(0, 5)))
      .catch(() => { /* silent */ });
    getKycStatus()
      .then(setKyc)
      .catch(() => { /* silent */ });
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
    <div className="flex flex-col gap-8 animate-stagger">
      {/* ─── Header ─── */}
      <header className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">
            {greeting()}, {user?.name.split(" ")[0]}
          </h1>
          <p className="mt-1 text-sm text-[var(--text-secondary)]">{today}</p>
        </div>
        <button className="flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--bg-surface)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors">
          <Icons.Sparkles size={18} />
        </button>
      </header>

      {/* ─── Balance Card ─── */}
      <div className="relative overflow-hidden rounded-2xl bg-[var(--gradient-card)] p-6 text-white shadow-lg md:p-8">
        {/* Decorative glow */}
        <div className="pointer-events-none absolute -inset-40 bg-gradient-radial from-white/5 to-transparent" />

        <div className="relative z-10">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-xs font-medium tracking-wider text-white/50 uppercase">
                Available balance
              </span>
              <button
                onClick={toggleBalance}
                aria-label={balanceHidden ? "Show balance" : "Hide balance"}
                className="rounded-lg p-1 text-white/40 hover:bg-white/10 hover:text-white/80 transition-all"
              >
                {balanceHidden ? <Icons.EyeOff size={14} /> : <Icons.Eye size={14} />}
              </button>
            </div>
            <span className="rounded-lg border border-white/10 bg-white/5 px-2 py-1 text-[10px] font-semibold uppercase tracking-widest text-white/50">
              Wallet
            </span>
          </div>

          <div className="mt-4">
            {balance == null ? (
              <div className="h-12 w-48 rounded-lg bg-white/10 skeleton" />
            ) : balanceHidden ? (
              <div className="text-4xl font-bold tabular-nums tracking-tight text-white/40">
                ₦ ••••••••
              </div>
            ) : (
              <div
                className="text-4xl font-bold tabular-nums tracking-tight text-white"
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
            <div className="mt-6 flex items-center gap-3 rounded-xl bg-white/5 px-4 py-3 text-sm">
              <div className="flex items-center gap-2.5">
                <Icons.Building size={14} className="text-white/50" />
                <span className="text-white/70">{account.bankName}</span>
              </div>
              <span className="text-white/30">·</span>
              <span className="tabular-nums font-medium text-white/90">{account.accountNumber}</span>
              <button
                onClick={() => {
                  navigator.clipboard.writeText(account.accountNumber);
                  toast("Account number copied");
                }}
                className="ml-auto rounded-lg border border-white/10 bg-white/5 p-1.5 text-white/60 hover:bg-white/10 hover:text-white transition-all"
                aria-label="Copy account number"
              >
                <Icons.Copy size={14} />
              </button>
            </div>
          ) : null}
        </div>
      </div>

      {/* ─── Quick Actions ─── */}
      <div className="grid grid-cols-4 gap-2 md:gap-3">
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
          className="group relative overflow-hidden rounded-xl border border-[var(--warning-bg)] bg-[var(--warning-bg)] px-5 py-4 transition-all hover:brightness-95"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--warning)]/10">
                <Icons.Shield size={18} className="text-[var(--warning)]" />
              </div>
              <div>
                <div className="text-sm font-semibold text-[var(--warning)]">Verify your identity</div>
                <div className="mt-0.5 text-xs text-[var(--warning)]/70">
                  Unlock higher daily limits
                </div>
              </div>
            </div>
            <Icons.ChevronRight size={16} className="text-[var(--warning)]/40 group-hover:text-[var(--warning)] transition-colors" />
          </div>
        </Link>
      ) : null}

      {/* ─── Quick Stats ─── */}
      <div className="grid grid-cols-2 gap-3">
        <div className="rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-elevated)] p-4">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[var(--success-bg)]">
            <Icons.TrendingUp size={16} className="text-[var(--success)]" />
          </div>
          <div className="mt-3 text-lg font-bold tabular-nums">
            {txns ? txns.filter((t) => t.type === "credit").length : "—"}
          </div>
          <div className="mt-0.5 text-xs text-[var(--text-tertiary)]">Money in</div>
        </div>
        <div className="rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-elevated)] p-4">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[var(--error-bg)]">
            <Icons.ArrowUp size={16} className="text-[var(--error)] rotate-45" />
          </div>
          <div className="mt-3 text-lg font-bold tabular-nums">
            {txns ? txns.filter((t) => t.type === "debit").length : "—"}
          </div>
          <div className="mt-0.5 text-xs text-[var(--text-tertiary)]">Money out</div>
        </div>
      </div>

      {/* ─── Recent Transactions ─── */}
      <section>
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-sm font-semibold">Recent activity</h2>
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
            <div className="flex flex-col items-center gap-3 rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-elevated)] px-6 py-12 text-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[var(--bg-surface)]">
                <Icons.Clock size={20} className="text-[var(--text-tertiary)]" />
              </div>
              <div className="text-sm text-[var(--text-tertiary)]">No activity yet</div>
              <p className="text-xs text-[var(--text-tertiary)]/60 max-w-xs">
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
    "flex flex-col items-center gap-2 rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-elevated)] p-4 text-center transition-all duration-[var(--duration-fast)] hover:border-[var(--border-default)] hover:shadow-md active:scale-[0.97]";
  const iconWrap =
    "flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--bg-surface)] text-[var(--text-primary)]";

  const content = (
    <>
      <span className={iconWrap}>{icon}</span>
      <span className="text-[11px] font-medium text-[var(--text-secondary)]">{label}</span>
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
      className="group flex items-center gap-4 rounded-xl px-3 py-3 transition-all hover:bg-[var(--bg-surface)] -mx-2"
    >
      <div
        className={`flex h-10 w-10 items-center justify-center rounded-xl ${
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
        <div className="truncate text-sm font-medium">{t.counterparty}</div>
        <div className="truncate text-xs text-[var(--text-tertiary)]">{t.narration}</div>
      </div>
      <div className="text-right">
        <div
          className={`tabular-nums text-sm font-semibold ${
            credit ? "text-[var(--success)]" : "text-[var(--text-primary)]"
          }`}
        >
          {credit ? "+" : "−"} {formatNaira(t.amount, { withSymbol: false })}
        </div>
        <div className="text-[11px] text-[var(--text-tertiary)]">{relativeDate(t.date)}</div>
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
        <div className="h-3 w-32 skeleton" />
        <div className="h-2.5 w-48 skeleton" />
      </div>
      <div className="h-4 w-16 skeleton" />
    </div>
  );
}