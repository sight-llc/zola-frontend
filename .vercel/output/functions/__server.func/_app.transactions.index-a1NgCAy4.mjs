import { r as __toESM } from "./_runtime.mjs";
import { c as getTransactions } from "./_ssr/api-B4kmTFOi.mjs";
import { u as require_react } from "./_libs/@floating-ui/react-dom+[...].mjs";
import { o as require_jsx_runtime } from "./_libs/@radix-ui/react-arrow+[...].mjs";
import { t as Icons } from "./_ssr/Icons-Nrs4ZB_z.mjs";
import { n as TxnRow } from "./_app.home-Dfpsg_WT.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/_app.transactions.index-a1NgCAy4.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function TxnPage() {
	const [txns, setTxns] = (0, import_react.useState)(null);
	const [filter, setFilter] = (0, import_react.useState)("all");
	const [q, setQ] = (0, import_react.useState)("");
	(0, import_react.useEffect)(() => {
		getTransactions().then(setTxns).catch(() => {});
	}, []);
	const filtered = (0, import_react.useMemo)(() => {
		if (!txns) return null;
		return txns.filter((t) => {
			if (filter === "in" && t.type !== "credit") return false;
			if (filter === "out" && t.type !== "debit") return false;
			if (q) {
				const s = q.toLowerCase();
				if (!t.counterparty.toLowerCase().includes(s) && !t.narration.toLowerCase().includes(s)) return false;
			}
			return true;
		});
	}, [
		txns,
		filter,
		q
	]);
	const grouped = (0, import_react.useMemo)(() => {
		if (!filtered) return null;
		const g = /* @__PURE__ */ new Map();
		for (const t of filtered) {
			const key = groupKey(t.date);
			const arr = g.get(key) ?? [];
			arr.push(t);
			g.set(key, arr);
		}
		return Array.from(g.entries());
	}, [filtered]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-col gap-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "text-2xl font-bold tracking-tight",
				children: "Activity"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-1.5 text-sm text-[var(--text-secondary)]",
				children: "Every transfer in and out of your Zola wallet."
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-col gap-3 md:flex-row md:items-center md:justify-between",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "inline-flex rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-elevated)] p-1",
					children: [
						"all",
						"in",
						"out"
					].map((f) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: () => setFilter(f),
						className: `px-4 py-1.5 text-xs font-medium rounded-lg transition-all ${filter === f ? "bg-[var(--accent)] text-[var(--accent-foreground)]" : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]"}`,
						children: f === "all" ? "All" : f === "in" ? "Money In" : "Money Out"
					}, f))
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "relative md:w-64",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-[var(--text-tertiary)]",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icons.Search, { size: 14 })
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						placeholder: "Search transactions",
						value: q,
						onChange: (e) => setQ(e.target.value),
						className: "h-10 w-full rounded-xl border border-[var(--border-default)] bg-[var(--bg-secondary)] pl-9 pr-4 text-sm text-[var(--text-primary)] placeholder:text-[var(--text-tertiary)] transition-all hover:border-[var(--border-strong)] focus:border-[var(--border-focus)] focus:ring-2 focus:ring-[var(--border-focus)]"
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex flex-col gap-6",
				children: grouped == null ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "space-y-3",
					children: Array.from({ length: 8 }).map((_, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-4 rounded-xl px-3 py-3",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-10 w-10 rounded-xl skeleton" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex-1 space-y-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-3 w-32 skeleton" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-2.5 w-48 skeleton" })]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-4 w-16 skeleton" })
						]
					}, i))
				}) : grouped.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-col items-center gap-4 rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-elevated)] px-6 py-16 text-center",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "flex h-12 w-12 items-center justify-center rounded-2xl bg-[var(--bg-surface)]",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icons.Clock, {
								size: 20,
								className: "text-[var(--text-tertiary)]"
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "text-sm font-medium text-[var(--text-tertiary)]",
							children: "No transactions found"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs text-[var(--text-tertiary)]/60 max-w-xs",
							children: q ? "Try a different search term." : "Your transactions will appear here."
						})
					]
				}) : grouped.map(([label, items]) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mb-2 text-xs font-semibold text-[var(--text-tertiary)] uppercase tracking-wider",
					children: label
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex flex-col rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-elevated)] p-2",
					children: items.map((t, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TxnRow, { t }), i < items.length - 1 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "mx-2 h-px bg-[var(--border-subtle)]" }) : null] }, t.id))
				})] }, label))
			})
		]
	});
}
function groupKey(iso) {
	const d = new Date(iso);
	const today = /* @__PURE__ */ new Date();
	const yest = /* @__PURE__ */ new Date();
	yest.setDate(today.getDate() - 1);
	const sameDay = (a, b) => a.toDateString() === b.toDateString();
	if (sameDay(d, today)) return "Today";
	if (sameDay(d, yest)) return "Yesterday";
	return d.toLocaleDateString("en-NG", {
		month: "long",
		day: "numeric"
	});
}
//#endregion
export { TxnPage as component };
