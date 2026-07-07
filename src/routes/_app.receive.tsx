import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui-kit";
import { ZolaMark } from "@/components/ZolaLogo";
import { getVirtualAccount, type VirtualAccount } from "@/lib/api";
import { useToast } from "@/lib/toast";

export const Route = createFileRoute("/_app/receive")({
  component: ReceivePage,
});

function ReceivePage() {
  const [acct, setAcct] = useState<VirtualAccount | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    getVirtualAccount().then(setAcct);
  }, []);

  function copy(text: string, label: string) {
    navigator.clipboard.writeText(text);
    toast(`${label} copied`);
  }

  function share() {
    if (!acct) return;
    const str = `Bank: ${acct.bankName} | Account: ${acct.accountNumber} | Name: ${acct.accountName} | Ref: Zola`;
    if (navigator.share) {
      navigator
        .share({ title: "My Zola account", text: str })
        .catch(() => copy(str, "Account details"));
    } else {
      copy(str, "Account details");
    }
  }

  return (
    <div className="mx-auto flex max-w-[520px] flex-col gap-8">
      <header className="text-center">
        <h1 className="text-2xl font-semibold tracking-tight">Receive money</h1>
        <p className="mx-auto mt-1.5 max-w-sm text-sm text-muted-foreground">
          Share your account details to receive transfers from any Nigerian bank.
        </p>
      </header>

      <div className="rounded-lg border border-border bg-[#0A0A0A] p-6 text-white dark:bg-[#141414]">
        <div className="flex items-start justify-between">
          <ZolaMark className="h-5 w-5 text-white" />
          <span className="text-[10px] uppercase tracking-widest text-white/40">NUBAN</span>
        </div>
        <FieldRow
          label="Account number"
          value={acct?.accountNumber ?? "———————"}
          mono
          onCopy={() => acct && copy(acct.accountNumber, "Account number")}
        />
        <FieldRow
          label="Bank"
          value={acct?.bankName ?? "—"}
          onCopy={() => acct && copy(acct.bankName, "Bank name")}
        />
        <FieldRow
          label="Account name"
          value={acct?.accountName ?? "—"}
          onCopy={() => acct && copy(acct.accountName, "Account name")}
          last
        />
      </div>

      <Button size="lg" onClick={share}>
        Share details
      </Button>
    </div>
  );
}

function FieldRow({
  label,
  value,
  mono,
  onCopy,
  last,
}: {
  label: string;
  value: string;
  mono?: boolean;
  onCopy: () => void;
  last?: boolean;
}) {
  return (
    <div
      className={`flex items-center justify-between gap-4 py-4 ${last ? "" : "border-b border-white/10"} mt-2`}
    >
      <div>
        <div className="text-[11px] uppercase tracking-wider text-white/50">{label}</div>
        <div
          className={`mt-1 ${mono ? "font-mono text-xl tabular tracking-wider" : "text-base font-medium"} text-white`}
        >
          {value}
        </div>
      </div>
      <button
        onClick={onCopy}
        className="rounded-md border border-white/15 px-2.5 py-1.5 text-xs text-white/80 hover:bg-white/5 hover:text-white transition-colors"
        aria-label={`Copy ${label}`}
      >
        Copy
      </button>
    </div>
  );
}
