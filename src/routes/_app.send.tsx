import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import {
  getBanks,
  formatNaira,
  getBalance,
  resolveAccount,
  sendMoney,
  type BankInfo,
} from "@/lib/api";
import { useToast } from "@/lib/toast";
import { Icons } from "@/components/design-system/Icons";

export const Route = createFileRoute("/_app/send")({
  component: SendPage,
});

type Step = 1 | 2 | 3 | 4 | 5;

function SendPage() {
  const [step, setStep] = useState<Step>(1);
  const [bankCode, setBankCode] = useState("058");
  const [accountNumber, setAccountNumber] = useState("");
  const [resolving, setResolving] = useState(false);
  const [resolved, setResolved] = useState<{ name: string; bank: string } | null>(null);
  const [amount, setAmount] = useState("");
  const [narration, setNarration] = useState("");
  const [pin, setPin] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [reference, setReference] = useState<string | null>(null);
  const [balance, setBalance] = useState<number>(0);
  const [error, setError] = useState<string | null>(null);
  const [banks, setBanks] = useState<BankInfo[]>([]);
  const [banksLoading, setBanksLoading] = useState(true);
  const [banksError, setBanksError] = useState<string | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    async function fetchBanks() {
      setBanksLoading(true);
      setBanksError(null);
      try {
        const fetchedBanks = await getBanks();
        setBanks(fetchedBanks);
      } catch (e) {
        setBanksError(e instanceof Error ? e.message : "Failed to load banks");
      } finally {
        setBanksLoading(false);
      }
    }
    fetchBanks();
  }, []);

  useEffect(() => {
    getBalance()
      .then((b) => setBalance(b.balance))
      .catch(() => { /* silent */ });
  }, []);

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
      const res = await sendMoney(bankCode, accountNumber, resolved.name, amountNum, narration, pin);
      setReference(res.reference);
      setStep(5);
      toast("Transfer successful");
    } catch (e) {
      setError(e instanceof Error ? e.message : "Transfer failed");
    } finally {
      setSubmitting(false);
    }
  }

  function reset() {
    setStep(1);
    setAccountNumber("");
    setResolved(null);
    setAmount("");
    setNarration("");
    setPin("");
    setReference(null);
    setError(null);
  }

  async function retryFetchBanks() {
    setBanksLoading(true);
    setBanksError(null);
    try {
      const fetchedBanks = await getBanks();
      setBanks(fetchedBanks);
    } catch (e) {
      setBanksError(e instanceof Error ? e.message : "Failed to load banks");
    } finally {
      setBanksLoading(false);
    }
  }

  return (
    <div className="mx-auto flex max-w-[520px] flex-col gap-6">
      {/* Back button */}
      <button
        onClick={() => {
          if (step > 1 && step < 5) {
            setStep((step - 1) as Step);
          } else if (step === 5) {
            reset();
          } else {
            window.history.back();
          }
        }}
        className="flex items-center gap-1.5 text-xs font-medium text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors self-start"
      >
        <Icons.ChevronLeft size={14} />
        Back
      </button>

      <header>
        <h1 className="text-2xl font-bold tracking-tight">Send money</h1>
        <p className="mt-1.5 text-sm text-[var(--text-secondary)]">
          Transfer to any Nigerian bank account.
        </p>
      </header>

      {/* ─── Step 1: Recipient ─── */}
      {step === 1 && (
        <div className="animate-in-scale">
          <div className="rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-elevated)] p-6">
            <div className="mb-6 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--accent)] text-[var(--accent-foreground)] text-sm font-bold">
                1
              </div>
              <div>
                <h3 className="text-sm font-semibold">Recipient details</h3>
                <p className="text-xs text-[var(--text-tertiary)]">Who are you sending to?</p>
              </div>
            </div>

            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-medium text-[var(--text-secondary)]">Bank</label>
                {banksLoading ? (
                  <div className="h-11 rounded-xl border border-[var(--border-default)] bg-[var(--bg-surface)] px-4 flex items-center text-xs text-[var(--text-tertiary)]">
                    Loading banks…
                  </div>
                ) : banksError ? (
                  <div className="flex flex-col gap-2">
                    <div className="text-xs text-[var(--error)]">{banksError}</div>
                    <button
                      onClick={retryFetchBanks}
                      className="h-9 rounded-lg border border-[var(--border-default)] px-3 text-xs font-medium hover:bg-[var(--bg-surface)] transition-colors self-start"
                    >
                      Retry
                    </button>
                  </div>
                ) : (
                  <Select value={bankCode} onValueChange={setBankCode}>
                    <SelectTrigger className="h-11 w-full rounded-xl border border-[var(--border-default)] bg-[var(--bg-secondary)] px-4 text-sm text-left hover:border-[var(--border-strong)] transition-colors">
                      <SelectValue placeholder="Choose a bank" />
                    </SelectTrigger>
                    <SelectContent className="rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-elevated)] shadow-lg">
                      {banks.map((b) => (
                        <SelectItem
                          key={b.bankCode}
                          value={b.bankCode}
                          className="px-3 py-2.5 text-sm hover:bg-[var(--bg-surface)] cursor-pointer"
                        >
                          {b.bankName}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-medium text-[var(--text-secondary)]">Account number</label>
                <input
                  inputMode="numeric"
                  maxLength={10}
                  value={accountNumber}
                  onChange={(e) => setAccountNumber(e.target.value.replace(/[^0-9]/g, ""))}
                  placeholder="10 digits"
                  className="h-11 w-full rounded-xl border border-[var(--border-default)] bg-[var(--bg-secondary)] px-4 text-sm tabular-nums placeholder:text-[var(--text-tertiary)] transition-all hover:border-[var(--border-strong)] focus:border-[var(--border-focus)] focus:ring-2 focus:ring-[var(--border-focus)]"
                />
              </div>

              {resolving ? (
                <div className="h-11 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] px-4 flex items-center text-xs text-[var(--text-tertiary)]">
                  <span className="inline-block h-3 w-3 rounded-full border-2 border-[var(--text-tertiary)] border-t-transparent animate-spin mr-2" />
                  Resolving account…
                </div>
              ) : null}

              {resolved ? (
                <div className="flex items-center gap-3 rounded-xl bg-[var(--success-bg)] px-4 py-3">
                  <Icons.CheckCircle size={16} className="text-[var(--success)] shrink-0" />
                  <div className="text-sm text-[var(--success)]">
                    <span className="font-semibold">{resolved.name}</span>
                    <span className="text-[var(--success)]/70"> · {resolved.bank}</span>
                  </div>
                </div>
              ) : null}

              {error ? (
                <div className="flex items-center gap-2 rounded-xl bg-[var(--error-bg)] px-4 py-3 text-xs text-[var(--error)]">
                  <Icons.AlertCircle size={14} />
                  {error}
                </div>
              ) : null}

              <button
                disabled={!resolved}
                onClick={() => setStep(2)}
                className="mt-2 h-12 w-full rounded-2xl bg-[var(--accent)] text-sm font-semibold text-[var(--accent-foreground)] transition-all hover:bg-[var(--accent-hover)] active:scale-[0.98] disabled:opacity-40 disabled:pointer-events-none"
              >
                Continue
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ─── Step 2: Amount ─── */}
      {step === 2 && resolved && (
        <div className="animate-in-scale">
          <div className="rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-elevated)] p-6">
            <div className="flex items-center gap-3 rounded-xl bg-[var(--bg-surface)] px-4 py-3 text-sm mb-6">
              <Icons.User size={16} className="text-[var(--text-tertiary)]" />
              <span className="text-[var(--text-secondary)]">To</span>
              <span className="font-medium text-[var(--text-primary)]">{resolved.name}</span>
              <span className="text-[var(--text-tertiary)]">·</span>
              <span className="text-[var(--text-secondary)]">{resolved.bank}</span>
            </div>

            <div className="flex flex-col items-center gap-2 pb-4">
              <span className="text-xs font-medium text-[var(--text-tertiary)] uppercase tracking-wider">Amount</span>
              <div className="flex items-start gap-1">
                <span className="text-2xl font-semibold text-[var(--text-tertiary)] mt-2">₦</span>
                <input
                  autoFocus
                  inputMode="decimal"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value.replace(/[^0-9.]/g, ""))}
                  placeholder="0.00"
                  className="w-56 bg-transparent text-center text-5xl font-bold tabular-nums text-[var(--text-primary)] placeholder:text-[var(--text-tertiary)] focus:outline-none"
                />
              </div>
              <div className="text-xs text-[var(--text-tertiary)] tabular-nums">
                Available: {formatNaira(balance)}
              </div>
            </div>

            <div className="flex flex-col gap-1.5 mt-6">
              <label className="text-xs font-medium text-[var(--text-secondary)]">Narration (optional)</label>
              <input
                placeholder="What's this for?"
                value={narration}
                onChange={(e) => setNarration(e.target.value)}
                className="h-11 w-full rounded-xl border border-[var(--border-default)] bg-[var(--bg-secondary)] px-4 text-sm placeholder:text-[var(--text-tertiary)] transition-all hover:border-[var(--border-strong)] focus:border-[var(--border-focus)] focus:ring-2 focus:ring-[var(--border-focus)]"
              />
            </div>

            <div className="mt-6 flex gap-3">
              <button
                onClick={() => setStep(1)}
                className="h-12 flex-1 rounded-2xl border border-[var(--border-default)] text-sm font-medium transition-all hover:bg-[var(--bg-surface)]"
              >
                Change
              </button>
              <button
                className="h-12 flex-[2] rounded-2xl bg-[var(--accent)] text-sm font-semibold text-[var(--accent-foreground)] transition-all hover:bg-[var(--accent-hover)] active:scale-[0.98] disabled:opacity-40 disabled:pointer-events-none"
                disabled={amountNum <= 0 || amountNum > balance}
                onClick={() => setStep(3)}
              >
                Review transfer
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ─── Step 3: Review ─── */}
      {step === 3 && resolved && (
        <div className="animate-in-scale">
          <div className="rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-elevated)] p-6">
            <div className="mb-6 flex items-center gap-3">
              <Icons.CheckCircle size={20} className="text-[var(--success)]" />
              <h3 className="text-base font-semibold">Review transfer</h3>
            </div>

            <div className="space-y-4">
              {[
                { label: "Recipient", value: resolved.name },
                { label: "Bank", value: resolved.bank },
                { label: "Account", value: accountNumber },
                { label: "Amount", value: formatNaira(amountNum), highlight: true },
                { label: "Narration", value: narration || "—" },
                { label: "Fee", value: "₦ 0.00" },
              ].map((field) => (
                <div key={field.label} className="flex items-center justify-between border-b border-[var(--border-subtle)] pb-3 last:border-0 last:pb-0">
                  <span className="text-xs text-[var(--text-secondary)]">{field.label}</span>
                  <span className={`text-sm tabular-nums ${field.highlight ? "font-bold text-[var(--text-primary)]" : "font-medium text-[var(--text-primary)]"}`}>
                    {field.value}
                  </span>
                </div>
              ))}
            </div>

            {error ? (
              <div className="mt-4 flex items-center gap-2 rounded-xl bg-[var(--error-bg)] px-4 py-3 text-xs text-[var(--error)]">
                <Icons.AlertCircle size={14} />
                {error}
              </div>
            ) : null}

            <div className="mt-6 flex gap-3">
              <button
                onClick={() => setStep(2)}
                className="h-12 flex-1 rounded-2xl border border-[var(--border-default)] text-sm font-medium transition-all hover:bg-[var(--bg-surface)]"
              >
                Edit
              </button>
              <button
                className="h-12 flex-[2] rounded-2xl bg-[var(--accent)] text-sm font-semibold text-[var(--accent-foreground)] transition-all hover:bg-[var(--accent-hover)] active:scale-[0.98]"
                disabled={!resolved}
                onClick={() => setStep(4)}
              >
                Confirm with PIN
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ─── Step 4: PIN ─── */}
      {step === 4 && resolved && (
        <div className="animate-in-scale">
          <div className="rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-elevated)] p-6">
            <div className="flex flex-col items-center gap-4 mb-8">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[var(--accent)] text-[var(--accent-foreground)]">
                <Icons.Lock size={20} />
              </div>
              <div className="text-center">
                <h3 className="text-base font-semibold">Enter transaction PIN</h3>
                <p className="mt-1 text-xs text-[var(--text-tertiary)]">
                  Confirm sending {formatNaira(amountNum)} to {resolved.name}
                </p>
              </div>
            </div>

            <div className="flex justify-center">
              <InputOTP
                maxLength={4}
                value={pin}
                onChange={setPin}
                className="flex items-center gap-3"
              >
                <InputOTPGroup className="flex gap-3">
                  {[0, 1, 2, 3].map((i) => (
                    <InputOTPSlot
                      key={i}
                      index={i}
                      className="h-14 w-14 rounded-2xl border border-[var(--border-default)] bg-[var(--bg-secondary)] text-xl font-bold tabular-nums text-[var(--text-primary)] focus:ring-2 focus:ring-[var(--border-focus)] [&[data-selected]]:border-[var(--border-focus)]"
                    />
                  ))}
                </InputOTPGroup>
              </InputOTP>
            </div>

            {error ? (
              <div className="mt-4 flex items-center gap-2 rounded-xl bg-[var(--error-bg)] px-4 py-3 text-xs text-[var(--error)]">
                <Icons.AlertCircle size={14} />
                {error}
              </div>
            ) : null}

            <div className="mt-8 flex gap-3">
              <button
                onClick={() => setStep(3)}
                className="h-12 flex-1 rounded-2xl border border-[var(--border-default)] text-sm font-medium transition-all hover:bg-[var(--bg-surface)]"
              >
                Back
              </button>
              <button
                disabled={pin.length !== 4 || submitting}
                onClick={submit}
                className="h-12 flex-[2] rounded-2xl bg-[var(--accent)] text-sm font-semibold text-[var(--accent-foreground)] transition-all hover:bg-[var(--accent-hover)] active:scale-[0.98] disabled:opacity-40 disabled:pointer-events-none inline-flex items-center justify-center gap-2"
              >
                {submitting ? (
                  <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none">
                    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeOpacity="0.25" strokeWidth="3" />
                    <path d="M22 12a10 10 0 0 1-10 10" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
                  </svg>
                ) : null}
                {submitting ? "Sending…" : `Send ${formatNaira(amountNum)}`}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ─── Step 5: Success ─── */}
      {step === 5 && resolved && reference ? (
        <div className="animate-in-scale text-center">
          <div className="rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-elevated)] p-8">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[var(--success-bg)]">
              <Icons.CheckCircle size={28} className="text-[var(--success)]" />
            </div>
            <h2 className="mt-5 text-xl font-bold">{formatNaira(amountNum)} sent</h2>
            <p className="mt-1 text-sm text-[var(--text-secondary)]">{resolved.name}</p>

            <div className="mt-6 rounded-xl bg-[var(--bg-surface)] px-4 py-3">
              <div className="text-xs text-[var(--text-tertiary)]">Reference</div>
              <div className="mt-0.5 text-xs tabular-nums text-[var(--text-primary)] font-medium">
                {reference}
              </div>
            </div>

            <div className="mt-8 flex flex-col gap-3">
              <Link
                to="/transactions"
                className="h-12 w-full inline-flex items-center justify-center rounded-2xl border border-[var(--border-default)] text-sm font-medium transition-all hover:bg-[var(--bg-surface)]"
              >
                View transaction
              </Link>
              <button
                onClick={reset}
                className="h-12 w-full rounded-2xl bg-[var(--accent)] text-sm font-semibold text-[var(--accent-foreground)] transition-all hover:bg-[var(--accent-hover)] active:scale-[0.98]"
              >
                Send another
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}