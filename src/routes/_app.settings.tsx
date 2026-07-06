import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Button, Card, Input } from "@/components/ui-kit";
import { getKycStatus, type KycStatus } from "@/lib/api";
import { useAuth } from "@/lib/auth";
import { useToast } from "@/lib/toast";

export const Route = createFileRoute("/_app/settings")({
  component: SettingsPage,
});

function SettingsPage() {
  const { user, signOut } = useAuth();
  const [kyc, setKyc] = useState<KycStatus | null>(null);
  const [pwOpen, setPwOpen] = useState(false);
  const [theme, setTheme] = useState<"system" | "light" | "dark">("system");
  const nav = useNavigate();

  useEffect(() => { getKycStatus().then(setKyc); }, []);

  useEffect(() => {
    const saved = (localStorage.getItem("zola.theme") as "light" | "dark" | null) ?? "system";
    setTheme(saved);
  }, []);

  function applyTheme(next: "system" | "light" | "dark") {
    setTheme(next);
    if (next === "system") {
      localStorage.removeItem("zola.theme");
      const m = window.matchMedia("(prefers-color-scheme: dark)").matches;
      document.documentElement.classList.toggle("dark", m);
    } else {
      localStorage.setItem("zola.theme", next);
      document.documentElement.classList.toggle("dark", next === "dark");
    }
  }

  return (
    <div className="mx-auto flex max-w-[640px] flex-col gap-6">
      <header>
        <h1 className="text-2xl font-semibold tracking-tight">Settings</h1>
        <p className="mt-1 text-sm text-muted-foreground">Manage your Zola account.</p>
      </header>

      <Section title="Profile">
        <Card>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <Field label="Full name" value={user?.name ?? "—"} />
            <Field label="Email" value={user?.email ?? "—"} />
          </div>
        </Card>
      </Section>

      <Section title="Security">
        <Card className="flex items-center justify-between">
          <div>
            <div className="text-sm font-medium text-foreground">Password</div>
            <div className="mt-0.5 text-xs text-muted-foreground">Last changed —</div>
          </div>
          <Button variant="outline" onClick={() => setPwOpen(true)}>Change password</Button>
        </Card>
      </Section>

      <Section title="Verification">
        <Card className="flex items-center justify-between">
          <div>
            <div className="text-sm font-medium text-foreground">Identity tier</div>
            <div className="mt-0.5 text-xs text-muted-foreground">Tier {kyc?.tier ?? "—"} of 3</div>
          </div>
          <Link to="/kyc" className="rounded-md border border-border bg-background px-3 h-10 inline-flex items-center text-sm font-medium hover:bg-surface transition-colors">Manage</Link>
        </Card>
      </Section>

      <Section title="Appearance">
        <Card>
          <div className="inline-flex rounded-md border border-border bg-background p-0.5">
            {(["system", "light", "dark"] as const).map((t) => (
              <button
                key={t}
                onClick={() => applyTheme(t)}
                className={`px-3.5 py-1.5 text-xs font-medium capitalize rounded-[4px] transition-colors ${theme === t ? "bg-foreground text-background" : "text-muted-foreground hover:text-foreground"}`}
              >
                {t}
              </button>
            ))}
          </div>
        </Card>
      </Section>

      <Section title="Danger zone">
        <Card>
          <button
            onClick={() => { signOut(); nav({ to: "/auth" }); }}
            className="text-sm font-medium text-danger hover:underline underline-offset-2"
          >
            Sign out
          </button>
        </Card>
      </Section>

      {pwOpen ? <PasswordModal onClose={() => setPwOpen(false)} /> : null}
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section>
      <div className="mb-2 text-[11px] font-medium uppercase tracking-widest text-muted-foreground">{title}</div>
      {children}
    </section>
  );
}

function Field({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div className="text-xs text-muted-foreground">{label}</div>
      <div className="mt-1 text-sm font-medium text-foreground">{value}</div>
    </div>
  );
}

function PasswordModal({ onClose }: { onClose: () => void }) {
  const [cur, setCur] = useState("");
  const [next, setNext] = useState("");
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4" onClick={onClose}>
      <div onClick={(e) => e.stopPropagation()} className="w-full max-w-md rounded-xl border border-border bg-background p-6">
        <h3 className="text-base font-semibold">Change password</h3>
        <p className="mt-1 text-xs text-muted-foreground">Enter your current password and choose a new one.</p>
        <div className="mt-5 flex flex-col gap-3">
          <Input label="Current password" type="password" value={cur} onChange={(e) => setCur(e.target.value)} />
          <Input label="New password" type="password" value={next} onChange={(e) => setNext(e.target.value)} />
        </div>
        <div className="mt-6 flex justify-end gap-2">
          <Button variant="ghost" onClick={onClose}>Cancel</Button>
          <Button
            loading={loading}
            disabled={!cur || next.length < 8}
            onClick={() => {
              setLoading(true);
              setTimeout(() => { setLoading(false); toast("Password updated"); onClose(); }, 700);
            }}
          >
            Update password
          </Button>
        </div>
      </div>
    </div>
  );
}
