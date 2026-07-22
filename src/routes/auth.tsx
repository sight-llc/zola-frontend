import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState, type FormEvent } from "react";
import { login, register } from "@/lib/api";
import { useAuth } from "@/lib/auth";
import { useToast } from "@/lib/toast";
import { Icons } from "@/components/design-system/Icons";
import { useCachedImage } from "@/hooks/use-cached-image";

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
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { setUser, user, ready } = useAuth();
  const { toast } = useToast();
  const nav = useNavigate();

  // Cached image URLs for offline resilience and visual flair
  const img1 = useCachedImage(
    "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=400&h=400&fit=crop&crop=face&q=80",
  );
  const img2 = useCachedImage(
    "https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=400&h=400&fit=crop&crop=face&q=80",
  );
  const img3 = useCachedImage(
    "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=300&h=300&fit=crop&crop=face&q=80",
  );

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
    <div className="flex min-h-dvh flex-col bg-[var(--bg-primary)] md:grid md:grid-cols-2">
      {/* ─── LEFT: Form ─── */}
      <div className="relative flex min-h-dvh flex-col bg-[var(--bg-secondary)] px-6 py-8 md:px-12 md:py-10">
        {/* ─── Mobile background images ─── */}
        <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden select-none md:hidden">
          <img
            src={img1}
            alt=""
            className="pointer-events-none absolute -right-10 -top-4 h-32 w-32 rotate-12 rounded-2xl object-cover opacity-10 select-none grayscale"
          />
          <img
            src={img2}
            alt=""
            className="pointer-events-none absolute -bottom-6 -left-6 h-28 w-28 -rotate-6 rounded-2xl object-cover opacity-10 select-none grayscale"
          />
          <img
            src={img3}
            alt=""
            className="pointer-events-none absolute bottom-[18%] right-[8%] h-20 w-20 rounded-xl object-cover opacity-10 select-none grayscale"
          />
          <img
            src={img1}
            alt=""
            className="pointer-events-none absolute left-[12%] top-[12%] h-20 w-20 rotate-45 rounded-xl object-cover opacity-8 select-none grayscale"
          />
          <img
            src={img2}
            alt=""
            className="pointer-events-none absolute right-[15%] top-[30%] h-16 w-16 -rotate-12 rounded-xl object-cover opacity-8 select-none grayscale"
          />
          <img
            src={img3}
            alt=""
            className="pointer-events-none absolute left-[5%] bottom-[35%] h-14 w-14 rotate-[30deg] rounded-lg object-cover opacity-8 select-none grayscale"
          />
        </div>

        {/* Logo */}
        <div className="relative z-10 flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-black">
            <img src="/authicon.png" alt="Zola" className="h-5 w-5 object-contain" />
          </div>
        </div>

        <div className="relative z-10 mx-auto mt-28 flex w-full max-w-sm flex-col md:mt-40">
          {/* Header */}
          <h1 className="text-3xl font-bold tracking-tight">
            {mode === "login" ? "Welcome back" : "Get started"}
          </h1>
          <p className="mt-2 text-sm text-[var(--text-secondary)]">
            {mode === "login"
              ? "Sign in to your Zola wallet."
              : "Create your account in minutes."}
          </p>

          {/* Form */}
          <form onSubmit={onSubmit} className="mt-8 flex flex-col gap-4">
            {mode === "register" ? (
              <>
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-medium text-[var(--text-secondary)]">Full name</label>
                  <input
                    className="h-11 w-full rounded-xl border border-[var(--border-default)] bg-[var(--bg-secondary)] px-4 text-sm text-[var(--text-primary)] placeholder:text-[var(--text-tertiary)] transition-all hover:border-[var(--border-strong)] focus:border-[var(--border-focus)] focus:ring-2 focus:ring-[var(--border-focus)]"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Chisom Okafor"
                    autoComplete="name"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-medium text-[var(--text-secondary)]">Phone number</label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="080 1234 5678"
                    className="h-11 w-full rounded-xl border border-[var(--border-default)] bg-[var(--bg-secondary)] px-4 text-sm text-[var(--text-primary)] placeholder:text-[var(--text-tertiary)] transition-all hover:border-[var(--border-strong)] focus:border-[var(--border-focus)] focus:ring-2 focus:ring-[var(--border-focus)]"
                    autoComplete="tel"
                  />
                </div>
              </>
            ) : null}

            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-medium text-[var(--text-secondary)]">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@company.com"
                className="h-11 w-full rounded-xl border border-[var(--border-default)] bg-[var(--bg-secondary)] px-4 text-sm text-[var(--text-primary)] placeholder:text-[var(--text-tertiary)] transition-all hover:border-[var(--border-strong)] focus:border-[var(--border-focus)] focus:ring-2 focus:ring-[var(--border-focus)]"
                autoComplete="email"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-medium text-[var(--text-secondary)]">Password</label>
              <div className="relative">
                <input
                  type={passwordVisible ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="h-11 w-full rounded-xl border border-[var(--border-default)] bg-[var(--bg-secondary)] pr-10 pl-4 text-sm text-[var(--text-primary)] placeholder:text-[var(--text-tertiary)] transition-all hover:border-[var(--border-strong)] focus:border-[var(--border-focus)] focus:ring-2 focus:ring-[var(--border-focus)]"
                  autoComplete={mode === "login" ? "current-password" : "new-password"}
                />
                <button
                  type="button"
                  onClick={() => setPasswordVisible(!passwordVisible)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--text-tertiary)] hover:text-[var(--text-primary)] transition-colors"
                  aria-label={passwordVisible ? "Hide password" : "Show password"}
                  tabIndex={-1}
                >
                  {passwordVisible ? <Icons.EyeOff size={16} /> : <Icons.Eye size={16} />}
                </button>
              </div>
            </div>

            {error ? (
              <div className="flex items-center gap-2 rounded-xl bg-[var(--error-bg)] px-4 py-3 text-xs text-[var(--error)]">
                <Icons.AlertCircle size={14} />
                {error}
              </div>
            ) : null}

            <button
              type="submit"
              disabled={loading}
              className="mt-2 inline-flex h-12 w-full items-center justify-center gap-2 rounded-2xl bg-[var(--accent)] text-sm font-semibold text-[var(--accent-foreground)] transition-all hover:bg-[var(--accent-hover)] active:scale-[0.98] disabled:opacity-40 disabled:pointer-events-none"
            >
              {loading ? (
                <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none">
                  <circle cx="12" cy="12" r="10" stroke="currentColor" strokeOpacity="0.25" strokeWidth="3" />
                  <path d="M22 12a10 10 0 0 1-10 10" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
                </svg>
              ) : null}
              {mode === "login" ? "Sign in" : "Create account"}
            </button>
          </form>

          {/* Toggle mode */}
          <div className="mt-6 text-center text-xs text-[var(--text-tertiary)]">
            {mode === "login" ? "Don't have an account? " : "Already have an account? "}
            <button
              onClick={() => {
                setMode(mode === "login" ? "register" : "login");
                setError(null);
              }}
              className="font-medium text-[var(--text-primary)] underline underline-offset-2 hover:text-[var(--text-link)]"
            >
              {mode === "login" ? "Create one" : "Sign in"}
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-auto pt-8 text-xs text-[var(--text-tertiary)]">
          © 2026 Zola. Built on Meroe infrastructure.
        </div>
      </div>

      {/* ─── RIGHT: Brand canvas ─── */}
      <div className="relative hidden overflow-hidden bg-gradient-to-br from-[var(--accent)] to-[var(--accent-hover)] md:block">
        {/* Images */}
        <img
          src={img1}
          alt=""
          className="pointer-events-none absolute -right-16 -top-8 h-72 w-72 rotate-12 rounded-3xl object-cover opacity-30 select-none grayscale"
          loading="lazy"
        />
        <img
          src={img2}
          alt=""
          className="pointer-events-none absolute -bottom-12 -left-12 h-64 w-64 -rotate-6 rounded-3xl object-cover opacity-25 select-none grayscale"
          loading="lazy"
        />
        <img
          src={img3}
          alt=""
          className="pointer-events-none absolute bottom-[30%] right-[10%] h-40 w-40 rounded-2xl object-cover opacity-20 select-none grayscale"
          loading="lazy"
        />

        {/* Decorative currency symbols */}
        <span className="pointer-events-none absolute -top-12 left-[8%] text-[220px] font-bold text-white/[0.04] select-none">₦</span>
        <span className="pointer-events-none absolute top-[20%] right-[8%] text-[100px] font-semibold text-white/[0.06] select-none">$</span>
        <span className="pointer-events-none absolute bottom-[10%] left-[15%] text-[140px] font-bold text-white/[0.05] select-none">€</span>
        <span className="pointer-events-none absolute bottom-[25%] right-[12%] text-[70px] font-semibold text-white/[0.08] select-none">£</span>

        <div className="relative z-10 flex h-full flex-col items-center justify-center px-12">
          <div className="w-[380px] rounded-2xl border border-white/10 bg-white/5 p-8 text-white shadow-2xl backdrop-blur-sm"
            style={{
              transform: "perspective(1200px) rotateZ(-6deg) rotateX(4deg)",
              boxShadow: "0 30px 80px rgba(0,0,0,0.3), 0 0 0 1px rgba(255,255,255,0.06) inset",
            }}
          >
            <div className="flex items-center justify-between">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/10">
                <img src="/authicon.png" alt="Zola" className="h-5 w-5 object-contain brightness-0 invert" />
              </div>
              <span className="rounded-md bg-white/10 px-2 py-1 text-[10px] font-semibold uppercase tracking-widest text-white/60">
                Virtual
              </span>
            </div>
            <div className="mt-10 font-mono text-2xl font-semibold tabular-nums tracking-widest text-white">
              4563 8745 1230 9876
            </div>
            <div className="mt-8 flex items-end justify-between">
              <div>
                <div className="text-[10px] uppercase tracking-wider text-white/40">Card Holder</div>
                <div className="mt-1 text-sm font-bold tracking-tight">Zola</div>
              </div>
              <div className="text-right">
                <div className="text-[10px] uppercase tracking-wider text-white/40">Expires</div>
                <div className="mt-1 text-sm font-bold tabular-nums">12/28</div>
              </div>
            </div>
          </div>

          <div className="mt-16 text-center">
            <h2 className="text-2xl font-bold text-white">Banking built for you.</h2>
            <p className="mt-3 text-sm text-white/50 max-w-sm mx-auto">
              Your money. Your rails. Dedicated NUBAN, instant transfers, no fees.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}