import { createContext, useCallback, useContext, useState, type ReactNode } from "react";

type Toast = { id: number; message: string };
type Ctx = { toast: (msg: string) => void };

const ToastCtx = createContext<Ctx | null>(null);

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const toast = useCallback((message: string) => {
    const id = Date.now() + Math.random();
    setToasts((t) => [...t, { id, message }]);
    setTimeout(() => setToasts((t) => t.filter((x) => x.id !== id)), 3000);
  }, []);

  return (
    <ToastCtx.Provider value={{ toast }}>
      {children}
      <div className="pointer-events-none fixed bottom-4 right-4 z-50 flex flex-col gap-2">
        {toasts.map((t) => (
          <div
            key={t.id}
            className="pointer-events-auto rounded-md border border-border bg-[#0A0A0A] px-4 py-2.5 text-sm text-white shadow-sm transition-all"
            style={{ animation: "zola-toast 150ms ease" }}
          >
            {t.message}
          </div>
        ))}
      </div>
      <style>{`@keyframes zola-toast { from { opacity: 0; transform: translateY(4px);} to {opacity:1; transform:none;} }`}</style>
    </ToastCtx.Provider>
  );
}

export function useToast() {
  const ctx = useContext(ToastCtx);
  if (!ctx) throw new Error("useToast must be used within ToastProvider");
  return ctx;
}
