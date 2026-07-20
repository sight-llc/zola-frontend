import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { formatNaira, getKycStatus, submitBvn, submitId, type KycStatus } from "@/lib/api";
import { useAuth } from "@/lib/auth";
import { useToast } from "@/lib/toast";
import { Icons } from "@/components/design-system/Icons";

export const Route = createFileRoute("/_app/kyc")({
  component: KycPage,
});

function KycPage() {
  const [status, setStatus] = useState<KycStatus | null>(null);
  const [bvn, setBvn] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [idFile, setIdFile] = useState<File | null>(null);
  const [idSubmitting, setIdSubmitting] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);
  const { user } = useAuth();
  const { toast } = useToast();

  useEffect(() => {
    getKycStatus()
      .then(setStatus)
      .catch(() => { /* silent */ });
  }, []);

  async function onSubmitBvn() {
    setError(null);
    setSubmitting(true);
    try {
      await submitBvn(bvn);
      const next = await getKycStatus();
      setStatus(next);
      toast("BVN verified");
    } catch (e) {
      setError(e instanceof Error ? e.message : "Verification failed");
    } finally {
      setSubmitting(false);
    }
  }

  async function onSubmitId() {
    if (!idFile) return;
    setIdSubmitting(true);
    try {
      await submitId(idFile);
      const next = await getKycStatus();
      setStatus(next);
      toast("ID submitted");
    } finally {
      setIdSubmitting(false);
    }
  }

  const tier = status?.tier ?? 1;

  return (
    <div className="mx-auto flex max-w-[640px] flex-col gap-8">
      <header>
        <h1 className="text-2xl font-bold tracking-tight">Verification</h1>
        <p className="mt-1.5 text-sm text-[var(--text-secondary)]">
          Increase your daily limits by completing each tier.
        </p>
      </header>

      {/* Current tier summary */}
      <div className="rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-elevated)] p-5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--accent)] text-[var(--accent-foreground)] text-sm font-bold">
              {tier}
            </div>
            <div>
              <div className="text-xs text-[var(--text-tertiary)]">Current tier</div>
              <div className="text-lg font-bold tabular-nums">Tier {tier}</div>
            </div>
          </div>
          <div className="text-right">
            <div className="text-xs text-[var(--text-tertiary)]">Daily limit</div>
            <div className="text-lg font-bold tabular-nums">
              {status ? formatNaira(status.limits.daily, { withSymbol: false }) : "—"}
            </div>
          </div>
        </div>
      </div>

      {/* Tier 1 */}
      <TierBlock
        n={1}
        title="Basic info"
        status="complete"
        limit="₦ 50,000 daily"
      >
        <div className="grid grid-cols-2 gap-4 text-sm">
          <FieldReadonly label="Full name" value={user?.name ?? "—"} />
          <FieldReadonly label="Email" value={
                user?.email
                  ? `${user.email.slice(0, 15)}...`
                  : "—"} />
        </div>
      </TierBlock>

      {/* Tier 2 */}
      <TierBlock
        n={2}
        title="BVN verification"
        status={status?.bvnVerified ? "complete" : "pending"}
        limit="₦ 500,000 daily"
      >
        {status?.bvnVerified ? (
          <div className="flex items-center gap-2 text-sm text-[var(--success)]">
            <Icons.CheckCircle size={16} />
            Your BVN has been verified.
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-medium text-[var(--text-secondary)]">Bank Verification Number</label>
              <input
                inputMode="numeric"
                maxLength={11}
                value={bvn}
                onChange={(e) => setBvn(e.target.value.replace(/[^0-9]/g, ""))}
                placeholder="11 digits"
                className="h-11 w-full rounded-xl border border-[var(--border-default)] bg-[var(--bg-secondary)] px-4 text-sm tabular-nums placeholder:text-[var(--text-tertiary)] transition-all hover:border-[var(--border-strong)] focus:border-[var(--border-focus)] focus:ring-2 focus:ring-[var(--border-focus)]"
              />
            </div>
            <p className="text-xs text-[var(--text-tertiary)]">
              Your BVN is encrypted and never stored in plain text. Used for identity verification only.
            </p>
            {error ? (
              <div className="flex items-center gap-2 rounded-xl bg-[var(--error-bg)] px-4 py-3 text-xs text-[var(--error)]">
                <Icons.AlertCircle size={14} />
                {error}
              </div>
            ) : null}
            <button
              disabled={bvn.length !== 11 || submitting}
              onClick={onSubmitBvn}
              className="h-11 w-full rounded-xl bg-[var(--accent)] text-sm font-semibold text-[var(--accent-foreground)] transition-all hover:bg-[var(--accent-hover)] active:scale-[0.98] disabled:opacity-40 disabled:pointer-events-none inline-flex items-center justify-center gap-2"
            >
              {submitting ? (
                <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none">
                  <circle cx="12" cy="12" r="10" stroke="currentColor" strokeOpacity="0.25" strokeWidth="3" />
                  <path d="M22 12a10 10 0 0 1-10 10" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
                </svg>
              ) : null}
              Verify BVN
            </button>
          </div>
        )}
      </TierBlock>

      {/* Tier 3 */}
      <TierBlock
        n={3}
        title="ID verification"
        status={status?.idVerified ? "complete" : status?.bvnVerified ? "pending" : "locked"}
        limit="₦ 5,000,000 daily"
      >
        {status?.idVerified ? (
          <div className="flex items-center gap-2 text-sm text-[var(--info)]">
            <Icons.Info size={16} />
            Your ID is under review. This unlocks Tier 3 limits.
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            <p className="text-sm text-[var(--text-secondary)]">
              Upload your National ID, Passport, or Driver's License.
            </p>
            <input
              ref={fileRef}
              type="file"
              className="hidden"
              onChange={(e) => setIdFile(e.target.files?.[0] ?? null)}
            />
            <div className="flex items-center gap-3">
              <button
                onClick={() => fileRef.current?.click()}
                disabled={!status?.bvnVerified}
                className="h-10 rounded-xl border border-[var(--border-default)] px-4 text-sm font-medium hover:bg-[var(--bg-surface)] transition-colors disabled:opacity-40"
              >
                Choose file
              </button>
              <span className="truncate text-xs text-[var(--text-tertiary)]">
                {idFile?.name ?? "No file selected"}
              </span>
            </div>
            <button
              disabled={!idFile || !status?.bvnVerified || idSubmitting}
              onClick={onSubmitId}
              className="h-11 w-full rounded-xl bg-[var(--accent)] text-sm font-semibold text-[var(--accent-foreground)] transition-all hover:bg-[var(--accent-hover)] active:scale-[0.98] disabled:opacity-40 disabled:pointer-events-none inline-flex items-center justify-center gap-2"
            >
              {idSubmitting ? (
                <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none">
                  <circle cx="12" cy="12" r="10" stroke="currentColor" strokeOpacity="0.25" strokeWidth="3" />
                  <path d="M22 12a10 10 0 0 1-10 10" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
                </svg>
              ) : null}
              Submit for review
            </button>
            {!status?.bvnVerified ? (
              <p className="text-xs text-[var(--text-tertiary)]">Complete Tier 2 first.</p>
            ) : null}
          </div>
        )}
      </TierBlock>
    </div>
  );
}

function TierBlock({
  n,
  title,
  status,
  limit,
  children,
}: {
  n: number;
  title: string;
  status: "complete" | "pending" | "locked";
  limit: string;
  children: React.ReactNode;
}) {
  const badge = status === "complete" ? "Complete" : status === "pending" ? "Pending" : "Locked";
  const badgeColor = status === "complete" ? "text-[var(--success)]" : status === "pending" ? "text-[var(--warning)]" : "text-[var(--text-tertiary)]";

  return (
    <div className="rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-elevated)] p-5">
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-start gap-3">
          <div className={`flex h-8 w-8 items-center justify-center rounded-lg text-xs font-bold tabular-nums ${
            status === "complete"
              ? "bg-[var(--success-bg)] text-[var(--success)]"
              : status === "pending"
              ? "bg-[var(--warning-bg)] text-[var(--warning)]"
              : "bg-[var(--bg-surface)] text-[var(--text-tertiary)]"
          }`}>
            {status === "complete" ? <Icons.Check size={14} /> : n}
          </div>
          <div>
            <h3 className="text-sm font-semibold">{title}</h3>
            <div className="mt-0.5 text-xs text-[var(--text-tertiary)]">Unlocks {limit}</div>
          </div>
        </div>
        <span className={`text-[10px] font-semibold uppercase tracking-widest ${badgeColor}`}>
          {badge}
        </span>
      </div>
      <div className="mt-5 pl-11">{children}</div>
    </div>
  );
}

function FieldReadonly({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div className="text-xs text-[var(--text-tertiary)]">{label}</div>
      <div className="mt-0.5 text-sm font-medium">{value}</div>
    </div>
  );
}