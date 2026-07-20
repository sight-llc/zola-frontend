// Zola API layer — wired to the Zola FastAPI backend.
// All banking data (balance, VA, transactions, payouts) flows through
// the backend which proxies to Meroe BaaS infrastructure.
//
// Set VITE_API_URL in .env — defaults to http://localhost:8000

const BASE = (import.meta.env.VITE_API_URL ?? "http://localhost:8000").replace(/\/$/, "");

// Request timeout — prevents UI from hanging indefinitely
const REQUEST_TIMEOUT_MS = 15000;

// ─────────────────────────────────────────────
// In-memory caches to avoid redundant API calls
// ─────────────────────────────────────────────

let banksCache: BankInfo[] | null = null;
let banksCachePromise: Promise<BankInfo[]> | null = null;
let transactionsCache: Transaction[] | null = null;
let transactionsCachePromise: Promise<Transaction[]> | null = null;

export function clearCaches() {
  banksCache = null;
  banksCachePromise = null;
  transactionsCache = null;
  transactionsCachePromise = null;
}

// ─────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────

export type User = {
  id: string;
  name: string;
  email: string;
  phone?: string | null;
  meroe_customer_id?: string | null;
  pin_set?: boolean;
};

export type Transaction = {
  id: string;
  type: "credit" | "debit";
  amount: number; // naira
  counterparty: string;
  narration: string;
  bank?: string;
  date: string; // ISO
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
const USER_KEY = "zola.user";

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
  clearCaches();
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

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);

  try {
    const res = await fetch(`${BASE}${path}`, {
      method,
      headers,
      body: body !== undefined ? JSON.stringify(body) : undefined,
      signal: controller.signal,
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
  } finally {
    clearTimeout(timeout);
  }
}

const GET = <T>(path: string) => req<T>("GET", path);
const POST = <T>(path: string, body: unknown, auth = true) => req<T>("POST", path, body, auth);

// ─────────────────────────────────────────────
// Auth
// ─────────────────────────────────────────────

type RawUser = {
  id: string;
  full_name: string;
  email: string;
  phone?: string | null;
  meroe_customer_id?: string | null;
  pin_set?: boolean;
};
type AuthPayload = { access_token: string; user: RawUser };

function mapUser(raw: RawUser): User {
  return {
    id: raw.id,
    name: raw.full_name,
    email: raw.email,
    phone: raw.phone,
    meroe_customer_id: raw.meroe_customer_id,
    pin_set: raw.pin_set,
  };
}

export async function login(email: string, password: string) {
  const data = await POST<AuthPayload>("/v1/auth/login", { email, password }, false);
  const user = mapUser(data.user);
  saveSession(data.access_token, user);
  return { user, token: data.access_token };
}

export async function register(name: string, email: string, password: string, phone?: string) {
  const data = await POST<AuthPayload>(
    "/v1/auth/register",
    { full_name: name, email, password, phone },
    false,
  );
  const user = mapUser(data.user);
  saveSession(data.access_token, user);
  return { user, token: data.access_token };
}

export async function setPin(pin: string): Promise<{ success: boolean; message: string }> {
  return POST<{ success: boolean; message: string }>("/v1/auth/pin", { pin });
}

// ─────────────────────────────────────────────
// Wallet
// ─────────────────────────────────────────────

export async function getBalance() {
  // API returns amounts in naira directly
  const data = await GET<{ available: number; spendable: number; currency: string }>(
    "/v1/wallet/balance",
  );
  return { balance: data.available, currency: data.currency as "NGN" };
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
  amount: number; // naira from API
  narration?: string;
  counterparty?: string;
  occurredAt?: string;
  date?: string;
};

function mapTxn(raw: RawTxn): Transaction {
  const dir = (raw.direction ?? raw.type ?? "").toUpperCase();
  return {
    id: raw.transactionId ?? raw.id ?? raw.reference ?? crypto.randomUUID(),
    type: dir === "CREDIT" ? "credit" : "debit",
    amount: raw.amount, // already in naira
    counterparty: raw.counterparty ?? raw.reference ?? "—",
    narration: raw.narration ?? "",
    date: raw.occurredAt ?? raw.date ?? new Date().toISOString(),
  };
}

export async function getTransactions(): Promise<Transaction[]> {
  // Use cached data if available (stale-while-revalidate pattern)
  if (transactionsCachePromise) {
    // A fetch is already in-flight — return it (deduplication)
    return transactionsCachePromise;
  }

  transactionsCachePromise = GET<{ items?: RawTxn[] } | RawTxn[]>("/v1/wallet/transactions")
    .then((data) => {
      const items = Array.isArray(data) ? data : (data.items ?? []);
      const mapped = items.map(mapTxn);
      transactionsCache = mapped;
      return mapped;
    })
    .finally(() => {
      transactionsCachePromise = null;
    });

  return transactionsCachePromise;
}

export async function getTransaction(id: string): Promise<Transaction | null> {
  // Check cache first — avoids full re-fetch if we already have transactions
  if (transactionsCache) {
    const found = transactionsCache.find((t) => t.id === id);
    if (found) return found;
  }

  // Otherwise fetch all and cache
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

export type BankInfo = {
  bankCode: string;
  bankName: string;
  nipCode?: string | null;
  logo?: string | null;
};

export async function getBanks(): Promise<BankInfo[]> {
  // Use in-memory cache + deduplication to avoid redundant requests
  if (banksCache) return banksCache;
  if (banksCachePromise) return banksCachePromise;

  banksCachePromise = GET<BankInfo[]>("/v1/transfers/banks")
    .then((banks) => {
      banksCache = banks;
      return banks;
    })
    .finally(() => {
      banksCachePromise = null;
    });

  return banksCachePromise;
}

export async function resolveAccount(bankCode: string, accountNumber: string) {
  // New response format: { accountNumber, accountName }
  const data = await POST<{ accountNumber: string; accountName: string }>("/v1/transfers/resolve", {
    bank_code: bankCode,
    account_number: accountNumber,
  });

  // Use cached banks list — avoids redundant fetch every resolution
  const banks = banksCache ?? await getBanks();
  const bank = banks.find((b) => b.bankCode === bankCode);
  return {
    accountName: data.accountName,
    bankName: bank?.bankName ?? "Unknown Bank",
  };
}

export async function sendMoney(
  bankCode: string,
  accountNumber: string,
  accountName: string, // resolved name — passed from send page, no re-fetch needed
  amount: number, // naira
  narration: string,
  pin: string, // 4-digit transaction PIN
) {
  const data = await POST<{ merchantTxRef?: string; id?: string; status?: string }>(
    "/v1/transfers/send",
    {
      bank_code: bankCode,
      account_number: accountNumber,
      account_name: accountName,
      amount: amount, // already in naira — endpoint expects naira
      narration: narration || "Transfer",
      pin: pin,
    },
  );
  return {
    reference: data.merchantTxRef ?? data.id ?? `ZLA${Date.now()}`,
    recipient: accountName,
    bank: undefined, // Will be populated from the banks list in the UI
  };
}

// ─────────────────────────────────────────────
// KYC
// ─────────────────────────────────────────────

export async function getKycStatus(): Promise<KycStatus> {
  const data = await GET<{
    tier: number;
    bvnVerified: boolean;
    idVerified: boolean;
    limits: { daily: number };
  }>("/v1/kyc/status");
  return {
    tier: (data.tier as 1 | 2 | 3) ?? 1,
    limits: { daily: (data.limits?.daily ?? 5000000) / 100 }, // kobo → naira
    bvnVerified: data.bvnVerified,
    idVerified: data.idVerified,
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
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);

  try {
    const res = await fetch(`${BASE}/v1/kyc/id-document`, {
      method: "POST",
      headers: token ? { Authorization: `Bearer ${token}` } : {},
      body: form,
      signal: controller.signal,
    });
    if (!res.ok) {
      let msg = "ID submission failed";
      try {
        msg = (await res.json()).detail ?? msg;
      } catch {}
      throw new Error(msg);
    }
    return { success: true as const, newTier: 3 as const };
  } finally {
    clearTimeout(timeout);
  }
}

// ─────────────────────────────────────────────
// Helpers
// ─────────────────────────────────────────────

export function formatNaira(amount: number, opts: { withSymbol?: boolean } = {}) {
  const { withSymbol = true } = opts;
  const n = amount.toLocaleString("en-NG", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  return withSymbol ? `₦ ${n}` : n;
}

// ─────────────────────────────────────────────
// Notifications
// ─────────────────────────────────────────────

export type ZolaNotification = {
  id: string;
  event_type: string;
  description: string;
  amount_display: string | null;
  read: boolean;
  created_at: string;
};

export async function getNotifications(): Promise<ZolaNotification[]> {
  return GET("/v1/notifications");
}

export async function markNotificationsRead(ids: string[]): Promise<void> {
  return POST("/v1/notifications/mark-read", { ids });
}