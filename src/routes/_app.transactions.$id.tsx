import { createFileRoute, Link, useRouter } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { getTransaction, formatNaira, type Transaction } from "@/lib/api";
import { useToast } from "@/lib/toast";
import { Icons } from "@/components/design-system/Icons";

export const Route = createFileRoute("/_app/transactions/$id")({
  head: () => ({
    meta: [
      { title: "Transaction — Zola" },
      { name: "description", content: "Transaction details." },
    ],
  }),
  component: TxnDetailsPage,
  notFoundComponent: () => (
    <div className="mx-auto flex max-w-[520px] flex-col items-center gap-6 pt-12">
      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[var(--bg-surface)]">
        <Icons.AlertCircle size={20} className="text-[var(--text-tertiary)]" />
      </div>
      <div className="text-sm text-[var(--text-tertiary)]">Transaction not found.</div>
      <Link to="/transactions" className="h-10 inline-flex items-center rounded-xl border border-[var(--border-default)] px-4 text-sm font-medium hover:bg-[var(--bg-surface)] transition-colors">
        Back to transactions
      </Link>
    </div>
  ),
  errorComponent: () => (
    <div className="mx-auto flex max-w-[520px] flex-col items-center gap-6 pt-12">
      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[var(--error-bg)]">
        <Icons.AlertCircle size={20} className="text-[var(--error)]" />
      </div>
      <div className="text-sm text-[var(--error)]">Something went wrong loading this transaction.</div>
      <Link to="/transactions" className="h-10 inline-flex items-center rounded-xl border border-[var(--border-default)] px-4 text-sm font-medium hover:bg-[var(--bg-surface)] transition-colors">
        Back to transactions
      </Link>
    </div>
  ),
});

function TxnDetailsPage() {
  const { id } = Route.useParams();
  const router = useRouter();
  const { toast } = useToast();
  const [txn, setTxn] = useState<Transaction | null | undefined>(undefined);

  useEffect(() => {
    let cancelled = false;
    getTransaction(id)
      .then((t) => {
        if (!cancelled) setTxn(t);
      })
      .catch(() => {
        if (!cancelled) setTxn(null);
      });
    return () => { cancelled = true; };
  }, [id]);

  if (txn === undefined) {
    return (
      <div className="mx-auto flex max-w-[520px] flex-col gap-6 pt-4">
        <div className="h-4 w-20 rounded-lg skeleton" />
        <div className="h-64 w-full rounded-2xl skeleton" />
      </div>
    );
  }

  if (txn === null) {
    return (
      <div className="mx-auto flex max-w-[520px] flex-col items-center gap-6 pt-12">
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[var(--bg-surface)]">
          <Icons.AlertCircle size={20} className="text-[var(--text-tertiary)]" />
        </div>
        <div className="text-sm text-[var(--text-tertiary)]">Transaction not found.</div>
        <Link to="/transactions" className="h-10 inline-flex items-center rounded-xl border border-[var(--border-default)] px-4 text-sm font-medium hover:bg-[var(--bg-surface)] transition-colors">
          Back to transactions
        </Link>
      </div>
    );
  }

  const credit = txn.type === "credit";
  const dateStr = new Date(txn.date).toLocaleString("en-NG", {
    weekday: "short",
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <div className="mx-auto flex max-w-[520px] flex-col gap-6">
      {/* Back */}
      <button
        onClick={() => router.history.back()}
        className="flex items-center gap-1.5 self-start text-xs font-medium text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
      >
        <Icons.ChevronLeft size={14} />
        Back
      </button>

      {/* Header */}
      <div className="flex flex-col items-center gap-4 pt-2 text-center">
        <div
          className={`flex h-16 w-16 items-center justify-center rounded-2xl ${
            credit
              ? "bg-[var(--success-bg)] text-[var(--success)]"
              : "bg-[var(--error-bg)] text-[var(--error)]"
          }`}
        >
          {credit ? <Icons.ArrowDown size={24} /> : <Icons.ArrowUp size={24} className="rotate-45" />}
        </div>
        <div>
          <div className="text-xs font-medium uppercase tracking-wider text-[var(--text-tertiary)]">
            {credit ? "Money in" : "Money out"}
          </div>
          <div className={`mt-2 text-4xl font-bold tabular-nums tracking-tight ${credit ? "text-[var(--success)]" : ""}`}>
            {credit ? "+" : "−"} {formatNaira(txn.amount)}
          </div>
          <div className="mt-1.5 text-sm text-[var(--text-secondary)]">{txn.counterparty}</div>
        </div>
      </div>

      {/* Details card */}
      <div className="rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-elevated)] p-6">
        <h3 className="text-sm font-semibold mb-4">Transaction details</h3>
        <div className="space-y-4">
          {[
            { label: "Status", value: (
              <span className="inline-flex items-center gap-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-[var(--success)]" />
                Successful
              </span>
            )},
            { label: "Type", value: credit ? "Credit" : "Debit" },
            { label: "Counterparty", value: txn.counterparty },
            { label: "Narration", value: txn.narration || "—" },
            { label: "Date", value: dateStr, mono: true },
            { label: "Fee", value: "₦ 0.00", mono: true },
          ].map((field) => (
            <div key={field.label} className="flex items-center justify-between border-b border-[var(--border-subtle)] pb-3 last:border-0 last:pb-0">
              <span className="text-xs text-[var(--text-secondary)]">{field.label}</span>
              <span className={`text-sm ${field.mono ? "tabular-nums" : ""} font-medium text-[var(--text-primary)]`}>
                {field.value}
              </span>
            </div>
          ))}
          <div className="flex items-center justify-between pt-1">
            <span className="text-xs text-[var(--text-secondary)]">Reference</span>
            <div className="flex items-center gap-2">
              <span className="text-xs tabular-nums text-[var(--text-primary)] font-medium max-w-[160px] truncate">{txn.id}</span>
              <button
                onClick={() => {
                  navigator.clipboard.writeText(txn.id);
                  toast("Reference copied");
                }}
                className="rounded-lg border border-[var(--border-default)] p-1 text-[var(--text-tertiary)] hover:bg-[var(--bg-surface)] hover:text-[var(--text-primary)] transition-all"
                aria-label="Copy reference"
              >
                <Icons.Copy size={12} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}