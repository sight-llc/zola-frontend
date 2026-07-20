import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { getKycStatus, setPin, type KycStatus } from "@/lib/api";
import { useAuth } from "@/lib/auth";
import { useToast } from "@/lib/toast";
import { Icons } from "@/components/design-system/Icons";

export const Route = createFileRoute("/_app/settings")({
  component: SettingsPage,
});

function SettingsPage() {
  const { user, signOut } = useAuth();
  const [kyc, setKyc] = useState<KycStatus | null>(null);
  const [pwOpen, setPwOpen] = useState(false);
  const [pinOpen, setPinOpen] = useState(false);
  const nav = useNavigate();

  useEffect(() => {
    getKycStatus()
      .then(setKyc)
      .catch(() => { });
  }, []);

  return (
    <div className="mx-auto flex max-w-[640px] flex-col gap-8">
      <header>
        <h1 className="text-2xl font-bold tracking-tight">Settings</h1>
        <p className="mt-1.5 text-sm text-[var(--text-secondary)]">Manage your Zola account.</p>
      </header>

      <section>
        <SectionTitle>Profile</SectionTitle>
        <div className="rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-elevated)] p-5">
          <div className="flex items-center gap-4 pb-4 border-b border-[var(--border-subtle)]">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[var(--accent)] text-sm font-bold text-[var(--accent-foreground)]">
              {user?.name
                ?.split(" ")
                .map((n: string) => n[0])
                .slice(0, 2)
                .join("") ?? "?"}
            </div>
            <div>
              <div className="text-sm font-semibold">{user?.name ?? "—"}</div>
              <div className="text-xs text-[var(--text-tertiary)]">{user?.email ?? "—"}</div>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4 pt-4">
            <Field label="Full name" value={user?.name ?? "—"} />
            <Field
              label="Email"
              value={
                user?.email
                  ? `${user.email.slice(0, 20)}...`
                  : "—"
              }
            />
          </div>
        </div>
      </section>

      {/* Security */}
      <section>
        <SectionTitle>Security</SectionTitle>
        <div className="space-y-2">
          <SettingRow
            label="Password"
            description="Last changed —"
            action="Change"
            onClick={() => setPwOpen(true)}
          />
          <SettingRow
            label="Transaction PIN"
            description={user?.pin_set ? "Set up for secure transfers" : "Required for transfers"}
            status={user?.pin_set ? "Set" : undefined}
            action={!user?.pin_set ? "Set PIN" : undefined}
            onClick={() => !user?.pin_set && setPinOpen(true)}
          />
        </div>
      </section>

      {/* Verification */}
      <section>
        <SectionTitle>Verification</SectionTitle>
        <div className="rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-elevated)] p-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--info-bg)]">
                <Icons.Shield size={18} className="text-[var(--info)]" />
              </div>
              <div>
                <div className="text-sm font-medium">Identity tier</div>
                <div className="text-xs text-[var(--text-tertiary)]">Tier {kyc?.tier ?? "—"} of 3</div>
              </div>
            </div>
            <Link
              to="/kyc"
              className="h-9 inline-flex items-center rounded-lg border border-[var(--border-default)] px-3 text-xs font-medium hover:bg-[var(--bg-surface)] transition-colors"
            >
              Manage
            </Link>
          </div>
        </div>
      </section>

      {/* About */}
      <section>
        <SectionTitle>About</SectionTitle>
        <div className="rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-elevated)] p-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--bg-surface)]">
                <Icons.Info size={18} className="text-[var(--text-tertiary)]" />
              </div>
              <div>
                <div className="text-sm font-medium">Version</div>
                <div className="text-xs text-[var(--text-tertiary)]">1.0.0</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Sign out */}
      <button
        onClick={() => {
          signOut();
          nav({ to: "/auth" });
        }}
        className="flex items-center justify-center gap-2 rounded-2xl border border-[var(--error-bg)] bg-[var(--error-bg)] px-5 py-3 text-sm font-medium text-[var(--error)] hover:brightness-95 transition-all"
      >
        <Icons.LogOut size={16} />
        Sign out
      </button>

      {pwOpen ? <PasswordModal onClose={() => setPwOpen(false)} /> : null}
      {pinOpen ? <PinModal onClose={() => setPinOpen(false)} /> : null}
    </div>
  );
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <div className="mb-3 text-xs font-semibold uppercase tracking-wider text-[var(--text-tertiary)]">
      {children}
    </div>
  );
}

function Field({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div className="text-xs text-[var(--text-tertiary)]">{label}</div>
      <div className="mt-0.5 text-sm font-medium">{value}</div>
    </div>
  );
}

function SettingRow({
  label,
  description,
  status,
  action,
  onClick,
}: {
  label: string;
  description?: string;
  status?: string;
  action?: string;
  onClick?: () => void;
}) {
  return (
    <div className="flex items-center justify-between rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-elevated)] px-5 py-4">
      <div className="flex items-center gap-3">
        <div>
          <div className="text-sm font-medium">{label}</div>
          {description ? <div className="text-xs text-[var(--text-tertiary)]">{description}</div> : null}
        </div>
      </div>
      <div className="flex items-center gap-2">
        {status ? (
          <span className="text-xs font-medium text-[var(--success)]">{status}</span>
        ) : null}
        {action ? (
          <button
            onClick={onClick}
            className="h-9 rounded-lg border border-[var(--border-default)] px-3 text-xs font-medium hover:bg-[var(--bg-surface)] transition-colors"
          >
            {action}
          </button>
        ) : null}
      </div>
    </div>
  );
}

function PasswordModal({ onClose }: { onClose: () => void }) {
  const [cur, setCur] = useState("");
  const [next, setNext] = useState("");
  const [curVisible, setCurVisible] = useState(false);
  const [nextVisible, setNextVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  return (
    <div className="fixed inset-0 z-[var(--z-modal)] flex items-center justify-center bg-black/40 px-4 backdrop-blur-sm" onClick={onClose}>
      <div onClick={(e) => e.stopPropagation()} className="w-full max-w-md animate-in-scale rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-elevated)] p-6 shadow-xl">
        <div className="flex items-center gap-3 mb-5">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--accent)] text-[var(--accent-foreground)]">
            <Icons.Lock size={18} />
          </div>
          <div>
            <h3 className="text-base font-semibold">Change password</h3>
            <p className="text-xs text-[var(--text-tertiary)]">Choose a strong, unique password.</p>
          </div>
        </div>
        <div className="flex flex-col gap-3">
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-medium text-[var(--text-secondary)]">Current password</label>
            <div className="relative">
              <input
                type={curVisible ? "text" : "password"}
                value={cur}
                onChange={(e) => setCur(e.target.value)}
                className="h-11 w-full rounded-xl border border-[var(--border-default)] bg-[var(--bg-secondary)] pr-10 pl-4 text-sm"
              />
              <button
                type="button"
                onClick={() => setCurVisible(!curVisible)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--text-tertiary)] hover:text-[var(--text-primary)] transition-colors"
                aria-label={curVisible ? "Hide current password" : "Show current password"}
                tabIndex={-1}
              >
                {curVisible ? <Icons.EyeOff size={16} /> : <Icons.Eye size={16} />}
              </button>
            </div>
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-medium text-[var(--text-secondary)]">New password</label>
            <div className="relative">
              <input
                type={nextVisible ? "text" : "password"}
                value={next}
                onChange={(e) => setNext(e.target.value)}
                className="h-11 w-full rounded-xl border border-[var(--border-default)] bg-[var(--bg-secondary)] pr-10 pl-4 text-sm"
              />
              <button
                type="button"
                onClick={() => setNextVisible(!nextVisible)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--text-tertiary)] hover:text-[var(--text-primary)] transition-colors"
                aria-label={nextVisible ? "Hide new password" : "Show new password"}
                tabIndex={-1}
              >
                {nextVisible ? <Icons.EyeOff size={16} /> : <Icons.Eye size={16} />}
              </button>
            </div>
          </div>
        </div>
        <div className="mt-6 flex justify-end gap-2">
          <button onClick={onClose} className="h-10 rounded-xl border border-[var(--border-default)] px-4 text-sm font-medium hover:bg-[var(--bg-surface)]">
            Cancel
          </button>
          <button
            disabled={!cur || next.length < 8 || loading}
            onClick={() => {
              setLoading(true);
              setTimeout(() => {
                setLoading(false);
                toast("Password updated");
                onClose();
              }, 700);
            }}
            className="h-10 rounded-xl bg-[var(--accent)] px-4 text-sm font-medium text-[var(--accent-foreground)] hover:bg-[var(--accent-hover)] disabled:opacity-40"
          >
            {loading ? "Updating…" : "Update"}
          </button>
        </div>
      </div>
    </div>
  );
}

function PinModal({ onClose }: { onClose: () => void }) {
  const [pin, setPinInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  async function handleSetPin() {
    if (pin.length !== 4) return;
    setLoading(true);
    setError(null);
    try {
      await setPin(pin);
      toast("Transaction PIN set");
      onClose();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to set PIN");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="fixed inset-0 z-[var(--z-modal)] flex items-center justify-center bg-black/40 px-4 backdrop-blur-sm" onClick={onClose}>
      <div onClick={(e) => e.stopPropagation()} className="w-full max-w-md animate-in-scale rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-elevated)] p-6 shadow-xl">
        <div className="flex items-center gap-3 mb-5">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--accent)] text-[var(--accent-foreground)]">
            <Icons.Lock size={18} />
          </div>
          <div>
            <h3 className="text-base font-semibold">Set Transaction PIN</h3>
            <p className="text-xs text-[var(--text-tertiary)]">Create a 4-digit PIN for secure transfers.</p>
          </div>
        </div>
        <div className="flex justify-center py-4">
          <InputOTP maxLength={4} value={pin} onChange={setPinInput} className="flex items-center gap-3">
            <InputOTPGroup className="flex gap-3">
              {[0, 1, 2, 3].map((i) => (
                <InputOTPSlot
                  key={i}
                  index={i}
                  className="h-14 w-14 rounded-2xl border border-[var(--border-default)] bg-[var(--bg-secondary)] text-xl font-bold tabular-nums text-[var(--text-primary)] focus:ring-2 focus:ring-[var(--border-focus)]"
                />
              ))}
            </InputOTPGroup>
          </InputOTP>
        </div>
        {error ? (
          <div className="flex items-center gap-2 rounded-xl bg-[var(--error-bg)] px-4 py-3 text-xs text-[var(--error)] mt-2">
            <Icons.AlertCircle size={14} />
            {error}
          </div>
        ) : null}
        <div className="mt-6 flex justify-end gap-2">
          <button onClick={onClose} className="h-10 rounded-xl border border-[var(--border-default)] px-4 text-sm font-medium hover:bg-[var(--bg-surface)]">
            Cancel
          </button>
          <button
            disabled={pin.length !== 4 || loading}
            onClick={handleSetPin}
            className="h-10 rounded-xl bg-[var(--accent)] px-4 text-sm font-medium text-[var(--accent-foreground)] hover:bg-[var(--accent-hover)] disabled:opacity-40"
          >
            {loading ? "Setting…" : "Set PIN"}
          </button>
        </div>
      </div>
    </div>
  );
}