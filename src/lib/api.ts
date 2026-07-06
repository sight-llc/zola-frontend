// Zola API layer — wired to the Zola FastAPI backend.
// All banking data (balance, VA, transactions, payouts) flows through
// the backend which proxies to Meroe BaaS infrastructure.
//
// Set VITE_API_URL in .env — defaults to http://localhost:8000

const BASE = (import.meta.env.VITE_API_URL ?? "http://localhost:8000").replace(/\/$/, "");

// ─────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────

export type User = {
  id: string;
  name: string;
  email: string;
  phone?: string | null;
  meroe_customer_id?: string | null;
};

export type Transaction = {
  id: string;
  type: "credit" | "debit";
  amount: number;       // naira
  counterparty: string;
  narration: string;
  bank?: string;
  date: string;         // ISO
};

export type KycStatus = {
  tier: 1 | 2 | 3;
  limits: { daily: number }; // naira
  bvnVerified: boolean;
  idVerified: boolean;
};

export type VirtualAccount = {
  accountNumber: string;
  bankName: string;
  accountName: string;
};

// ─────────────────────────────────────────────
// Token / session storage
// ─────────────────────────────────────────────

const TOKEN_KEY = "zola.token";
const USER_KEY  = "zola.user";

export function getToken(): string | null {
  return typeof window !== "undefined" ? localStorage.getItem(TOKEN_KEY) : null;
}

function saveSession(token: string, user: User) {
  localStorage.setItem(TOKEN_KEY, token);
  localStorage.setItem(USER_KEY, JSON.stringify(user));
}

export function getCurrentUser(): User | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(USER_KEY);
    return raw ? (JSON.parse(raw) as User) : null;
  } catch {
    return null;
  }
}

export function signOut() {
  if (typeof window === "undefined") return;
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(USER_KEY);
}

// ─────────────────────────────────────────────
// HTTP helpers
// ─────────────────────────────────────────────

async function req<T>(method: string, path: string, body?: unknown, auth = true): Promise<T> {
  const headers: Record<string, string> = { "Content-Type": "application/json" };
  if (auth) {
    const token = getToken();
    if (token) headers["Authorization"] = `Bearer ${token}`;
  }
  const res = await fetch(`${BASE}${path}`, {
    method,
    headers,
    body: body !== undefined ? JSON.stringify(body) : undefined,
  });
  if (!res.ok) {
    let msg = `Request failed (${res.status})`;
    try {
      const err = await res.json();
      msg = err.detail ?? err.message ?? msg;
    } catch {}
    throw new Error(msg);
  }
  if (res.status === 204) return undefined as T;
  return res.json();
}

const GET  = <T>(path: string)                   => req<T>("GET",  path);
const POST = <T>(path: string, body: unknown, auth = true) => req<T>("POST", path, body, auth);

// ─────────────────────────────────────────────
// Auth
// ─────────────────────────────────────────────

type RawUser = { id: string; full_name: string; email: string; phone?: string | null; meroe_customer_id?: string | null };
type AuthPayload = { access_token: string; user: RawUser };

function mapUser(raw: RawUser): User {
  return { id: raw.id, name: raw.full_name, email: raw.email, phone: raw.phone, meroe_customer_id: raw.meroe_customer_id };
}

export async function login(email: string, password: string) {
  const data = await POST<AuthPayload>("/v1/auth/login", { email, password }, false);
  const user = mapUser(data.user);
  saveSession(data.access_token, user);
  return { user, token: data.access_token };
}

export async function register(name: string, email: string, password: string) {
  const data = await POST<AuthPayload>("/v1/auth/register", { full_name: name, email, password }, false);
  const user = mapUser(data.user);
  saveSession(data.access_token, user);
  return { user, token: data.access_token };
}

// ─────────────────────────────────────────────
// Wallet
// ─────────────────────────────────────────────

export async function getBalance() {
  // Meroe returns amounts in kobo — divide by 100 for naira
  const data = await GET<{ available: number; spendable: number; currency: string }>("/v1/wallet/balance");
  return { balance: data.available / 100, currency: data.currency as "NGN" };
}

export async function getVirtualAccount(): Promise<VirtualAccount> {
  return GET<VirtualAccount>("/v1/wallet/virtual-account");
}

// ─────────────────────────────────────────────
// Transactions
// ─────────────────────────────────────────────

type RawTxn = {
  transactionId?: string;
  id?: string;
  reference?: string;
  direction?: string;
  type?: string;
  amount: number;     // kobo from Meroe
  narration?: string;
  counterparty?: string;
  occurredAt?: string;
  date?: string;
};

function mapTxn(raw: RawTxn): Transaction {
  const dir = (raw.direction ?? raw.type ?? "").toUpperCase();
  return {
    id:           raw.transactionId ?? raw.id ?? raw.reference ?? crypto.randomUUID(),
    type:         dir === "CREDIT" ? "credit" : "debit",
    amount:       raw.amount / 100,   // kobo → naira
    counterparty: raw.counterparty ?? raw.reference ?? "—",
    narration:    raw.narration ?? "",
    date:         raw.occurredAt ?? raw.date ?? new Date().toISOString(),
  };
}

export async function getTransactions(): Promise<Transaction[]> {
  const data = await GET<{ items?: RawTxn[] } | RawTxn[]>("/v1/wallet/transactions");
  const items = Array.isArray(data) ? data : (data.items ?? []);
  return items.map(mapTxn);
}

export async function getTransaction(id: string): Promise<Transaction | null> {
  // No single-txn endpoint — fetch list and find by id
  try {
    const all = await getTransactions();
    return all.find((t) => t.id === id) ?? null;
  } catch {
    return null;
  }
}

// ─────────────────────────────────────────────
// Transfers
// ─────────────────────────────────────────────

export const NG_BANKS = [
  { code: "058",    name: "GTBank" },
  { code: "011",    name: "First Bank" },
  { code: "044",    name: "Access Bank" },
  { code: "057",    name: "Zenith Bank" },
  { code: "033",    name: "UBA" },
  { code: "50211",  name: "Kuda" },
  { code: "999992", name: "Opay" },
  { code: "50515",  name: "Moniepoint" },
  { code: "232",    name: "Sterling Bank" },
  { code: "035",    name: "Wema Bank" },
  { code: "070",    name: "Fidelity Bank" },
  { code: "214",    name: "FCMB" },
  { code: "032",    name: "Union Bank" },
  { code: "221",    name: "Stanbic IBTC" },
];

export async function resolveAccount(bankCode: string, accountNumber: string) {
  const data = await POST<{ accountName: string; bankName: string }>(
    "/v1/transfers/resolve",
    { bank_code: bankCode, account_number: accountNumber },
  );
  return { accountName: data.accountName, bankName: data.bankName };
}

export async function sendMoney(
  bankCode: string,
  accountNumber: string,
  accountName: string,   // resolved name — passed from send page, no re-fetch needed
  amount: number,        // naira
  narration: string,
) {
  const data = await POST<{ merchantTxRef?: string; id?: string; status?: string }>(
    "/v1/transfers/send",
    {
      bank_code:      bankCode,
      account_number: accountNumber,
      account_name:   accountName,
      amount:         Math.round(amount * 100), // naira → kobo
      narration:      narration || "Transfer",
    },
  );
  const bank = NG_BANKS.find((b) => b.code === bankCode);
  return {
    reference: data.merchantTxRef ?? data.id ?? `ZLA${Date.now()}`,
    recipient: accountName,
    bank:      bank?.name,
  };
}

// ─────────────────────────────────────────────
// KYC
// ─────────────────────────────────────────────

export async function getKycStatus(): Promise<KycStatus> {
  const data = await GET<{ tier: number; bvnVerified: boolean; idVerified: boolean; limits: { daily: number } }>("/v1/kyc/status");
  return {
    tier:        (data.tier as 1 | 2 | 3) ?? 1,
    limits:      { daily: (data.limits?.daily ?? 5000000) / 100 }, // kobo → naira
    bvnVerified: data.bvnVerified,
    idVerified:  data.idVerified,
  };
}

export async function submitBvn(bvn: string) {
  const data = await POST<{ success: boolean; newTier: number }>("/v1/kyc/bvn", { bvn });
  return { success: true as const, newTier: data.newTier as 2 };
}

export async function submitId(file: File) {
  // Send as multipart/form-data — backend expects a `file` field
  const form = new FormData();
  form.append("file", file, file.name);

  const token = getToken();
  const res = await fetch(`${BASE}/v1/kyc/id-document`, {
    method:  "POST",
    headers: token ? { Authorization: `Bearer ${token}` } : {},
    body:    form,
  });
  if (!res.ok) {
    let msg = "ID submission failed";
    try { msg = (await res.json()).detail ?? msg; } catch {}
    throw new Error(msg);
  }
  return { success: true as const, newTier: 3 as const };
}

// ─────────────────────────────────────────────
// Helpers
// ─────────────────────────────────────────────

export function formatNaira(amount: number, opts: { withSymbol?: boolean } = {}) {
  const { withSymbol = true } = opts;
  const n = amount.toLocaleString("en-NG", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  return withSymbol ? `₦ ${n}` : n;
}
