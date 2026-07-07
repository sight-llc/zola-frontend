import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState, type FormEvent } from "react";
import { Button, Input } from "@/components/ui-kit";
import { ZolaLogo, ZolaMark } from "@/components/ZolaLogo";
import { login, register } from "@/lib/api";
import { useAuth } from "@/lib/auth";
import { useToast } from "@/lib/toast";

export const Route = createFileRoute("/auth")({
  head: () => ({
    meta: [
      { title: "Sign in — Zola" },
      { name: "description", content: "Sign in to Zola or create your account." },
    ],
  }),
  component: AuthPage,
});

function AuthPage() {
  const [mode, setMode] = useState<"login" | "register">("login");
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const { setUser, user, ready } = useAuth();
  const { toast } = useToast();
  const nav = useNavigate();

  useEffect(() => {
    if (ready && user) nav({ to: "/home", replace: true });
  }, [user, ready, nav]);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    if (!email || !password || (mode === "register" && !name)) {
      setError("Please fill in all fields.");
      return;
    }
    if (mode === "register" && phone && !/^\+?\d{7,15}$/.test(phone.replace(/[\s\-]/g, ""))) {
      setError("Please enter a valid phone number.");
      return;
    }
    setLoading(true);
    try {
      const res =
        mode === "login"
          ? await login(email, password)
          : await register(name, email, password, phone || undefined);
      setUser(res.user);
      toast(mode === "login" ? "Welcome back" : "Account created");
      nav({ to: "/home", replace: true });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen w-full grid grid-cols-1 lg:grid-cols-2">
      {/* LEFT — form */}
      <div className="flex min-h-screen flex-col justify-between bg-background px-6 py-8 lg:px-14 lg:py-10">
        <ZolaLogo />

        <div className="mx-auto flex w-full max-w-sm flex-col">
          <h1 className="text-2xl font-semibold tracking-tight text-foreground">
            {mode === "login" ? "Sign in to Zola" : "Create your account"}
          </h1>
          <p className="mt-1.5 text-sm text-muted-foreground">
            {mode === "login"
              ? "Access your Nigerian wallet."
              : "Get your dedicated NUBAN in minutes."}
          </p>

          <form onSubmit={onSubmit} className="mt-8 flex flex-col gap-4">
            {mode === "register" ? (
              <>
                <Input
                  label="Full name"
                  name="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Chisom Okafor"
                  autoComplete="name"
                />
                <Input
                  label="Phone number"
                  name="phone"
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="080 1234 5678"
                  autoComplete="tel"
                />
              </>
            ) : null}
            <Input
              label="Email"
              name="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@company.com"
              autoComplete="email"
            />
            <Input
              label="Password"
              name="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              autoComplete={mode === "login" ? "current-password" : "new-password"}
            />

            {error ? <div className="text-xs text-danger">{error}</div> : null}

            <Button type="submit" loading={loading} size="lg" className="mt-2">
              {mode === "login" ? "Sign in" : "Create account"}
            </Button>
          </form>

          <div className="mt-6 text-xs text-muted-foreground">
            {mode === "login" ? "Don't have an account? " : "Already have an account? "}
            <button
              onClick={() => {
                setMode(mode === "login" ? "register" : "login");
                setError(null);
              }}
              className="font-medium text-foreground underline underline-offset-2"
            >
              {mode === "login" ? "Create one" : "Sign in"}
            </button>
          </div>
        </div>

        <div className="text-xs text-muted-foreground">
          © 2026 Zola. Built on Meroe infrastructure.
        </div>
      </div>

      {/* RIGHT — brand canvas */}
      <div className="relative hidden overflow-hidden bg-[#0A0A0A] lg:block">
        {/* Global currency symbols — the only multi-currency surface in the app */}
        <span className="pointer-events-none absolute top-[8%] left-[12%] text-[180px] font-bold text-white/[0.06] select-none">
          ₦
        </span>
        <span className="pointer-events-none absolute top-[18%] right-[10%] text-[90px] font-semibold text-white/[0.10] select-none">
          $
        </span>
        <span className="pointer-events-none absolute bottom-[14%] left-[18%] text-[120px] font-bold text-white/[0.08] select-none">
          €
        </span>
        <span className="pointer-events-none absolute bottom-[22%] right-[16%] text-[60px] font-semibold text-white/[0.15] select-none">
          £
        </span>
        <span className="pointer-events-none absolute top-[46%] left-[6%] text-[40px] font-medium text-white/[0.10] select-none">
          ¥
        </span>
        <span className="pointer-events-none absolute top-[54%] right-[4%] text-[52px] font-medium text-white/[0.08] select-none">
          ₹
        </span>
        <span className="pointer-events-none absolute top-[32%] left-[42%] text-[70px] font-semibold text-white/[0.07] select-none">
          ₿
        </span>

        <div className="relative z-10 flex h-full w-full flex-col items-center justify-center px-10">
          <p className="mb-10 text-[28px] font-semibold leading-tight text-white text-center">
            Banking built for you.
          </p>

          <div
            className="relative w-[360px] rounded-[14px] border border-white/10 bg-[#141414] p-6 text-white"
            style={{
              transform: "perspective(1200px) rotateZ(-8deg) rotateX(6deg)",
              boxShadow: "0 20px 80px rgba(255,255,255,0.06), 0 1px 0 rgba(255,255,255,0.04) inset",
            }}
          >
            <div className="flex items-start justify-between">
              <ZolaMark className="h-5 w-5 text-white" />
              <span className="text-[10px] uppercase tracking-widest text-white/40">Virtual</span>
            </div>
            <div className="mt-10 font-mono text-[22px] font-semibold tabular tracking-wider text-white">
              4563 8745 1230 9876
            </div>
            <div className="mt-8 flex items-end justify-between">
              <div className="text-[11px] uppercase tracking-wider text-white/50">Card Holder</div>
              <div className="text-sm font-bold tracking-tight text-white">Zola</div>
            </div>
          </div>

          <p className="mt-14 text-sm text-white/50">Your money. Your rails.</p>
        </div>
      </div>
    </div>
  );
}
