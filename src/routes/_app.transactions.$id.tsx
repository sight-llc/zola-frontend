import { createFileRoute, Link, useRouter } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Card } from "@/components/ui-kit";
import { getTransaction, formatNaira, type Transaction } from "@/lib/api";
import { useToast } from "@/lib/toast";

export const Route = createFileRoute("/_app/transactions/$id")({
  head: () => ({
    meta: [
      { title: "Transaction — Zola" },
      { name: "description", content: "Transaction details." },
    ],
  }),
  component: TxnDetailsPage,
  notFoundComponent: () => (
    <div className="mx-auto flex max-w-[520px] flex-col gap-4">
      <div className="text-sm text-muted-foreground">Transaction not found.</div>
      <Link to="/transactions" className="text-sm font-medium underline underline-offset-2">Back to transactions</Link>
    </div>
  ),
  errorComponent: () => (
    <div className="mx-auto flex max-w-[520px] flex-col gap-4">
      <div className="text-sm text-danger">Something went wrong loading this transaction.</div>
      <Link to="/transactions" className="text-sm font-medium underline underline-offset-2">Back to transactions</Link>
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
    getTransaction(id).then((t) => { if (!cancelled) setTxn(t); });
    return () => { cancelled = true; };
  }, [id]);

  if (txn === undefined) {
    return (
      <div className="mx-auto flex max-w-[520px] flex-col gap-6">
        <div className="h-4 w-24 animate-pulse rounded bg-surface" />
        <div className="h-48 w-full animate-pulse rounded-lg bg-surface" />
      </div>
    );
  }

  if (txn === null) {
    return (
      <div className="mx-auto flex max-w-[520px] flex-col gap-4">
        <div className="text-sm text-muted-foreground">Transaction not found.</div>
        <Link to="/transactions" className="text-sm font-medium underline underline-offset-2">Back to transactions</Link>
      </div>
    );
  }

  const credit = txn.type === "credit";
  const dateStr = new Date(txn.date).toLocaleString("en-NG", {
    weekday: "short", month: "short", day: "numeric", year: "numeric",
    hour: "2-digit", minute: "2-digit",
  });

  return (
    <div className="mx-auto flex max-w-[520px] flex-col gap-6">
      <button
        onClick={() => router.history.back()}
        className="inline-flex items-center gap-1.5 self-start text-xs font-medium text-muted-foreground hover:text-foreground transition-colors"
      >
        <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 18l-6-6 6-6" /></svg>
        Back
      </button>

      <header className="flex flex-col items-center gap-3 pt-2">
        <div className="flex h-14 w-14 items-center justify-center rounded-full border border-border bg-surface text-sm font-semibold text-foreground">
          {txn.counterparty.split(" ").map((w) => w[0]).slice(0, 2).join("")}
        </div>
        <div className="text-center">
          <div className="text-xs uppercase tracking-widest text-muted-foreground">
            {credit ? "Money in" : "Money out"}
          </div>
          <div className="mt-1 text-3xl font-bold tabular tracking-tight text-foreground">
            {credit ? "+" : "−"} {formatNaira(txn.amount)}
          </div>
          <div className="mt-1 text-sm text-muted-foreground">{txn.counterparty}</div>
        </div>
      </header>

      <Card>
        <dl className="grid grid-cols-3 gap-y-3.5 text-sm">
          <dt className="text-muted-foreground">Status</dt>
          <dd className="col-span-2 inline-flex items-center gap-1.5 text-foreground">
            <span className="h-1.5 w-1.5 rounded-full bg-foreground" />
            Successful
          </dd>

          <dt className="text-muted-foreground">Type</dt>
          <dd className="col-span-2 text-foreground">{credit ? "Credit" : "Debit"}</dd>

          <dt className="text-muted-foreground">Counterparty</dt>
          <dd className="col-span-2 text-foreground">{txn.counterparty}</dd>

          {txn.bank ? (
            <>
              <dt className="text-muted-foreground">Bank</dt>
              <dd className="col-span-2 text-foreground">{txn.bank}</dd>
            </>
          ) : null}

          <dt className="text-muted-foreground">Narration</dt>
          <dd className="col-span-2 text-foreground">{txn.narration || "—"}</dd>

          <dt className="text-muted-foreground">Date</dt>
          <dd className="col-span-2 tabular text-foreground">{dateStr}</dd>

          <dt className="text-muted-foreground">Fee</dt>
          <dd className="col-span-2 tabular text-foreground">₦ 0.00</dd>

          <dt className="text-muted-foreground">Reference</dt>
          <dd className="col-span-2 flex items-center gap-2">
            <span className="tabular text-foreground truncate">{txn.id}</span>
            <button
              onClick={() => { navigator.clipboard.writeText(txn.id); toast("Reference copied"); }}
              aria-label="Copy reference"
              className="rounded-md border border-border p-1 text-muted-foreground hover:bg-surface hover:text-foreground transition-colors"
            >
              <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                <rect x="9" y="9" width="11" height="11" rx="2" />
                <path d="M5 15V5a2 2 0 0 1 2-2h10" />
              </svg>
            </button>
          </dd>
        </dl>
      </Card>
    </div>
  );
}
