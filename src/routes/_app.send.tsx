import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Button, Card, Input } from "@/components/ui-kit";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { NG_BANKS, formatNaira, getBalance, resolveAccount, sendMoney } from "@/lib/api";
import { useToast } from "@/lib/toast";

export const Route = createFileRoute("/_app/send")({
  component: SendPage,
});

type Step = 1 | 2 | 3 | 4;

function SendPage() {
  const [step, setStep] = useState<Step>(1);
  const [bankCode, setBankCode] = useState("058");
  const [accountNumber, setAccountNumber] = useState("");
  const [resolving, setResolving] = useState(false);
  const [resolved, setResolved] = useState<{ name: string; bank: string } | null>(null);
  const [amount, setAmount] = useState("");
  const [narration, setNarration] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [reference, setReference] = useState<string | null>(null);
  const [balance, setBalance] = useState<number>(0);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  useEffect(() => { getBalance().then((b) => setBalance(b.balance)); }, []);

  useEffect(() => {
    setResolved(null);
    setError(null);
    if (accountNumber.length === 10) {
      setResolving(true);
      resolveAccount(bankCode, accountNumber)
        .then((r) => setResolved({ name: r.accountName, bank: r.bankName }))
        .catch((e) => setError(e.message))
        .finally(() => setResolving(false));
    }
  }, [accountNumber, bankCode]);

  const amountNum = Number(amount.replace(/[^0-9.]/g, "")) || 0;

  async function submit() {
    if (!resolved) return;
    setSubmitting(true);
    try {
      const res = await sendMoney(bankCode, accountNumber, resolved.name, amountNum, narration);
      setReference(res.reference);
      setStep(4);
      toast("Transfer successful");
    } catch (e) {
      setError(e instanceof Error ? e.message : "Transfer failed");
    } finally {
      setSubmitting(false);
    }
  }

  function reset() {
    setStep(1); setAccountNumber(""); setResolved(null); setAmount(""); setNarration(""); setReference(null); setError(null);
  }

  return (
    <div className="mx-auto flex max-w-[480px] flex-col gap-6">
      <header>
        <h1 className="text-2xl font-semibold tracking-tight">Send money</h1>
        <p className="mt-1 text-sm text-muted-foreground">Transfer to any Nigerian bank account.</p>
      </header>

      <Stepper current={step} />

      {step === 1 ? (
        <Card>
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-medium text-muted-foreground">Recipient bank</label>
              <Select value={bankCode} onValueChange={setBankCode}>
                <SelectTrigger className="h-10 w-full rounded-md border border-border bg-background px-3 text-sm text-foreground shadow-none ring-offset-background hover:bg-surface focus:ring-2 focus:ring-ring focus:ring-offset-0 transition-colors [&_svg]:text-muted-foreground">
                  <SelectValue placeholder="Choose a bank" />
                </SelectTrigger>
                <SelectContent className="rounded-md border border-border bg-background text-foreground shadow-lg">
                  {NG_BANKS.map((b) => (
                    <SelectItem
                      key={b.code}
                      value={b.code}
                      className="rounded-sm px-2 py-2 text-sm text-foreground focus:bg-surface focus:text-foreground data-[state=checked]:bg-surface"
                    >
                      {b.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <Input
              label="Account number"
              inputMode="numeric"
              maxLength={10}
              value={accountNumber}
              onChange={(e) => setAccountNumber(e.target.value.replace(/[^0-9]/g, ""))}
              placeholder="10 digits"
              error={error ?? undefined}
            />
            {resolving ? <div className="rounded-md border border-border bg-surface px-3 py-2 text-xs text-muted-foreground">Resolving…</div> : null}
            {resolved ? (
              <div className="rounded-md border border-border bg-surface px-3 py-2 text-xs font-medium text-foreground">
                {resolved.name} · {resolved.bank}
              </div>
            ) : null}
            <Button size="lg" disabled={!resolved} onClick={() => setStep(2)}>Continue</Button>
          </div>
        </Card>
      ) : null}

      {step === 2 && resolved ? (
        <Card>
          <div className="flex flex-col gap-6">
            <div className="rounded-md border border-border bg-surface px-3 py-2 text-xs">
              To <span className="font-medium">{resolved.name}</span> · {resolved.bank}
            </div>

            <div className="flex flex-col items-center gap-1">
              <div className="flex items-baseline gap-1 border-b border-border pb-2">
                <span className="text-2xl font-semibold text-muted-foreground">₦</span>
                <input
                  autoFocus
                  inputMode="decimal"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value.replace(/[^0-9.]/g, ""))}
                  placeholder="0.00"
                  className="w-52 bg-transparent text-center text-4xl font-semibold tabular text-foreground placeholder:text-muted-foreground focus:outline-none"
                />
              </div>
              <div className="text-xs text-muted-foreground">Available: {formatNaira(balance)}</div>
            </div>

            <Input label="Narration (optional)" placeholder="What's this for?" value={narration} onChange={(e) => setNarration(e.target.value)} />

            <div className="flex gap-2">
              <Button variant="outline" onClick={() => setStep(1)}>Back</Button>
              <Button size="lg" className="flex-1" disabled={amountNum <= 0 || amountNum > balance} onClick={() => setStep(3)}>Review transfer</Button>
            </div>
          </div>
        </Card>
      ) : null}

      {step === 3 && resolved ? (
        <Card>
          <div className="flex flex-col gap-5">
            <div className="grid grid-cols-3 gap-y-3 text-sm">
              <div className="text-muted-foreground">To</div><div className="col-span-2 font-medium text-foreground">{resolved.name}</div>
              <div className="text-muted-foreground">Bank</div><div className="col-span-2 text-foreground">{resolved.bank}</div>
              <div className="text-muted-foreground">Account</div><div className="col-span-2 tabular text-foreground">{accountNumber}</div>
              <div className="text-muted-foreground">Amount</div><div className="col-span-2 tabular font-semibold text-foreground">{formatNaira(amountNum)}</div>
              <div className="text-muted-foreground">Narration</div><div className="col-span-2 text-foreground">{narration || "—"}</div>
              <div className="text-muted-foreground">Fee</div><div className="col-span-2 tabular text-foreground">₦ 0.00</div>
            </div>
            {error ? <div className="text-xs text-danger">{error}</div> : null}
            <div className="flex items-center gap-3">
              <button onClick={() => setStep(2)} className="text-sm text-muted-foreground hover:text-foreground">Back</button>
              <Button size="lg" className="flex-1" loading={submitting} onClick={submit}>Confirm & Send</Button>
            </div>
          </div>
        </Card>
      ) : null}

      {step === 4 && resolved && reference ? (
        <Card className="text-center">
          <div className="mx-auto mt-2 flex h-12 w-12 items-center justify-center rounded-full border border-border">
            <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12l5 5L20 7" />
            </svg>
          </div>
          <div className="mt-4 text-lg font-semibold text-foreground">
            {formatNaira(amountNum)} sent to {resolved.name}
          </div>
          <div className="mt-1 text-xs text-muted-foreground">Ref · {reference}</div>
          <div className="mt-6 flex items-center justify-center gap-3">
            <Link to="/transactions" className="text-sm font-medium text-muted-foreground hover:text-foreground underline underline-offset-2">View transaction</Link>
            <Button onClick={reset}>Send another</Button>
          </div>
        </Card>
      ) : null}
    </div>
  );
}

function Stepper({ current }: { current: Step }) {
  const labels = ["Recipient", "Amount", "Confirm", "Done"];
  return (
    <div className="flex items-center gap-2">
      {labels.map((l, i) => {
        const idx = (i + 1) as Step;
        const active = current >= idx;
        return (
          <div key={l} className="flex flex-1 flex-col gap-1.5">
            <div className={`h-0.5 w-full ${active ? "bg-foreground" : "bg-border"}`} />
            <div className={`text-[10px] uppercase tracking-widest ${active ? "text-foreground" : "text-muted-foreground"}`}>{l}</div>
          </div>
        );
      })}
    </div>
  );
}
