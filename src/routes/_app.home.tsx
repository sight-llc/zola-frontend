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
import { Card } from "@/components/ui-kit";
import { ZolaMark } from "@/components/ZolaLogo";

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
  const [balance, setBalance] = useState<number | null>(null);
  const [account, setAccount] = useState<VirtualAccount | null>(null);
  const [txns, setTxns] = useState<Transaction[] | null>(null);
  const [kyc, setKyc] = useState<KycStatus | null>(null);
  const [balanceHidden, setBalanceHidden] = useState<boolean>(() => {
    if (typeof window === "undefined") return false;
    return localStorage.getItem("zola.balanceHidden") === "1";
  });

  useEffect(() => {
    getBalance().then((b) => setBalance(b.balance));
    getVirtualAccount().then(setAccount);
    getTransactions().then((t) => setTxns(t.slice(0, 6)));
    getKycStatus().then(setKyc);
  }, []);

  function toggleBalance() {
    setBalanceHidden((prev) => {
      const next = !prev;
      if (typeof window !== "undefined")
        localStorage.setItem("zola.balanceHidden", next ? "1" : "0");
      return next;
    });
  }

  const today = new Date().toLocaleDateString("en-NG", {
    weekday: "long",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="flex flex-col gap-6">
      <header>
        <h1 className="text-2xl font-semibold tracking-tight">
          {greeting()}, {user?.name.split(" ")[0]}
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">{today}</p>
      </header>

      {/* Balance card */}
      <div className="rounded-lg border border-border bg-[#0A0A0A] p-6 text-white dark:bg-[#141414]">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-2">
            <div className="text-xs uppercase tracking-wider text-white/50">Available balance</div>
            <button
              onClick={toggleBalance}
              aria-label={balanceHidden ? "Show balance" : "Hide balance"}
              className="rounded-md p-1 text-white/50 hover:bg-white/5 hover:text-white/80 transition-colors"
            >
              {balanceHidden ? <EyeOffIcon /> : <EyeIcon />}
            </button>
          </div>
          <span className="rounded border border-white/15 px-2 py-0.5 text-[10px] uppercase tracking-widest text-white/60">
            ZOLA
          </span>
        </div>
        <div className="mt-3 text-4xl font-bold tabular tracking-tight">
          {balance == null ? (
            <span className="text-white/30">₦ ——,———.——</span>
          ) : balanceHidden ? (
            <span className="text-white/60">₦ ••••••••</span>
          ) : (
            formatNaira(balance)
          )}
        </div>
        {account ? (
          <div className="mt-6 flex items-center gap-3 text-sm text-white/70">
            <span className="tabular">{account.accountNumber}</span>
            <span className="text-white/40">·</span>
            <span>{account.bankName}</span>
            <button
              onClick={() => {
                navigator.clipboard.writeText(account.accountNumber);
                toast("Account number copied");
              }}
              aria-label="Copy account number"
              className="ml-auto rounded-md border border-white/15 p-1.5 text-white/70 hover:bg-white/5 hover:text-white transition-colors"
            >
              <CopyIcon />
            </button>
          </div>
        ) : null}
      </div>

      {/* KYC banner */}
      {kyc && kyc.tier < 2 ? (
        <Link
          to="/kyc"
          className="group flex items-center justify-between rounded-lg border border-border bg-surface px-4 py-3 text-sm hover:bg-background transition-colors"
        >
          <span className="text-foreground">Verify your identity to unlock higher limits</span>
          <span className="text-muted-foreground group-hover:text-foreground">→</span>
        </Link>
      ) : null}

      {/* Quick actions */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        <QuickAction to="/send" label="Send Money" icon={<ArrowIcon rotate={-45} />} />
        <QuickAction to="/receive" label="Add Money" icon={<ArrowIcon rotate={135} />} />
        <QuickAction to="/transactions" label="Transactions" icon={<ListSmall />} />
        <QuickAction to="/settings" onClickCopy label="Invite" icon={<PlusSmall />} />
      </div>

      {/* Recent transactions */}
      <section>
        <div className="mb-3 flex items-center justify-between">
          <h2 className="text-sm font-semibold tracking-tight">Recent transactions</h2>
          <Link
            to="/transactions"
            className="text-xs font-medium text-muted-foreground hover:text-foreground"
          >
            View all
          </Link>
        </div>
        <div className="flex flex-col">
          {txns == null ? (
            Array.from({ length: 5 }).map((_, i) => <SkeletonRow key={i} />)
          ) : txns.length === 0 ? (
            <div className="py-8 text-center text-sm text-muted-foreground">
              No transactions yet
            </div>
          ) : (
            txns.map((t, i) => (
              <div key={t.id}>
                <TxnRow t={t} />
                {i < txns.length - 1 ? <div className="h-px bg-border" /> : null}
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
  onClickCopy,
}: {
  to: string;
  label: string;
  icon: React.ReactNode;
  onClickCopy?: boolean;
}) {
  const { toast } = useToast();
  const cls =
    "flex flex-col items-start gap-3 rounded-lg border border-border bg-background p-4 text-left transition-colors hover:bg-surface";
  const content = (
    <>
      <span className="rounded-md border border-border p-1.5 text-foreground">{icon}</span>
      <span className="text-sm font-medium text-foreground">{label}</span>
    </>
  );
  if (onClickCopy) {
    return (
      <button
        className={cls}
        onClick={() => {
          navigator.clipboard.writeText("Join me on Zola: https://zola.app");
          toast("Invite link copied");
        }}
      >
        {content}
      </button>
    );
  }
  return (
    <Link to={to} className={cls}>
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
      className="flex items-center gap-4 py-3.5 rounded-md transition-colors hover:bg-surface -mx-2 px-2"
    >
      <div className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-surface text-xs font-semibold text-foreground">
        {t.counterparty
          .split(" ")
          .map((w) => w[0])
          .slice(0, 2)
          .join("")}
      </div>
      <div className="min-w-0 flex-1">
        <div className="truncate text-sm font-medium text-foreground">{t.counterparty}</div>
        <div className="truncate text-xs text-muted-foreground">{t.narration}</div>
      </div>
      <div className="text-right">
        <div className="tabular text-sm font-semibold text-foreground">
          {credit ? "+" : "−"} {formatNaira(t.amount, { withSymbol: false })}
        </div>
        <div className="text-[11px] text-muted-foreground">{relativeDate(t.date)}</div>
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
    <div className="flex items-center gap-4 py-3.5 animate-pulse">
      <div className="h-10 w-10 rounded-full bg-surface" />
      <div className="flex-1 space-y-2">
        <div className="h-3 w-32 rounded bg-surface" />
        <div className="h-2.5 w-48 rounded bg-surface" />
      </div>
      <div className="h-4 w-16 rounded bg-surface" />
    </div>
  );
}

function CopyIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-4 w-4"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="9" y="9" width="11" height="11" rx="2" />
      <path d="M5 15V5a2 2 0 0 1 2-2h10" />
    </svg>
  );
}
function ArrowIcon({ rotate = 0 }: { rotate?: number }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-4 w-4"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      style={{ transform: `rotate(${rotate}deg)` }}
    >
      <path d="M5 12h14M13 5l7 7-7 7" />
    </svg>
  );
}
function ListSmall() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-4 w-4"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
    >
      <path d="M4 6h16M4 12h16M4 18h16" />
    </svg>
  );
}
function PlusSmall() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-4 w-4"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
    >
      <path d="M12 5v14M5 12h14" />
    </svg>
  );
}
function EyeIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-4 w-4"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12Z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}
function EyeOffIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-4 w-4"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M17.94 17.94A10.94 10.94 0 0 1 12 19c-6.5 0-10-7-10-7a19.6 19.6 0 0 1 4.22-5.06M9.9 4.24A10.94 10.94 0 0 1 12 4c6.5 0 10 7 10 7a19.62 19.62 0 0 1-3.17 4.19M1 1l22 22" />
      <path d="M14.12 14.12a3 3 0 1 1-4.24-4.24" />
    </svg>
  );
}

// unused but kept to avoid tree-shake noise
export { ZolaMark };
