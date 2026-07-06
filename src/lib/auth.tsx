import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { getCurrentUser, signOut as apiSignOut, type User } from "./api";

type AuthCtx = {
  user: User | null;
  setUser: (u: User | null) => void;
  signOut: () => void;
  ready: boolean;
};

const Ctx = createContext<AuthCtx | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setUser(getCurrentUser());
    setReady(true);
  }, []);

  return (
    <Ctx.Provider
      value={{
        user,
        setUser,
        ready,
        signOut: () => {
          apiSignOut();
          setUser(null);
        },
      }}
    >
      {children}
    </Ctx.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
