import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { getVirtualAccount, type VirtualAccount } from "@/lib/api";
import { useToast } from "@/lib/toast";
import { Icons } from "@/components/design-system/Icons";

export const Route = createFileRoute("/_app/receive")({
  component: ReceivePage,
});

function ReceivePage() {
  const [acct, setAcct] = useState<VirtualAccount | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    getVirtualAccount()
      .then(setAcct)
      .catch(() => { });
  }, []);

  function copy(text: string, label: string) {
    navigator.clipboard.writeText(text);
    toast(`${label} copied`);
  }

  function share() {
    if (!acct) return;
    const str = `Bank: ${acct.bankName} | Account: ${acct.accountNumber} | Name: ${acct.accountName} | Ref: Zola`;
    if (navigator.share) {
      navigator.share({ title: "My Zola account", text: str }).catch(() => copy(str, "Account details"));
    } else {
      copy(str, "Account details");
    }
  }

  return (
    <div className="mx-auto flex max-w-[520px] flex-col gap-8">
      <header className="text-center">
        <h1 className="text-2xl font-bold tracking-tight">Receive money</h1>
        <p className="mx-auto mt-1.5 max-w-sm text-sm text-[var(--text-secondary)]">
          Share your account details to receive transfers from any Nigerian bank.
        </p>
      </header>

      {/* Premium account card */}
      <div className="relative overflow-hidden rounded-2xl bg-[var(--gradient-card)] p-6 text-white shadow-lg md:p-8">
        <div className="pointer-events-none absolute -inset-40 bg-gradient-radial from-white/5 to-transparent" />
        <div className="relative z-10">
          <div className="flex items-center justify-between">
            <Icons.Wallet size={20} className="text-white/70" />
            <span className="rounded-lg border border-white/10 bg-white/5 px-2 py-1 text-[10px] font-semibold uppercase tracking-widest text-white/50">
              NUBAN
            </span>
          </div>

          <div className="mt-6 space-y-5">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-[10px] uppercase tracking-wider text-white/40">Account number</div>
                <div className="mt-1 font-mono text-xl font-semibold tabular-nums tracking-wider text-white">
                  {acct?.accountNumber ?? "———————"}
                </div>
              </div>
              <button
                onClick={() => acct && copy(acct.accountNumber, "Account number")}
                className="rounded-lg border border-white/10 bg-white/5 p-2 text-white/60 hover:bg-white/10 hover:text-white transition-all"
                aria-label="Copy account number"
              >
                <Icons.Copy size={14} />
              </button>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <div className="text-[10px] uppercase tracking-wider text-white/40">Bank</div>
                <div className="mt-1 text-sm font-medium text-white">
                  {acct?.bankName ?? "—"}
                </div>
              </div>
              <button
                onClick={() => acct && copy(acct.bankName, "Bank name")}
                className="rounded-lg p-1.5 text-white/40 hover:text-white/70 transition-colors"
                aria-label="Copy bank name"
              >
                <Icons.Copy size={12} />
              </button>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <div className="text-[10px] uppercase tracking-wider text-white/40">Account name</div>
                <div className="mt-1 text-sm font-medium text-white">
                  {acct?.accountName ?? "—"}
                </div>
              </div>
              <button
                onClick={() => acct && copy(acct.accountName, "Account name")}
                className="rounded-lg p-1.5 text-white/40 hover:text-white/70 transition-colors"
                aria-label="Copy account name"
              >
                <Icons.Copy size={12} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Share button */}
      <button
        onClick={share}
        className="h-12 w-full rounded-2xl bg-[var(--accent)] text-sm font-semibold text-[var(--accent-foreground)] transition-all hover:bg-[var(--accent-hover)] active:scale-[0.98] inline-flex items-center justify-center gap-2"
      >
        <Icons.Share2 size={16} />
        Share details
      </button>

      {/* Info */}
      <div className="rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-elevated)] p-5">
        <h3 className="flex items-center gap-2 text-sm font-semibold">
          <Icons.Info size={16} className="text-[var(--text-tertiary)]" />
          How it works
        </h3>
        <ul className="mt-3 space-y-2 text-xs text-[var(--text-secondary)]">
          <li className="flex items-start gap-2">
            <span className="mt-1 h-1 w-1 rounded-full bg-[var(--text-tertiary)] shrink-0" />
            Share your account number and bank name with the sender.
          </li>
          <li className="flex items-start gap-2">
            <span className="mt-1 h-1 w-1 rounded-full bg-[var(--text-tertiary)] shrink-0" />
            They initiate a transfer from any Nigerian bank app.
          </li>
          <li className="flex items-start gap-2">
            <span className="mt-1 h-1 w-1 rounded-full bg-[var(--text-tertiary)] shrink-0" />
            Funds appear in your Zola wallet instantly.
          </li>
        </ul>
      </div>
    </div>
  );
}