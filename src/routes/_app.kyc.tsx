import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { Button, Card, Input } from "@/components/ui-kit";
import { formatNaira, getKycStatus, submitBvn, submitId, type KycStatus } from "@/lib/api";
import { useAuth } from "@/lib/auth";
import { useToast } from "@/lib/toast";

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
    getKycStatus().then(setStatus);
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
    <div className="mx-auto flex max-w-[640px] flex-col gap-6">
      <header>
        <h1 className="text-2xl font-semibold tracking-tight">Verification</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Increase your daily limits by completing each tier.
        </p>
      </header>

      <Card className="flex items-center justify-between">
        <div>
          <div className="text-xs text-muted-foreground">Current tier</div>
          <div className="mt-0.5 text-lg font-semibold tabular text-foreground">Tier {tier}</div>
        </div>
        <div className="text-right">
          <div className="text-xs text-muted-foreground">Daily limit</div>
          <div className="mt-0.5 text-lg font-semibold tabular text-foreground">
            {status ? formatNaira(status.limits.daily, { withSymbol: false }) : "—"}
          </div>
        </div>
      </Card>

      <TierBlock n={1} title="Basic info" status="complete" limit="₦ 50,000 daily">
        <div className="grid grid-cols-2 gap-4 text-sm">
          <FieldReadonly label="Full name" value={user?.name ?? "—"} />
          <FieldReadonly label="Email" value={user?.email ?? "—"} />
        </div>
      </TierBlock>

      <TierBlock
        n={2}
        title="BVN verification"
        status={status?.bvnVerified ? "complete" : "pending"}
        limit="₦ 500,000 daily"
      >
        {status?.bvnVerified ? (
          <div className="text-sm text-muted-foreground">Your BVN has been verified.</div>
        ) : (
          <div className="flex flex-col gap-3">
            <Input
              label="Bank Verification Number"
              inputMode="numeric"
              maxLength={11}
              value={bvn}
              onChange={(e) => setBvn(e.target.value.replace(/[^0-9]/g, ""))}
              placeholder="11 digits"
              error={error ?? undefined}
            />
            <p className="text-xs text-muted-foreground">
              Your BVN is encrypted and never stored in plain text. Used for identity verification
              only.
            </p>
            <Button loading={submitting} disabled={bvn.length !== 11} onClick={onSubmitBvn}>
              Verify BVN
            </Button>
          </div>
        )}
      </TierBlock>

      <TierBlock
        n={3}
        title="ID verification"
        status={status?.idVerified ? "complete" : status?.bvnVerified ? "pending" : "locked"}
        limit="₦ 5,000,000 daily"
      >
        {status?.idVerified ? (
          <div className="text-sm text-muted-foreground">
            Your ID is under review. This unlocks Tier 3 limits.
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            <p className="text-sm text-muted-foreground">
              Upload your National ID, Passport, or Driver's License.
            </p>
            <input
              ref={fileRef}
              type="file"
              className="hidden"
              onChange={(e) => setIdFile(e.target.files?.[0] ?? null)}
            />
            <div className="flex items-center gap-3">
              <Button
                variant="outline"
                onClick={() => fileRef.current?.click()}
                disabled={!status?.bvnVerified}
              >
                Choose file
              </Button>
              <span className="truncate text-xs text-muted-foreground">
                {idFile?.name ?? "No file selected"}
              </span>
            </div>
            <Button
              loading={idSubmitting}
              disabled={!idFile || !status?.bvnVerified}
              onClick={onSubmitId}
            >
              Submit for review
            </Button>
            {!status?.bvnVerified ? (
              <p className="text-xs text-muted-foreground">Complete Tier 2 first.</p>
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
  return (
    <Card>
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="inline-flex h-6 w-6 items-center justify-center rounded-full border border-border text-[11px] font-semibold tabular text-foreground">
              {n}
            </span>
            <h3 className="text-sm font-semibold text-foreground">{title}</h3>
          </div>
          <div className="mt-1 pl-8 text-xs text-muted-foreground">Unlocks {limit}</div>
        </div>
        <span
          className={`text-[10px] uppercase tracking-widest ${status === "complete" ? "text-foreground" : "text-muted-foreground"}`}
        >
          {badge}
        </span>
      </div>
      <div className="mt-5 pl-8">{children}</div>
    </Card>
  );
}

function FieldReadonly({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div className="text-xs text-muted-foreground">{label}</div>
      <div className="mt-0.5 text-sm font-medium text-foreground">{value}</div>
    </div>
  );
}
