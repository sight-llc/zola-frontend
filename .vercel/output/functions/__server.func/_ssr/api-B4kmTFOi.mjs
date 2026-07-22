//#region node_modules/.nitro/vite/services/ssr/assets/api-B4kmTFOi.js
var BASE = "https://zola-backend.fastapicloud.dev/".replace(/\/$/, "");
var REQUEST_TIMEOUT_MS = 15e3;
var banksCache = null;
var banksCachePromise = null;
var transactionsCache = null;
var transactionsCachePromise = null;
function clearCaches() {
	banksCache = null;
	banksCachePromise = null;
	transactionsCache = null;
	transactionsCachePromise = null;
}
var TOKEN_KEY = "zola.token";
var USER_KEY = "zola.user";
function getToken() {
	return typeof window !== "undefined" ? localStorage.getItem(TOKEN_KEY) : null;
}
function saveSession(token, user) {
	localStorage.setItem(TOKEN_KEY, token);
	localStorage.setItem(USER_KEY, JSON.stringify(user));
}
function getCurrentUser() {
	if (typeof window === "undefined") return null;
	try {
		const raw = localStorage.getItem(USER_KEY);
		return raw ? JSON.parse(raw) : null;
	} catch {
		return null;
	}
}
function signOut() {
	if (typeof window === "undefined") return;
	localStorage.removeItem(TOKEN_KEY);
	localStorage.removeItem(USER_KEY);
	clearCaches();
}
/**
* Called when the backend returns 401 (token expired/invalid).
* Clears local session and redirects to the auth page.
* Works on both web and mobile (Capacitor) since both support
* localStorage and window.location navigation.
*/
function handleUnauthorized() {
	signOut();
	if (typeof window !== "undefined" && !window.location.pathname.startsWith("/auth")) window.location.href = "/auth";
}
async function req(method, path, body, auth = true) {
	const headers = { "Content-Type": "application/json" };
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
			body: body !== void 0 ? JSON.stringify(body) : void 0,
			signal: controller.signal
		});
		if (!res.ok) {
			if (res.status === 401 && auth) handleUnauthorized();
			let msg = `Request failed (${res.status})`;
			try {
				const err = await res.json();
				msg = err.detail ?? err.message ?? msg;
			} catch {}
			throw new Error(msg);
		}
		if (res.status === 204) return void 0;
		return res.json();
	} finally {
		clearTimeout(timeout);
	}
}
var GET = (path) => req("GET", path);
var POST = (path, body, auth = true) => req("POST", path, body, auth);
function mapUser(raw) {
	return {
		id: raw.id,
		name: raw.full_name,
		email: raw.email,
		phone: raw.phone,
		meroe_customer_id: raw.meroe_customer_id,
		pin_set: raw.pin_set
	};
}
async function login(email, password) {
	const data = await POST("/v1/auth/login", {
		email,
		password
	}, false);
	const user = mapUser(data.user);
	saveSession(data.access_token, user);
	return {
		user,
		token: data.access_token
	};
}
async function register(name, email, password, phone) {
	const data = await POST("/v1/auth/register", {
		full_name: name,
		email,
		password,
		phone
	}, false);
	const user = mapUser(data.user);
	saveSession(data.access_token, user);
	return {
		user,
		token: data.access_token
	};
}
async function setPin(pin) {
	return POST("/v1/auth/pin", { pin });
}
async function getBalance() {
	const data = await GET("/v1/wallet/balance");
	return {
		balance: data.available,
		currency: data.currency
	};
}
async function getVirtualAccount() {
	return GET("/v1/wallet/virtual-account");
}
function mapTxn(raw) {
	const dir = (raw.direction ?? raw.type ?? "").toUpperCase();
	return {
		id: raw.transactionId ?? raw.id ?? raw.reference ?? crypto.randomUUID(),
		type: dir === "CREDIT" ? "credit" : "debit",
		amount: raw.amount,
		counterparty: raw.counterparty ?? raw.reference ?? "—",
		narration: raw.narration ?? "",
		date: raw.occurredAt ?? raw.date ?? (/* @__PURE__ */ new Date()).toISOString()
	};
}
async function getTransactions() {
	if (transactionsCachePromise) return transactionsCachePromise;
	transactionsCachePromise = GET("/v1/wallet/transactions").then((data) => {
		const mapped = (Array.isArray(data) ? data : data.items ?? []).map(mapTxn);
		transactionsCache = mapped;
		return mapped;
	}).finally(() => {
		transactionsCachePromise = null;
	});
	return transactionsCachePromise;
}
async function getTransaction(id) {
	if (transactionsCache) {
		const found = transactionsCache.find((t) => t.id === id);
		if (found) return found;
	}
	try {
		return (await getTransactions()).find((t) => t.id === id) ?? null;
	} catch {
		return null;
	}
}
async function getBanks() {
	if (banksCache) return banksCache;
	if (banksCachePromise) return banksCachePromise;
	banksCachePromise = GET("/v1/transfers/banks").then((banks) => {
		banksCache = banks;
		return banks;
	}).finally(() => {
		banksCachePromise = null;
	});
	return banksCachePromise;
}
async function resolveAccount(bankCode, accountNumber) {
	const data = await POST("/v1/transfers/resolve", {
		bank_code: bankCode,
		account_number: accountNumber
	});
	const bank = (banksCache ?? await getBanks()).find((b) => b.bankCode === bankCode);
	return {
		accountName: data.accountName,
		bankName: bank?.bankName ?? "Unknown Bank"
	};
}
async function sendMoney(bankCode, accountNumber, accountName, amount, narration, pin) {
	const data = await POST("/v1/transfers/send", {
		bank_code: bankCode,
		account_number: accountNumber,
		account_name: accountName,
		amount,
		narration: narration || "Transfer",
		pin
	});
	return {
		reference: data.merchantTxRef ?? data.id ?? `ZLA${Date.now()}`,
		recipient: accountName,
		bank: void 0
	};
}
async function getKycStatus() {
	const data = await GET("/v1/kyc/status");
	return {
		tier: data.tier ?? 1,
		limits: { daily: (data.limits?.daily ?? 5e6) / 100 },
		bvnVerified: data.bvnVerified,
		idVerified: data.idVerified
	};
}
async function submitBvn(bvn) {
	return {
		success: true,
		newTier: (await POST("/v1/kyc/bvn", { bvn })).newTier
	};
}
async function submitId(file) {
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
			signal: controller.signal
		});
		if (!res.ok) {
			if (res.status === 401) handleUnauthorized();
			let msg = "ID submission failed";
			try {
				msg = (await res.json()).detail ?? msg;
			} catch {}
			throw new Error(msg);
		}
		return {
			success: true,
			newTier: 3
		};
	} finally {
		clearTimeout(timeout);
	}
}
function formatNaira(amount, opts = {}) {
	const { withSymbol = true } = opts;
	const n = amount.toLocaleString("en-NG", {
		minimumFractionDigits: 2,
		maximumFractionDigits: 2
	});
	return withSymbol ? `₦ ${n}` : n;
}
async function getNotifications() {
	return GET("/v1/notifications");
}
async function markNotificationsRead(ids) {
	return POST("/v1/notifications/mark-read", { ids });
}
//#endregion
export { submitBvn as _, getKycStatus as a, getTransactions as c, markNotificationsRead as d, register as f, signOut as g, setPin as h, getCurrentUser as i, getVirtualAccount as l, sendMoney as m, getBalance as n, getNotifications as o, resolveAccount as p, getBanks as r, getTransaction as s, formatNaira as t, login as u, submitId as v };
