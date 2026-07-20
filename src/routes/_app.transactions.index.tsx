import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { getTransactions, type Transaction } from "@/lib/api";
import { TxnRow } from "./_app.home";
import { Icons } from "@/components/design-system/Icons";

export const Route = createFileRoute("/_app/transactions/")({
  component: TxnPage,
});

type Filter = "all" | "in" | "out";

function TxnPage() {
  const [txns, setTxns] = useState<Transaction[] | null>(null);
  const [filter, setFilter] = useState<Filter>("all");
  const [q, setQ] = useState("");

  useEffect(() => {
    getTransactions()
      .then(setTxns)
      .catch(() => { /* silent */ });
  }, []);

  const filtered = useMemo(() => {
    if (!txns) return null;
    return txns.filter((t) => {
      if (filter === "in" && t.type !== "credit") return false;
      if (filter === "out" && t.type !== "debit") return false;
      if (q) {
        const s = q.toLowerCase();
        if (!t.counterparty.toLowerCase().includes(s) && !t.narration.toLowerCase().includes(s))
          return false;
      }
      return true;
    });
  }, [txns, filter, q]);

  const grouped = useMemo(() => {
    if (!filtered) return null;
    const g = new Map<string, Transaction[]>();
    for (const t of filtered) {
      const key = groupKey(t.date);
      const arr = g.get(key) ?? [];
      arr.push(t);
      g.set(key, arr);
    }
    return Array.from(g.entries());
  }, [filtered]);

  return (
    <div className="flex flex-col gap-6">
      <header>
        <h1 className="text-2xl font-bold tracking-tight">Activity</h1>
        <p className="mt-1.5 text-sm text-[var(--text-secondary)]">
          Every transfer in and out of your Zola wallet.
        </p>
      </header>

      {/* Filters and search */}
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div className="inline-flex rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-elevated)] p-1">
          {(["all", "in", "out"] as Filter[]).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-1.5 text-xs font-medium rounded-lg transition-all ${
                filter === f
                  ? "bg-[var(--accent)] text-[var(--accent-foreground)]"
                  : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
              }`}
            >
              {f === "all" ? "All" : f === "in" ? "Money In" : "Money Out"}
            </button>
          ))}
        </div>
        <div className="relative md:w-64">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-[var(--text-tertiary)]">
            <Icons.Search size={14} />
          </div>
          <input
            placeholder="Search transactions"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            className="h-10 w-full rounded-xl border border-[var(--border-default)] bg-[var(--bg-secondary)] pl-9 pr-4 text-sm text-[var(--text-primary)] placeholder:text-[var(--text-tertiary)] transition-all hover:border-[var(--border-strong)] focus:border-[var(--border-focus)] focus:ring-2 focus:ring-[var(--border-focus)]"
          />
        </div>
      </div>

      {/* Transaction list */}
      <div className="flex flex-col gap-6">
        {grouped == null ? (
          <div className="space-y-3">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="flex items-center gap-4 rounded-xl px-3 py-3">
                <div className="h-10 w-10 rounded-xl skeleton" />
                <div className="flex-1 space-y-2">
                  <div className="h-3 w-32 skeleton" />
                  <div className="h-2.5 w-48 skeleton" />
                </div>
                <div className="h-4 w-16 skeleton" />
              </div>
            ))}
          </div>
        ) : grouped.length === 0 ? (
          <div className="flex flex-col items-center gap-4 rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-elevated)] px-6 py-16 text-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[var(--bg-surface)]">
              <Icons.Clock size={20} className="text-[var(--text-tertiary)]" />
            </div>
            <div className="text-sm font-medium text-[var(--text-tertiary)]">No transactions found</div>
            <p className="text-xs text-[var(--text-tertiary)]/60 max-w-xs">
              {q ? "Try a different search term." : "Your transactions will appear here."}
            </p>
          </div>
        ) : (
          grouped.map(([label, items]) => (
            <section key={label}>
              <div className="mb-2 text-xs font-semibold text-[var(--text-tertiary)] uppercase tracking-wider">
                {label}
              </div>
              <div className="flex flex-col rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-elevated)] p-2">
                {items.map((t, i) => (
                  <div key={t.id}>
                    <TxnRow t={t} />
                    {i < items.length - 1 ? <div className="mx-2 h-px bg-[var(--border-subtle)]" /> : null}
                  </div>
                ))}
              </div>
            </section>
          ))
        )}
      </div>
    </div>
  );
}

function groupKey(iso: string) {
  const d = new Date(iso);
  const today = new Date();
  const yest = new Date();
  yest.setDate(today.getDate() - 1);
  const sameDay = (a: Date, b: Date) => a.toDateString() === b.toDateString();
  if (sameDay(d, today)) return "Today";
  if (sameDay(d, yest)) return "Yesterday";
  return d.toLocaleDateString("en-NG", { month: "long", day: "numeric" });
}