import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { Input } from "@/components/ui-kit";
import { getTransactions, type Transaction } from "@/lib/api";
import { TxnRow } from "./_app.home";

export const Route = createFileRoute("/_app/transactions/")({
  component: TxnPage,
});

type Filter = "all" | "in" | "out";

function TxnPage() {
  const [txns, setTxns] = useState<Transaction[] | null>(null);
  const [filter, setFilter] = useState<Filter>("all");
  const [q, setQ] = useState("");

  useEffect(() => { getTransactions().then(setTxns); }, []);

  const filtered = useMemo(() => {
    if (!txns) return null;
    return txns.filter((t) => {
      if (filter === "in" && t.type !== "credit") return false;
      if (filter === "out" && t.type !== "debit") return false;
      if (q) {
        const s = q.toLowerCase();
        if (!t.counterparty.toLowerCase().includes(s) && !t.narration.toLowerCase().includes(s)) return false;
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
        <h1 className="text-2xl font-semibold tracking-tight">Transactions</h1>
        <p className="mt-1 text-sm text-muted-foreground">Every transfer in and out of your Zola wallet.</p>
      </header>

      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div className="inline-flex rounded-md border border-border bg-background p-0.5">
          {(["all", "in", "out"] as Filter[]).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-3.5 py-1.5 text-xs font-medium rounded-[4px] transition-colors ${filter === f ? "bg-foreground text-background" : "text-muted-foreground hover:text-foreground"}`}
            >
              {f === "all" ? "All" : f === "in" ? "Money In" : "Money Out"}
            </button>
          ))}
        </div>
        <div className="md:w-72">
          <Input placeholder="Search by name or narration" value={q} onChange={(e) => setQ(e.target.value)} />
        </div>
      </div>

      <div className="flex flex-col gap-6">
        {grouped == null ? (
          <div className="text-sm text-muted-foreground">Loading…</div>
        ) : grouped.length === 0 ? (
          <div className="rounded-lg border border-border bg-surface py-16 text-center text-sm text-muted-foreground">
            No transactions found
          </div>
        ) : (
          grouped.map(([label, items]) => (
            <section key={label}>
              <div className="mb-1 text-[11px] font-medium uppercase tracking-widest text-muted-foreground">{label}</div>
              <div className="flex flex-col">
                {items.map((t, i) => (
                  <div key={t.id}>
                    <TxnRow t={t} />
                    {i < items.length - 1 ? <div className="h-px bg-border" /> : null}
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
  const yest = new Date(); yest.setDate(today.getDate() - 1);
  const sameDay = (a: Date, b: Date) => a.toDateString() === b.toDateString();
  if (sameDay(d, today)) return "Today";
  if (sameDay(d, yest)) return "Yesterday";
  return d.toLocaleDateString("en-NG", { month: "long", day: "numeric" });
}
